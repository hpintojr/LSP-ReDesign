# Loan Streamline Pro — Lead Integration Handoff

**Project:** Loan Streamline Pro (LSP) redesign  
**Repository:** `hpintojr/LSP-ReDesign`  
**Purpose:** Owner delivery / Vercel deployment  
**Underlying operation:** Existing ADV company CRM infrastructure

## 1. Architecture

The LSP website is a separate customer-facing brand, but it continues to feed the same underlying ADV systems.

Lead submissions are routed independently to the enabled backends so one backend failure does not intentionally block the others.

```text
LSP form / PURL
      │
      ▼
Next.js API route
      │
      ▼
Backend router
  ├── Salesforce
  ├── GoHighLevel (GHL)
  └── Supabase
```

## 2. Salesforce

Salesforce continues to use the existing ADV Salesforce organization and Connected App.

The integration uses OAuth2 `client_credentials` and reads these server-side environment variables:

```text
SALESFORCE_INSTANCE_URL
SALESFORCE_CLIENT_ID
SALESFORCE_CLIENT_SECRET
```

Main integration file:

```text
lib/backends/salesforce.ts
```

The site obtains a Salesforce access token server-side and creates/updates lead records using the existing mappings. The Salesforce wiring is intentionally preserved because LSP is another ADV brand, not a separate sales operation.

## 3. GoHighLevel (GHL)

The site uses the existing GHL infrastructure and LSP location configuration.

Relevant environment variables:

```text
GHL_API_KEY
GHL_LOCATION_ID
```

Optional webhook variables are also supported:

```text
GHL_WEBHOOK_URL
GHL_QUALIFY_WEBHOOK_URL
```

### LSP identification tag

Every LSP lead/PURL submission that reaches the applicable GHL path should be identifiable with:

```text
sms-web-purl-lsp
```

This replaces the historical website tag `sms-web-purl-aff` for the LSP brand.

For personalized PURL submissions, the LSP tag is added without intentionally replacing existing GHL/ADV status tags such as qualification-state tags.

Main files:

```text
lib/backends/ghl-api.ts
lib/backends/ghl-webhook.ts
app/api/qualify-lead/route.ts
lib/backendcolumns.ts
```

## 4. Supabase

Supabase remains the site's data layer for lead storage and personalized/PURL functionality.

Environment variables:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

`SUPABASE_SERVICE_ROLE_KEY` is server-side only and must never be exposed through a `NEXT_PUBLIC_*` variable or committed to GitHub.

## 5. Environment Setup

The repository intentionally contains placeholders only. Real credentials belong in the owner's hosting environment.

For local development:

1. Copy `.env.example` to `.env.local`.
2. Add the actual credentials.
3. Run `npm install` and `npm run dev`.

For Vercel:

1. Import the owner's copy of the GitHub repository.
2. Add the required variables under **Project Settings → Environment Variables**.
3. Apply the appropriate values to Preview and Production as needed.
4. Redeploy after changing environment variables.

## 6. LSP Form Paths

### Standard website inquiry

The main form posts through the site's standard lead submission route and fans out to the enabled CRM backends.

### Personalized PURL inquiry

The personalized route uses the existing ADV-backed data flow while presenting the Loan Streamline Pro brand publicly. Qualification/status behavior should remain intact, with `sms-web-purl-lsp` added in GHL for brand attribution.

## 7. Customer-Facing Identity

Public-facing brand:

**Loan Streamline Pro (LSP)**

- Phone: **(833) 289-0694**
- Email: **support@loanstreamlinepro.com**
- Address: **1712 Pioneer Ave Suite 500, Cheyenne, WY 82001**

LSP is presented as a technology service connecting consumers with independent Lending Partners. It is not presented as the direct lender.

The old lender-licensing page is intentionally not part of the LSP site.

## 8. Reviews

The LSP review cards are static website content. They do not depend on a live Trustpilot widget, Trustpilot API, or Trustpilot rating feed.

## 9. Delivery Test

Before attaching the production domain, run one controlled test through each important lead path.

Verify:

- Standard LSP form submits successfully.
- Personalized PURL submits successfully.
- GHL receives the contact.
- GHL contact contains `sms-web-purl-lsp`.
- Existing ADV/GHL status tags remain intact where applicable.
- Salesforce receives the expected lead/update.
- Supabase receives or updates the expected record.
- No production secrets are committed to GitHub.

## 10. Important Handoff Note

The owner should copy/transfer this codebase into the owner's GitHub account or organization and connect that repository to the owner's Vercel project. The temporary testing Vercel project used during development is not intended to be the final production ownership boundary.

The final `loanstreamlinepro.com` domain should be attached only after the owner has approved the preview and configured the required production environment variables.
