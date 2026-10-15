import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { CurrencyProvider } from '@/lib/currency';

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
  metadataBase: new URL('https://thestudyabroadplaybook.com'),
  title: {
    default: 'The Study Abroad Playbook — Dr. Karan Gupta | Avoid the 1-Crore Debt Trap',
    template: '%s | The Study Abroad Playbook',
  },
  description:
    'How to Win the Global Education Game, Secure High-Paying Careers & Avoid the 1-Crore Debt Trap. Strategic masterclass frameworks from Harvard Business School alumnus Dr. Karan Gupta & Raj Shamani.',
  keywords: [
    'The Study Abroad Playbook',
    'Dr Karan Gupta',
    'Raj Shamani study abroad',
    'how to study abroad from India',
    'avoid 1 crore debt trap',
    'study abroad scholarships',
    'the five removals test',
    'STEM OPT jobs',
    'GCC reverse brain drain',
  ],
  authors: [{ name: 'Dr. Karan Gupta' }, { name: 'Raj Shamani' }],
  creator: 'The Study Abroad Playbook Publishing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thestudyabroadplaybook.com',
    siteName: 'The Study Abroad Playbook',
    title: 'The Study Abroad Playbook — Dr. Karan Gupta',
    description:
      'How to Win the Global Education Game, Secure High-Paying Careers & Avoid the 1-Crore Debt Trap.',
    images: [
      {
        url: '/study_abroad_cover.png',
        width: 1200,
        height: 630,
        alt: 'The Study Abroad Playbook Book Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Study Abroad Playbook — Dr. Karan Gupta',
    description:
      'How to Win the Global Education Game, Secure High-Paying Careers & Avoid the 1-Crore Debt Trap.',
    images: ['/study_abroad_cover.png'],
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
        <CurrencyProvider>
          <AnalyticsTracker />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
