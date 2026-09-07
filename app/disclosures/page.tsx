import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import QualificationDisclosures from '@/components/QualificationDisclosures';

export const metadata: Metadata = {
  title: 'Important Disclosures | Loan Streamline Pro',
  robots: { index: false, follow: false },
};

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-pv-bg">
      <header className="border-b border-pv-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <Image src="/images/lsp-logo.svg" alt="Loan Streamline Pro" width={260} height={48} className="h-12 w-auto" priority />
          <Link href="/" className="text-sm font-semibold text-af-blue hover:underline">loanstreamlinepro.com</Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pt-8">
        <h1 className="font-display text-2xl font-black text-af-navy">Important Disclosures</h1>
        <p className="mt-2 text-sm text-pv-muted">
          These disclosures explain the role of Loan Streamline Pro and independent Lending Partners. See also our{' '}
          <Link href="/privacy" className="underline">Privacy Policy</Link>{' '}and{' '}
          <Link href="/terms-of-use" className="underline">Terms of Use</Link>.
        </p>
      </div>

      <QualificationDisclosures />
    </main>
  );
}
