import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian-950 text-obsidian-200 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-obsidian-950 flex items-center justify-center font-serif text-base font-bold shadow-glow-gold">
                🎓
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                THE STUDY ABROAD PLAYBOOK
              </span>
            </div>

            <p className="text-sm text-obsidian-300 max-w-sm leading-relaxed">
              Strategic admissions algorithms, visa reality checks, and high-ROI career frameworks synthesized from 30 years of counseling by Dr. Karan Gupta (Harvard alumnus) & Raj Shamani.
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-400 font-mono">
              <Globe className="w-3.5 h-3.5" />
              <span>International Digital Delivery to 140+ Countries</span>
            </div>
          </div>

          {/* Publishing Catalog */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold mb-4">
              Publications
            </h5>
            <ul className="space-y-2.5 text-xs text-obsidian-300">
              <li>
                <Link href="/shop/the-study-abroad-playbook" className="hover:text-gold-300 transition-colors">
                  The Study Abroad Playbook
                </Link>
              </li>
              <li>
                <Link href="/shop/the-5-removals-toolkit" className="hover:text-gold-300 transition-colors">
                  The 5 Removals Audit Toolkit
                </Link>
              </li>
              <li>
                <Link href="/shop/global-career-masterclass-bundle" className="hover:text-gold-300 transition-colors">
                  Global Career Master Bundle
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1 font-semibold">
                  <span>View All Editions</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Journal */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold mb-4">
              Resources
            </h5>
            <ul className="space-y-2.5 text-xs text-obsidian-300">
              <li>
                <Link href="/free-resources" className="hover:text-gold-300 transition-colors">
                  Free Diagnostic Guide (PDF)
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-gold-300 transition-colors">
                  Editorial Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Our Standards
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold-300 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
                  Order Lookup & VAT Invoices
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Checkout Security Notice */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold mb-4">
              Paysafe Security
            </h5>
            <div className="space-y-3 text-xs text-obsidian-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Payments and instant global downloads are securely processed via <strong className="text-white">Paysafe Secure Channel</strong>.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-mono text-neutral-300">
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">💳 Cards</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">🎟️ paysafecard</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">🟣 Skrill</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded"> Apple/GPay</span>
              </div>
              <p className="text-[11px] text-obsidian-400 leading-relaxed">
                256-bit SSL encryption & PCI-DSS Level 1 compliance. We never store card or banking passwords.
              </p>
              <div className="pt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-obsidian-900 text-gold-300 text-[10px] font-mono border border-gold-500/30">
                  30-Day Money Back Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-obsidian-400">
          <p>© {new Date().getFullYear()} The Inner Method. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-gold-300 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
