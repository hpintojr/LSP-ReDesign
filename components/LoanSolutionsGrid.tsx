'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface LoanSolutionsGridProps { onApplyClick?: () => void; }

export default function LoanSolutionsGrid({ onApplyClick }: LoanSolutionsGridProps) {
  const router = useRouter();
  const handleAction = () => {
    if (onApplyClick) onApplyClick();
    else if (typeof window !== 'undefined') {
      const el = document.getElementById('estimator-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else router.push('/#estimator-anchor');
    }
  };

  const solutions = [
    {
      id: 'personal-loans',
      title: 'Personal Loan Options',
      tagline: 'Explore options for a variety of personal needs',
      iconSrc: '/images/personal-loans-icon_DT.png',
      description: 'LSP may help connect you with Lending Partners that offer personal loan products. Availability, rates, fees, and terms vary by partner.',
      features: ['Independent Lending Partners', 'Partner-specific rates and terms', 'Review all disclosures before proceeding'],
    },
    {
      id: 'debt-consolidation',
      title: 'Consolidation Options',
      tagline: 'Explore ways to combine eligible balances',
      iconSrc: '/images/debt-consolidation-icon-DT.png',
      description: 'A Lending Partner may offer products that can be used for consolidation. LSP does not determine whether a consolidation product is right for you.',
      features: ['One place to start your inquiry', 'Lender determines eligibility', 'Terms vary by Lending Partner'],
    },
    {
      id: 'home-improvement',
      title: 'Home Improvement Options',
      tagline: 'Explore financing for projects and repairs',
      iconSrc: '/images/home-improvements-icon_DT.png',
      description: 'LSP can help you explore Lending Partner options that may be used for home improvement expenses, subject to the partner’s requirements.',
      features: ['Simple LSP inquiry', 'Independent partner review', 'No approval guarantee from LSP'],
    },
    {
      id: 'other-needs',
      title: 'Other Financial Needs',
      tagline: 'Tell us what you are trying to accomplish',
      iconSrc: '/images/business-needs-icon_DT.png',
      description: 'If your goal does not fit one of the categories above, LSP can still collect your inquiry and determine whether a relevant connection may be available.',
      features: ['Flexible inquiry categories', 'Clear LSP/partner roles', 'No fee charged by LSP'],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="loan-solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">Explore Lending Partner Options</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">One Streamlined Place to Start</h2>
          <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed max-w-2xl mx-auto">Loan Streamline Pro helps consumers start the conversation and may connect them with independent Lending Partners based on the information provided.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {solutions.map((item) => (
            <div key={item.id} className="group relative p-2 rounded-3xl bg-gradient-to-b from-white to-white/70 backdrop-blur-xl border border-white shadow-[0_12px_35px_-10px_rgba(29,49,95,0.08)] hover:shadow-[0_20px_45px_-12px_rgba(15,117,188,0.18)] transition-all duration-300 hover:-translate-y-1 card-hover-bar">
              <div className="rounded-[1.25rem] bg-white border border-af-blue-ice/80 p-7 sm:p-9 flex flex-col justify-between h-full">
                <div>
                  <div className="relative w-16 h-16 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice p-3 mb-6"><Image src={item.iconSrc} alt="" fill className="object-contain p-2.5" sizes="64px" /></div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-af-navy tracking-tight">{item.title}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-af-blue mt-1">{item.tagline}</p>
                  <p className="text-sm text-pv-muted mt-3.5 leading-relaxed">{item.description}</p>
                  <ul className="space-y-2 my-7">
                    {item.features.map((feat) => <li key={feat} className="flex items-center gap-2.5 text-xs text-pv-text"><CheckCircle2 className="w-4 h-4 text-trust-green flex-shrink-0" /><span className="font-medium">{feat}</span></li>)}
                  </ul>
                </div>
                <div className="pt-4 border-t border-af-blue-ice/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-pv-muted"><ShieldCheck className="w-4 h-4 text-af-blue" /><span>LSP is not a lender</span></div>
                  <button onClick={() => { analytics.loanCardCtaClick(item.title); handleAction(); }} className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white text-xs font-bold transition-all duration-200 shadow-sm">
                    <span>Check Options</span><ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 p-6 rounded-2xl bg-white border border-af-blue-ice shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-af-blue-soft text-af-blue flex items-center justify-center flex-shrink-0"><ShieldCheck className="w-6 h-6" /></div>
            <div><h4 className="text-sm font-bold text-af-navy">Have a question about the LSP process?</h4><p className="text-xs text-pv-muted mt-0.5">Our team can explain what LSP handles and what a Lending Partner handles.</p></div>
          </div>
          <a href="tel:+18332890694" onClick={() => analytics.loanCardCtaClick('call_lsp')} className="flex-shrink-0 px-5 py-3 rounded-full bg-af-red hover:bg-af-red/90 text-white font-bold text-xs tracking-wide transition-colors duration-200 flex items-center gap-2"><span>Call (833) 289-0694</span><ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </section>
  );
}
