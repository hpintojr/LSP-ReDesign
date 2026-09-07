'use client';

import React from 'react';
import { Zap, Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function BenefitChecklist() {
  const benefits: BenefitItem[] = [
    {
      id: 'simple-inquiry',
      title: 'Simple Online Inquiry',
      description: 'Share a few details so LSP can better understand what you are looking for.',
      icon: <Zap className="w-4 h-4 text-af-blue" />,
    },
    {
      id: 'partner-network',
      title: 'Independent Lending Partners',
      description: 'LSP may help connect you with independent Lending Partners that offer financial solutions.',
      icon: <Network className="w-4 h-4 text-af-blue" />,
    },
    {
      id: 'clear-roles',
      title: 'Clear Roles',
      description: 'LSP handles the connection experience; the Lending Partner handles any application, approval, rate, fee, and term.',
      icon: <CheckCircle2 className="w-4 h-4 text-trust-green" />,
    },
    {
      id: 'no-lsp-fee',
      title: 'No Fee Charged by LSP',
      description: 'Loan Streamline Pro does not charge consumers a fee for using its connection service.',
      icon: <ShieldCheck className="w-4 h-4 text-af-red" />,
    },
  ];

  return (
    <div className="mt-1 space-y-4" id="benefit-checklist-wrapper">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-extrabold tracking-wider text-pv-muted uppercase">The Loan Streamline Pro Difference</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-af-blue-ice to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5" id="benefit-grid-2col">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="group p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 hover:border-af-blue/40 shadow-[0_2px_10px_-2px_rgba(29,49,95,0.04)] hover:shadow-[0_8px_20px_-4px_rgba(15,117,188,0.12)] transition-all duration-200 hover:-translate-y-0.5 card-hover-bar" id={`benefit-item-${benefit.id}`}>
              <div className="flex gap-3 items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center group-hover:bg-af-blue-ice group-hover:scale-105 transition-all">{benefit.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-af-navy leading-tight">{benefit.title}</h4>
                  <p className="text-xs text-pv-muted mt-1 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
