import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Loan Streamline Pro',
  description: 'Loan Streamline Pro privacy policy and SMS privacy disclosures.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pv-bg" id="privacy-page-wrapper">
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
              <Lock className="w-3.5 h-3.5 text-trust-green" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-trust-green">Privacy &amp; Data Security</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-af-navy tracking-tight leading-tight">Privacy Policy</h1>
            <p className="text-xs sm:text-sm text-pv-muted mt-3 font-semibold">Loan Streamline Pro · Effective September 2026</p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-af-blue-ice shadow-sm space-y-10 text-sm text-pv-muted leading-relaxed" id="privacy-content">
            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">1. About Loan Streamline Pro</h2>
              <p>Loan Streamline Pro (“LSP,” “we,” “us,” or “our”) is a technology service that helps connect consumers with independent Lending Partners. LSP is not a lender and does not make credit decisions, set rates or terms, or determine eligibility.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">2. Information We Collect</h2>
              <p>We may collect information you provide through the website or by communicating with us, such as your name, email address, telephone number, state, general financial goals or requested amount, and other information needed to respond to your inquiry. We may also collect technical information such as IP address, browser type, device information, referring pages, and website activity.</p>
              <p>Please do not send sensitive account credentials through general website forms. When additional sensitive information is required for an application, it may be collected directly by the applicable Lending Partner under that partner&apos;s own privacy practices.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">3. How We Use Information</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Respond to inquiries and provide customer support.</li>
                <li>Help facilitate connections with independent Lending Partners or service providers.</li>
                <li>Operate, secure, troubleshoot, and improve our website and services.</li>
                <li>Send communications you have requested or consented to receive.</li>
                <li>Comply with legal obligations and protect against fraud or misuse.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">4. Information Sharing</h2>
              <p>We may share inquiry information with independent Lending Partners or service providers when needed to respond to your request, operate the website, deliver communications, maintain security, or comply with law. Each Lending Partner is responsible for its own privacy practices and any information it collects directly from you.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">5. SMS and Mobile Information</h2>
              <p>If you opt in to text messages, message frequency varies and message/data rates may apply. Reply <strong>STOP</strong> to opt out or <strong>HELP</strong> for assistance.</p>
              <div className="p-4 rounded-2xl bg-af-blue-soft/60 border border-af-blue-ice space-y-2 text-xs">
                <p><strong>Mobile privacy:</strong> Mobile information, including your mobile number and SMS opt-in consent, will not be sold or shared with third parties or affiliates for their own marketing or promotional purposes. It may be disclosed to service providers only as needed to operate the messaging program.</p>
                <p><strong>Support:</strong> <a href="mailto:support@loanstreamlinepro.com" className="text-af-blue underline">support@loanstreamlinepro.com</a> · <a href="tel:+18332890694" className="text-af-blue underline">(833) 289-0694</a></p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">6. Cookies and Analytics</h2>
              <p>We may use cookies and similar technologies to operate the site, understand usage, improve performance, and measure marketing activity. Browser settings may allow you to limit or block certain cookies.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">7. Privacy Rights</h2>
              <p>Depending on where you live, you may have rights to request access to, correction of, or deletion of certain personal information, subject to applicable exceptions. To submit a privacy request, contact us using the information below.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-extrabold text-af-navy">8. Contact Information</h2>
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
