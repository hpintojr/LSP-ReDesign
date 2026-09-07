'use client';

import React from 'react';
import { ShieldCheck, Lock, Network, CheckCircle2 } from 'lucide-react';

export default function TrustBar() {
  const trustFeatures = [
    {
      icon: <Network className="w-5 h-5 text-af-blue-light" />,
      title: 'Independent Lending Partners',
      desc: 'LSP helps connect consumers with independent Lending Partners.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-trust-green" />,
      title: 'LSP Is Not a Lender',
      desc: 'LSP does not make credit decisions, set rates, or determine eligibility.',
    },
    {
      icon: <Lock className="w-5 h-5 text-af-red" />,
      title: 'Secure Online Experience',
      desc: 'Information submitted through the site is transmitted through secure web technology.',
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-af-blue-light" />,
      title: 'No Fee Charged by LSP',
      desc: 'Loan Streamline Pro does not charge consumers a fee for its connection service.',
    },
  ];

  return (
    <section className="bg-af-navy text-white py-16 relative overflow-hidden" id="compliance-trust-bar">
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 mb-12 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div>
            <span className="block text-sm font-extrabold text-white">Loan Streamline Pro</span>
            <span className="block text-xs text-white/65 mt-0.5">Technology service connecting consumers with independent Lending Partners</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-white/90 bg-white/10 px-4 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-trust-green" />
            <span>Clear Roles · Clear Disclosures</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="compliance-badges-grid">
          {trustFeatures.map((tf) => (
            <div key={tf.title} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3.5 border border-white/10">{tf.icon}</div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide leading-tight">{tf.title}</h4>
              <p className="text-xs text-white/70 mt-1.5 leading-relaxed">{tf.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-[11px] text-white/50 max-w-3xl mx-auto leading-relaxed border-t border-white/10 pt-6">
          Any approval, rate, fee, term, or eligibility decision is made by the applicable Lending Partner, not by Loan Streamline Pro.
        </div>
      </div>
    </section>
  );
}
