'use client';

import { Network, ShieldCheck, BadgeDollarSign } from 'lucide-react';

export default function HeroBadges() {
  return (
    <div className="order-3 lg:order-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-2" id="hero-badges">
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-af-blue-ice shadow-xs">
        <Network className="w-4 h-4 text-af-blue" />
        <span className="text-xs font-extrabold text-af-navy uppercase tracking-wider">Independent Lending Partners</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-af-blue-ice shadow-xs">
        <ShieldCheck className="w-4 h-4 text-trust-green" />
        <span className="text-xs font-extrabold text-af-navy uppercase tracking-wider">LSP Is Not a Lender</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-af-blue-ice shadow-xs">
        <BadgeDollarSign className="w-4 h-4 text-af-red" />
        <span className="text-xs font-extrabold text-af-navy uppercase tracking-wider">No Fee Charged by LSP</span>
      </div>
    </div>
  );
}
