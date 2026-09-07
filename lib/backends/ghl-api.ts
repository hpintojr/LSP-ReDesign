/**
 * GHL Contacts API Backend Adapter
 * Creates a contact via the GHL REST API using mapped field names.
 * 
 * Note: GHL Contacts API has a fixed schema for top-level fields
 * (firstName, lastName, email, phone, etc.) but custom fields use
 * the mapped names from backendcolumns.
 */

import { LeadData, BackendResult } from '../leadTypes';
import { backendConfig } from '../backendconnect';

// GHL's Contacts API (v2021-07-28) create-contact endpoint silently
// drops customFields sent as { key, field_value } -- it only persists
// them when addressed by the field's internal `id` as { id, value }
// (confirmed empirically against the live "Loan Streamline Pro"
// location on 2026-08-27). Field IDs below are from
// GET /locations/{locationId}/customFields for this location.
const GHL_FIELD_IDS: Record<string, string> = {
  loanAmount: 'E9s5MpQeYciZ1frDdhkE',              // contact.loan_amount
  loanTerm: 'xjBHTRXKd5dBU3GVSYBN',                 // contact.loan_term
  estimatedMonthlyPayment: 'zyibQJAqYP8eXYSEjNMH',  // contact.est_monthly_payment
  estimatedTotalCost: '89BhbG9i2aYQPwAFNlBQ',       // contact.est_total_cost
  unsecuredTotal: 'AdL6052E4aeRnDLEClPh',            // contact.debt_amount
  estimatedSavings: 'h7ePzoWXv79zwygTPu1C',          // contact.est_savings
  smsConsent: 'hCssOAa9lGF8HRIM5wwT',                // contact.sms_consent
  communicationsConsent: '5og7dovNie2z1lv7NDwY',     // contact.communications_consent
  quoteId: 'NHiXePNOKnuK4L5pjSQ5',                   // contact.quote_id
  submittedAt: 'LPQPAOBKBZI7JUWACF5D',               // contact.submitted_at
  ipAddress: 'nwSwZl8W0HC50fXqtwxf',                 // contact.ip_address
};

export async function sendToGhlApi(lead: LeadData): Promise<BackendResult> {
  const config = backendConfig.ghlApi;

  const nameParts = lead.fullName.split(' ');
  const firstName = nameParts[0] || lead.fullName;
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build custom fields array using GHL's internal field IDs (see note above)
  const customFieldEntries: [string, unknown][] = [
    [GHL_FIELD_IDS.loanAmount, lead.loanAmount],
    [GHL_FIELD_IDS.loanTerm, lead.loanTerm],
    [GHL_FIELD_IDS.estimatedMonthlyPayment, lead.estimatedMonthlyPayment],
    [GHL_FIELD_IDS.estimatedTotalCost, lead.estimatedTotalCost],
    [GHL_FIELD_IDS.unsecuredTotal, lead.unsecuredTotal],
    [GHL_FIELD_IDS.estimatedSavings, lead.estimatedSavings],
    [GHL_FIELD_IDS.smsConsent, lead.smsConsent ? 'Yes' : 'No'],
    [GHL_FIELD_IDS.communicationsConsent, lead.communicationsConsent ? 'Yes' : 'No'],
    [GHL_FIELD_IDS.quoteId, lead.quoteId],
    [GHL_FIELD_IDS.submittedAt, lead.submittedAt],
    [GHL_FIELD_IDS.ipAddress, lead.ipAddress],
  ];

  const customFields = customFieldEntries
    .filter(([id, value]) => id && value !== undefined && value !== null && value !== '')
    .map(([id, value]) => ({ id, value: String(value) }));

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: lead.email,
        phone: lead.phone,
        state: lead.state,
        source: lead.source,
        locationId: config.locationId,
        customFields,
        tags: ['sms-web-purl-lsp'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return { backend: 'ghl-api', success: false, message: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    return { backend: 'ghl-api', success: true, message: 'Contact created in GHL', data };
  } catch (error) {
    return { backend: 'ghl-api', success: false, message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}
