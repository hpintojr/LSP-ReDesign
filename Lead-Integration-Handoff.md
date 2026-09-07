# Loan Streamline Pro — Lead Integration Handoff

**Project:** Loan Streamline Pro (LSP) redesign  
**Repository:** `hpintojr/LSP-ReDesign`  
**Purpose:** Owner delivery / Vercel deployment  
**Underlying operation:** Existing ADV company CRM infrastructure

## Architecture

Loan Streamline Pro is a separate customer-facing brand that continues to use the existing ADV Salesforce, GoHighLevel, and Supabase infrastructure.

```text
LSP website / personalized PURL
              |
              v
       Next.js API routes
              |
              v
      Backend routing
       |      |      |
       v      v      v
   Salesforce GHL  Supabase
```

The existing CRM wiring is intentionally preserved for the LSP brand.

## Production Domains

LSP uses two public domains, matching the existing two-domain ADV pattern.

### Main website

`https://loanstreamlinepro.com/`

Used for the public website, calculator, standard inquiry flow, blog/resources, legal pages, and general support traffic.

### Personalized PURL domain

`https://lspoffer.app/{short_code}`

Used only for personalized PURL landing pages. The current short-code format is five alphanumeric characters, for example `https://lspoffer.app/Kx9mQ`.

Hostname routing is implemented in `proxy.ts`.

Expected behavior:

- `loanstreamlinepro.com` serves the main website.
- `lspoffer.app/{valid-looking-short-code}` serves the personalized PURL route.
- Direct PURL-style paths on `loanstreamlinepro.com` redirect to the main LSP homepage.
- Non-PURL traffic on `lspoffer.app` redirects to the equivalent path on `loanstreamlinepro.com`.
- Example: `lspoffer.app/privacy` redirects to `loanstreamlinepro.com/privacy`.
- Vercel preview domains remain unrestricted so the main site and `/[id]` route can both be reviewed during testing.

Both production domains should be connected to the same final Vercel project so hostname routing can enforce this separation.

## GHL Identification

LSP lead and PURL submissions use the GHL identification tag:

`sms-web-purl-lsp`

For personalized PURL submissions, the LSP tag is added without intentionally replacing existing ADV/GHL status tags.

Relevant integration files include:

- `lib/backends/ghl-api.ts`
- `lib/backends/ghl-webhook.ts`
- `app/api/qualify-lead/route.ts`
- `lib/backendcolumns.ts`

## Personalized PURL Flow

The personalized route uses the existing ADV-backed data flow while presenting Loan Streamline Pro publicly. The public entry point is intended to be:

`https://lspoffer.app/{short_code}`

The main LSP domain is not intended to serve personalized PURL URLs publicly.

## Public LSP Identity

- Main domain: **loanstreamlinepro.com**
- PURL domain: **lspoffer.app**
- Phone: **(833) 289-0694**
- Email: **support@loanstreamlinepro.com**
- Address: **1712 Pioneer Ave Suite 500, Cheyenne, WY 82001**

Loan Streamline Pro is presented as a technology service that helps connect consumers with independent Lending Partners. LSP is not presented as the direct lender.

The former direct-lender licensing page is intentionally excluded from the LSP site.

## Reviews

The LSP customer-review cards are static website content. They do not depend on a live Trustpilot widget, API, or rating feed.

## Delivery Validation

This handoff pass includes code, branding, hostname-routing, and Vercel build validation. A live end-to-end CRM test record is **not being created as part of this handoff pass by request**.

Before final DNS cutover, the owner should confirm:

- The production Vercel build is successful.
- `loanstreamlinepro.com` loads the main website.
- `lspoffer.app/{short_code}` loads the personalized route.
- Legal/support paths entered on `lspoffer.app` redirect to the equivalent main-domain path.
- PURL-style paths are not publicly served from `loanstreamlinepro.com`.
- Required deployment configuration is present in the owner's Vercel project.
- No private credentials are committed to GitHub.

A controlled CRM submission can be performed later by the owner after the final deployment configuration is installed, if desired.

## Ownership Handoff

The current development GitHub/Vercel setup is a temporary testing and delivery environment. The owner should place the approved code in the owner's repository, connect it to the owner's Vercel project, configure the final deployment settings, and then attach both production domains.
