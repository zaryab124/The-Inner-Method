import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Transparent Data Protection',
  description:
    'Our commitment to privacy: how we collect email addresses with explicit consent, process payments via Paysafe secure payment channel, and respect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-obsidian-900 p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl border-glow-gold">
        <header className="border-b border-white/10 pb-6 mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-gold-400 font-semibold">
            Compliance & Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-obsidian-400 font-mono mt-1">
            Last updated: October 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-obsidian-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              1. Our Core Privacy Philosophy
            </h2>
            <p>
              The Inner Method is an independent digital publishing imprint. We do not sell your personal data, participate in invasive ad retargeting networks, or store sensitive financial details. We collect only the minimum information necessary to deliver your digital books and free guides.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              2. Information We Collect
            </h2>
            <p>
              <strong>Email Address & Name:</strong> When you voluntarily request our free guide (&ldquo;7 Practical Exercises for Better Focus&rdquo;) or subscribe to our weekly journal, we collect your email address and first name with your explicit consent.
            </p>
            <p>
              <strong>Order Data:</strong> When you purchase a digital book, the transaction is processed securely through our <strong>Paysafe</strong> payment channel. Paysafe handles cardholder, prepaid voucher, or digital wallet authorizations under banking-grade security. We retain only your order reference, name, email, and digital fulfillment token to deliver your publications and provide lifetime customer support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              3. Payment Processing & Card Security
            </h2>
            <p>
              We do not store credit card numbers, CVVs, expiration dates, or banking passwords on our servers. All checkout transactions are tokenized under PCI-DSS Level 1 compliant standards and 256-bit TLS encryption via the Paysafe payment network.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              4. Analytics & Tracking
            </h2>
            <p>
              We use lightweight, privacy-focused analytics to measure aggregate website visits and distinguish general visits, email sign-ups, and checkout redirects. We do not track visitors across other third-party websites or build advertising profiles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              5. Unsubscribing & Data Rights
            </h2>
            <p>
              You may unsubscribe from our emails at any time by clicking the &ldquo;Unsubscribe&rdquo; link located at the bottom of every dispatch. You also have the right to request the complete deletion of your subscriber record by emailing <span className="font-mono text-gold-300">support@theinnermethod.com</span>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              6. Contact Us
            </h2>
            <p>
              For any privacy or data inquiries, please reach out to our privacy desk at{' '}
              <span className="font-mono text-gold-300">privacy@theinnermethod.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
