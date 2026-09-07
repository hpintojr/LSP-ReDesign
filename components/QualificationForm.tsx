'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2, Phone, ShieldCheck } from 'lucide-react';
import type { PrefillLead } from '@/lib/qualification';

const CALL_DISPLAY = '(833) 289-0694';
const CALL_TEL = 'tel:+18332890694';

const fmtUSD = (n: number) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(n);

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function QualificationForm({ lead }: { lead: PrefillLead }) {
  const [form, setForm] = useState({
    fullName: `${lead.firstName} ${lead.lastName}`.trim(),
    phone: lead.phone,
    email: lead.email,
    state: lead.state,
    requestedAmount: lead.loanAmount ?? 25000,
    smsConsent: false,
    communicationsConsent: false,
  });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !form.state) {
      setError('Please complete your name, phone, email, and state.');
      return;
    }

    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uniqueId: lead.uniqueId,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          state: form.state,
          loanAmount: Number(form.requestedAmount) || 0,
          smsConsent: form.smsConsent,
          communicationsConsent: form.communicationsConsent,
          source: 'lsp-personalized-inquiry',
        }),
      });

      if (!res.ok) throw new Error('Unable to submit inquiry');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('We could not submit your inquiry right now. Please call LSP at (833) 289-0694.');
    }
  };

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-trust-green-light text-trust-green">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.25em] text-af-blue">Inquiry Received</p>
        <h1 className="mt-3 font-display text-3xl font-black leading-tight text-af-navy sm:text-4xl">Thanks, {lead.firstName}.</h1>
        <p className="mx-auto mt-4 max-w-xl text-pv-muted">Loan Streamline Pro received your inquiry. LSP is a technology service, not a lender. If a connection is appropriate, an independent Lending Partner may provide additional information and determine any actual offer, approval, rate, fee, or term.</p>

        <div className="mx-auto mt-7 max-w-md rounded-2xl border border-af-blue-ice bg-white p-6">
          <p className="text-sm font-bold text-af-navy">Requested amount</p>
          <p className="mt-1 text-4xl font-black text-af-blue">{fmtUSD(Number(form.requestedAmount))}</p>
        </div>

        <a href={CALL_TEL} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-af-blue px-7 py-3.5 font-bold text-white shadow-md">
          <Phone className="h-5 w-5" /> Call LSP — {CALL_DISPLAY}
        </a>
        <p className="mt-5 text-xs text-pv-muted">Questions about a specific financial product should be directed to the applicable Lending Partner.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-af-blue-soft text-af-blue"><ShieldCheck className="h-5 w-5" /></div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-af-blue">Loan Streamline Pro</p>
          <h2 className="font-display text-2xl font-black text-af-navy">Confirm your inquiry details</h2>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-pv-muted">LSP helps connect consumers with independent Lending Partners. This form is an inquiry, not a loan application or approval decision.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-semibold text-pv-muted">Name
          <input value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} className="mt-1 w-full rounded-xl border border-af-blue-ice bg-white px-4 py-3 text-sm text-af-navy outline-none focus:border-af-blue" />
        </label>
        <label className="text-xs font-semibold text-pv-muted">Phone
          <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="mt-1 w-full rounded-xl border border-af-blue-ice bg-white px-4 py-3 text-sm text-af-navy outline-none focus:border-af-blue" />
        </label>
        <label className="text-xs font-semibold text-pv-muted">Email
          <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="mt-1 w-full rounded-xl border border-af-blue-ice bg-white px-4 py-3 text-sm text-af-navy outline-none focus:border-af-blue" />
        </label>
        <label className="text-xs font-semibold text-pv-muted">State
          <input value={form.state} onChange={(e) => setForm((f) => ({ ...f, state: e.target.value.toUpperCase() }))} maxLength={2} className="mt-1 w-full rounded-xl border border-af-blue-ice bg-white px-4 py-3 text-sm text-af-navy outline-none focus:border-af-blue" />
        </label>
      </div>

      <label className="text-xs font-semibold text-pv-muted">Approximate amount you want to explore
        <input type="number" min="0" step="1000" value={form.requestedAmount} onChange={(e) => setForm((f) => ({ ...f, requestedAmount: Number(e.target.value) }))} className="mt-1 w-full rounded-xl border border-af-blue-ice bg-white px-4 py-3 text-sm text-af-navy outline-none focus:border-af-blue" />
      </label>

      <label className="flex items-start gap-3 text-[11px] leading-relaxed text-pv-muted">
        <input type="checkbox" checked={form.smsConsent} onChange={(e) => setForm((f) => ({ ...f, smsConsent: e.target.checked }))} className="mt-0.5" />
        <span>I agree to receive informational text messages from Loan Streamline Pro about my inquiry and requested follow-up. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help. Consent is not a condition of purchase, service, or loan approval. See <Link href="/sms-terms" className="underline">SMS Terms</Link>.</span>
      </label>

      <label className="flex items-start gap-3 text-[11px] leading-relaxed text-pv-muted">
        <input type="checkbox" checked={form.communicationsConsent} onChange={(e) => setForm((f) => ({ ...f, communicationsConsent: e.target.checked }))} className="mt-0.5" />
        <span>I agree to receive calls and emails from Loan Streamline Pro regarding this inquiry, including communications using automated technology where permitted. Consent is not required to submit the inquiry.</span>
      </label>

      {error && <p className="rounded-xl bg-af-red/5 px-4 py-3 text-xs font-semibold text-af-red">{error}</p>}

      <button type="submit" disabled={status === 'submitting'} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-af-red to-[#E63935] py-4 font-display font-bold text-white shadow-lg disabled:opacity-60">
        {status === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : 'Submit My Inquiry'}
      </button>

      <p className="text-center text-[10px] leading-relaxed text-pv-muted">By submitting, you acknowledge our <Link href="/privacy" className="underline">Privacy Policy</Link>, <Link href="/terms-of-use" className="underline">Terms of Use</Link>, and <Link href="/disclosures" className="underline">Important Disclosures</Link>.</p>
    </form>
  );
}
