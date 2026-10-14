'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ShieldCheck, Download, ArrowRight } from 'lucide-react';

interface EmailLeadFormProps {
  source?: string;
  className?: string;
  buttonLabel?: string;
  title?: string;
  subtitle?: string;
  showWelcomeEmailCopy?: boolean;
}

export default function EmailLeadForm({
  source = 'homepage_footer',
  className = '',
  buttonLabel = 'Send My Free 24-Page Guide',
  title,
  subtitle,
  showWelcomeEmailCopy = true,
}: EmailLeadFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmailSample, setShowEmailSample] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please check the consent box to confirm your permission.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          source,
          consentGiven: true,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed. Please try again.');
      }

      setStatus('success');

      // Trigger celebratory confetti in gold and emerald colors
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F3D382', '#10B981', '#FFFFFF'],
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('the_inner_method_event', {
            detail: {
              eventType: 'lead_subscription',
              source,
              timestamp: new Date().toISOString(),
            },
          })
        );
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please check your connection.';
      setStatus('error');
      setErrorMessage(message);
    }
  };

  return (
    <div className={`bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl ${className}`}>
      {status === 'success' ? (
        <div className="text-center py-6 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/40 shadow-glow-emerald">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Your Guide Is Ready!
          </h3>

          <p className="text-sm sm:text-base text-obsidian-200 max-w-md mx-auto leading-relaxed">
            We have sent your instant download link for{' '}
            <strong className="text-gold-300">“7 Practical Exercises for Better Focus”</strong> to{' '}
            <span className="font-mono text-gold-300 bg-obsidian-950 px-2.5 py-1 rounded border border-gold-500/30 text-xs sm:text-sm">
              {email}
            </span>.
          </p>

          {/* Instant PDF Access Unlock Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/Study_Abroad_Playbook_EBook.pdf"
              download="The_Study_Abroad_Playbook_EBook.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold hover:brightness-110 transition-all shadow-glow-gold text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Field Guide PDF (Free)</span>
            </a>

            {showWelcomeEmailCopy && (
              <button
                onClick={() => setShowEmailSample(!showEmailSample)}
                className="text-xs text-obsidian-400 hover:text-gold-300 underline underline-offset-4"
              >
                {showEmailSample ? 'Hide Welcome Email' : 'Preview Welcome Email'}
              </button>
            )}
          </div>

          {/* Welcome Email Copy Preview */}
          {showEmailSample && (
            <div className="mt-6 text-left max-w-lg mx-auto p-5 bg-obsidian-950 rounded-2xl border border-white/10 text-xs text-obsidian-300 space-y-2">
              <div className="font-mono text-[10px] text-gold-400 border-b border-white/10 pb-1">
                Subject: Your Copy: The 5 Removals Test & University Audit Diagnostic · Dr. Karan Gupta
              </div>
              <p className="font-serif text-sm font-semibold text-white">
                Welcome to strategic international admissions clarity.
              </p>
              <p>
                Hello {firstName || 'there'},
              </p>
              <p>
                Thank you for requesting <em>The 5 Removals Test & Foreign University Audit Diagnostic</em>. You can access your high-resolution field guide PDF below:
              </p>
              <p className="font-medium text-gold-300">
                <a href="/Study_Abroad_Playbook_EBook.pdf" download className="underline">
                  [Download: The_Study_Abroad_Playbook_EBook.pdf — 29 Pages]
                </a>
              </p>
              <p>
                Each Sunday, we analyze one strategic global admissions framework, visa shift, or high-ROI career metric. If you ever wish to step away, you can unsubscribe with a single click at the bottom of any email.
              </p>
              <p className="text-obsidian-500 pt-2 border-t border-white/10 text-[11px]">
                The Study Abroad Playbook Publishing · Unsubscribe · Manage Preferences
              </p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && (
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-obsidian-300 mt-2 max-w-lg mx-auto leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="lead-name" className="block text-xs font-semibold text-obsidian-300 mb-1">
                First Name (Optional)
              </label>
              <input
                id="lead-name"
                type="text"
                placeholder="e.g. Elena"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all placeholder:text-obsidian-500"
              />
            </div>

            <div>
              <label htmlFor="lead-email" className="block text-xs font-semibold text-obsidian-300 mb-1">
                Email Address <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="lead-email"
                  type="email"
                  required
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 transition-all placeholder:text-obsidian-500"
                />
              </div>
            </div>
          </div>

          {/* Explicit Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-obsidian-950 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-xs text-obsidian-300 leading-relaxed">
                I agree to receive the free guide <strong className="text-white">“7 Practical Exercises for Better Focus”</strong> and occasional thoughtful reflections on psychology and deep work. You may unsubscribe at any time with one click.
              </span>
            </label>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 bg-rose-950/60 p-2.5 rounded-lg border border-rose-800">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-sm font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-gold disabled:opacity-50"
          >
            {status === 'loading' ? (
              <span>Preparing your download...</span>
            ) : (
              <>
                <span>{buttonLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Privacy Notice Disclaimer */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-obsidian-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strict privacy. We never share your data. Unsubscribe anytime.</span>
          </div>
        </form>
      )}
    </div>
  );
}
