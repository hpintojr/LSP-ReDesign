'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface EstimatorState {
  debtAmount: number;
  step: 1 | 2 | 3;
  fullName: string;
  phone: string;
  email: string;
  state: string;
  isAgreed: boolean;
  isCreditAgreed: boolean;
  programTerm: number;
}

const statesList = [
  { code: 'CA', name: 'California' },
  { code: 'TX', name: 'Texas' },
  { code: 'NY', name: 'New York' },
  { code: 'FL', name: 'Florida' },
  { code: 'IL', name: 'Illinois' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'OH', name: 'Ohio' },
  { code: 'GA', name: 'Georgia' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'MI', name: 'Michigan' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'UT', name: 'Utah' },
  { code: 'MA', name: 'Massachusetts' },
];

export default function SavingsEstimator() {
  const [formData, setFormData] = useState<EstimatorState>({
    debtAmount: 35000,
    step: 1,
    fullName: '',
    phone: '',
    email: '',
    state: 'CA',
    isAgreed: false,
    isCreditAgreed: false,
    programTerm: 36,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [quoteId, setQuoteId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/generate-quote-id', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setQuoteId(data.quoteId))
      .catch(() => setQuoteId(Date.now() % 1000000));
  }, []);

  const debt = formData.debtAmount;
  const maxTerm = 72;
  const activeTerm = Math.max(12, Math.min(formData.programTerm, maxTerm));

  const calcMonthlyPayment = (principal: number, monthlyRate: number, months: number) => {
    if (monthlyRate === 0) return principal / months;
    const factor = Math.pow(1 + monthlyRate, months);
    return principal * (monthlyRate * factor) / (factor - 1);
  };

  const illustrativeMonthlyRate = 0.0599 / 12;
  const illustrativeMonthly = Math.round(calcMonthlyPayment(debt, illustrativeMonthlyRate, activeTerm));
  const illustrativeTotal = illustrativeMonthly * activeTerm;
  const comparisonMonthlyRate = 0.249 / 12;
  const comparisonMonthly = Math.round(calcMonthlyPayment(debt, comparisonMonthlyRate, activeTerm));
  const comparisonTotal = comparisonMonthly * activeTerm;
  const estimatedSavings = comparisonTotal - illustrativeTotal;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, debtAmount: amount }));
    analytics.calculatorSliderChange(amount);
  };

  const handleTermSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = parseInt(e.target.value, 10);
    setFormData((prev) => ({ ...prev, programTerm: term }));
    analytics.calculatorTermSelect(term);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep2 = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    else if (formData.fullName.trim().split(/\s+/).length < 2) nextErrors.fullName = 'Please enter both your first and last name';

    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formData.phone.trim()) nextErrors.phone = 'Phone Number is required';
    else if (!phoneRegex.test(formData.phone)) nextErrors.phone = 'Please enter a valid 10-digit phone number';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) nextErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email)) nextErrors.email = 'Please enter a valid email address';

    if (!formData.state) nextErrors.state = 'Please select your state';
    if (!formData.isAgreed) nextErrors.isAgreed = 'You must agree to the Communications Terms to proceed';
    if (!formData.isCreditAgreed) nextErrors.isCreditAgreed = 'You must consent to be contacted via call, text, or email to proceed';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNextStep = () => {
    analytics.calculatorStepAdvance(1, 2);
    analytics.calculatorEstimateViewed({
      amount: debt,
      term: activeTerm,
      monthlyPayment: illustrativeMonthly,
      savings: estimatedSavings,
    });
    setFormData((prev) => ({ ...prev, step: 2 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    analytics.calculatorSubmit({
      amount: debt,
      term: activeTerm,
      monthlyPayment: illustrativeMonthly,
      savings: estimatedSavings,
    });
    analytics.calculatorStepAdvance(2, 3);
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
          loanAmount: debt,
          loanTerm: activeTerm,
          estimatedMonthlyPayment: illustrativeMonthly,
          estimatedTotalCost: illustrativeTotal,
          unsecuredTotal: comparisonTotal,
          estimatedSavings,
          smsConsent: formData.isCreditAgreed,
          communicationsConsent: formData.isAgreed,
          quoteId,
          source: 'loanstreamlinepro.com/calculator',
        }),
      });
    } catch {
      console.error('Lead submission failed');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-af-blue-ice shadow-[0_20px_50px_-15px_rgba(29,49,95,0.15)] overflow-hidden" id="savings-estimator-card">
      <div className="bg-gradient-to-r from-af-navy to-af-navy-deep text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-md border border-white/20 flex-shrink-0">
            <div className="relative w-full h-full">
              <Image src="/images/lsp-mark.svg" alt="Loan Streamline Pro" fill className="object-contain" sizes="40px" />
            </div>
          </div>
          <div>
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight block leading-tight">See Which Consolidation Options May Fit Your Situation</span>
            <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wider mt-0.5">Loan Comparison · Lending Partner Options</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 flex-shrink-0 self-center">
          <span className="text-[11px] font-mono font-bold text-white/90 mr-1">Step {formData.step}/3</span>
          {[1, 2, 3].map((step) => (
            <button key={step} type="button" onClick={() => setFormData((prev) => ({ ...prev, step: step as 1 | 2 | 3 }))} className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${formData.step === step ? 'bg-af-blue-cyan w-5' : 'bg-white/40 w-2'}`} aria-label={`Go to step ${step}`} />
          ))}
        </div>
      </div>

      {formData.step === 1 && (
        <div className="p-6 sm:p-8" id="estimator-step-1">
          <div className="space-y-6">
            <div className="text-left">
              <label htmlFor="debt-slider" className="block text-xs font-extrabold text-af-navy uppercase tracking-wider">Select Your Total Unsecured Balance Profile</label>
              <p className="text-xs text-pv-muted mt-1">Include Credit Cards, Personal Loans, Medical Bills &amp; High-Interest Balances</p>
            </div>

            <div className="text-center py-5 px-4 bg-af-blue-soft rounded-2xl border border-af-blue-ice" id="slider-value-display">
              <span className="block text-[10px] font-bold text-pv-muted uppercase tracking-widest">Total Unsecured Balance</span>
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-af-navy mt-1 block tracking-tight">{formatCurrency(debt)}</span>
            </div>

            <div className="relative mt-2" id="slider-range-wrapper">
              <input type="range" id="debt-slider" min="8000" max="100000" step="1000" value={debt} onChange={handleSliderChange} className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50" aria-label="Total unsecured balance amount" />
              <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono"><span>$8,000</span><span>$50,000</span><span>$100,000</span></div>
            </div>

            <div className="p-3.5 rounded-xl border text-xs leading-relaxed text-left flex items-start gap-2.5 bg-white border-af-blue-ice" id="pathway-qualification-indicator">
              <Sparkles className="w-4 h-4 text-af-blue flex-shrink-0 mt-0.5" />
              <p className="text-af-navy font-semibold"><strong className="text-af-blue font-bold">Explore Partner Options:</strong> LSP can use your {formatCurrency(debt)} balance profile to help connect you with independent Lending Partners that may have options to discuss. LSP itself does not determine eligibility or approval.</p>
            </div>

            <div className="space-y-3 pt-2 border-t border-af-blue-ice/60" id="term-slider-wrapper">
              <div className="text-left flex justify-between items-center">
                <div>
                  <label htmlFor="term-slider" className="block text-xs font-bold text-af-navy uppercase tracking-wider">Target Timeframe</label>
                  <p className="text-[11px] text-pv-muted mt-0.5 whitespace-nowrap">Customize the illustrative repayment period (12 to 72 months)</p>
                </div>
                <span className="font-display text-base sm:text-lg font-bold text-af-blue bg-af-blue-ice px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg whitespace-nowrap">{activeTerm} Months</span>
              </div>
              <input type="range" id="term-slider" min="12" max={maxTerm} step="1" value={activeTerm} onChange={handleTermSliderChange} className="w-full h-2.5 bg-af-blue-ice rounded-lg appearance-none cursor-pointer accent-af-blue focus:outline-none focus:ring-2 focus:ring-af-blue/50" aria-label="Target timeframe in months" />
              <div className="flex justify-between text-[11px] font-bold text-pv-muted mt-2 px-0.5 font-mono"><span>12 Months</span><span>42 Months</span><span>72 Months</span></div>
            </div>

            <div className="bg-af-blue-soft/70 rounded-2xl border border-af-blue-ice p-4 sm:p-5 space-y-1" id="live-estimates-panel">
              <div className="flex justify-between items-start text-xs sm:text-sm border-b border-af-blue-ice/60 pb-2">
                <div>
                  <span className="text-af-navy font-bold block">Illustrative High-Interest Balance (24.9% APR)</span>
                  <span className="text-[10px] text-pv-muted font-medium block mt-0.5">{formatCurrency(debt)} over {activeTerm} months</span>
                </div>
                <span className="font-bold text-af-navy font-mono">{formatCurrency(comparisonTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm py-2">
                <span className="text-pv-muted font-medium">Illustrative Principal &amp; Interest Difference</span>
                <span className="font-bold text-trust-green font-mono">{formatCurrency(estimatedSavings)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-af-blue-ice/60" id="new-monthly-payment-estimate">
                <div>
                  <span className="text-xs font-bold text-af-navy uppercase tracking-wider block">Illustrative Monthly Payment</span>
                  <span className="text-[10px] text-pv-muted mt-0.5 block">Example using 5.99% APR · {activeTerm}-month term</span>
                </div>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-af-navy">{formatCurrency(illustrativeMonthly)}<span className="text-xs font-normal text-pv-muted font-mono">/mo</span></span>
              </div>
              <p className="text-[9px] text-pv-muted/80 leading-relaxed pt-2">This calculator is for illustration only and is not a loan offer, approval, rate quote, or guarantee. Actual rates, fees, terms, loan amounts, and eligibility are determined solely by the Lending Partner.</p>
            </div>

            <button onClick={handleNextStep} className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold transition-all duration-200 flex items-center justify-center gap-2 text-base shadow-lg shadow-af-red/25 hover:shadow-xl group active:scale-[0.98]" id="estimator-step1-next-btn">
              <span>Continue</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-pv-muted text-center" id="secure-disclaimer-step1"><ShieldCheck className="w-4 h-4 text-trust-green" /><span>Free calculation · No credit decision by LSP · Lending Partner terms vary</span></div>
          </div>
        </div>
      )}

      {formData.step === 2 && (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" id="estimator-step-2">
          <div className="text-left border-b border-af-blue-ice pb-3">
            <h3 className="text-base sm:text-lg font-bold text-af-navy">Tell Us Where to Send Your LSP Inquiry</h3>
            <p className="text-xs text-pv-muted mt-1">LSP may use your {formatCurrency(debt)} profile to help connect you with independent Lending Partners. LSP is not a lender.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-left space-y-1.5 col-span-2">
              <label htmlFor="fullName" className="block text-xs font-bold text-af-navy uppercase tracking-wider">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Marcus Vance" className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`} />
              {errors.fullName && <p className="text-xs text-af-red flex items-center gap-1 font-medium"><AlertCircle className="w-3.5 h-3.5" />{errors.fullName}</p>}
            </div>

            <div className="text-left space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-bold text-af-navy uppercase tracking-wider">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(555) 000-0000" className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`} />
              {errors.phone && <p className="text-xs text-af-red flex items-center gap-1 font-medium"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
            </div>

            <div className="text-left space-y-1.5">
              <label htmlFor="state" className="block text-xs font-bold text-af-navy uppercase tracking-wider">State of Residence</label>
              <select id="state" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-af-blue-ice focus:border-af-blue text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy">
                {statesList.map((st) => <option key={st.code} value={st.code}>{st.name} ({st.code})</option>)}
              </select>
            </div>

            <div className="text-left space-y-1.5 col-span-2">
              <label htmlFor="email" className="block text-xs font-bold text-af-navy uppercase tracking-wider">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="marcus@example.com" className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-af-red bg-red-50/20' : 'border-af-blue-ice focus:border-af-blue'} text-sm focus:outline-none focus:ring-1 focus:ring-af-blue bg-white text-af-navy`} />
              {errors.email && <p className="text-xs text-af-red flex items-center gap-1 font-medium"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
            </div>
          </div>

          <div className="text-left space-y-3.5 mt-2 p-4 rounded-xl bg-af-blue-soft border border-af-blue-ice">
            <div className="flex items-start gap-2.5">
              <input type="checkbox" id="isAgreed" checked={formData.isAgreed} onChange={(e) => setFormData((prev) => ({ ...prev, isAgreed: e.target.checked }))} className="mt-1 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0" />
              <label htmlFor="isAgreed" className="text-[11px] text-pv-muted leading-relaxed cursor-pointer select-none">I agree to receive marketing and informational text messages (SMS) from Loan Streamline Pro at the number provided, including messages sent using automated or conversational technology. Message frequency varies. Msg &amp; data rates may apply. Reply HELP for help and STOP to cancel. Consent is not a condition of purchase, service, loan approval, or connecting with a Lending Partner. See our <a href="/privacy" className="text-af-blue underline font-semibold">Privacy Policy</a> and <a href="/sms-terms" className="text-af-blue underline font-semibold">SMS Terms</a>.</label>
            </div>
            {errors.isAgreed && <p className="text-xs text-af-red flex items-center gap-1 font-medium pl-6"><AlertCircle className="w-3.5 h-3.5" />{errors.isAgreed}</p>}

            <div className="flex items-start gap-2.5 border-t border-af-blue-ice/60 pt-3">
              <input type="checkbox" id="isCreditAgreed" checked={formData.isCreditAgreed} onChange={(e) => setFormData((prev) => ({ ...prev, isCreditAgreed: e.target.checked }))} className="mt-1 h-4 w-4 rounded border-af-blue-ice text-af-blue focus:ring-af-blue cursor-pointer flex-shrink-0" />
              <label htmlFor="isCreditAgreed" className="text-[11px] text-pv-muted leading-relaxed cursor-pointer select-none">I agree to receive calls and emails from Loan Streamline Pro regarding my inquiry and potential Lending Partner connections. Consent is not a condition of any purchase or financial service.</label>
            </div>
            {errors.isCreditAgreed && <p className="text-xs text-af-red flex items-center gap-1 font-medium pl-6"><AlertCircle className="w-3.5 h-3.5" />{errors.isCreditAgreed}</p>}
          </div>

          <div className="rounded-xl border border-af-blue-ice bg-white p-4 text-[10px] sm:text-[11px] text-pv-muted leading-relaxed" id="calculator-form-disclosure">
            <p><strong className="text-af-navy">Loan Streamline Pro is not a lender.</strong> LSP is a technology service that helps connect consumers with independent Lending Partners. LSP does not make credit decisions, set rates, determine eligibility, originate loans, or guarantee an offer.</p>
            <p className="mt-2"><strong className="text-af-navy">Representative Example:</strong> For a personal loan of $10,000 with a 36-month term at 10% APR, the monthly payment would be approximately $322.67, and the total amount paid over the life of the loan would be $11,616.12. This example includes interest and assumes no additional fees.</p>
          </div>

          <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-af-red to-[#E63935] hover:from-[#C02926] hover:to-af-red text-white font-bold transition-all duration-200 text-center text-base shadow-lg shadow-af-red/25 mt-2 flex items-center justify-center gap-2 active:scale-[0.98]" id="estimator-step2-submit-btn"><span>Submit My Inquiry</span><Check className="w-5 h-5" /></button>
        </form>
      )}

      {formData.step === 3 && (
        <div className="p-6 sm:p-8 space-y-6 text-center" id="estimator-success">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-trust-green-light text-trust-green border border-trust-green/30 rounded-full flex items-center justify-center mb-3 shadow-sm"><CheckCircle2 className="w-7 h-7 stroke-[2.5]" /></div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-af-navy">Inquiry Received!</h3>
            <p className="text-xs sm:text-sm text-pv-muted mt-1 max-w-[36ch] mx-auto">Reference: <span className="font-mono font-bold text-af-blue">LSP-{quoteId !== null ? String(quoteId).padStart(6, '0') : '------'}</span></p>
          </div>

          <div className="text-left space-y-3">
            <h4 className="text-xs font-extrabold text-af-navy uppercase tracking-wider">Your profile may be relevant to options such as:</h4>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 shadow-2xs card-hover-bar">
                <div className="flex items-center gap-2 mb-1"><CreditCard className="w-4 h-4 text-af-blue" /><span className="text-xs font-bold text-af-navy">Consolidation Loan Options</span></div>
                <p className="text-[11px] text-pv-muted leading-tight">Independent Lending Partners may offer fixed-term personal-loan or consolidation options. Actual availability, rates, fees, and terms depend on the Lending Partner.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 shadow-2xs card-hover-bar">
                <div className="flex items-center gap-2 mb-1"><Scale className="w-4 h-4 text-af-navy" /><span className="text-xs font-bold text-af-navy">Other Repayment Paths</span></div>
                <p className="text-[11px] text-pv-muted leading-tight">Depending on your circumstances, other repayment or counseling approaches may also be worth reviewing independently.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-af-blue-ice/80 shadow-2xs card-hover-bar">
                <div className="flex items-center gap-2 mb-1"><Building2 className="w-4 h-4 text-af-blue" /><span className="text-xs font-bold text-af-navy">Lending Partner Network</span></div>
                <p className="text-[11px] text-pv-muted leading-tight">LSP may help connect you with independent Lending Partners. Any formal application and product decision happens directly with the Lending Partner.</p>
              </div>
            </div>
          </div>

          <div className="bg-af-blue-soft/80 border border-af-blue-ice rounded-2xl p-4 text-left space-y-2.5 shadow-xs" id="quote-results-panel">
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2"><span>Client Name:</span><span className="font-bold text-af-navy">{formData.fullName}</span></div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2"><span>Total Balance Evaluated:</span><span className="font-bold text-af-navy font-mono">{formatCurrency(debt)}</span></div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2"><span>Illustrative Total at 5.99% APR:</span><span className="font-bold text-af-navy font-mono">{formatCurrency(illustrativeTotal)}</span></div>
            <div className="flex justify-between items-center text-xs text-pv-muted border-b border-af-blue-ice/60 pb-2"><span>Illustrative Monthly:</span><span className="text-base font-display text-af-blue font-extrabold">{formatCurrency(illustrativeMonthly)}/mo</span></div>
            <div className="flex justify-between items-center pt-1 text-xs font-bold text-trust-green"><span>Illustrative P&amp;I Difference:</span><span className="font-mono">{formatCurrency(estimatedSavings)}</span></div>
            <p className="text-[9px] text-pv-muted leading-relaxed pt-2">Illustrations are not an offer, approval, or rate quote. Actual product decisions and terms are determined solely by the applicable Lending Partner.</p>
          </div>

          <div className="bg-gradient-to-br from-af-navy to-af-navy-deep text-white rounded-2xl p-5 space-y-3 shadow-md" id="success-hotline-prompt">
            <span className="text-xs font-bold text-af-red uppercase tracking-wider block">Want to Speak with LSP?</span>
            <p className="text-xs text-white/80 leading-relaxed max-w-[36ch] mx-auto">Our team can answer questions about the connection process. LSP is not a lender.</p>
            <a href="tel:+18332890694" onClick={() => analytics.calculatorCallClick()} className="w-full py-3.5 bg-white hover:bg-af-blue-ice text-af-navy font-extrabold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm tracking-wide shadow-md" id="success-hotline-btn"><PhoneCall className="w-4 h-4 text-af-red" />Call (833) 289-0694</a>
          </div>
        </div>
      )}
    </div>
  );
}
