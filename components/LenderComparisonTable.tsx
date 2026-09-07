'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Building2, CheckCircle2, Network, ShieldCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LenderComparisonTableProps { onApplyClick?: () => void; }

export default function LenderComparisonTable({ onApplyClick }: LenderComparisonTableProps) {
  const router = useRouter();
  const handleAction = () => {
    if (onApplyClick) onApplyClick();
    else if (typeof window !== 'undefined') {
      const el = document.getElementById('estimator-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else router.push('/#estimator-anchor');
    }
  };

  const comparisonItems = [
    {
      label: 'Product availability',
      lsp: 'Helps facilitate a connection',
      partner: 'Determined by the Lending Partner',
    },
    {
      label: 'Application & credit review',
      lsp: 'Does not make the credit decision',
      partner: 'Handled by the Lending Partner',
    },
    {
      label: 'Rates, fees & terms',
      lsp: 'Does not set them',
      partner: 'Disclosed by the Lending Partner',
    },
    {
      label: 'Approval & eligibility',
      lsp: 'Does not approve or guarantee',
      partner: 'Determined by the Lending Partner',
    },
    {
      label: 'Final agreement',
      lsp: 'Not the lender contract',
      partner: 'Between you and the Lending Partner',
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-mesh-hero border-y border-af-blue-ice relative overflow-hidden" id="lender-comparison-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-af-blue-soft border border-af-blue-ice mb-4">
            <Network className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">LSP + Lending Partners</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Understand the Difference Before You Proceed</h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">Loan Streamline Pro makes the connection process easier. The independent Lending Partner is responsible for the actual financial product and lending decision.</p>
        </div>

        <div className="double-bezel max-w-5xl mx-auto">
          <div className="double-bezel-inner p-4 sm:p-8">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-af-blue-ice text-[11px] font-extrabold text-pv-muted uppercase tracking-wider">
                    <th className="pb-4 pl-4">Area</th>
                    <th className="pb-4">Loan Streamline Pro</th>
                    <th className="pb-4 pr-4">Independent Lending Partner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-af-blue-ice/60">
                  {comparisonItems.map((item) => (
                    <tr key={item.label} className="hover:bg-af-blue-soft/50 transition-colors">
                      <td className="py-5 pl-4 font-bold text-af-navy">{item.label}</td>
                      <td className="py-5 text-sm text-pv-muted"><span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-af-blue" />{item.lsp}</span></td>
                      <td className="py-5 pr-4 text-sm text-pv-text"><span className="inline-flex items-center gap-2"><Building2 className="w-4 h-4 text-trust-green" />{item.partner}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {comparisonItems.map((item) => (
                <div key={item.label} className="p-4 rounded-2xl bg-af-blue-soft/50 border border-af-blue-ice">
                  <h3 className="font-bold text-af-navy">{item.label}</h3>
                  <p className="text-xs text-pv-muted mt-2"><strong className="text-af-blue">LSP:</strong> {item.lsp}</p>
                  <p className="text-xs text-pv-muted mt-1"><strong className="text-trust-green">Lending Partner:</strong> {item.partner}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-af-blue-ice flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-pv-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-trust-green flex-shrink-0" />
                <span>Review the applicable Lending Partner&apos;s disclosures, privacy policy, rates, fees, and terms before accepting any product.</span>
              </div>
              <button onClick={() => { analytics.lenderUnlockAllClick(); handleAction(); }} className="font-bold text-af-blue hover:text-af-navy flex items-center gap-1 underline underline-offset-4 flex-shrink-0">
                <span>Start an LSP Inquiry</span><ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
