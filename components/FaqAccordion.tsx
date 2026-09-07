'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is Loan Streamline Pro a lender?',
      category: 'About LSP',
      answer: 'No. Loan Streamline Pro is a technology service that helps connect consumers with independent Lending Partners. LSP does not originate or fund loans, make credit decisions, set rates or terms, or determine eligibility.',
    },
    {
      question: 'What does LSP do with my inquiry?',
      category: 'How It Works',
      answer: 'LSP uses the information you provide to understand your request and may help connect you with independent Lending Partners or service providers that may be relevant to your inquiry.',
    },
    {
      question: 'Does submitting an inquiry guarantee a loan or approval?',
      category: 'Eligibility',
      answer: 'No. Submitting an inquiry to LSP does not guarantee that you will be connected with a Lending Partner, receive an offer, or be approved. Any approval decision and any rates, fees, or terms are determined by the applicable Lending Partner.',
    },
    {
      question: 'Does LSP charge me a fee?',
      category: 'Fees',
      answer: 'Loan Streamline Pro does not charge consumers a fee for using its connection service. Any fees associated with a financial product are determined and disclosed by the applicable Lending Partner.',
    },
    {
      question: 'Who should I contact with a question?',
      category: 'Support',
      answer: 'You can contact Loan Streamline Pro at (833) 289-0694 or support@loanstreamlinepro.com. Questions about a specific lender offer, application, payment, or account should be directed to that Lending Partner.',
    },
  ];

  const toggleFaq = (index: number) => {
    const isOpening = activeIndex !== index;
    setActiveIndex(activeIndex === index ? null : index);
    if (isOpening) analytics.faqItemOpen(faqs[index].question);
  };

  return (
    <section className="py-24 sm:py-32 bg-mesh-hero relative overflow-hidden" id="faq-objection-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20" id="faq-header">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-af-blue-ice shadow-xs mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-af-blue" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-af-navy">Got Questions?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Frequently Asked Questions</h2>
          <p className="text-base sm:text-lg text-pv-muted mt-3 leading-relaxed">Clear answers about Loan Streamline Pro and the Lending Partner connection process.</p>
        </div>

        <div className="space-y-4" id="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div key={idx} className={`rounded-2xl border transition-all duration-200 overflow-hidden card-hover-bar ${isOpen ? 'bg-white border-af-blue/50 shadow-md shadow-af-blue/5 ring-1 ring-af-blue/20' : 'bg-white/80 hover:bg-white border-af-blue-ice shadow-xs'}`} id={`faq-item-${idx}`}>
                <button onClick={() => toggleFaq(idx)} className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none" aria-expanded={isOpen} aria-controls={`faq-answer-${idx}`} id={`faq-trigger-${idx}`}>
                  <div className="pr-4 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-af-blue bg-af-blue-ice px-2 py-0.5 rounded-md">{faq.category}</span>
                    <h3 className="font-bold text-af-navy text-base sm:text-lg tracking-tight pt-1">{faq.question}</h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'bg-af-blue text-white rotate-180' : 'bg-af-blue-soft text-af-navy'}`}><ChevronDown className="w-4 h-4" /></div>
                </button>
                {isOpen && <div id={`faq-answer-${idx}`} className="px-6 sm:px-8 pb-6 pt-1 text-sm text-pv-muted leading-relaxed border-t border-af-blue-ice/60 bg-af-blue-soft/30"><p className="max-w-[75ch]">{faq.answer}</p></div>}
              </div>
            );
          })}
        </div>

        <div className="mt-14 p-6 rounded-2xl bg-white border border-af-blue-ice shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left" id="faq-advisor-cta">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-af-blue-soft text-af-blue flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-af-navy">Have another question?</h4>
              <p className="text-xs text-pv-muted">Speak directly with Loan Streamline Pro.</p>
            </div>
          </div>
          <a href="tel:+18332890694" onClick={() => analytics.faqCallClick()} className="flex-shrink-0 px-5 py-2.5 rounded-full bg-af-navy hover:bg-af-blue text-white font-bold text-xs tracking-wide transition-colors duration-200 flex items-center gap-2">
            <span>Call (833) 289-0694</span><ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
