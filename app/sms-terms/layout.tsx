import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Terms & Conditions | Loan Streamline Pro',
  description: 'SMS text messaging terms, opt-out instructions, support information, and mobile privacy disclosures for Loan Streamline Pro.',
};

export default function SmsTermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
