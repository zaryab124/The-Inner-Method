import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HeartHandshake, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy — 30-Day Happiness Guarantee',
  description:
    'Our 30-day money-back guarantee policy. Read the full details of how we handle refund requests without friction.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-obsidian-900 p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl border-glow-gold">
        <header className="border-b border-white/10 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Customer Peace of Mind</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            30-Day Money-Back Guarantee
          </h1>
          <p className="text-xs text-obsidian-400 font-mono mt-1">
            Last updated: October 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-obsidian-300 leading-relaxed">
          <div className="p-6 rounded-2xl bg-obsidian-850 border border-gold-500/30 text-obsidian-200 space-y-2 border-glow-gold">
            <h3 className="font-serif font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Our Simple Promise</span>
            </h3>
            <p className="text-xs leading-relaxed text-obsidian-300">
              We want you to explore our workbooks with absolute confidence. If you read the material, practice the exercises, and feel that the frameworks did not provide practical value for your daily focus or emotional clarity, you are entitled to a full 100% refund within 30 days of purchase.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-white">
              How to Request a Refund
            </h2>
            <p>
              Requesting a refund is simple and requires no interrogations:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-xs sm:text-sm text-obsidian-300">
              <li>
                <strong>Option A (Fastest):</strong> Visit our{' '}
                <Link href="/support" className="text-gold-400 hover:text-gold-300 underline font-semibold">
                  Customer Support Portal
                </Link>
                , enter your purchase email or order ID, and select &ldquo;30-Day Money-Back Guarantee&rdquo;.
              </li>
              <li>
                <strong>Option B:</strong> Send an email to{' '}
                <span className="font-mono text-gold-300 font-medium">support@theinnermethod.com</span>{' '}
                with your order reference or purchase email address.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              Processing Timelines
            </h2>
            <p>
              Once initiated, refunds are processed immediately on our end. Depending on your financial institution or credit card provider, the funds typically appear back in your account within 3 to 7 business days.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              Digital Files Upon Refund
            </h2>
            <p>
              While we cannot technically un-download a PDF or EPUB file from your device, we operate on mutual honor and trust. If you request a refund, we simply ask that you delete the local copies from your personal devices.
            </p>
          </section>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-obsidian-400">
              Questions regarding an existing order?
            </span>
            <Link
              href="/contact"
              className="text-xs font-semibold text-gold-400 hover:text-gold-300 underline underline-offset-4"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
