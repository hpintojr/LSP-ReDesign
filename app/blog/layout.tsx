import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Resources & Blog | Loan Streamline Pro',
  description: 'Educational resources from Loan Streamline Pro about borrowing basics, debt management, credit concepts, and understanding Lending Partner offers.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
