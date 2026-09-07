import React from 'react';
import { Network, ShieldCheck, FileText, Phone } from 'lucide-react';

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
          <div className="mt-0.5 rounded-xl bg-af-blue-soft p-2 text-af-blue"><Phone className="h-5 w-5" /></div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-af-navy">Contact LSP</h2>
            <p className="mt-1">Loan Streamline Pro · 1712 Pioneer Ave Suite 500, Cheyenne, WY 82001 · <a href="tel:+18332890694" className="text-af-blue underline">(833) 289-0694</a> · <a href="mailto:support@loanstreamlinepro.com" className="text-af-blue underline">support@loanstreamlinepro.com</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
