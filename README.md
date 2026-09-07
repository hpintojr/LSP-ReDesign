# Loan Streamline Pro — Website & Backend Configuration

This repository powers the redesigned **Loan Streamline Pro (LSP)** website.

## Brand & Service Model

Loan Streamline Pro is a **technology service that helps consumers connect with independent Lending Partners**. LSP is not a lender and does not originate or fund loans, make credit decisions, set rates or terms, determine eligibility, or guarantee approval.

Primary public contact information:

- **Phone:** (833) 289-0694
- **Email:** support@loanstreamlinepro.com
- **Address:** 1712 Pioneer Ave Suite 500, Cheyenne, WY 82001

## Application Architecture

The site is a Next.js application with a multi-backend lead-routing layer.

```text
Website inquiry / newsletter form
              │
              ▼
       Next.js API route
              │
              ▼
     Backend orchestrator
       ├── Supabase
       ├── GHL Webhook
       ├── GHL API
       └── Salesforce
```

Key files:

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Main LSP website |
| `components/SavingsEstimator.tsx` | LSP informational calculator + inquiry form |
| `components/QualificationForm.tsx` | Personalized LSP inquiry flow |
| `app/api/submit-lead/route.ts` | Lead submission endpoint |
| `app/api/generate-quote-id/route.ts` | Generates `LSP-######` references |
| `lib/backendconnect.ts` | Backend connection configuration |
| `lib/backendcolumns.ts` | Backend field mappings |
| `lib/backends/index.ts` | Backend routing orchestrator |
| `data/blogPosts.ts` | LSP educational resource library |

## Run Locally

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

For a production-style compile check:

```bash
npm run build
```

For linting:

```bash
npm run lint
```

## Environment & Security

Do not commit production credentials, tokens, API keys, database passwords, service-role keys, or webhook secrets to the repository. Use environment variables for production secrets.

Typical integrations may require values for services such as:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
GHL_WEBHOOK_URL=
GHL_API_KEY=
GHL_LOCATION_ID=
SALESFORCE_OID=
```

Exact variable names should match the implementation in `lib/backendconnect.ts` and the API adapters.

## Lead References

Public inquiry references use the LSP prefix:

```text
LSP-000001
LSP-000002
LSP-000003
```

The counter can use Supabase when configured, with a server-side fallback for development/testing.

## Consent & Legal Pages

The site includes dedicated routes for:

- `/privacy` — Privacy Policy
- `/terms-of-use` — Terms of Use
- `/sms-terms` — SMS Terms & Conditions
- `/disclosures` — Important Disclosures
- `/licenses` — Service & Lending Partner Disclosures

The website should consistently distinguish between **Loan Streamline Pro** and any **independent Lending Partner**. Do not add lender licensing, NMLS credentials, approval promises, guaranteed rates, or partner-specific claims to LSP unless they have been independently verified as applicable to LSP.

## Deployment Notes

Before production deployment:

1. Run `npm run build`.
2. Confirm all environment variables are present in the deployment environment.
3. Test the homepage inquiry form and personalized inquiry flow.
4. Verify the (833) 289-0694 phone links.
5. Verify `support@loanstreamlinepro.com` mail links.
6. Review privacy, SMS, consent, and Lending Partner disclosures with appropriate compliance/legal counsel.

## Internal Styling Note

Some CSS/Tailwind design-token names still use the historical `af-*` prefix. Those are internal implementation names only and are not public-facing Advantage First branding. They can be renamed separately later if desired, but changing them is not required for the customer-facing LSP rebrand.
