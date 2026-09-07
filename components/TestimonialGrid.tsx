import React from 'react';
import { CheckCircle2, MessagesSquare, Network, ShieldCheck } from 'lucide-react';

const points = [
  {
    icon: <MessagesSquare className="w-6 h-6" />,
    title: 'Clear From the Start',
    text: 'Loan Streamline Pro explains what information LSP handles and what is handled directly by a Lending Partner, so the roles stay clear.',
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: 'Independent Lending Partners',
    text: 'LSP is a technology service that helps connect consumers with independent Lending Partners that may offer financial solutions.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'No Lending Decisions by LSP',
    text: 'LSP does not approve applications, make credit decisions, set rates or terms, or determine whether you qualify for a loan.',
  },
];

export default function TestimonialGrid() {
  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden" id="consumer-clarity-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-trust-green" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">Built for Clarity</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">
            Know Who Does What
          </h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 max-w-2xl mx-auto leading-relaxed">
            LSP helps simplify the connection process while keeping the Lending Partner responsible for the actual loan decision and terms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point) => (
            <div key={point.title} className="p-2 rounded-3xl bg-gradient-to-b from-af-blue-soft to-white border border-af-blue-ice shadow-[0_10px_30px_-10px_rgba(29,49,95,0.06)]">
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-8 h-full">
                <div className="w-12 h-12 rounded-2xl bg-af-blue-soft text-af-blue flex items-center justify-center mb-5">{point.icon}</div>
                <h3 className="text-lg font-extrabold text-af-navy mb-2">{point.title}</h3>
                <p className="text-sm text-pv-muted leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
