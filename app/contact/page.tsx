'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, ShieldCheck, CheckCircle2, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-gold-400" />
            <span>Editorial Support Desk</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            How May We Help You?
          </h1>

          <p className="text-base text-obsidian-300 leading-relaxed">
            Whether you have a question regarding a digital download, an inquiry regarding institutional licensing, or feedback on an exercise, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-obsidian-900 border border-gold-500/30 shadow-2xl space-y-4 border-glow-gold">
              <h3 className="font-serif font-bold text-white text-lg">
                Direct Contact Channels
              </h3>

              <div className="space-y-3 text-xs text-obsidian-300">
                <div>
                  <strong className="block text-white">Customer & Order Support:</strong>
                  <span className="font-mono text-gold-300">support@theinnermethod.com</span>
                </div>
                <div>
                  <strong className="block text-white">Editorial & Publishing Inquiries:</strong>
                  <span className="font-mono text-gold-300">editorial@theinnermethod.com</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-obsidian-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Average response time: Under 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Money-Back Guarantee support</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 text-xs text-obsidian-300 leading-relaxed">
              <strong className="block font-serif text-sm text-white mb-1">
                Looking to Recover a Purchase?
              </strong>
              If you need to redownload an earlier purchase or view your official VAT invoice, visit our secure{' '}
              <Link href="/support" className="text-gold-400 hover:text-gold-300 underline font-semibold">
                Customer Order Vault & Support Portal
              </Link>{' '}
              using the email address you purchased with.
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7">
            <div className="bg-obsidian-900 rounded-3xl border border-white/10 p-8 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-glow-emerald">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Message Received
                  </h3>
                  <p className="text-sm text-obsidian-300 max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name || 'there'}. Our editorial support team will respond to{' '}
                    <strong className="text-gold-300">{formData.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-obsidian-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Julian Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-obsidian-300 mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="julian@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-obsidian-300 mb-1">
                      Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    >
                      <option>Download or File Issue</option>
                      <option>Refund Request (30-Day Guarantee)</option>
                      <option>Book Content Feedback</option>
                      <option>Institutional or Bulk Licensing</option>
                      <option>General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-obsidian-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please let us know how we can assist..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-sm font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-gold disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
