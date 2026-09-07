import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Network, Phone, ShieldCheck } from 'lucide-react';
import QualificationForm from '@/components/QualificationForm';
import { fetchLeadByUniqueId, isValidUniqueId } from '@/lib/qualification';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Complete Your Inquiry | Loan Streamline Pro',
  robots: { index: false, follow: false },
};

export default async function LeadQualificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!isValidUniqueId(id)) notFound();

  const lead = await fetchLeadByUniqueId(id);
  if (!lead) notFound();

  return (
    <main className="min-h-screen bg-mesh-hero">
      <header className="border-b border-pv-line bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-lg px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative h-14 w-56">
              <Image src="/images/lsp-logo.svg" alt="Loan Streamline Pro" fill className="object-contain object-left" priority sizes="224px" />
            </div>
            <a href="tel:+18332890694" className="flex items-center gap-1.5 text-sm font-bold text-af-blue hover:underline">
              <Phone className="h-4 w-4" fill="currentColor" /> (833) 289-0694
            </a>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-pv-muted">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-trust-green" /> Technology Service</span>
            <span className="flex items-center gap-1"><Network className="h-3.5 w-3.5 text-af-blue" /> Independent Lending Partners</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-af-blue" /> LSP Is Not a Lender</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-lg px-4 pt-8 text-center">
        <h1 className="font-display text-3xl font-black text-af-navy">Hi {lead.firstName}, let&apos;s confirm your inquiry.</h1>
        <p className="mt-3 text-pv-muted">Loan Streamline Pro can help you explore possible connections with independent Lending Partners. This is not a loan approval or offer.</p>
      </section>

      <section className="mx-auto max-w-lg px-4 py-8">
        <div className="double-bezel">
          <div className="double-bezel-inner overflow-hidden"><QualificationForm lead={lead} /></div>
        </div>
        <p className="mt-4 text-center text-xs text-pv-muted">LSP does not make credit decisions, set rates or terms, or determine eligibility.</p>
      </section>

      <section className="mx-auto max-w-2xl border-t border-pv-line px-4 py-6 text-[11px] leading-relaxed text-pv-muted">
        <p><strong>Important:</strong> Loan Streamline Pro is a technology service, not a lender. Submitting this inquiry does not guarantee a connection, offer, approval, rate, fee, or term. Any actual financial product and related decisions are provided by the applicable independent Lending Partner.</p>
        <p className="mt-3 font-semibold">
          <Link href="/disclosures" className="text-af-blue underline">Important Disclosures</Link>
          <span className="mx-2 font-normal">&bull;</span>
          <Link href="/privacy" className="text-af-blue underline">Privacy Policy</Link>
          <span className="mx-2 font-normal">&bull;</span>
          <Link href="/terms-of-use" className="text-af-blue underline">Terms of Use</Link>
        </p>
      </section>
    </main>
  );
}
