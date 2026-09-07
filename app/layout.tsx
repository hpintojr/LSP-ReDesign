import type {Metadata} from 'next';
import {Source_Sans_3, Lato} from 'next/font/google';
import PostHogProvider from '@/components/PostHogProvider';
import './globals.css';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-source-sans',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Loan Streamline Pro | Explore Lending Partner Options',
  description: 'Loan Streamline Pro is a technology service that helps consumers connect with independent Lending Partners. LSP is not a lender and does not make credit decisions, set rates, or determine eligibility.',
  icons: {
    icon: [
      { url: '/images/lsp-mark.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/images/lsp-mark.svg',
    apple: '/images/lsp-mark.svg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lato.variable}`}>
      <body className="bg-pv-bg text-pv-text font-body antialiased selection:bg-af-blue/20 selection:text-af-navy" suppressHydrationWarning>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
