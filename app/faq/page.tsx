import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Digital Deliveries & Licensing',
  description:
    'Answers to common questions regarding download formats, Kindle compatibility, Gumroad secure checkout, and our 30-day refund policy.',
};

const FAQ_ITEMS = [
  {
    category: 'Orders & Digital Delivery',
    questions: [
      {
        q: 'How do I receive my e-books and workbooks after purchase?',
        a: 'Immediately upon completing checkout via our payment partner Gumroad, you will be redirected to an instant download page. Gumroad will also send an email receipt containing permanent links to your files so you can download them at any time.'
      },
      {
        q: 'What formats are included with each purchase?',
        a: 'Each title includes both a high-resolution interactive PDF (optimized for computers and tablets with fillable form fields) and a cleanly typeset EPUB file (designed for Kindle, Apple Books, and Kobo e-readers). Bundles also include companion MP3 audio tracks and Notion templates.'
      },
      {
        q: 'Can I read these on my Kindle, iPad, or mobile phone?',
        a: 'Yes! The EPUB files can be sent directly to your Kindle via Amazon’s "Send to Kindle" feature or opened in Apple Books with a single tap. The PDFs are also compatible with GoodNotes, Notability, and Remarkable paper tablets.'
      }
    ]
  },
  {
    category: 'Payments & Security',
    questions: [
      {
        q: 'Is checkout secure? How is my payment processed?',
        a: 'All purchases are processed exclusively through Gumroad, a globally accredited digital payments provider using PCI-DSS Level 1 compliance and 256-bit SSL encryption. We never collect, process, or store your credit card numbers or banking passwords on our website.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'Gumroad supports major international credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay, converting currencies automatically at standard bank rates.'
      }
    ]
  },
  {
    category: 'Guarantee & Licensing',
    questions: [
      {
        q: 'What is your refund policy?',
        a: 'We offer a complete 30-day money-back guarantee. If you read the material, test the exercises, and find they do not provide actionable value for your life, simply reply to your Gumroad receipt or email us at support@theinnermethod.com for a 100% prompt refund.'
      },
      {
        q: 'Am I allowed to print the workbooks?',
        a: 'Yes! Your single-user license allows you to print copies of the included worksheets, habit grids, and journals for your personal individual use.'
      },
      {
        q: 'Will I receive updates if a book is revised?',
        a: 'Yes. All purchases come with lifetime digital revisions. Whenever we release updated exercises or expanded editions, you will receive an email notification with free access to the new files.'
      }
    ]
  }
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.flatMap((cat) =>
      cat.questions.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
            <span>Customer Knowledge Base</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base text-obsidian-300 leading-relaxed">
            Everything you need to know about purchasing, file compatibility, digital downloads, and our satisfaction guarantee.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {FAQ_ITEMS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-2">
                {group.category}
              </h2>

              <div className="space-y-4">
                {group.questions.map((faq, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-2 hover:border-gold-500/30 transition-all"
                  >
                    <h3 className="font-serif font-bold text-white text-base sm:text-lg">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-obsidian-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 p-8 rounded-3xl bg-obsidian-900 border border-gold-500/30 text-center space-y-4 border-glow-gold">
          <h3 className="font-serif text-2xl font-bold text-white">
            Have a question not answered here?
          </h3>
          <p className="text-sm text-obsidian-300 max-w-md mx-auto">
            Our editorial and customer support team typically responds to all inquiries within 24 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-xs font-bold hover:brightness-110 transition-all shadow-glow-gold"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Editorial Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
