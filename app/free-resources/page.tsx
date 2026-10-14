import React from 'react';
import type { Metadata } from 'next';
import { FREE_RESOURCE } from '@/data/products';
import EmailLeadForm from '@/components/EmailLeadForm';
import { Sparkles, ShieldCheck, FileCheck, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Diagnostic: The 5 Removals Test & Foreign University Audit Guide',
  description:
    'Download our free operational field guide to audit prospective foreign colleges, detect diploma mills, and evaluate true employment ROI before spending a single rupee.',
};

export default function FreeResourcesPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Complimentary Admissions Diagnostic Guide</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {FREE_RESOURCE.title}
          </h1>

          <p className="text-base sm:text-lg text-obsidian-300 max-w-2xl mx-auto leading-relaxed">
            {FREE_RESOURCE.subtitle}
          </p>
        </div>

        {/* Two-Column Grid: Form & Guide Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Email Capture Form */}
          <div className="lg:col-span-6">
            <EmailLeadForm
              source="free_resources_page"
              buttonLabel="Download Free Diagnostic Guide (PDF)"
              title="Instant PDF Download"
              subtitle="Enter your email to immediately unlock the field guide and receive strategic admissions insights."
              showWelcomeEmailCopy={true}
            />
          </div>

          {/* Right Column: Guide Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold-500/30 shadow-2xl space-y-6 border-glow-gold">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-obsidian-400 font-mono">
                <span className="flex items-center gap-1.5 font-sans font-bold text-white">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  Format: Printable High-Res PDF
                </span>
                <span>Direct Master PDF Download</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white">
                What You Will Master Inside This Guide:
              </h3>

              <div className="space-y-4">
                {FREE_RESOURCE.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-gold-500/40">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {bullet.split(':')[0]}
                      </h4>
                      <p className="text-xs text-obsidian-300 mt-0.5">
                        {bullet.split(':')[1] || 'Immediate practical implementation.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Instant direct download option */}
              <div className="pt-2">
                <a
                  href="/Study_Abroad_Playbook_EBook.pdf"
                  download="The_Study_Abroad_Playbook_EBook.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 border border-gold-500/40 text-gold-300 font-semibold text-xs transition-all shadow-md"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  <span>Direct Download (No Email Required)</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-obsidian-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero cost. No credit card required. Pure strategic clarity.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Give This Away Free */}
        <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-obsidian-900 border border-white/10 text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">
            Why We Distribute This Diagnostic For Free
          </h3>
          <p className="text-sm text-obsidian-300 leading-relaxed">
            Every year, honest families take multi-crore loans for unaccredited foreign colleges based solely on agent hype and photos of manicured lawns. We publish this framework openly so students and parents can independently verify college outcomes before signing loan documents.
          </p>
          <p className="text-xs text-obsidian-400">
            If you ever wish to unsubscribe from our weekly admissions insights, every email contains an instantaneous one-click unsubscribe link.
          </p>
        </div>
      </div>
    </div>
  );
}
