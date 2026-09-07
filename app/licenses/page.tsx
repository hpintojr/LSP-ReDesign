'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ShieldCheck, Network, Building2, Phone, Mail, MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function LicensesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="licenses-page-wrapper">
      <Navbar />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" onClick={() => analytics.navbarLinkClick('licenses_back_home')} className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors bg-white px-3.5 py-1.5 rounded-full border border-af-blue-ice shadow-2xs">
              <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-trust-green" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-trust-green">Service &amp; Partner Disclosures</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Understanding LSP&apos;s Role</h1>
            <p className="text-base sm:text-lg text-pv-muted mt-4 leading-relaxed">Loan Streamline Pro is a technology service, not a lender. Independent Lending Partners are responsible for their own licensing, availability, approval decisions, disclosures, rates, fees, and terms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-3xl bg-white border border-af-blue-ice shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-af-blue-soft text-af-blue flex items-center justify-center mb-4"><Building2 className="w-6 h-6" /></div>
              <h2 className="text-lg font-extrabold text-af-navy">Loan Streamline Pro</h2>
              <p className="text-sm text-pv-muted mt-2 leading-relaxed">LSP provides technology and connection services. LSP does not originate, fund, underwrite, or service loans.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-af-blue-ice shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-af-blue-soft text-af-blue flex items-center justify-center mb-4"><Network className="w-6 h-6" /></div>
              <h2 className="text-lg font-extrabold text-af-navy">Lending Partners</h2>
              <p className="text-sm text-pv-muted mt-2 leading-relaxed">Any Lending Partner you choose to work with is responsible for its own product availability, licensing, application process, credit review, approval, and contractual terms.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-af-blue-ice shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-af-blue-soft text-af-blue flex items-center justify-center mb-4"><CheckCircle2 className="w-6 h-6" /></div>
              <h2 className="text-lg font-extrabold text-af-navy">Verify Before Proceeding</h2>
              <p className="text-sm text-pv-muted mt-2 leading-relaxed">Consumers should review a Lending Partner&apos;s disclosures, privacy policy, licenses, rates, fees, and agreement before accepting any financial product.</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-af-blue-ice shadow-sm">
            <h2 className="text-xl font-extrabold text-af-navy mb-5">Loan Streamline Pro Contact Information</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-pv-muted">
              <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-af-blue mt-0.5" /><span>1712 Pioneer Ave Suite 500<br />Cheyenne, WY 82001</span></div>
              <a href="tel:+18332890694" className="flex items-center gap-3 text-af-blue font-semibold"><Phone className="w-5 h-5" />(833) 289-0694</a>
              <a href="mailto:support@loanstreamlinepro.com" className="flex items-center gap-3 text-af-blue font-semibold"><Mail className="w-5 h-5" />support@loanstreamlinepro.com</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
