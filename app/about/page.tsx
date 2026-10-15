import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Dr. Karan Gupta & The Study Abroad Playbook Mission',
  description:
    'Learn about Dr. Karan Gupta (Harvard Business School alumnus), our 30-year counseling track record, and our mission to help students win the global education game and avoid the 1-Crore debt trap.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Monogram Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>Admissions Counsel & Publishing Mission</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Protecting Families from the 1-Crore Debt Trap.
          </h1>

          <p className="text-base sm:text-lg text-gold-200/80 leading-relaxed font-serif italic">
            &ldquo;If you are going to take a heavy loan, sell your mother’s jewelry, or mortgage your family home for an average degree at an unknown university—do not go abroad. We will find you something in India.&rdquo;
          </p>
          <span className="text-xs font-bold text-[#E63946] tracking-wider uppercase">— DR. KARAN GUPTA</span>
        </div>

        {/* Story Section */}
        <div className="bg-obsidian-900 rounded-3xl border border-gold-500/30 p-8 sm:p-12 shadow-2xl space-y-8 text-obsidian-200 text-sm sm:text-base leading-relaxed border-glow-gold">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              The Authority Behind The Playbook
            </h2>
            <p>
              <strong className="text-white">Dr. Karan Gupta</strong> is an alumnus of Harvard Business School who has guided over <strong className="text-gold-300">100,000 students across three decades</strong> of foreign admissions counseling. His candidates maintain a premier acceptance record at the world’s most selective academic institutions, including Harvard, Stanford, Oxford, Cambridge, and MIT.
            </p>
            <p>
              In his widely celebrated in-depth masterclass dialogue with <strong className="text-white">Raj Shamani</strong>, Dr. Gupta stripped away the promotional illusions peddled by education agents and aggregators. He revealed the objective mathematical realities behind the Indian seat scarcity equation, temporary visa cycles, and the real cost of studying abroad.
            </p>
            <p>
              <strong className="text-gold-300">The Study Abroad Playbook</strong> synthesizes his operational algorithms, profile evaluation architectures, and career acquisition strategies into an indispensable manual for ambitious candidates and their families.
            </p>
          </section>

          <div className="w-full h-px bg-white/10" />

          {/* Our 4 Admissions Principles */}
          <section className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              Our 4 Strategic Principles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  01 · Mathematical Reality
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  No False Promises
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  We state the truth that agents conceal: there is never a 100% guarantee of getting a job abroad. Every move must be a calculated financial deployment with verified ROI.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  02 · The Five Removals
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  De-Biasing Marketing
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  We strip away the brochure lawns, prestige logos, social bragging rights, and generational scripts to evaluate if a syllabus genuinely offers career leverage.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  03 · Non-Traditional Funding
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  Zero Family Ruin
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  We show exceptional students how to fund degrees for free via 100% tuition-paid Graduate Assistantships (TA/RA), need-based grants, and cosigner-free loans.
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-obsidian-850 border border-white/10">
                <span className="font-mono text-xs text-gold-400 font-bold uppercase tracking-wider">
                  04 · High-Agency Career Match
                </span>
                <h4 className="font-serif font-bold text-white text-base">
                  The MATCH Framework
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Outside India, placement cells do not exist. We equip students with the 5-step MATCH system to target mid-tier ecosystems and crack global employment from Day 1.
                </p>
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-white/10" />

          {/* Secure Digital Publishing Standards */}
          <section className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">
              Secure Global Distribution
            </h3>
            <p>
              All publications are distributed globally through our private Paysafe payment channel. Transactions are tokenized under PCI-DSS Level 1 compliance and 256-bit TLS encryption. We do not store card numbers, bank credentials, or private payment data on our servers.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Paysafe Secure Channel</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>30-Day Money-Back Guarantee</span>
              </span>
            </div>
          </section>

          {/* Action Link */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              <span>Explore The Complete Study Abroad Playbook</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/free-resources"
              className="text-xs text-obsidian-400 hover:text-white transition-colors"
            >
              Download The Free 5 Removals Diagnostic Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
