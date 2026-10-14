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
  Award,
  Globe,
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
      <section className="relative overflow-hidden pt-8 pb-20 md:pt-12 md:pb-28 border-b border-white/10 bg-gradient-to-b from-[#050E1A] via-obsidian-900 to-obsidian-950">
        {/* Luminous Ambient Background Glows */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-36 right-10 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wide shadow-glow-gold">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Ivy League Admissions Masterclass · Dr. Karan Gupta</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                How to win the global education game & avoid the <span className="text-[#E63946] gold-shimmer">1-Crore debt trap.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-obsidian-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Synthesized from 30 years of foreign admissions counseling and 100,000+ guided students across Harvard, Stanford, Oxford, and Cambridge into mathematical frameworks, visa reality checks, and high-ROI career algorithms.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-glow-gold"
                >
                  <span>Explore The Playbook</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenReader(selectedProduct)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-obsidian-800/80 text-white border border-gold-500/30 font-semibold text-sm hover:bg-obsidian-750 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Eye className="w-4 h-4 text-gold-400" />
                  <span>Interactive 3D Preview</span>
                </button>
              </div>

              {/* Masterclass Audio Dialogue Sample */}
              <div className="p-4 rounded-2xl bg-obsidian-850/80 border border-white/10 backdrop-blur-sm flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudioSample(!isPlayingAudioSample)}
                    className="w-9 h-9 rounded-full bg-gold-500 text-obsidian-950 flex items-center justify-center font-bold hover:scale-105 transition-transform shrink-0 shadow-glow-gold"
                    title="Play Masterclass Audio Clip"
                  >
                    <Play className="w-4 h-4 fill-obsidian-950 ml-0.5" />
                  </button>
                  <div className="text-left">
                    <span className="font-semibold text-white block">
                      Masterclass Dialogue: Dr. Karan Gupta & Raj Shamani
                    </span>
                    <span className="text-obsidian-400 text-[11px] font-mono">
                      {isPlayingAudioSample ? 'Playing: "The Indian Scarcity Math & Dundee vs Bath"' : 'Click to hear Dr. Gupta on avoiding bad loans'}
                    </span>
                  </div>
                </div>
                <Headphones className="w-4 h-4 text-gold-400 shrink-0" />
              </div>

              {/* Trust Checkpoints */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-obsidian-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100,000+ Students Guided</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant Master PDF</span>
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
                  <span>3D Physical FlipBook</span>
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

              {/* 3D Component Stage */}
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
                  <div className="flex items-center gap-2">
                    <a
                      href="/Study_Abroad_Playbook_EBook.pdf"
                      download="The_Study_Abroad_Playbook_EBook.pdf"
                      className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10 text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Sample PDF</span>
                    </a>
                    <GumroadButton
                      product={selectedProduct}
                      variant="primary"
                      size="sm"
                      label="Unlock Playbook"
                    />
                  </div>
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
                  Instant Master PDF
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  Full 29-page masterclass edition
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Interactive 3D FlipBook
                </h4>
                <p className="text-[11px] text-obsidian-400">
                  Audio page turns & 5 Removals Test
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
                  Zero-hassle refund promise
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
              The Publications Suite
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Editions built for strategic admissions ROI.
            </h2>
            <p className="text-sm sm:text-base text-obsidian-300 leading-relaxed">
              Every edition unites real empirical admissions data, profile evaluation algorithms, and post-study employment frameworks.
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
              <span>Explore all editions, toolkits and bundle pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. ADMISSIONS METHODOLOGY & OPERATIONAL FRAMEWORKS            */}
      {/* ============================================================ */}
      <section className="py-24 bg-obsidian-900 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
                Strategic Admissions Engine
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Why degrees alone never guarantee jobs.
              </h2>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Aggregator agents sell students on glossy campus brochures and relaxed temporary visas. But without tier-1 academic pedigree, technical differentiation, and high-agency networking, hundreds of students end up stuck in low-wage survival loops.
              </p>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Dr. Karan Gupta’s operational frameworks remove marketing illusions and engineer a calculated pathway to high-paying international employment or lucrative reverse-brain drain GCC leadership in India.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
                >
                  <span>Learn about Dr. Gupta’s 30-year counseling track record</span>
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
                  1. The 5 Removals Test
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Strip away the brochure, the logo, other people’s opinions, parental expectations, and fantasy placements to verify if a degree justifies your family’s life savings.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  2. The 5 Student Personas
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Map your exact profile and budget: from Rahul (who should stay in India) to Ananya (US Ivy STEM), Zara (UK-to-US hybrid hack), and the 30+ Executive Pivot.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-gold-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 text-gold-400 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  3. India’s $100B GCC Goldmine
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Learn how 2,100+ Global Capability Centers in Bengaluru and Hyderabad hire returning international degree holders at ₹35L–₹75L+ with zero visa anxiety.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-850 border border-white/10 shadow-soft space-y-3 hover:border-emerald-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-lg">
                  4. The MATCH Job Strategy
                </h4>
                <p className="text-xs text-obsidian-300 leading-relaxed">
                  Map the market, assemble project evidence, target mid-tier ecosystems, combine AI with human networking, and hone mock interviews to bypass placement cells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. READER & STUDENT TESTIMONIALS                              */}
      {/* ============================================================ */}
      <section className="py-24 bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Verified Admissions Evidence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Guided by Dr. Karan Gupta.
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
                &ldquo;The 5 Removals Test saved my family from mortgaging our house for an average university in the UK. Dr. Gupta helped me target Bath instead, where I landed an executive role in renewables.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Tisha S.</strong>
                <span className="text-obsidian-400">Master’s in Tech, University of Bath</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex text-gold-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-sm text-obsidian-200 italic font-serif leading-relaxed">
                &ldquo;The 30+ Executive Pivot Playbook was pure gold. I transitioned from a stagnant ₹1.5L/month role in Mumbai to a STEM MBA in NYC. I just accepted a \$210,000 package in analytics.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Vikram R.</strong>
                <span className="text-obsidian-400">STEM MBA Graduate, New York</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 shadow-soft space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex text-gold-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400" />
                ))}
              </div>
              <p className="text-sm text-obsidian-200 italic font-serif leading-relaxed">
                &ldquo;As parents, we were blinded by status. The SSF framework helped us align with our daughter without anxiety. She utilized the UK-to-US hybrid hack, saving us over ₹1.5 Crores!&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs">
                <strong className="block text-white font-serif">Rajesh & Sunita M.</strong>
                <span className="text-obsidian-400">Parents, New Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FREE FIELD GUIDE LEAD MAGNET                               */}
      {/* ============================================================ */}
      <section id="free-guide" className="py-24 bg-obsidian-900 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Guide Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Complimentary Admissions Diagnostic</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                The 5 Removals Test & Foreign University Audit Guide
              </h2>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Download the operational field guide used by over 100,000 students to audit prospective colleges, detect diploma mills, and evaluate true employment ROI before paying application fees.
              </p>
              <ul className="space-y-2 text-xs text-obsidian-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The 5 Removals Diagnostic Checklist to de-bias college brochures</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>The 4-Point Audited Outcome formula (90-day verified placement)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>How to secure 100% free tuition via Teaching & Research Assistantships</span>
                </li>
              </ul>
            </div>

            {/* Email Form */}
            <div className="lg:col-span-6">
              <EmailLeadForm
                source="home_lead_magnet"
                buttonLabel="Download Free Diagnostic Guide (PDF)"
                title="Claim Your Free Field Guide"
                subtitle="Join 12,000+ ambitious students and parents receiving our admissions frameworks."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
