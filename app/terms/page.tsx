import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Digital Publishing License',
  description:
    'Terms of service and digital license agreement for publications from The Inner Method.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-obsidian-900 p-8 sm:p-12 rounded-3xl border border-gold-500/30 shadow-2xl border-glow-gold">
        <header className="border-b border-white/10 pb-6 mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-gold-400 font-semibold">
            Legal & Licensing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
            Terms of Service
          </h1>
          <p className="text-xs text-obsidian-400 font-mono mt-1">
            Last updated: October 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-obsidian-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              1. Digital License Grant
            </h2>
            <p>
              When you purchase a digital book, workbook, or bundle from The Inner Method, you are granted a non-exclusive, non-transferable, revocable single-user license to download, read, and print the material for your personal, non-commercial use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              2. Intellectual Property & Copyright
            </h2>
            <p>
              All texts, graphics, book covers, exercises, audio tracks, and framework designs published by The Inner Method are protected by international copyright laws. You may not resell, redistribute, publicly upload to file-sharing networks, or repurpose these materials into derivative commercial products without written authorization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              3. Personal Printing Rights
            </h2>
            <p>
              You are explicitly permitted to print physical copies of the included worksheets, habit grids, and reflection prompts for your personal study and journaling binder.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              4. Informational Purpose (Not Medical Advice)
            </h2>
            <p>
              The publications of The Inner Method explore cognitive psychology, attention design, and behavioral frameworks for educational and self-reflection purposes. They do not constitute formal psychiatric, medical, or clinical therapy advice. If you are experiencing acute clinical distress, please consult a qualified healthcare professional.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-white">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by standard international commercial fair trade principles and local commercial statutes governing digital intellectual property.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
