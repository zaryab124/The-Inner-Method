import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://theinnermethod.com'),
  title: {
    default: 'The Inner Method — International Digital Publishing Store',
    template: '%s | The Inner Method',
  },
  description:
    'Original cognitive psychology e-books, deep work workbooks, and self-investigation journals for high-leverage thinkers and lifelong learners worldwide.',
  keywords: [
    'psychology ebooks',
    'deep work guide',
    'the focus reset',
    'understand your patterns',
    'cognitive habits',
    'self development workbooks',
    'digital publishing',
  ],
  authors: [{ name: 'The Inner Method Editorial Team' }],
  creator: 'The Inner Method Publishing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theinnermethod.com',
    siteName: 'The Inner Method',
    title: 'The Inner Method — Digital Publishing Store',
    description:
      'Rigorous cognitive psychology e-books, deep work protocols, and emotional pattern workbooks.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Inner Method Publishing Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Inner Method — Digital Publishing Store',
    description:
      'Original cognitive psychology e-books, attention workbooks, and self-investigation journals.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PublishingHouse',
    name: 'The Inner Method',
    url: 'https://theinnermethod.com',
    description:
      'Independent digital publishing store producing original psychology and cognitive performance books and workbooks.',
    publishingPrinciples: 'https://theinnermethod.com/about',
    sameAs: [],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth theme-obsidian`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-obsidian-950 text-obsidian-100 font-sans selection:bg-gold-500 selection:text-obsidian-950">
        <AnalyticsTracker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
