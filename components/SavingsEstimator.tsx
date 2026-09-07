'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface EstimatorState {
  debtAmount: number;
  programTerm: number;
  step: 1 | 2 | 3;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  smsConsent: boolean;
  communicationsConsent: boolean;
}

const statesList = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],['SC','South Carolina'],['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],['UT','Utah'],['VT','Vermont'],['VA','Virginia'],['WA','Washington'],['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
];

export default function SavingsEstimator() {
  const [formData, setFormData] = useState<EstimatorState>({
    debtAmount: 35000,
    programTerm: 36,
    step: 1,
    fullName: '',
    phone: '',
    email: '',
    state: 'CA',
    smsConsent: false,
    communicationsConsent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/generate-quote-id', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setQuoteId(data.quoteId))
      .catch(() => setQuoteId(Date.now() % 1000000));
  }, []);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(value);

  const calcMonthlyPayment = (principal: number, annualRate: number, months: number) => {
    const monthlyRate = annualRate / 12;
    const factor = Math.pow(1 + monthlyRate, months);
    return monthlyRate === 0 ? principal / months : principal * (monthlyRate * factor) / (factor - 1);
  };

  const term = Math.max(12, Math.min(formData.programTerm, 72));
  const illustrativeMonthly = Math.round(calcMonthlyPayment(formData.debtAmount, 0.0599, term));
  const illustrativeTotal = illustrativeMonthly * term;
  const comparisonMonthly = Math.round(calcMonthlyPayment(formData.debtAmount, 0.249, term));
  const comparisonTotal = comparisonMonthly * term;
  const illustrativeDifference = Math.max(0, comparisonTotal - illustrativeTotal);

  const validateContact = () => {
    const next: Record<string, string> = {};
    if (formData.fullName.trim().split(/\s+/).length < 2) next.fullName = 'Please enter your first and last name.';
    if (!/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/.test(formData.phone.trim())) next.phone = 'Please enter a valid 10-digit phone number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) next.email = 'Please enter a valid email address.';
    if (!formData.state) next.state = 'Please select your state.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    analytics.calculatorSubmit({
      amount: formData.debtAmount,
      term,
      monthlyPayment: illustrativeMonthly,
      savings: illustrativeDifference,
    });

    setFormData((prev) => ({ ...prev, step: 3 }));

    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          state: formData.state,
          loanAmount: formData.debtAmount,
          loanTerm: term,
          estimatedMonthlyPayment: illustrativeMonthly,
          estimatedTotalCost: illustrativeTotal,
          unsecuredTotal: comparisonTotal,
          estimatedSavings: illustrativeDifference,
          smsConsent: formData.smsConsent,
          communicationsConsent: formData.communicationsConsent,
          quoteId,
        }),
      });
    } catch {
      console.error('Lead submission failed');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-af-blue-ice shadow-[0_20px_50px_-15px_rgba(29,49,95,0.15)] overflow-hidden" id="savings-estimator-card">
      <div className="bg-gradient-to-r from-af-navy to-af-navy-deep text-white px-6 sm:px-8 py-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md flex-shrink-0">
            <div className="relative w-full h-full"><Image src="/images/lsp-mark.svg" alt="Loan Streamline Pro" fill className="object-contain" sizes="48px" /></div>
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold block leading-tight">Explore Your Options</span>
            <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider mt-0.5">Loan Streamline Pro · Technology Service</span>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-white/90 bg-white/10 px-3 py-1.5 rounded-full">Step {formData.step}/3</span>
      </div>

      {formData.step === 1 && (
        <div className="p-6 sm:p-8 space-y-6" id="estimator-step-1">
          <div>
            <label htmlFor="debt-slider" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">Approximate Unsecured Balance</label>
            <p className="text-xs text-pv-muted mt-1">Use this calculator for an informational illustration only.</p>
          </div>

          <div className="text-center py-5 px-4 bg-af-blue-soft rounded-2xl border border-af-blue-ice">
            <span className="block text-[10px] font-bold text-pv-muted uppercase tracking-widest">Amount</span>
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-af-navy mt-1 block tracking-tight">{formatCurrency(formData.debtAmount)}</span>
          </div>

          <input type="range" id="debt-slider" min="8000" max="100000" step="1000" value={formData.debtAmount} onChange={(e) => {
            const amount = Number(e.target.value);
            setFormData((prev) => ({ ...prev, debtAmount: amount }));
            analytics.calculatorSliderChange(amount);
          }} className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue" />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="term-slider" className="text-xs font-bold text-af-navy uppercase tracking-wider">Illustrative Term</label>
              <span className="text-sm font-extrabold text-af-blue">{term} months</span>
            </div>
            <input type="range" id="term-slider" min="12" max="72" step="1" value={term} onChange={(e) => {
              const nextTerm = Number(e.target.value);
              setFormData((prev) => ({ ...prev, programTerm: nextTerm }));
              analytics.calculatorTermSelect(nextTerm);
            }} className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-af-blue-ice">
              <span className="text-[10px] uppercase tracking-wider font-bold text-pv-muted">Illustrative Payment</span>
              <strong className="block text-xl text-af-navy mt-1">{formatCurrency(illustrativeMonthly)}/mo</strong>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-af-blue-ice">
              <span className="text-[10px] uppercase tracking-wider font-bold text-pv-muted">Illustrative Difference</span>
              <strong className="block text-xl text-trust-green mt-1">{formatCurrency(illustrativeDifference)}</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-af-blue-soft/60 border border-af-blue-ice text-[11px] text-pv-muted leading-relaxed">
            <strong className="text-af-navy">Important:</strong> This calculator uses hypothetical 5.99% and 24.9% APR examples for comparison only. It is not an offer, quote, approval, or promise of savings. Actual availability, rates, fees, and terms are determined by a Lending Partner.
          </div>

          <button type="button" onClick={() => {
            analytics.calculatorStepAdvance(1, 2);
            analytics.calculatorEstimateViewed({ amount: formData.debtAmount, term, monthlyPayment: illustrativeMonthly, savings: illustrativeDifference });
            setFormData((prev) => ({ ...prev, step: 2 }));
          }} className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] text-white font-bold flex items-center justify-center gap-2 shadow-lg">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {formData.step === 2 && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4" id="estimator-step-2">
          <div>
            <h3 className="text-lg font-extrabold text-af-navy">Tell LSP How to Reach You</h3>
            <p className="text-xs text-pv-muted mt-1">LSP is not a lender. Any Lending Partner offer or decision is separate from this inquiry.</p>
          </div>

          <div>
            <input name="fullName" value={formData.fullName} onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))} placeholder="First and last name" className="w-full rounded-xl border border-af-blue-ice px-4 py-3 text-sm outline-none focus:border-af-blue" />
            {errors.fullName && <p className="text-xs text-af-red mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <input name="phone" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone number" inputMode="tel" className="w-full rounded-xl border border-af-blue-ice px-4 py-3 text-sm outline-none focus:border-af-blue" />
            {errors.phone && <p className="text-xs text-af-red mt-1">{errors.phone}</p>}
          </div>
          <div>
            <input name="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email address" type="email" className="w-full rounded-xl border border-af-blue-ice px-4 py-3 text-sm outline-none focus:border-af-blue" />
            {errors.email && <p className="text-xs text-af-red mt-1">{errors.email}</p>}
          </div>
          <div>
            <select name="state" value={formData.state} onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))} className="w-full rounded-xl border border-af-blue-ice px-4 py-3 text-sm outline-none focus:border-af-blue">
              {statesList.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
            {errors.state && <p className="text-xs text-af-red mt-1">{errors.state}</p>}
          </div>

          <label className="flex items-start gap-3 text-[11px] text-pv-muted leading-relaxed">
            <input type="checkbox" checked={formData.smsConsent} onChange={(e) => setFormData((prev) => ({ ...prev, smsConsent: e.target.checked }))} className="mt-0.5" />
            <span>I agree to receive informational text messages from Loan Streamline Pro about my inquiry and requested follow-up. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help. Consent is not a condition of purchase, service, or loan approval. See <Link href="/sms-terms" className="underline">SMS Terms</Link>.</span>
          </label>

          <label className="flex items-start gap-3 text-[11px] text-pv-muted leading-relaxed">
            <input type="checkbox" checked={formData.communicationsConsent} onChange={(e) => setFormData((prev) => ({ ...prev, communicationsConsent: e.target.checked }))} className="mt-0.5" />
            <span>I agree to receive phone calls and emails from Loan Streamline Pro regarding my inquiry, including communications using automated technology where permitted. Consent is not required to submit this inquiry.</span>
          </label>

          <div className="flex gap-3">
            <button type="button" onClick={() => setFormData((prev) => ({ ...prev, step: 1 }))} className="px-5 py-4 rounded-full border border-af-blue-ice text-af-navy font-bold">Back</button>
            <button type="submit" className="flex-1 py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] text-white font-bold flex items-center justify-center gap-2 shadow-lg">Submit Inquiry <ArrowRight className="w-4 h-4" /></button>
          </div>

          <p className="text-[10px] text-pv-muted text-center">By submitting, you acknowledge our <Link href="/privacy" className="underline">Privacy Policy</Link>, <Link href="/terms-of-use" className="underline">Terms of Use</Link>, and <Link href="/disclosures" className="underline">Disclosures</Link>.</p>
        </form>
      )}

      {formData.step === 3 && (
        <div className="p-8 sm:p-10 text-center" id="estimator-step-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-trust-green-light text-trust-green flex items-center justify-center mb-5"><CheckCircle2 className="w-8 h-8" /></div>
          <h3 className="text-2xl font-extrabold text-af-navy">Thanks, {formData.fullName.split(' ')[0] || 'there'}.</h3>
          <p className="text-sm text-pv-muted mt-3 leading-relaxed">Your inquiry has been submitted to Loan Streamline Pro. If additional information is needed, LSP or an applicable Lending Partner may follow up based on the permissions you selected.</p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-af-blue-soft text-af-navy text-xs font-bold"><ShieldCheck className="w-4 h-4 text-trust-green" /> LSP is a technology service, not a lender</div>
          {quoteId !== null && <p className="text-[11px] text-pv-muted mt-4 font-mono">Reference: LSP-{String(quoteId).padStart(6, '0')}</p>}
          <a href="tel:+18332890694" className="mt-6 inline-flex items-center gap-2 text-af-blue font-bold text-sm">Questions? Call (833) 289-0694</a>
        </div>
      )}
    </div>
  );
}
