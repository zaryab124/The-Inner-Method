'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import ThreeBookCanvas from '@/components/ThreeBookCanvas';
import Realistic3DFlipBook from '@/components/Realistic3DFlipBook';
import BookCard3D from '@/components/BookCard3D';
import BookReaderModal from '@/components/BookReaderModal';
import EmailLeadForm from '@/components/EmailLeadForm';
import GumroadButton from '@/components/GumroadButton';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Zap,
  Layers,
  HeartHandshake,
  Star,
  Download,
  Eye,
  Headphones,
  Play,
  RotateCw,
} from 'lucide-react';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [heroMode, setHeroMode] = useState<'flipbook' | 'webgl'>('flipbook');
  const [readerProduct, setReaderProduct] = useState<Product | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isPlayingAudioSample, setIsPlayingAudioSample] = useState(false);

  const handleOpenReader = (product: Product) => {
    setReaderProduct(product);
    setIsReaderOpen(true);
  };

  const availableProducts = PRODUCTS.filter((p) => p.status === 'available');

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950 text-obsidian-100 selection:bg-gold-500 selection:text-obsidian-950">
      {/* Interactive 3D Sample Reader Modal */}
      <BookReaderModal
        product={readerProduct}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      {/* ============================================================ */}
      {/* 1. HERO SECTION: INTERACTIVE 3D FLIPBOOK & WEBGL SHOWCASE     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28 border-b border-white/10 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950">
        {/* Luminous Ambient Background Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-36 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wide shadow-glow-gold">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Original Psychology & Focus Publishing</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Books to reclaim your attention and <span className="gold-shimmer">master your mind.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-obsidian-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Science-grounded digital workbooks, interactive protocols, and companion audio guides engineered to dissolve chronic mental scatter and unlock 4 hours of daily depth.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-gold"
                >
                  <span>Explore The Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenReader(selectedProduct)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-obsidian-800/80 text-white border border-gold-500/30 font-semibold text-sm hover:bg-obsidian-750 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4 text-gold-400" />
                  <span>Look Inside Sample</span>
                </button>
              </div>

              {/* Audio Protocol Sample Teaser */}
              <div className="p-4 rounded-2xl bg-obsidian-850/80 border border-white/10 backdrop-blur-sm flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudioSample(!isPlayingAudioSample)}
                    className="w-9 h-9 rounded-full bg-gold-500 text-obsidian-950 flex items-center justify-center font-bold hover:scale-105 transition-transform shrink-0 shadow-glow-gold"
                    title="Play Audio Sample"
                  >
                    <Play className="w-4 h-4 fill-obsidian-950 ml-0.5" />
                  </button>
                  <div>
                    <span className="font-semibold text-white block">
                      Audio Companion Sample: Focus Priming
                    </span>
                    <span className="text-obsidian-400 text-[11px] font-mono">
                      {isPlayingAudioSample ? 'Playing 15-second teaser protocol...' : 'Click to preview audio exercise'}
                    </span>
                  </div>
                </div>
                <Headphones className="w-4 h-4 text-gold-400 shrink-0" />
              </div>

              {/* Trust Checkpoints */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-obsidian-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant PDF & EPUB</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kindle & iPad Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Showcase (Flipbook / 3D WebGL) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Mode Switcher Tabs */}
              <div className="mb-4 flex items-center gap-2 p-1 rounded-full bg-obsidian-900 border border-gold-500/30 text-xs shadow-soft">
                <button
                  onClick={() => setHeroMode('flipbook')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all ${
                    heroMode === 'flipbook'
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold shadow-glow-gold'
                      : 'text-obsidian-300 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>3D Page-Flip Book</span>
                </button>

                <button
                  onClick={() => setHeroMode('webgl')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all ${
                    heroMode === 'webgl'
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold shadow-glow-gold'
                      : 'text-obsidian-300 hover:text-white'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>3D WebGL Orbit Model</span>
                </button>
              </div>

              {/* Book Selector Pills */}
              <div className="mb-4 flex items-center gap-1.5 px-2 py-1 bg-obsidian-900/80 rounded-full border border-white/10 text-xs max-w-full overflow-x-auto">
                {availableProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                      p.id === selectedProduct.id
                        ? 'bg-white/15 text-gold-300 font-bold border border-gold-500/40'
                        : 'text-obsidian-400 hover:text-white'
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              {/* 3D Component Container */}
              <div className="w-full bg-obsidian-900/85 rounded-3xl border border-gold-500/30 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative border-glow-gold">
                {heroMode === 'flipbook' ? (
                  <Realistic3DFlipBook
                    product={selectedProduct}
                    onPurchaseClick={() => handleOpenReader(selectedProduct)}
                  />
                ) : (
                  <ThreeBookCanvas
                    currentProduct={selectedProduct}
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    allProducts={availableProducts}
                    onOpenReader={handleOpenReader}
                  />
                )}

                {/* Quick Info Bar below 3D Model */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-white text-sm">
                      {selectedProduct.title}
                    </span>
                    <span className="font-mono text-gold-400 font-bold text-sm">
                      ${selectedProduct.price.toFixed(2)} USD
                    </span>
                  </div>
                  <GumroadButton
                    product={selectedProduct}
                    variant="primary"
                    size="sm"
                    label="Instant Access"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OPERATIONAL TRANSPARENCY BAR                                */}
      {/* ============================================================ */}
      <section className="bg-obsidian-900 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Secure Hosted Checkout
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  Global encrypted delivery via Gumroad
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Instant File Delivery
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  Download immediately after purchase
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Universal Formats
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  PDF, EPUB, Worksheets & Audio
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  30-Day Guarantee
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  Zero-hassle money-back promise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED CATALOGUE WITH 3D BOOK CARDS                     */}
      {/* ============================================================ */}
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
              The Digital Catalogue
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Editions built for genuine cognitive change.
            </h2>
            <p className="text-sm sm:text-base text-obsidian-300 leading-relaxed">
              Every edition unites neurobiology with practical fillable worksheets, guided audio sessions, and reflective journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <BookCard3D
                key={product.id}
                product={product}
                onOpenReader={handleOpenReader}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors border-b-2 border-gold-500/50 pb-1"
            >
              <span>Explore all digital editions and bundle pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. EDITORIAL METHODOLOGY: SYSTEMS OVER WILLPOWER            */}
      {/* ============================================================ */}
      <section className="py-24 bg-obsidian-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
                Our Editorial Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Why willpower alone always runs dry.
              </h2>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Conventional self-help instructs you to &ldquo;hustle harder&rdquo; or apply brutal discipline. Yet when your autonomic nervous system is in sympathetic overdrive and your workspace is surrounded by dopamine triggers, the prefrontal cortex burns out within hours.
              </p>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                The Inner Method takes the opposite approach: we engineer cognitive friction around distractions and eliminate resistance around depth.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                >
                  <span>Read our complete publishing manifesto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-gold-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  1. Attention Baselines
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Reset down-regulated dopamine receptors through structured stimulus plateaus so quiet, deep work feels natural again.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  2. Somatic Grounding
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Calm the body’s threat reflex before attempting cognitive reframing. Regulate physiological state before rewriting mental stories.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-gold-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  3. Forensic Reflection
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Deconstruct recurring emotional scripts without shame. Map the exact trigger sequences that lead to avoidance or burnout.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  4. Frictionless Architecture
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Shape digital and physical spaces so that deep focus requires less conscious decision-making than getting distracted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. READER TESTIMONIALS                                       */}
      {/* ============================================================ */}
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Global Reader Evidence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Trusted by thinkers worldwide.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex text-gold-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-sm text-obsidian-200 italic font-serif leading-relaxed">
                &ldquo;The Focus Reset changed how I approach my morning writing sessions. Rather than fighting distraction with sheer frustration, the 72-hour stimulus baseline protocol gave me back 3 hours of quiet thought every day.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Marcus V.</strong>
                <span className="text-obsidian-400">Academic Researcher, London</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex text-gold-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-sm text-obsidian-200 italic font-serif leading-relaxed">
                &ldquo;Understand Your Patterns felt like sitting with an extraordinarily perceptive therapist. The exercises on identifying emotional triggers before they spiral into arguments transformed my communication.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Sarah T.</strong>
                <span className="text-obsidian-400">Design Director, Toronto</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex text-gold-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-sm text-obsidian-200 italic font-serif leading-relaxed">
                &ldquo;The Personal Growth Toolkit was worth three times what I paid. The fillable Notion reflection templates and the audio priming tracks are now part of my daily startup ritual. Phenomenal quality.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Daniel H.</strong>
                <span className="text-obsidian-400">Software Engineer, Melbourne</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. HIGH-CONVERTING FREE RESOURCE LEAD MAGNET                 */}
      {/* ============================================================ */}
      <section id="free-guide" className="py-24 bg-obsidian-900 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Guide Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Complimentary 24-Page Field Guide</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                7 Practical Exercises for Better Focus
              </h2>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Download our most popular practical framework. 24 high-resolution pages outlining immediate drills you can implement today to eliminate cognitive drag and calm your nervous system.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The 3-minute sensory baseline reset for acute overwhelm</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The physical phone quarantine method (backed by memory trials)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The 50/10 ultradian focus grid for high-yield creative work</span>
                </li>
              </ul>
            </div>

            {/* Email Form */}
            <div className="lg:col-span-6">
              <EmailLeadForm
                source="home_lead_magnet"
                buttonLabel="Get The Free 24-Page Guide (PDF)"
                title="Claim Your Copy"
                subtitle="Join 8,400+ readers receiving our weekly cognitive essays."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
