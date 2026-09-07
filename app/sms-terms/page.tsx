'use client';

import Link from 'next/link';
import { ArrowLeft, MessageSquare, Shield } from 'lucide-react';

export default function SmsTermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-af-blue-soft to-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-af-blue hover:text-af-navy transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-af-blue-soft border border-af-blue-ice flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-af-blue" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-af-navy tracking-tight">SMS Terms &amp; Conditions</h1>
            <p className="text-xs text-pv-muted font-medium mt-0.5">Loan Streamline Pro</p>
          </div>
        </div>

        <p className="text-xs text-pv-muted mb-8">Last Updated: September 2026</p>

        <div className="space-y-8 text-sm text-pv-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">1. Program Description</h2>
            <p>When you opt in to SMS communications from Loan Streamline Pro (“LSP,” “we,” “us,” or “our”), you consent to receive recurring text messages at the mobile number you provided. Messages may relate to your inquiry, requested follow-up, appointment reminders, service updates, or customer support.</p>
            <p>Some communications may be generated using automated technology or AI-assisted systems.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">2. Message Frequency</h2>
            <p>Message frequency varies based on your interactions with us.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">3. Message &amp; Data Rates</h2>
            <p>Standard message and data rates may apply depending on your wireless plan. Loan Streamline Pro does not charge for messages sent through the SMS program.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">4. Opt-Out Instructions</h2>
            <p>You may opt out at any time by replying <strong className="text-af-navy font-mono bg-af-blue-soft px-1.5 py-0.5 rounded">STOP</strong> to any message. You will receive a one-time confirmation message and no further SMS messages unless you re-subscribe.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">5. Help &amp; Support</h2>
            <p>Reply <strong className="text-af-navy font-mono bg-af-blue-soft px-1.5 py-0.5 rounded">HELP</strong> for assistance, or contact us:</p>
            <div className="p-4 rounded-xl bg-white border border-af-blue-ice space-y-1 text-xs">
              <p className="font-bold text-af-navy">Loan Streamline Pro</p>
              <p>1712 Pioneer Ave Suite 500, Cheyenne, WY 82001</p>
              <p>Email: <a href="mailto:support@loanstreamlinepro.com" className="text-af-blue underline">support@loanstreamlinepro.com</a></p>
              <p>Phone: <a href="tel:+18332890694" className="text-af-blue underline">(833) 289-0694</a></p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">6. Consent Not Required</h2>
            <p>Consent to receive SMS messages is not a condition of purchase, service, or loan approval. Loan Streamline Pro is not a lender.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">7. Supported Carriers</h2>
            <p>The program is compatible with major U.S. carriers. Carriers are not liable for delayed or undelivered messages.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">8. Mobile Privacy</h2>
            <p>Mobile information, including your mobile phone number and SMS/text-messaging opt-in consent, will not be shared, sold, rented, or transferred to third parties or affiliates for their own marketing or promotional purposes. Mobile information may be disclosed to service providers only as needed to operate the messaging program.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-extrabold text-af-navy">9. Privacy</h2>
            <p>Please review our <Link href="/privacy" className="text-af-blue underline font-semibold">Privacy Policy</Link> for more information about how we collect, use, and protect information.</p>
          </section>

          <div className="mt-10 p-5 rounded-2xl bg-af-blue-soft/80 border border-af-blue-ice flex items-start gap-3">
            <Shield className="w-5 h-5 text-trust-green flex-shrink-0 mt-0.5" />
            <p className="text-xs text-pv-muted leading-relaxed"><strong className="text-af-navy">Your Privacy Matters:</strong> You can opt out of SMS communications at any time by replying STOP.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
