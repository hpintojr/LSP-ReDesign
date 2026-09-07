# Loan Streamline Pro — Lead Integration Handoff

**Project:** Loan Streamline Pro (LSP) redesign  
**Repository:** `hpintojr/LSP-ReDesign`  
**Purpose:** Website/code handoff to owner for final integration and production deployment  
**Underlying operation:** Existing ADV company CRM infrastructure

## Handoff Scope

This delivery is intended to give the owner a clean, LSP-branded website and the existing integration framework needed to finish production setup.

What has been completed in this handoff:

- Customer-facing Advantage First branding was converted to Loan Streamline Pro.
- The main calculator/original 3-step experience was restored.
- LSP legal/disclosure language, contact information, logo, favicon, reviews, and CTAs were updated.
- The direct-lender licensing page was removed from the LSP brand.
- Existing ADV Salesforce / GHL / Supabase integration code was preserved rather than replaced.
- LSP lead attribution was added in GHL with `sms-web-purl-lsp`.
- The two-domain website/PURL routing model was updated for LSP.
- The customer-facing palette was refined to a fintech blue/navy/cyan system aligned with the LSP logo.
- The mobile hero headline was fixed so the same rotating messaging used on desktop is visible and functional on mobile, including the `Lending Partners` phrase.
- The current branch compiles successfully in Vercel Preview/Production builds.

What is **not** being represented as complete or production-verified:

- Live end-to-end CRM delivery has not been tested as part of this handoff pass.
- Production credentials, permissions, webhook URLs, Salesforce mappings, Supabase RPCs, GHL custom fields, workflows, and automations still need to be validated by the owner.
- The owner is expected to take over and finish the integration work across all platforms before production launch.

## Production Domains

LSP intentionally uses two public domains, following the existing ADV two-domain pattern.

### Main website

`https://loanstreamlinepro.com/`

Used for:

- Main public website
- Calculator / standard inquiry flow
- Blog and resources
- Privacy Policy
- Terms of Use
- SMS Terms
- Important Disclosures
- General support/contact traffic

### Personalized PURL domain

`https://lspoffer.app/{short_code}`

Used for personalized PURL pages only. The current short-code format is five alphanumeric characters, for example:

`https://lspoffer.app/Kx9mQ`

Hostname routing is implemented in:

`proxy.ts`

Expected production behavior:

- `loanstreamlinepro.com` serves the main website.
- `lspoffer.app/{valid-looking-short-code}` serves the personalized PURL route.
- PURL-style paths are not publicly served from `loanstreamlinepro.com`.
- Non-PURL traffic on `lspoffer.app` redirects to the equivalent path on the main domain.
- Example: `lspoffer.app/privacy` redirects to `loanstreamlinepro.com/privacy`.
- Vercel preview URLs remain unrestricted so both the main site and `/[id]` route can be reviewed before DNS cutover.

Both domains should ultimately be attached to the same production Vercel project so the host-routing logic can enforce the split.

## Lead Routing Architecture

The codebase is structured to continue feeding the existing ADV backend systems:

```text
Main LSP form / Personalized PURL
              |
              v
       Next.js API routes
              |
              v
        Backend routing
        /      |       \
       v       v        v
 Salesforce   GHL    Supabase
```

The website rebrand does **not** create a separate CRM stack for LSP.

## Current Backend Configuration in Code

The standard calculator currently has these backend paths configured in `lib/backendconnect.ts`:

- Supabase: enabled
- GHL Contacts API: enabled
- GHL inbound webhook: disabled by default
- Salesforce REST API: enabled

The owner should review these switches before production and enable/disable each path based on the final architecture.

## GoHighLevel (GHL)

### LSP brand attribution

The LSP identification tag is:

`sms-web-purl-lsp`

The standard GHL Contacts API adapter applies this tag when creating a contact.

The personalized PURL flow also adds `sms-web-purl-lsp` separately so existing ADV/GHL status tags are not intentionally replaced.

### Existing GHL assumptions to verify

The current code contains existing LSP GHL location/custom-field configuration inherited from prior development. The standard calculator adapter uses stored GHL custom-field IDs, and the personalized PURL flow uses additional custom-field keys.

The owner should verify before launch:

- Final GHL Location ID
- Private integration/API token permissions
- All custom-field IDs and keys used by the calculator
- All custom-field keys used by the PURL qualification flow
- Whether GHL webhook routing will be used in addition to the Contacts API
- Existing workflow behavior for `qualified`, `declined`, and `sms-web-purl-lsp`
- That additive tag behavior preserves existing ADV synchronization/status tags

Relevant files:

- `lib/backendconnect.ts`
- `lib/backends/ghl-api.ts`
- `lib/backends/ghl-webhook.ts`
- `lib/qualification.ts`
- `app/api/qualify-lead/route.ts`

## Salesforce

Two Salesforce paths exist in the codebase:

1. Standard calculator lead routing through `lib/backends/salesforce.ts`
2. Personalized PURL upsert routing in `lib/qualification.ts`

The standard path is currently configured for Salesforce REST API / OAuth2 client-credentials authentication.

The personalized PURL path currently upserts on the Salesforce external ID field:

`Short_Code__c`

It also contains existing ADV Salesforce custom-field and numeric picklist mappings.

The owner should verify before production:

- Salesforce instance URL
- Connected App/client-credentials configuration
- API permissions
- Lead object field API names
- `Short_Code__c` external-ID behavior
- Custom field mappings
- Numeric picklist mappings used by the PURL flow
- Desired LSP-specific LeadSource/source attribution

**Important existing behavior:** the standard Salesforce adapter still contains the inherited ADV LeadSource value `Website-AFF`. Because the underlying CRM remains ADV, this was not changed automatically. The owner should decide whether production LSP leads should continue using that value or be changed to a dedicated LSP source such as `Website-LSP`, depending on the Salesforce configuration and reporting plan.

## Supabase / PURL Data Layer

Supabase remains the source used for standard lead storage and personalized PURL lookup/update behavior.

The PURL flow expects the existing database-side RPC functions used by the inherited ADV flow, including:

- `get_lead_prefill`
- `update_lead_qualification`

The owner should confirm these functions, permissions/RLS behavior, table structure, short-code generation, and production project configuration before launch.

The PURL lookup code supports a server-side service-role key when required. That credential must remain server-side only.

## Existing Personalized Qualification Logic

The LSP PURL page has been rebranded publicly, but the server-side qualification logic from the existing ADV implementation remains in the code.

Current inherited logic includes:

- Minimum qualifying amount: `$15,000`
- State servicing rules
- Income check
- Internal result values of `qualified` or `declined`
- GHL result tagging using `qualified` / `declined`

The owner should review these rules as business logic before production. They are preserved for continuity and are not being represented as newly approved LSP underwriting or lending criteria. LSP remains a technology service and not the lender.

Relevant file:

`lib/qualification.ts`

## Customer-Facing LSP Identity

- Main domain: **loanstreamlinepro.com**
- PURL domain: **lspoffer.app**
- Phone: **(833) 289-0694**
- Email: **support@loanstreamlinepro.com**
- Address: **1712 Pioneer Ave Suite 500, Cheyenne, WY 82001**

Loan Streamline Pro is presented as a technology service that helps connect consumers with independent Lending Partners. LSP is not presented as the direct lender.

## Visual Brand System

The final customer-facing color direction is intentionally blue-led to align the website with the new LSP logo and create a more fintech/technology-oriented presentation.

Primary palette:

- Deep Navy: `#0F172A`
- Royal Blue: `#2563EB`
- Deep Action Blue: `#1D4ED8`
- Sky/Cyan Accent: `#38BDF8`
- Soft Blue: `#EFF6FF`
- Slate text: `#64748B`
- Success Green: `#16A34A`
- White: `#FFFFFF`

Primary conversion buttons and major accent surfaces now use royal/deep blue instead of the historical red CTA treatment. Red should be reserved for genuine error/warning states rather than normal conversion branding.

Some internal CSS utility/token names still use the historical `af-red` identifier for compatibility with inherited component markup, but those legacy tokens now render as LSP blue. This is intentional and avoids a broad markup rename during handoff.

Main visual-system file:

`app/globals.css`

## Mobile Hero Headline

The LSP hero uses one rotating sequence on both desktop and mobile:

- `personal loan options`
- `consolidation options`
- `Lending Partners`
- `a clearer next step`

Two separate mobile issues were corrected in `components/TypewriterHeader.tsx`:

1. The heading container had been hard-limited to `90px` with `overflow-hidden`, which clipped the rotating second line below the visible area.
2. The accessibility/reduced-motion branch previously froze the first phrase. This can be noticeable on iOS when Reduce Motion is enabled. The current implementation still rotates through all four phrases in reduced-motion mode, but changes the phrase without the character-by-character typing effect.

The final LSP mobile implementation uses a compact responsive minimum height (`104px` at the mobile breakpoint), visible overflow, and an explicit line break. This avoids the large empty gap created by an earlier temporary `178px` mobile minimum height while still leaving enough room for the rotating phrase.

Normal-motion users receive the typewriter effect. Reduced-motion users receive the same rotating message sequence without the typing animation.

### ADV mobile follow-up for owner

This LSP fix also identifies a likely follow-up item in the separate Advantage First (ADV) website. The ADV desktop hero rotates messaging, while the mobile view currently appears static at **“Get the Advantage of financial freedom.”**

That ADV site was not modified as part of this LSP handoff. When the owner continues ADV development (including in a Claude coding session), recommend checking the corresponding ADV hero/typewriter component for:

- A mobile-only static headline branch
- Fixed mobile height or `max-height`
- `overflow-hidden` clipping the animated line
- Breakpoint classes that hide the rotating span below desktop widths
- Animation initialization that is conditionally disabled on mobile
- A `prefers-reduced-motion` / iOS Reduce Motion branch that returns a permanently static first phrase instead of rotating text without animation

The preferred behavior is to let mobile use the same rotating sequence as desktop. If reduced motion is detected, cycle the messages without the typing animation rather than freezing one phrase. `components/TypewriterHeader.tsx` in this repository can be used as a reference pattern.

Test the ADV fix specifically at approximately **375px, 390px, and 430px** viewport widths so the rotating text has enough vertical space without creating a large blank area beneath the headline.

## Calculator / Disclosures

The original calculator experience has been restored, including the debt slider, term slider, illustrative payment comparison, contact step, and result step.

The calculator uses hypothetical comparison assumptions including 5.99% APR and 24.9% APR. These are explicitly disclosed as illustrative assumptions only and are not presented as advertised or guaranteed rates.

The website also includes the approved representative example:

> For a personal loan of $10,000 with a 36-month term at 10% APR, the monthly payment would be approximately $322.67, and the total amount paid over the life of the loan would be $11,616.12. This example includes interest and assumes no additional fees.

## Reviews

LSP review cards are static website content. They do not depend on a live Trustpilot widget, Trustpilot API, or live Trustpilot score.

## Deployment / Environment Handoff

The repository contains an `.env.example` template only. Real production credentials are not intended to be committed to GitHub.

The owner should configure the final production values in the owner's Vercel project and validate each platform connection there.

Expected configuration categories include:

- Supabase
- GoHighLevel
- Salesforce
- Optional GHL webhook routing
- Optional analytics

## Validation Status

Completed during this handoff:

- Customer-facing rebrand review
- Calculator restoration
- Legal/disclosure updates
- CTA cleanup
- Logo/favicon updates
- Fintech blue/navy/cyan visual-system refinement
- Responsive/mobile rotating hero-headline fix
- Main/PURL hostname-routing code update
- Next.js/Vercel production build validation

Not completed during this handoff by design:

- Live end-to-end GHL test
- Live end-to-end Salesforce test
- Live end-to-end Supabase test
- Production webhook/workflow verification
- Final production domain/DNS cutover

Those items are part of the owner's integration/development completion phase.

## Owner Completion Checklist

Before launch, the owner should:

1. Import/place the approved repository in the final GitHub account or organization.
2. Connect the final repository to the owner's Vercel project.
3. Configure all production environment values.
4. Attach both `loanstreamlinepro.com` and `lspoffer.app` to the same Vercel project.
5. Validate the main-domain and PURL-domain routing behavior.
6. Confirm Supabase PURL lookup/update functions and short-code data.
7. Verify all GHL field IDs/keys, tags, workflows, and API permissions.
8. Verify all Salesforce field mappings, LeadSource behavior, external-ID handling, and OAuth permissions.
9. Review the inherited PURL qualification rules and adjust them if needed.
10. Run controlled end-to-end test submissions through both the main calculator and personalized PURL flow.
11. Confirm the test records arrive correctly in every production platform before DNS cutover/launch.
12. Optionally apply the documented mobile rotating-headline fix pattern to the separate ADV site so its mobile hero rotates like its desktop hero.

## Ownership Note

The current GitHub/Vercel environment is a temporary development and delivery environment. The owner is expected to take over the integrations and finish the remaining production development in the owner's systems.
