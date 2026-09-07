import React from 'react';
import { Calculator, FileText, Network, Phone, ShieldCheck } from 'lucide-react';

export default function QualificationDisclosures() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 text-sm text-pv-muted leading-relaxed" id="qualification-disclosures">
      <div className="space-y-6 rounded-3xl border border-af-blue-ice bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><ShieldCheck className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Loan Streamline Pro Is Not a Lender</h2>
            <p className="mt-1">Loan Streamline Pro (“LSP”) is a technology service that helps connect consumers with independent Lending Partners. LSP does not originate or fund loans, make credit decisions, set rates or terms, determine eligibility, or guarantee approval.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><Network className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Lending Partner Decisions</h2>
            <p className="mt-1">Any offer, application requirement, credit review, approval decision, rate, fee, repayment term, or other product condition is determined solely by the applicable Lending Partner. Availability varies and is not guaranteed.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><FileText className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Information and Estimates</h2>
            <p className="mt-1">Examples, calculators, projected payments, rate ranges, and savings illustrations shown on this site are informational estimates only. They are not loan offers and do not represent a promise of approval, savings, rate, or terms.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><Calculator className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Calculator Assumptions &amp; Representative Example</h2>
            <p className="mt-1">The calculator may use hypothetical APR assumptions, including 5.99% and 24.9%, solely to illustrate how different interest rates and repayment periods can affect estimated payments and total cost. These figures are not advertised or guaranteed rates, are not a rate quote, and do not indicate that any Lending Partner will offer those rates.</p>
            <p className="mt-2"><strong className="text-af-navy">Representative Example:</strong> For a personal loan of $10,000 with a 36-month term at 10% APR, the monthly payment would be approximately $322.67, and the total amount paid over the life of the loan would be $11,616.12. This example includes interest and assumes no additional fees.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><Phone className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Contact LSP</h2>
            <div className="mt-1 space-y-0.5">
              <p>Loan Streamline Pro</p>
              <p>1712 Pioneer Ave Suite 500, Cheyenne, WY 82001</p>
              <p>
                <a href="tel:+18332890694" className="text-af-blue underline whitespace-nowrap">(833) 289-0694</a>
                <span className="mx-1.5">·</span>
                <a href="mailto:support@loanstreamlinepro.com" className="text-af-blue underline break-all">support@loanstreamlinepro.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
