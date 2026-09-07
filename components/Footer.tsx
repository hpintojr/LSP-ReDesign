'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-af-navy-deep text-white border-t border-white/10 pt-20 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-4 space-y-6">
            <div className="w-full max-w-[430px] h-28 rounded-[2rem] bg-white flex items-center justify-center p-4 shadow-2xl">
              <div className="relative w-full h-full">
                <Image src="/images/lsp-logo.svg" alt="Loan Streamline Pro" fill className="object-contain object-center" priority sizes="430px" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-sm">
              Loan Streamline Pro is a technology service that helps connect consumers with independent Lending Partners. LSP is not a lender and does not make credit decisions, set rates, or determine eligibility.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-trust-green bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
              <span>Technology Service · Not a Lender</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-medium">
              <li><Link href="/" onClick={() => analytics.footerLinkClick('home')} className="hover:text-white hover:underline">Home</Link></li>
              <li><Link href="/#loan-solutions-section" onClick={() => analytics.footerLinkClick('services')} className="hover:text-white hover:underline">Services</Link></li>
              <li><Link href="/#program-process-steps-section" onClick={() => analytics.footerLinkClick('how_it_works')} className="hover:text-white hover:underline">How It Works</Link></li>
              <li><Link href="/blog" onClick={() => analytics.footerLinkClick('blog')} className="hover:text-white hover:underline">Blog &amp; Resources</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-medium">
              <li><Link href="/disclosures" onClick={() => analytics.footerLinkClick('disclosures')} className="hover:text-white hover:underline">Important Disclosures</Link></li>
              <li><Link href="/privacy" onClick={() => analytics.footerLinkClick('privacy_policy')} className="hover:text-white hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use" onClick={() => analytics.footerLinkClick('terms_of_use')} className="hover:text-white hover:underline">Terms of Use</Link></li>
              <li><Link href="/sms-terms" onClick={() => analytics.footerLinkClick('sms_terms')} className="hover:text-white hover:underline">SMS Terms</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-af-red uppercase tracking-wider">Contact &amp; Support</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/80 font-medium">
              <li>
                <a href="tel:+18332890694" onClick={() => analytics.footerCallClick()} className="hover:text-white font-mono font-bold text-base text-white flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-af-red flex items-center justify-center text-white flex-shrink-0"><Phone className="w-4 h-4" /></div>
                  (833) 289-0694
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"><Mail className="w-4 h-4 text-af-blue-light" /></div>
                <a href="mailto:support@loanstreamlinepro.com" onClick={() => analytics.footerEmailClick()} className="hover:text-white">support@loanstreamlinepro.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="w-4 h-4 text-af-blue-light" /></div>
                <span className="leading-relaxed">1712 Pioneer Ave Suite 500<br />Cheyenne, WY 82001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-10 text-[11px] text-white/55 leading-relaxed space-y-4 border-b border-white/10" id="service-disclaimers">
          <p><strong className="text-white/80">Loan Streamline Pro is not a lender.</strong> LSP does not originate or fund loans, make credit decisions, set rates or terms, or determine approval or eligibility. Those decisions are made by the applicable independent Lending Partner.</p>
          <p>Availability, eligibility requirements, rates, fees, and terms vary by Lending Partner and are not guaranteed by LSP.</p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>&copy; {currentYear} Loan Streamline Pro. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white">Terms of Use</Link>
            <Link href="/sms-terms" className="hover:text-white">SMS Terms</Link>
            <Link href="/disclosures" className="hover:text-white">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
