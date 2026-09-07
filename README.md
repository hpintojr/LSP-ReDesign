# Loan Streamline Pro — Website & Backend Configuration

This repository contains the redesigned **Loan Streamline Pro (LSP)** website prepared for handoff to the site owner.

For the detailed developer/integration handoff, see:

`Lead-Integration-Handoff.md`

## Brand & Service Model

Loan Streamline Pro is a **technology service that helps consumers connect with independent Lending Partners**. LSP is not a lender and does not originate or fund loans, make credit decisions, set rates or terms, determine eligibility, or guarantee approval.

Primary public contact information:

- **Phone:** (833) 289-0694
- **Email:** support@loanstreamlinepro.com
- **Address:** 1712 Pioneer Ave Suite 500, Cheyenne, WY 82001

## Handoff Boundary

This repository is being delivered as the **website/rebrand codebase plus the existing ADV integration framework**.

The website code, branding, calculator, disclosures, PURL routing, and integration hooks have been prepared for handoff. The owner is expected to take over the connected platforms and complete the final production integration work in the owner's environment.

This handoff does **not** claim that GHL, Salesforce, Supabase, workflows, webhooks, field mappings, or production credentials have been fully end-to-end verified for the owner's final deployment.

The owner should use `Lead-Integration-Handoff.md` as the technical checklist for completing and validating those systems.

## Production Domain Model

The final deployment intentionally uses two public domains:

- **Main site:** `https://loanstreamlinepro.com/`
- **Personalized PURL site:** `https://lspoffer.app/{short_code}`

Both domains should be attached to the same final Vercel project. Hostname routing is handled by `proxy.ts`.

Expected behavior:

- `loanstreamlinepro.com` serves the main public website.
- `lspoffer.app/{short_code}` serves personalized PURL pages.
- PURL-style paths are not publicly served from the main domain.
- Non-PURL traffic on `lspoffer.app` redirects to the equivalent path on `loanstreamlinepro.com`.
- Vercel preview URLs remain unrestricted for testing both the homepage and `/[id]` route.

## Ownership / CRM Relationship

LSP is another brand of the same underlying ADV company operation. The website is LSP-branded on the customer-facing side while continuing to use the existing ADV CRM infrastructure for Salesforce, GoHighLevel (GHL), and Supabase.

Do not replace or disconnect the ADV CRM wiring during deployment unless the owner intentionally changes the backend architecture.

## Current Testing vs. Final Ownership

The current GitHub/Vercel setup is a **temporary development and delivery environment** used to test the redesign before handoff. It is not intended to be the owner's final production ownership boundary.

For final delivery, the owner should place the approved code in the owner's GitHub account or organization, connect that repository to the owner's Vercel account, configure the final deployment settings and platform integrations, run end-to-end production tests, and then attach both production domains.

## Application Architecture

The site is a Next.js application with a multi-backend lead-routing layer.

```text
Website lead / PURL submission
            |
            v
     Next.js API route
            |
            v
    Backend orchestrator
      |        |        |
      v        v        v
  Supabase    GHL   Salesforce
```

Key files:

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Main LSP website |
| `app/[id]/page.tsx` | Personalized PURL page |
| `proxy.ts` | Main-domain vs. PURL-domain hostname routing |
| `components/SavingsEstimator.tsx` | Main LSP calculator/inquiry form |
| `components/QualificationForm.tsx` | Personalized LSP PURL inquiry flow |
| `app/api/submit-lead/route.ts` | Standard lead submission endpoint |
| `app/api/qualify-lead/route.ts` | Personalized PURL submission endpoint |
| `app/api/generate-quote-id/route.ts` | Generates `LSP-######` references |
| `lib/backendconnect.ts` | Backend connection configuration |
| `lib/backendcolumns.ts` | Backend field mappings |
| `lib/backends/index.ts` | Backend routing orchestrator |
| `lib/qualification.ts` | PURL lookup, inherited qualification rules, and PURL backend routing |
| `Lead-Integration-Handoff.md` | Detailed owner integration notes and completion checklist |

## GHL Lead Identification

LSP lead and PURL submissions are identified in GoHighLevel with:

```text
sms-web-purl-lsp
```

The tag is applied without intentionally replacing existing ADV/GHL status tags on personalized PURL records.

The owner should verify all final GHL field IDs/keys, location configuration, workflows, and API permissions before launch.

## Run Locally

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Production-style compile check:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

The package name is `loan-streamline-pro`.

## Environment Variables

Copy `.env.example` to `.env.local` for local development. For Vercel, add the values under **Project Settings → Environment Variables**.

Current integrations use or may use:

```bash
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GHL_API_KEY=
GHL_LOCATION_ID=
GHL_WEBHOOK_URL=
GHL_QUALIFY_WEBHOOK_URL=

SALESFORCE_INSTANCE_URL=
SALESFORCE_CLIENT_ID=
SALESFORCE_CLIENT_SECRET=
SALESFORCE_OID=
```

Never commit real credentials, API tokens, client secrets, database service-role keys, or production webhook secrets to GitHub.

## Owner Vercel Deployment

Recommended handoff process:

1. Transfer/copy the repository into the owner's GitHub account or organization.
2. Import that GitHub repository into the owner's Vercel account.
3. Framework should auto-detect as **Next.js**.
4. Add the required environment variables from `.env.example`.
5. Deploy a Preview build first.
6. Review the homepage, calculator, legal pages, and `/[id]` PURL flow.
7. Complete and validate the GHL, Salesforce, and Supabase integrations in the owner's environment.
8. Run controlled end-to-end test submissions through both the main calculator and PURL flow.
9. Attach both `loanstreamlinepro.com` and `lspoffer.app` to the same Vercel project.
10. Complete DNS cutover only after the owner approves the site and integrations.

No custom Vercel build command is required; the standard Next.js build is used.

## Lead References

Public inquiry references use the LSP prefix:

```text
LSP-000001
LSP-000002
LSP-000003
```

## Customer-Facing Branding

The active customer-facing identity is Loan Streamline Pro. The repository includes:

- `public/images/lsp-logo.svg` — primary wordmark with slogan
- `public/images/lsp-mark.svg` — compact mark
- `app/icon.svg` — browser/app icon

Legacy Advantage First corporate logo assets have been removed from the LSP rebrand.

## Reviews

Customer review cards on the LSP site are static website content. They are not connected to a live Trustpilot widget, Trustpilot API, or Trustpilot score feed.

## Legal / Disclosure Routes

The main site includes:

- `/privacy` — Privacy Policy
- `/terms-of-use` — Terms of Use
- `/sms-terms` — SMS Terms & Conditions
- `/disclosures` — Important Disclosures

The former direct-lender licensing route has intentionally been removed from the LSP brand.

The website should consistently distinguish Loan Streamline Pro from any independent Lending Partner. Customer-facing lender licensing, NMLS credentials, guaranteed approvals, guaranteed rates, or lender-specific claims should not be added to LSP unless separately verified and approved.

## Calculator / Representative Examples

The calculator uses illustrative comparison assumptions and is not presented as a rate quote, approval, or loan offer. Actual rates, fees, loan amounts, terms, eligibility, and credit decisions are determined by the applicable Lending Partner.

The form/footer also includes the approved representative example for a hypothetical $10,000 personal loan over 36 months at 10% APR. Numeric examples are informational illustrations only and should not be presented as guaranteed or currently available LSP rates.

## Final Delivery Checklist

Before handing production control to the owner:

- Vercel Preview build is `READY`.
- Homepage, mobile navigation, calculator, PURL flow, footer, legal pages, logo and favicon have been visually reviewed.
- Main-domain and PURL-domain routing code is configured as documented.
- The owner has the detailed integration handoff and knows which platform items still require validation.
- No private credentials are committed to GitHub.

Before production launch, the **owner** is responsible for:

- Final Vercel/environment configuration.
- Final GHL/Salesforce/Supabase integration work.
- End-to-end testing of both lead paths.
- Production domain attachment and DNS cutover.

## Internal Styling Note

Some CSS/Tailwind token names retain the historical `af-*` prefix. These are internal implementation identifiers only and are not customer-facing Advantage First branding. Renaming them is not required for delivery.
