'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { CurrencySelectorDropdown } from '@/lib/currency';
import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Moon,
  Sun,
  ShieldCheck,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTheme, setActiveTheme] = useState<'obsidian' | 'emerald' | 'ivory'>('obsidian');
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme switcher handler
  const switchTheme = (theme: 'obsidian' | 'emerald' | 'ivory') => {
    setActiveTheme(theme);
    const root = document.documentElement;
    root.classList.remove('theme-obsidian', 'theme-emerald', 'theme-ivory');
    root.classList.add(`theme-${theme}`);
  };

  const navLinks = [
    { label: 'Books & Editions', href: '/shop' },
    { label: 'Free Field Guide', href: '/free-resources' },
    { label: 'Masterclass Journal', href: '/journal' },
    { label: 'Order Vault & Support', href: '/support' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT TICKER (Fades gently when scrolled) */}
      <div
        className={`bg-obsidian-950 text-gold-300 border-b border-gold-500/20 py-1.5 px-4 text-[11px] transition-all duration-300 ${
          scrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-mono text-gold-200">
              ⚡ New Flagship Release: The Huberman Blueprint (54-Page System) & The Study Abroad Playbook are Live · Instant PDF Access
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>30-Day Money-Back Guarantee</span>
            </span>
            <span className="text-white/20">|</span>
            <CurrencySelectorDropdown />
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC MORPHING NAVBAR */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-2 px-3 sm:px-6'
            : 'py-4 px-4 sm:px-8 bg-obsidian-900/90 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? 'max-w-6xl bg-obsidian-900/95 backdrop-blur-xl rounded-full border border-gold-500/30 px-5 py-2.5 shadow-elevated border-glow-gold'
              : 'max-w-7xl'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo & Editorial Crest */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-obsidian-950 flex items-center justify-center font-serif text-base font-bold shadow-glow-gold transition-transform group-hover:scale-105">
                ⚡
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-gold-300 transition-colors leading-tight">
                  THE INNER METHOD
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/90 font-semibold font-mono">
                  MASTERCLASS PUBLISHING HOUSE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {/* Quick Book Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setBookMenuOpen(!bookMenuOpen)}
                  onBlur={() => setTimeout(() => setBookMenuOpen(false), 200)}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-obsidian-200 hover:text-gold-300 transition-colors"
                >
                  <span>Titles</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
                </button>

                {bookMenuOpen && (
                  <div className="absolute top-full left-0 mt-3 w-72 rounded-2xl bg-obsidian-900/95 border border-gold-500/30 backdrop-blur-xl shadow-2xl p-3 space-y-2 animate-fadeIn z-50">
                    <div className="text-[10px] uppercase tracking-wider font-mono text-gold-400 px-2 py-1">
                      Our Published Editions
                    </div>
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.id}
                        href={`/shop/${p.slug}`}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-colors group/item"
                      >
                        <div>
                          <div className="text-xs font-serif font-bold text-white group-hover/item:text-gold-300">
                            {p.title}
                          </div>
                          <div className="text-[10px] text-obsidian-400 font-mono">
                            {p.category}
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-gold-400">
                          ${p.price.toFixed(2)}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-semibold uppercase tracking-wider transition-colors relative py-1 ${
                      isActive
                        ? 'text-gold-300 font-bold'
                        : 'text-obsidian-200 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Actions & Interactive Theme Switcher */}
            <div className="hidden md:flex items-center gap-3">
              {/* Interactive Theme Switcher Pill */}
              <div className="flex items-center p-1 rounded-full bg-obsidian-950/80 border border-white/15 text-[10px] text-obsidian-300">
                <button
                  onClick={() => switchTheme('obsidian')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
                    activeTheme === 'obsidian'
                      ? 'bg-gold-500 text-obsidian-950 font-bold shadow-xs'
                      : 'hover:text-white'
                  }`}
                  title="Obsidian & 24K Royal Gold Theme"
                >
                  <Moon className="w-3 h-3" />
                  <span>Gold</span>
                </button>
                <button
                  onClick={() => switchTheme('emerald')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
                    activeTheme === 'emerald'
                      ? 'bg-emerald-500 text-obsidian-950 font-bold shadow-xs'
                      : 'hover:text-white'
                  }`}
                  title="Emerald Sanctum Theme"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Emerald</span>
                </button>
                <button
                  onClick={() => switchTheme('ivory')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all ${
                    activeTheme === 'ivory'
                      ? 'bg-stone-200 text-charcoal-900 font-bold shadow-xs'
                      : 'hover:text-white'
                  }`}
                  title="Imperial Ivory Light Theme"
                >
                  <Sun className="w-3 h-3" />
                  <span>Ivory</span>
                </button>
              </div>

              {/* Free Guide Pill */}
              <Link
                href="/free-resources"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/40 text-gold-300 text-xs font-semibold hover:bg-gold-500/20 transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Free Guide</span>
              </Link>

              {/* Explore Store Button */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-xs font-bold hover:brightness-110 transition-all shadow-glow-gold"
              >
                <span>Store</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/free-resources"
                className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold"
              >
                Free Guide
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10"
                aria-label="Toggle navigation drawer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. DYNAMIC READING PROGRESS BAR ALONG BOTTOM OF NAVBAR */}
        <div className="w-full bg-transparent h-0.5 mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 via-amber-300 to-gold-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* 4. MOBILE MENU DRAWER */}
        {isOpen && (
          <div className="lg:hidden mt-2 border border-gold-500/30 rounded-3xl bg-obsidian-900/98 backdrop-blur-2xl p-6 space-y-4 animate-fadeIn shadow-2xl">
            {/* Theme switcher on mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-obsidian-400 font-mono">Theme Mode:</span>
              <div className="flex items-center gap-1 bg-obsidian-950 p-1 rounded-full border border-white/10">
                <button
                  onClick={() => switchTheme('obsidian')}
                  className={`px-2.5 py-1 rounded-full text-[10px] ${
                    activeTheme === 'obsidian' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-obsidian-300'
                  }`}
                >
                  Gold
                </button>
                <button
                  onClick={() => switchTheme('emerald')}
                  className={`px-2.5 py-1 rounded-full text-[10px] ${
                    activeTheme === 'emerald' ? 'bg-emerald-500 text-obsidian-950 font-bold' : 'text-obsidian-300'
                  }`}
                >
                  Emerald
                </button>
                <button
                  onClick={() => switchTheme('ivory')}
                  className={`px-2.5 py-1 rounded-full text-[10px] ${
                    activeTheme === 'ivory' ? 'bg-stone-200 text-charcoal-900 font-bold' : 'text-obsidian-300'
                  }`}
                >
                  Ivory
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-obsidian-400 font-mono text-xs">Currency:</span>
              <CurrencySelectorDropdown />
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-semibold text-white hover:text-gold-300 py-1"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs text-center block shadow-glow-gold"
              >
                Explore All Publications
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
