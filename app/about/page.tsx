import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Our Publishing Standards & Mission',
  description:
    'Learn about The Inner Method, our cognitive psychology publishing standards, and our mission to provide accessible, rigorous self-development tools to readers worldwide.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Monogram Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            <span>Publishing Manifesto</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Publishing for the Quietly Ambitious.
          </h1>

          <p className="text-base sm:text-lg text-gold-200/80 leading-relaxed font-serif italic">
            &ldquo;We do not need more breathless motivation. We need calm, rigorous systems to understand our minds and protect our focus.&rdquo;
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-obsidian-900 rounded-3xl border border-gold-500/30 p-8 sm:p-12 shadow-2xl space-y-8 text-obsidian-200 text-sm sm:text-base leading-relaxed border-glow-gold">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              The Origin of The Inner Method
            </h2>
            <p>
              The Inner Method began with a simple observation: modern digital culture has weaponized novelty against human consciousness. Every day, knowledge workers, creators, and students sit down intending to do meaningful work, only to find their attentional bandwidth fractured by continuous partial attention and algorithmic dopamine triggers.
            </p>
            <p>
              When people struggle to focus or find themselves trapped in recurring emotional loops, mainstream advice usually offers one of two extremes: toxic hustle culture that demands brutal willpower, or superficial affirmations that ignore human neurobiology.
            </p>
            <p>
              We founded <strong className="text-gold-300">The Inner Method</strong> as an independent publishing imprint to offer a third way: calm, science-grounded frameworks that respect both autonomic nervous system physiology and executive cognitive architecture.
            </p>
          </section>

          <div className="w-full h-px bg-white/10" />

          {/* Our 4 Editorial Commitments */}
          <section className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              Our 4 Editorial Commitments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  01 · Biological Grounding
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  Physiology Before Logic
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  We recognize that a dysregulated nervous system cannot sustain rational focus. Every workbook integrates somatic settling and nervous system pacing.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  02 · Zero Filler
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  Concise, High-Leverage Depth
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  We reject the standard publishing convention of padding a 30-page insight into 300 pages of repetition. Our editions are dense, actionable, and respect your time.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  03 · Practical Implementation
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  Workbooks, Not Just Theories
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Every book includes fillable worksheets, daily tracking architecture, reflection prompts, and audio guidance so ideas become actual habits.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  04 · Global Accessibility
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  International Digital Distribution
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Operating with a digital-first publishing model, we distribute directly to readers in 140+ countries without prohibitive shipping costs or international import tariffs.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-white/10" />

          {/* Operational Transparency & Technology */}
          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Technology & Secure Distribution
            </h3>
            <p>
              Operating an independent publishing house across borders requires complete trust and transparency. To guarantee bank-grade security for our international readers, all transactions and digital fulfillment are hosted via <strong className="text-gold-300">Gumroad</strong>.
            </p>
            <p>
              This ensures that your sensitive payment information is never stored or processed on our private servers, while providing instantaneous file delivery and a transparent 30-day money-back guarantee.
            </p>
          </section>

          {/* Next steps CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-white">
                Ready to explore the library?
              </h4>
              <p className="text-xs text-obsidian-400">
                Inspect our digital editions in full 3D with interactive page turns.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-xs font-bold hover:brightness-110 transition-all shadow-glow-gold"
            >
              <span>Browse All Books</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
