/**
 * POST /api/submit-lead
 * Routes Loan Streamline Pro inquiry data to all enabled backends.
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadData, SubmitResponse } from '@/lib/leadTypes';
import { routeLeadToBackends } from '@/lib/backends';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || '';

    const required = ['fullName', 'phone', 'email', 'state', 'loanAmount'];
    const missing = required.filter((field) => !body[field] && body[field] !== 0);

    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    const lead: LeadData = {
      fullName: body.fullName,
      phone: body.phone,
      email: body.email,
      state: body.state,
      loanAmount: Number(body.loanAmount),
      loanTerm: Number(body.loanTerm) || 0,
      estimatedMonthlyPayment: Number(body.estimatedMonthlyPayment) || 0,
      estimatedTotalCost: Number(body.estimatedTotalCost) || 0,
      unsecuredTotal: Number(body.unsecuredTotal) || 0,
      estimatedSavings: Number(body.estimatedSavings) || 0,
      smsConsent: Boolean(body.smsConsent),
      communicationsConsent: Boolean(body.communicationsConsent),
      quoteId: Number(body.quoteId) || 0,
      submittedAt: new Date().toISOString(),
      source: typeof body.source === 'string' && body.source.trim()
        ? body.source.trim()
        : 'loanstreamlinepro.com/inquiry',
      ipAddress,
    };

    const results = await routeLeadToBackends(lead);
    const anySuccess = results.some((r) => r.success);

    const response: SubmitResponse = {
      success: anySuccess,
      results,
      quoteId: lead.quoteId,
    };

    return NextResponse.json(response, { status: anySuccess ? 200 : 502 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Server error: ${error instanceof Error ? error.message : 'Unknown'}` },
      { status: 500 }
    );
  }
}
