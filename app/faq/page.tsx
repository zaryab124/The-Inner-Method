import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ — The Study Abroad Playbook | Dr. Karan Gupta',
  description:
    'Frequently asked questions regarding The Study Abroad Playbook, digital delivery, university audit toolkits, Paysafe checkout, and our 30-day guarantee.',
};

const FAQ_ITEMS = [
  {
    category: 'The Playbook & Admissions Content',
    questions: [
      {
        q: 'Why should I buy this playbook when university information is free online?',
        a: 'As Dr. Gupta states in Chapter 7: information is free; you are paying for judgment. Free advice from social media influencers and college agents is heavily biased by recruitment commissions. This playbook provides unbiased operational filters (The 5 Removals Test, The MATCH Strategy, and Audited Outcome Analysis) developed across 30 years of counseling 100,000+ students to Harvard, Stanford, and Oxford.'
      },
      {
        q: 'Is this publication suitable for both undergraduate and master’s applicants?',
        a: 'Yes. The frameworks cover school-leavers mapping bachelor’s degrees (including the UK-to-US hybrid hack that saves ₹1.5 Crores), postgraduate applicants navigating STEM OPT extensions, and a dedicated chapter on the "30+ Executive Pivot Playbook" for experienced professionals.'
      },
      {
        q: 'Does the playbook cover low-budget and zero-debt options?',
        a: 'Absolutely. Chapters 3 and 11 detail 100% tuition-paid Teaching & Research Assistantships (TA/RA), need-based Ivy League grants, cosigner-free global loans (Prodigy Finance & MPOWER), and when a candidate should choose Indian premier institutions like ISB over mid-tier foreign schools.'
      }
    ]
  },
  {
    category: 'Orders & Digital Delivery',
    questions: [
      {
        q: 'How do I receive my book after purchase?',
        a: 'Immediately upon completing your payment via our secure Paysafe channel (Cards, paysafecard, Skrill, Apple/Google Pay), you are directed to the instant download screen and receive an email with your permanent file download link. You can also re-download anytime via our Order Vault at /support.'
      },
      {
        q: 'Can I read the playbook on my phone, iPad, or Kindle?',
        a: 'Yes! The high-resolution PDF is formatted to standard Letter full-bleed specifications, making it effortless to read on laptops, tablets, iPads, or smartphones. You also receive direct access to our interactive 3D web flipbook reader.'
      },
      {
        q: 'Can I print the included worksheets and audit checklists?',
        a: 'Yes. All included frameworks—including the Five Removals Diagnostic and the MATCH Framework checklist—are optimized for high-resolution home and office printing for personal use.'
      }
    ]
  },
  {
    category: 'Payments, Security & Guarantee',
    questions: [
      {
        q: 'Is my payment secure? Do you store my credit card data?',
        a: 'All transactions are processed through our private Paysafe payment channel, a globally accredited payments infrastructure with PCI-DSS Level 1 compliance and 256-bit TLS encryption. We never handle, see, or store card numbers, CVVs, or banking passwords on our servers.'
      },
      {
        q: 'What is your 30-day refund policy?',
        a: 'We offer an unconditional 30-day money-back guarantee. If you study the frameworks and do not feel they provided immense clarity for your foreign education strategy, simply submit a request through our Support Portal or email support@theinnermethod.com for a full, prompt refund.'
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
            <span>Admissions Knowledge Base</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Frequently Asked Questions
          </h1>

          <p className="text-base text-obsidian-300 leading-relaxed">
            Everything you need to know about The Study Abroad Playbook, instant PDF downloads, formats, security, and our money-back guarantee.
          </p>
        </div>

        {/* FAQ Groups */}
        <div className="space-y-12">
          {FAQ_ITEMS.map((group, gIdx) => (
            <div key={gIdx} className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-white pb-3 border-b border-white/10 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-xs font-mono text-gold-400 font-normal">
                  0{gIdx + 1}
                </span>
              </h2>

              <div className="space-y-4">
                {group.questions.map((item, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-3 hover:border-gold-500/30 transition-all shadow-soft"
                  >
                    <h3 className="font-serif font-bold text-white text-lg">
                      {item.q}
                    </h3>
                    <p className="text-sm text-obsidian-300 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-16 p-8 rounded-3xl bg-obsidian-900 border border-gold-500/30 text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-white">
            Have a question not addressed here?
          </h3>
          <p className="text-xs sm:text-sm text-obsidian-300 max-w-lg mx-auto">
            Our editorial and support team is on standby to assist you with order inquiries or file delivery questions.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs hover:brightness-110 transition-all shadow-glow-gold"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Admissions Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
