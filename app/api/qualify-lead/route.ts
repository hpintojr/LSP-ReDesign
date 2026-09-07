/**
 * POST /api/qualify-lead
 *
 * Receives the personalized LSP PURL qualification form submission,
 * validates it, applies qualification rules server-side, and fans it out:
 *   • Supabase — UPDATE lead row by unique_id (source of truth)
 *   • GHL — existing ADV workflow/API paths
 *   • Salesforce — existing ADV CRM path
 *
 * Every LSP PURL submission is also additively tagged in GHL with
 * `sms-web-purl-lsp` without replacing any existing contact tags.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  isValidUniqueId,
  routeQualifiedLeadToBackends,
  evaluateDecline,
  QualificationSubmission,
} from '@/lib/qualification';
import { backendConfig } from '@/lib/backendconnect';
import { BackendResult } from '@/lib/leadTypes';

async function addLspPurlTag(submission: QualificationSubmission): Promise<BackendResult> {
  const apiKey = process.env.GHL_API_KEY || backendConfig.ghlApi.apiKey || '';
  const locationId = process.env.GHL_LOCATION_ID || backendConfig.ghlApi.locationId || '';

  if (!apiKey || !locationId) {
    return {
      backend: 'ghl-lsp-tag',
      success: false,
      message: 'Skipped sms-web-purl-lsp tag — missing GHL API credentials',
    };
  }

  try {
    // Upsert without a tags property so existing ADV/GHL tags are preserved.
    const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId,
        email: submission.email,
        phone: submission.phone,
      }),
    });

    if (!upsertRes.ok) {
      const text = await upsertRes.text();
      return {
        backend: 'ghl-lsp-tag',
        success: false,
        message: `Unable to resolve GHL contact for LSP tag (HTTP ${upsertRes.status}): ${text}`,
      };
    }

    const data = (await upsertRes.json()) as { contact?: { id?: string } };
    const contactId = data.contact?.id;
    if (!contactId) {
      return {
        backend: 'ghl-lsp-tag',
        success: false,
        message: 'GHL contact resolved without a contact ID; LSP tag was not applied',
      };
    }

    const tagRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          Version: '2021-07-28',
        },
        body: JSON.stringify({ tags: ['sms-web-purl-lsp'] }),
      }
    );

    if (!tagRes.ok) {
      const text = await tagRes.text();
      return {
        backend: 'ghl-lsp-tag',
        success: false,
        message: `GHL contact saved but sms-web-purl-lsp tag failed (HTTP ${tagRes.status}): ${text}`,
      };
    }

    return {
      backend: 'ghl-lsp-tag',
      success: true,
      message: 'Applied sms-web-purl-lsp tag in GHL',
    };
  } catch (error) {
    return {
      backend: 'ghl-lsp-tag',
      success: false,
      message: `LSP GHL tag error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.uniqueId || !isValidUniqueId(String(body.uniqueId))) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.' },
        { status: 400 }
      );
    }

    const required = [
      'phone',
      'email',
      'loanPurpose',
      'loanAmount',
      'rentOrOwn',
      'timeAtResidency',
      'annualIncome',
      'employmentStatus',
      'addressLine1',
      'city',
      'state',
      'zipCode',
    ];
    const missing = required.filter((f) => !body[f] && body[f] !== 0);
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || '';

    const declineReason = evaluateDecline({
      loanAmount: Number(body.loanAmount) || 0,
      state: String(body.state),
      annualIncome: Number(body.annualIncome) || 0,
    });

    const submission: QualificationSubmission = {
      uniqueId: String(body.uniqueId),
      phone: String(body.phone),
      email: String(body.email),
      loanPurpose: String(body.loanPurpose),
      loanAmount: Number(body.loanAmount) || 0,
      rentOrOwn: String(body.rentOrOwn),
      monthlyRent: Number(body.monthlyRent) || 0,
      timeAtResidency: String(body.timeAtResidency),
      annualIncome: Number(body.annualIncome) || 0,
      employmentStatus: String(body.employmentStatus),
      employerName: String(body.employerName || ''),
      payFrequency: String(body.payFrequency || ''),
      timeEmployed: String(body.timeEmployed || ''),
      addressLine1: String(body.addressLine1),
      addressLine2: String(body.addressLine2 || ''),
      city: String(body.city),
      state: String(body.state),
      zipCode: String(body.zipCode),
      ipAddress,
      result: declineReason ? 'declined' : 'qualified',
      declineReason: declineReason ?? '',
    };

    const routedResults = await routeQualifiedLeadToBackends(submission);
    const lspTagResult = await addLspPurlTag(submission);
    const results = [...routedResults, lspTagResult];
    const anySuccess = results.some((r) => r.success);

    return NextResponse.json(
      {
        success: anySuccess,
        result: submission.result,
        reason: submission.declineReason,
        results,
      },
      { status: anySuccess ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown'}`,
      },
      { status: 500 }
    );
  }
}
