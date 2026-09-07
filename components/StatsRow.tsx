'use client';

import React from 'react';
import { Network, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';

export default function StatsRow() {
  const stats = [
    {
      id: 'stat-role',
      icon: <ShieldCheck className="w-5 h-5 text-af-blue" />,
      value: 'Not a Lender',
      prefix: 'LSP Role',
      label: 'Technology Service',
      description: 'Loan Streamline Pro helps consumers start an inquiry and explore possible Lending Partner connections.',
      badge: 'Clear Roles',
      badgeColor: 'bg-af-blue-ice text-af-blue',
    },
    {
      id: 'stat-network',
      icon: <Network className="w-5 h-5 text-trust-green" />,
      value: 'Independent',
      prefix: 'Connection To',
      label: 'Lending Partners',
      description: 'Any actual product availability, approval, rate, fee, or term is determined by the applicable Lending Partner.',
      badge: 'Partner Decisions',
      badgeColor: 'bg-trust-green-light text-trust-green',
    },
    {
      id: 'stat-fee',
      icon: <CheckCircle2 className="w-5 h-5 text-af-red" />,
      value: '$0',
      prefix: 'Fee Charged by LSP',
      label: 'Consumer Connection Service',
      description: 'Loan Streamline Pro does not charge consumers a fee for using its connection service.',
      badge: 'No LSP Fee',
      badgeColor: 'bg-af-red-light text-af-red',
    },
    {
      id: 'stat-support',
      icon: <PhoneCall className="w-5 h-5 text-af-blue-cyan" />,
      value: '(833) 289-0694',
      prefix: 'Questions?',
      label: 'LSP Support',
      description: 'Contact Loan Streamline Pro for questions about the inquiry and connection process.',
      badge: 'Talk to LSP',
      badgeColor: 'bg-af-blue-ice text-af-blue-light',
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="metrics-stat-section">
      <div className="p-2 sm:p-3 rounded-3xl bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_-15px_rgba(29,49,95,0.12)] card-hover-bar">
        <div className="rounded-2xl bg-white border border-af-blue-ice/80 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-af-blue-ice">
            {stats.map((stat, idx) => (
              <div key={stat.id} className={`flex flex-col justify-between lg:px-4 ${idx > 0 ? 'pt-6 sm:pt-0' : ''}`} id={`metric-col-${stat.id}`}>
                <div>
                  <div className="flex items-center justify-between lg:justify-start gap-2 lg:gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center shadow-sm">{stat.icon}</div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${stat.badgeColor}`}>{stat.badge}</span>
                  </div>
                  <span className="block text-[11px] font-bold text-pv-muted uppercase tracking-wider">{stat.prefix}</span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight block mt-1">{stat.value}</span>
                  <h3 className="text-xs font-bold text-af-blue uppercase tracking-wide pt-1">{stat.label}</h3>
                </div>
                <p className="text-xs text-pv-muted mt-3 leading-relaxed border-t border-af-blue-ice/60 pt-3">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
