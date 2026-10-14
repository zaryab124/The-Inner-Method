'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { playPageTurnSound, playCoverOpenSound } from '@/lib/sound';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Eye,
  CheckSquare,
  Square,
} from 'lucide-react';
import GumroadButton from '@/components/GumroadButton';

interface Realistic3DFlipBookProps {
  product: Product;
  className?: string;
  onPurchaseClick?: () => void;
}

export default function Realistic3DFlipBook({
  product,
  className = '',
}: Realistic3DFlipBookProps) {
  // Page index: 0 = Closed Cover, 1 = Spread 1 (Pages 1 & 2), 2 = Spread 2 (Pages 3 & 4), 3 = Spread 3 (Pages 5 & 6), 4 = Back Cover
  const [currentSpread, setCurrentSpread] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [interactiveHabits, setInteractiveHabits] = useState([
    { label: 'Morning Phone Quarantine (First 60 mins)', checked: true },
    { label: '90-min Deep Work Block #1 (No Notifications)', checked: true },
    { label: '10-min Somatic Nervous System Settling', checked: false },
    { label: 'Low-Stimulus Evening Decompression', checked: false },
  ]);

  const totalSpreads = 4; // 0 (Cover), 1 (Intro), 2 (Protocol), 3 (Somatic), 4 (Back / CTA)

  const handleNext = () => {
    if (currentSpread < totalSpreads) {
      if (soundEnabled) {
        if (currentSpread === 0) playCoverOpenSound();
        else playPageTurnSound();
      }
      setCurrentSpread((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSpread > 0) {
      if (soundEnabled) playPageTurnSound();
      setCurrentSpread((prev) => prev - 1);
    }
  };

  const jumpToSpread = (idx: number) => {
    if (idx !== currentSpread) {
      if (soundEnabled) playPageTurnSound();
      setCurrentSpread(idx);
    }
  };

  const toggleHabit = (index: number) => {
    setInteractiveHabits((prev) =>
      prev.map((h, i) => (i === index ? { ...h, checked: !h.checked } : h))
    );
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top Interactive Mode & Sound Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-mono text-[11px]">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Interactive 3D Page-Flip Book</span>
          </span>
          <span className="hidden sm:inline text-obsidian-300 text-[11px]">
            Click page corners or navigation to flip
          </span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-obsidian-800 border border-white/10 text-obsidian-300 hover:text-white transition-colors"
          title={soundEnabled ? 'Mute Page Turn Sound' : 'Enable Page Turn Sound'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px]">Sound On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-obsidian-400" />
              <span className="text-[11px]">Muted</span>
            </>
          )}
        </button>
      </div>

      {/* Main 3D Book Stage */}
      <div className="relative w-full max-w-[760px] h-[430px] sm:h-[480px] perspective-1500 flex items-center justify-center my-2">
        {/* Desk Volumetric Shadow */}
        <div className="absolute -bottom-6 w-[85%] h-12 bg-black/70 filter blur-2xl rounded-full pointer-events-none" />

        {/* ============================================================ */}
        {/* SPREAD 0: CLOSED HARDCOVER PRESENTATION                       */}
        {/* ============================================================ */}
        {currentSpread === 0 && (
          <div
            onClick={handleNext}
            className="group relative w-[290px] sm:w-[330px] h-[410px] sm:h-[460px] cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Book Spine (Left 3D side) */}
            <div
              className="absolute top-0 left-0 w-[36px] h-full origin-left bg-obsidian-950 border-l border-gold-500/30"
              style={{
                transform: 'rotateY(-90deg) translateX(-36px)',
                backgroundColor: product.coverTheme.spineColor,
              }}
            >
              <div className="w-full h-full flex flex-col justify-between py-6 items-center book-spine-gradient">
                <span className="text-[9px] uppercase tracking-widest text-gold-300/80 font-bold rotate-90">
                  IMPRINT
                </span>
                <span className="text-[11px] font-serif font-bold text-white tracking-widest rotate-90 whitespace-nowrap">
                  {product.title}
                </span>
                <span className="text-[9px] text-gold-400 font-mono rotate-90">2026</span>
              </div>
            </div>

            {/* Book Page Ridges (Right Side) */}
            <div
              className="absolute top-2 right-0 w-[28px] h-[96%] origin-right book-pages-side rounded-r border-r border-stone-400 shadow-md"
              style={{ transform: 'rotateY(90deg) translateZ(-1px)' }}
            />

            {/* Front Cover Plate */}
            <div className="relative w-full h-full rounded-r-xl rounded-l-xs bg-gradient-to-br from-[#1A1F2B] via-[#0E121A] to-[#07090D] border border-gold-500/40 p-6 flex flex-col justify-between shadow-book overflow-hidden">
              {/* Outer Golden Border & Accents */}
              <div className="absolute inset-3 border border-gold-500/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-4 border border-gold-500/15 rounded pointer-events-none" />

              {/* Spine Crease Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 via-gold-500/10 to-transparent pointer-events-none" />

              {/* Publisher Crest */}
              <div className="text-center pt-2 relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] font-serif font-semibold text-gold-400">
                  THE INNER METHOD
                </span>
                <div className="w-10 h-px bg-gold-500/40 mx-auto my-1.5" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-mono">
                  DEFINITIVE WORKBOOK
                </span>
              </div>

              {/* Main Title & Subtitle */}
              <div className="text-center px-2 relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight drop-shadow">
                  {product.title}
                </h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto my-2.5" />
                <p className="text-xs text-gold-100/80 font-serif italic line-clamp-3 leading-relaxed">
                  {product.subtitle}
                </p>
              </div>

              {/* Golden Foil Geometric Medallion */}
              <div className="relative z-10 flex justify-center py-2">
                <div className="w-14 h-14 rounded-full border border-gold-500/50 flex items-center justify-center bg-gold-500/5 shadow-glow-gold">
                  <div className="w-9 h-9 rotate-45 border border-gold-400/70 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold-400 -rotate-45" />
                  </div>
                </div>
              </div>

              {/* Bottom Metadata & Click to Flip prompt */}
              <div className="relative z-10 text-center border-t border-gold-500/20 pt-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold-300 block">
                  {product.pageCount} Pages · Fillable Protocols · Audio Companion
                </span>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-semibold border border-gold-500/40 animate-pulse">
                  <Eye className="w-3 h-3" />
                  <span>Click Cover to Open & Flip Pages</span>
                </div>
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SPREADS 1, 2, 3, 4: OPEN TWO-PAGE SPREAD WITH 3D FLIP EFFECT */}
        {/* ============================================================ */}
        {currentSpread > 0 && (
          <div
            className="relative w-full max-w-[720px] h-[390px] sm:h-[450px] bg-ivory-50 rounded-xl shadow-2xl border border-stone-300 grid grid-cols-2 overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Center Gutter Fold Shadow & Spine Stitching */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-stone-400/25 via-stone-500/40 to-stone-400/25 z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-500/40 z-20 pointer-events-none" />

            {/* Silk Ribbon Bookmark */}
            <div className="absolute top-0 left-[51%] w-3 h-32 bg-amber-700/80 rounded-b shadow-md z-30 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            {/* ------------------------------------------------------------ */}
            {/* LEFT PAGE (VERSO)                                            */}
            {/* ------------------------------------------------------------ */}
            <div
              onClick={handlePrev}
              className="relative p-5 sm:p-7 bg-ivory-100 flex flex-col justify-between border-r border-stone-200 cursor-pointer overflow-hidden paper-texture"
              title="Click to Flip Back"
            >
              {/* Subtle page curl hover hint on left */}
              <div className="absolute top-0 left-0 bottom-0 w-6 page-curl-shadow-left pointer-events-none" />

              {/* SPREAD 1 LEFT: Preface */}
              {currentSpread === 1 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sage-700 font-bold">
                      Preface · The Attention Dilemma
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      Why Willpower Keeps Failing You
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed font-serif italic">
                    &ldquo;Attention is not a personality trait. It is a biological spotlight with a finite glucose budget.&rdquo;
                  </p>
                  <p className="text-[11px] sm:text-xs text-charcoal-600 leading-relaxed">
                    When you sit down to write or build, modern algorithmic novelty triggers an involuntary dopamine surge. Pushing through via brute-force self-discipline triggers adrenal fatigue.
                  </p>
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[10px] sm:text-xs text-amber-900">
                    <strong>Rule #1:</strong> Never fight a biological reflex with cognitive effort. Re-engineer the environment first.
                  </div>
                </div>
              )}

              {/* SPREAD 2 LEFT: Protocol Overview */}
              {currentSpread === 2 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta-700 font-bold">
                      Chapter 02 · The 72-Hour Reset
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      Recalibrating Dopamine Baselines
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-charcoal-600 leading-relaxed">
                    By removing hyper-stimulating variable reward loops for just 72 hours, your prefrontal dopamine receptors begin upregulation.
                  </p>
                  {/* Visual 72h graph representation */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-mono font-semibold text-charcoal-700">
                      Day 1: Acute Novelty Withdrawal (Fidgeting)
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-terracotta-500 h-full w-[35%]" />
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-charcoal-700">
                      Day 2: Somatic Resistance Settling
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[70%]" />
                    </div>
                    <div className="text-[10px] font-mono font-semibold text-charcoal-700">
                      Day 3: Baseline Restored (Quiet Flow Restored)
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-sage-600 h-full w-[100%]" />
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 3 LEFT: Somatic Nervous System */}
              {currentSpread === 3 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                      Chapter 04 · Somatic Stability
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      The Vagal Nerve Calming Drill
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-charcoal-600 leading-relaxed">
                    You cannot reason your way out of sympathetic overdrive. Use the double-inhale physiological sigh to activate acetylcholine release:
                  </p>
                  {/* Interactive breathing widget preview */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-600 animate-ping shrink-0 flex items-center justify-center opacity-75">
                      <div className="w-4 h-4 rounded-full bg-emerald-600" />
                    </div>
                    <div className="text-[11px]">
                      <strong>Physiological Sigh:</strong> Two rapid inhales through nose, slow 6-second exhale through mouth. Repeat 3 times.
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 4 LEFT: Summary of Full Edition */}
              {currentSpread === 4 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold">
                      Mastery · Complete Edition
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      Everything Included in Full Access
                    </h4>
                  </div>
                  <ul className="space-y-2 text-[11px] sm:text-xs text-charcoal-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                      <span>{product.pageCount}-page comprehensive workbook (PDF & EPUB)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                      <span>14-Day Fillable Habit & Attention Architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                      <span>3 Guided Deep Work Audio Priming Protocols (MP3)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
                      <span>Lifetime updates and revised editions</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Page Number Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-[10px] text-charcoal-400 font-mono">
                <span>Page {currentSpread * 2 - 1}</span>
                <span className="flex items-center gap-1 text-sage-700 font-sans font-semibold">
                  <ChevronLeft className="w-3 h-3" />
                  Flip Back
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* RIGHT PAGE (RECTO)                                           */}
            {/* ------------------------------------------------------------ */}
            <div
              onClick={handleNext}
              className="relative p-5 sm:p-7 bg-ivory-50 flex flex-col justify-between cursor-pointer overflow-hidden paper-texture"
              title="Click to Flip Next"
            >
              {/* Subtle page curl hover hint on right */}
              <div className="absolute top-0 right-0 bottom-0 w-6 page-curl-shadow-right pointer-events-none" />

              {/* SPREAD 1 RIGHT: Excerpt */}
              {currentSpread === 1 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sage-700 font-bold">
                      Protocol 01 · Attentional Firewall
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      The First 60 Minutes of Consciousness
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-charcoal-700 leading-relaxed">
                    Checking your notifications within 30 minutes of waking forces your brain to bypass its natural hypnopompic alpha state, immediately dumping you into high-frequency beta anxiety.
                  </p>
                  <blockquote className="border-l-2 border-sage-500 pl-2.5 py-1 text-[11px] sm:text-xs italic text-charcoal-700 bg-sage-50/50 rounded-r">
                    &ldquo;When you protect your morning window, you claim sovereignty over the cognitive direction of your entire day.&rdquo;
                  </blockquote>
                  <p className="text-[10px] text-charcoal-500 font-mono">
                    👉 Click this page to flip to the interactive 14-day protocol worksheet.
                  </p>
                </div>
              )}

              {/* SPREAD 2 RIGHT: Interactive Habit Checklist */}
              {currentSpread === 2 && (
                <div className="space-y-2.5">
                  <div className="border-b border-stone-300 pb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta-700 font-bold">
                      Interactive Worksheet · Try It Now
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-charcoal-900 mt-0.5">
                      Your Daily Attention Audit
                    </h4>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-charcoal-600">
                    Click each item to test your daily checklist (included fillable in full PDF):
                  </p>

                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    {interactiveHabits.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => toggleHabit(idx)}
                        className="flex items-center gap-2 p-2 rounded-lg bg-sand-100 hover:bg-sand-200/80 transition-colors cursor-pointer border border-stone-200 text-[11px]"
                      >
                        {item.checked ? (
                          <CheckSquare className="w-4 h-4 text-sage-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-stone-400 shrink-0" />
                        )}
                        <span className={item.checked ? 'line-through text-charcoal-400' : 'text-charcoal-800'}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-sage-700 font-mono font-medium">
                    ✓ All worksheets formatted for both digital PDF and home printing.
                  </div>
                </div>
              )}

              {/* SPREAD 3 RIGHT: Somatic Grounding Checklist */}
              {currentSpread === 3 && (
                <div className="space-y-3">
                  <div className="border-b border-stone-300 pb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                      Exercise 04 · The Emergency Reset
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-charcoal-900 mt-1">
                      Breaking an Emotional Spiral
                    </h4>
                  </div>
                  <p className="text-[11px] sm:text-xs text-charcoal-700 leading-relaxed">
                    When feeling defensive or anxious, do not attempt to speak or make decisions:
                  </p>
                  <div className="space-y-1.5 text-[11px] text-charcoal-700">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-700 font-bold">1.</span>
                      <span>Feel your feet pressed firmly against the solid floor.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-700 font-bold">2.</span>
                      <span>Drop your tongue from the roof of your mouth.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-emerald-700 font-bold">3.</span>
                      <span>Expand your visual peripheral gaze to reduce amygdala activation.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SPREAD 4 RIGHT: Direct Gumroad Checkout CTA */}
              {currentSpread === 4 && (
                <div className="space-y-3 text-center flex flex-col justify-between h-full py-1">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold block">
                      Immediate Worldwide Access
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-900 mt-1">
                      Unlock Full Edition
                    </h4>
                    <p className="text-xs text-charcoal-600 mt-1">
                      Instant secure download via Gumroad.
                    </p>
                  </div>

                  {/* Price & Purchase Trigger */}
                  <div className="p-3 rounded-xl bg-sand-100 border border-stone-300" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-2xl font-serif font-bold text-charcoal-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-charcoal-500">USD</span>
                      {product.originalPrice && (
                        <span className="text-xs text-charcoal-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <GumroadButton
                      product={product}
                      variant="primary"
                      size="sm"
                      label={`Unlock ${product.title}`}
                    />
                  </div>

                  <p className="text-[10px] text-charcoal-400">
                    30-Day Money-Back Guarantee · No Questions Asked
                  </p>
                </div>
              )}

              {/* Page Number Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-[10px] text-charcoal-400 font-mono">
                <span className="flex items-center gap-1 text-sage-700 font-sans font-semibold">
                  Flip Next
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span>Page {currentSpread * 2}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Spread Navigation Tabs */}
      <div className="flex items-center gap-2 mt-4 flex-wrap justify-center text-xs">
        <button
          onClick={() => jumpToSpread(0)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 0
              ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
        >
          Cover
        </button>
        <button
          onClick={() => jumpToSpread(1)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 1
              ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
        >
          Preface & Neuroscience
        </button>
        <button
          onClick={() => jumpToSpread(2)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 2
              ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
        >
          14-Day Protocol
        </button>
        <button
          onClick={() => jumpToSpread(3)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 3
              ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
        >
          Somatic Reset
        </button>
        <button
          onClick={() => jumpToSpread(4)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 4
              ? 'bg-gold-500 text-obsidian-950 shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
        >
          Unlock Full Book
        </button>
      </div>
    </div>
  );
}
