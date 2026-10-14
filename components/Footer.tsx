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
                M
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                THE INNER METHOD
              </span>
            </div>

            <p className="text-sm text-obsidian-300 max-w-sm leading-relaxed">
              An independent digital publishing imprint dedicated to cognitive psychology, attention architecture, and actionable emotional self-investigation.
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
                <Link href="/shop/the-focus-reset" className="hover:text-gold-300 transition-colors">
                  The Focus Reset
                </Link>
              </li>
              <li>
                <Link href="/shop/understand-your-patterns" className="hover:text-gold-300 transition-colors">
                  Understand Your Patterns
                </Link>
              </li>
              <li>
                <Link href="/shop/the-personal-growth-toolkit" className="hover:text-gold-300 transition-colors">
                  The Personal Growth Toolkit
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
                  Free 24-Page Guide
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
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Checkout Security Notice */}
          <div>
            <h5 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold mb-4">
              Secure Delivery
            </h5>
            <div className="space-y-3 text-xs text-obsidian-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Payments and instant global downloads are securely processed via <strong className="text-white">Gumroad</strong>.
                </p>
              </div>
              <p className="text-[11px] text-obsidian-400 leading-relaxed">
                We never store card numbers or banking credentials on our servers.
              </p>
              <div className="pt-2">
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
