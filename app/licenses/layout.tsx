import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service & Lending Partner Disclosures | Loan Streamline Pro',
  description: 'Understand the role of Loan Streamline Pro and the independent Lending Partners that may provide financial products.',
};

export default function LicensesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
