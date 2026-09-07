import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Loan Streamline Pro',
  description: 'Terms of Use for the Loan Streamline Pro website and technology service.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="terms-page-wrapper">
      <Navbar />
      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors bg-white px-3.5 py-1.5 rounded-full border border-af-blue-ice shadow-2xs">
              <ArrowLeft className="w-3.5 h-3.5" /><span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-trust-green-light border border-trust-green/20 mb-4 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-trust-green" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">Website Terms</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Terms of Use</h1>
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">Loan Streamline Pro · Effective September 2026</p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="terms-content">
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. Acceptance of Terms</h2>
              <p>By accessing or using loanstreamlinepro.com (the “Site”), you agree to these Terms of Use. If you do not agree, please do not use the Site.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. About Loan Streamline Pro</h2>
              <p>Loan Streamline Pro (“LSP,” “we,” “us,” or “our”) is a technology service that helps connect consumers with independent Lending Partners. <strong>LSP is not a lender.</strong> LSP does not originate or fund loans, make credit decisions, set rates or terms, determine eligibility, or guarantee approval.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. Lending Partner Relationship</h2>
              <p>If LSP connects you with a Lending Partner, that Lending Partner is solely responsible for its application process, underwriting, approval decisions, rates, fees, terms, disclosures, servicing, and any resulting financial product. You should review the Lending Partner&apos;s terms and privacy policy before proceeding.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. No Guarantee of Offer or Approval</h2>
              <p>Submitting information to LSP is an inquiry, not a guarantee of a loan, approval, offer, rate, or term. Lending Partner availability and requirements vary by consumer, state, and other factors determined by the Lending Partner.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. Accuracy of Information</h2>
              <p>You agree to provide accurate, current, and complete information when using the Site. You are responsible for reviewing information before submitting it.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">6. Communications</h2>
              <p>If you voluntarily consent to phone, email, or SMS communications, LSP may contact you regarding your inquiry, requested follow-up, appointment reminders, or related service communications. Consent is not a condition of purchase, service, or loan approval. For SMS details, review our <Link href="/sms-terms" className="text-af-blue underline font-semibold">SMS Terms</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">7. Website Content</h2>
              <p>Information on the Site is provided for general informational purposes and may include examples or estimates. It is not a promise that any specific product, rate, payment, savings amount, or result will be available to you.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">8. Third-Party Services</h2>
              <p>The Site may link to or interact with third-party websites or services. LSP is not responsible for third-party content, availability, security, privacy practices, or contractual terms.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">9. Contact Information</h2>
              <div className="p-4 rounded-xl bg-white border border-af-blue-ice space-y-1 text-xs">
                <p className="font-bold text-af-navy">Loan Streamline Pro</p>
                <p>1712 Pioneer Ave Suite 500, Cheyenne, WY 82001</p>
                <p>Email: <a href="mailto:support@loanstreamlinepro.com" className="text-af-blue underline">support@loanstreamlinepro.com</a></p>
                <p>Phone: <a href="tel:+18332890694" className="text-af-blue underline">(833) 289-0694</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
