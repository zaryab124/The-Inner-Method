'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { playPageTurnSound, playCoverOpenSound } from '@/lib/sound';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Volume2,
  VolumeX,
  Eye,
  CheckSquare,
  Square,
  Globe,
  Download,
} from 'lucide-react';
import PaysafeCheckoutButton from '@/components/PaysafeCheckoutButton';
import { useCurrency } from '@/lib/currency';

interface Realistic3DFlipBookProps {
  product: Product;
  className?: string;
  onPurchaseClick?: () => void;
}

export default function Realistic3DFlipBook({
  product,
  className = '',
}: Realistic3DFlipBookProps) {
  const { formatPrice } = useCurrency();
  // Page index: 0 = Closed Cover, 1 = Spread 1, 2 = Spread 2, 3 = Spread 3, 4 = Spread 4
  const [currentSpread, setCurrentSpread] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const isHuberman = product.slug === 'the-huberman-blueprint';

  // Interactive checklist: The Five Removals Test (Study Abroad)
  const [removalsChecklist, setRemovalsChecklist] = useState([
    { label: '1. Remove the Brochure (Strip glossy lawns, audit core curriculum & faculty)', checked: true },
    { label: '2. Remove the Logo (If unbranded, does the knowledge justify ₹50L–₹1Cr?)', checked: true },
    { label: '3. Remove Other People (Would you go if nobody in your network knew?)', checked: false },
    { label: '4. Remove Parental Expectations (Erase generational scripts & false status)', checked: false },
    { label: '5. Remove Fantasy of Placements (Assume 0 campus placement cells exist)', checked: false },
  ]);

  // Interactive checklist: The Daily Neuro-Performance Stack (Huberman)
  const [hubermanChecklist, setHubermanChecklist] = useState([
    { label: '1. Morning Sunlight (5–10 min outdoor photons within 60 min of waking)', checked: true },
    { label: '2. Hydrate & Delay Caffeine (16–32 oz water; delay caffeine 90 min)', checked: true },
    { label: '3. 10-Breath Meditation (Prior to leaving bed to set autonomic state)', checked: true },
    { label: '4. The Wall Method (Lean into cold shower/mental friction waves)', checked: false },
    { label: '5. Proprioceptive Eye Reset (Closed eyes saccade + long exhale for sleep)', checked: false },
  ]);

  const totalSpreads = 4;

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

  const toggleRemoval = (index: number) => {
    setRemovalsChecklist((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const toggleHubermanItem = (index: number) => {
    setHubermanChecklist((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const samplePdfUrl = isHuberman
    ? '/samples/Huberman_Cortisol_Protocol_Sample_Guide.pdf'
    : '/samples/Study_Abroad_5_Removals_Sample_Playbook.pdf';

  const accentColor = isHuberman ? '#E07A5F' : '#E63946';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Top Mode Bar */}
      <div className="w-full flex items-center justify-between mb-4 px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-mono text-[11px]">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>
              {isHuberman ? 'Interactive 3D Huberman Blueprint' : 'Interactive 3D Study Abroad Playbook'}
            </span>
          </span>
          <span className="hidden sm:inline text-obsidian-300 text-[11px]">
            Click corners or tabs to turn pages with audio
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
      <div className="relative w-full max-w-[760px] h-[440px] sm:h-[490px] perspective-1500 flex items-center justify-center my-2">
        {/* Volumetric Desk Shadow */}
        <div className="absolute -bottom-6 w-[85%] h-12 bg-black/70 filter blur-2xl rounded-full pointer-events-none" />

        {/* ============================================================ */}
        {/* SPREAD 0: CLOSED HARDCOVER PRESENTATION                       */}
        {/* ============================================================ */}
        {currentSpread === 0 && (
          <div
            onClick={handleNext}
            className="group relative w-[290px] sm:w-[330px] h-[420px] sm:h-[470px] cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:rotate-1"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Book Spine (Left 3D side) */}
            <div
              className="absolute top-0 left-0 w-[36px] h-full origin-left border-l border-gold-500/30"
              style={{
                transform: 'rotateY(-90deg) translateX(-36px)',
                backgroundColor: isHuberman ? '#09121D' : '#050E1A',
              }}
            >
              <div className="w-full h-full flex flex-col justify-between py-6 items-center book-spine-gradient">
                <span className="text-[9px] uppercase tracking-widest text-gold-300/80 font-bold rotate-90 whitespace-nowrap">
                  {isHuberman ? 'DR. ANDREW HUBERMAN' : 'DR. KARAN GUPTA'}
                </span>
                <span className="text-[10px] font-serif font-bold text-white tracking-widest rotate-90 whitespace-nowrap">
                  {isHuberman ? 'THE HUBERMAN BLUEPRINT' : 'THE STUDY ABROAD PLAYBOOK'}
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
            <div
              className={`relative w-full h-full rounded-r-xl rounded-l-xs bg-gradient-to-br ${
                isHuberman
                  ? 'from-[#09121D] via-[#112033] to-[#1D3147]'
                  : 'from-[#050E1A] via-[#0A192F] to-[#172A45]'
              } border border-gold-500/40 p-6 flex flex-col justify-between shadow-book overflow-hidden text-center`}
            >
              {/* Outer Golden Border & Accents */}
              <div className="absolute inset-3 border border-gold-500/30 rounded-lg pointer-events-none" />
              <div className="absolute inset-4 border border-gold-500/15 rounded pointer-events-none" />

              {/* Spine Crease Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 via-gold-500/10 to-transparent pointer-events-none" />

              {/* Top Masterclass Badge */}
              <div className="relative z-10 pt-2">
                <span className="inline-block px-3 py-1 text-[8.5px] uppercase tracking-[0.25em] font-sans font-bold text-gold-300 border border-gold-400/40 bg-black/40 rounded">
                  {isHuberman ? 'BASED ON THE VIRAL INTERVIEW' : 'BASED ON THE IN-DEPTH MASTERCLASS'}
                </span>
              </div>

              {/* Center Emblem */}
              <div className="relative z-10 my-1">
                {isHuberman ? (
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#E07A5F]/20 to-amber-500/20 flex items-center justify-center border border-[#E07A5F]/50 shadow-glow-gold">
                    <span className="text-3xl animate-pulse filter drop-shadow-[0_0_8px_rgba(224,122,95,0.7)]">
                      🧠
                    </span>
                  </div>
                ) : (
                  <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center border border-teal-400/40 shadow-glow-emerald">
                    <Globe className="w-8 h-8 text-teal-400 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Title & Accent */}
              <div className="relative z-10 px-2">
                <h3 className="font-serif text-xl sm:text-2xl font-black text-white tracking-wider leading-tight">
                  {isHuberman ? 'THE HUBERMAN' : 'THE STUDY ABROAD'}
                </h3>
                <span
                  className="block font-serif text-2xl sm:text-3xl font-black tracking-widest mt-0.5"
                  style={{ color: accentColor }}
                >
                  {isHuberman ? 'BLUEPRINT' : 'PLAYBOOK'}
                </span>
                <div className="w-16 h-0.5 bg-gold-400 mx-auto my-2" />
                <p className="text-[11px] sm:text-xs text-white/85 font-sans leading-relaxed">
                  {isHuberman
                    ? "A Neuroscientist's Complete System to Train Your Brain for Peak Performance, Unbreakable Resilience & Deep Rest"
                    : 'How to Win the Global Education Game, Secure High-Paying Careers & Avoid the 1-Crore Debt Trap'}
                </p>
              </div>

              {/* Author & Counselor Credentials */}
              <div className="relative z-10 border-t border-gold-500/20 pt-2 text-[10px] text-white/70">
                <p className="tracking-wider uppercase text-[8.5px]">INSIGHTS FROM</p>
                <p className="font-bold text-white text-[11px] tracking-wide">
                  {isHuberman ? 'DR. ANDREW HUBERMAN' : 'DR. KARAN GUPTA'}
                </p>
                <p className="text-[9px] text-gold-300/90 font-sans">
                  {isHuberman
                    ? 'STANFORD NEUROSCIENTIST & HOST OF HUBERMAN LAB'
                    : 'HARVARD BUSINESS SCHOOL ALUMNUS · 100,000+ STUDENTS'}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-semibold border border-gold-500/40">
                  <Eye className="w-3 h-3" />
                  <span>Click Cover to Open Sample & Flip</span>
                </div>
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SPREADS 1, 2, 3, 4: OPEN TWO-PAGE SPREADS WITH REAL PAGES    */}
        {/* ============================================================ */}
        {currentSpread > 0 && (
          <div
            className="relative w-full max-w-[720px] h-[400px] sm:h-[460px] bg-[#FDFBF7] rounded-xl shadow-2xl border border-stone-300 grid grid-cols-2 overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Center Gutter Fold Shadow & Spine Stitching */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-stone-400/25 via-stone-500/40 to-stone-400/25 z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-stone-500/40 z-20 pointer-events-none" />

            {/* Silk Ribbon Bookmark */}
            <div
              className="absolute top-0 left-[51%] w-3 h-32 rounded-b shadow-md z-30 pointer-events-none"
              style={{ backgroundColor: accentColor }}
            >
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            {/* ------------------------------------------------------------ */}
            {/* LEFT PAGE (VERSO)                                            */}
            {/* ------------------------------------------------------------ */}
            <div
              onClick={handlePrev}
              className="relative p-5 sm:p-6 bg-[#FAF7F2] flex flex-col justify-between border-r border-stone-200 cursor-pointer overflow-hidden paper-texture"
              title="Click to Flip Back"
            >
              <div className="absolute top-0 left-0 bottom-0 w-6 page-curl-shadow-left pointer-events-none" />

              {/* SPREAD 1 LEFT: Copyright & Masterclass Origin */}
              {currentSpread === 1 && (
                <div className="space-y-2.5">
                  <div className="border-b border-stone-300 pb-1.5 text-center">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'The Huberman Blueprint' : 'The Study Abroad Playbook'}
                    </h4>
                    <p className="text-[10px] text-stone-500">
                      Based on the in-depth dialogue between<br />
                      <strong className="text-stone-800">
                        {isHuberman ? 'Dr. Andrew Huberman' : 'Dr. Karan Gupta'}
                      </strong>{' '}
                      and <strong className="text-stone-800">Raj Shamani</strong>
                    </p>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed text-justify">
                    {isHuberman
                      ? 'Dr. Andrew Huberman is a tenured professor of neurobiology and ophthalmology at Stanford University School of Medicine and host of the Huberman Lab podcast, one of the world’s most listened-to science platforms.'
                      : 'Dr. Karan Gupta is an alumnus of Harvard Business School who has guided over 100,000 students across three decades of foreign admissions counseling, maintaining a premier acceptance track record at top global institutions.'}
                  </p>
                  <p className="text-[10px] text-stone-600 leading-relaxed text-justify">
                    {isHuberman
                      ? 'This volume distills his clinical principles, autonomic nervous system protocols, cortisol timing algorithms, and mental resilience tools into a 54-page actionable master manual.'
                      : 'This volume synthesizes his operational frameworks, profile evaluation algorithms, visa realities, ROI metrics, and career strategies into a strategic master guide.'}
                  </p>
                  <div className="p-2 rounded bg-stone-100 border border-stone-300 text-[9.5px] text-stone-600">
                    <strong>First Edition · 2026:</strong> Formulated for practical execution, physical stamina, and scientific decision clarity.
                  </div>
                </div>
              )}

              {/* SPREAD 2 LEFT: Chapter 01 */}
              {currentSpread === 2 && (
                <div className="space-y-2.5">
                  <div className="border-b border-stone-300 pb-1">
                    <span
                      className="text-[9.5px] font-mono uppercase tracking-widest font-bold"
                      style={{ color: accentColor }}
                    >
                      {isHuberman ? 'Chapter 01 · The Cortisol Code' : 'Chapter 01 · Reality Check'}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'High Morning, Low Nighttime' : 'The Indian Scarcity Math'}
                    </h4>
                  </div>
                  <p className="text-[10.5px] sm:text-xs text-stone-700 leading-relaxed text-justify">
                    {isHuberman
                      ? 'Cortisol is an energy-deploying hormone. When you spike cortisol in the morning within 30-60 min of waking, it naturally suppresses melatonin and sets a 14-16 hour countdown timer for deep sleep.'
                      : 'Every year, hundreds of thousands of Indian families pledge life savings or mortgage ancestral homes with one vision: a foreign corporate job that pays off every debt.'}
                  </p>
                  <div
                    className="p-2 rounded bg-amber-50 border-l-2 text-[10px] text-stone-800 italic"
                    style={{ borderColor: accentColor }}
                  >
                    {isHuberman ? (
                      <>
                        &ldquo;If I only had 5 minutes to talk to somebody, I would say: this is the best thing you can do for health and performance. High morning cortisol, low nighttime cortisol.&rdquo;
                        <span className="block text-[9px] font-semibold not-italic mt-1" style={{ color: accentColor }}>
                          — Dr. Andrew Huberman
                        </span>
                      </>
                    ) : (
                      <>
                        &ldquo;If you are going to take a heavy loan or mortgage your family home for an average degree at an unknown university—do not go abroad.&rdquo;
                        <span className="block text-[9px] font-semibold not-italic mt-1" style={{ color: accentColor }}>
                          — Dr. Karan Gupta
                        </span>
                      </>
                    )}
                  </div>
                  <div className="space-y-1 text-[9.5px] text-stone-700">
                    {isHuberman ? (
                      <>
                        <p><strong>• Sunlight:</strong> 5–10 min outdoor photons (overcast is fine).</p>
                        <p><strong>• Hydration:</strong> 16–32 oz water before caffeine to spike energy.</p>
                        <p><strong>• Caffeine Rule:</strong> Delay 90–120 min to avoid afternoon crash.</p>
                      </>
                    ) : (
                      <>
                        <p><strong>• IIT JEE:</strong> 14.75 Lakh candidates fight for ~18,160 seats.</p>
                        <p><strong>• IIM CAT:</strong> 2.58 Lakh fight for &lt;0.2% acceptance.</p>
                        <p><strong>• Undergrad Reality:</strong> Generic salaries start at ₹20k–₹30k/mo.</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* SPREAD 3 LEFT: Chapter 03 */}
              {currentSpread === 3 && (
                <div className="space-y-2.5">
                  <div className="border-b border-stone-300 pb-1">
                    <span
                      className="text-[9.5px] font-mono uppercase tracking-widest font-bold"
                      style={{ color: isHuberman ? '#3D405B' : '#0F766E' }}
                    >
                      {isHuberman ? 'Chapter 03 · Restoration' : 'Chapter 03 & 06 · Strategy Matrix'}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'Yoga Nidra & NSDR' : 'The 5 Personas & $100B GCCs'}
                    </h4>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-stone-700">
                    {isHuberman
                      ? 'The deliberate shift from thinking and planning into pure sensation:'
                      : 'Education advice cannot be one-size-fits-all:'}
                  </p>
                  {isHuberman ? (
                    <div className="space-y-1.5 text-[9.5px] text-stone-800">
                      <div className="bg-stone-100 p-1.5 rounded">
                        <strong>• Striatal Dopamine Reset:</strong> 20 min NSDR restores dopamine comparable to 2 hours of REM sleep.
                      </div>
                      <div className="bg-stone-100 p-1.5 rounded">
                        <strong>• Proprioceptive Eye Trick:</strong> Closed eyes, move left-right, counterclockwise, clockwise, look to nose with long exhale. Turns off body position in cerebellum.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-[9.5px] text-stone-800">
                      <p className="bg-stone-100 p-1 rounded"><strong>1. Rahul (Safe Bet, ₹25–50L):</strong> Stay in India; target ISB (₹24L CTC).</p>
                      <p className="bg-stone-100 p-1 rounded"><strong>2. Ananya (Risk Taker):</strong> US Top Tier STEM with 3-yr OPT.</p>
                      <p className="bg-stone-100 p-1 rounded"><strong>3. Zara (Healthcare):</strong> UK-to-US Hybrid hack (save ₹1.5 Cr).</p>
                    </div>
                  )}
                  <div className="p-2 rounded bg-amber-50/80 border border-stone-300 text-[9.5px] text-stone-800">
                    {isHuberman ? (
                      <>
                        <strong>Zero Pill Rule:</strong> &ldquo;No drug will do this in a healthy way. Any drug that shuts off thinking rebounds rough.&rdquo;
                      </>
                    ) : (
                      <>
                        <strong>India’s $100B GCC Goldmine:</strong> 2,100+ GCCs employ 2.36M pros. Returning graduates earn ₹35L–₹75L+ with zero visa anxiety!
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* SPREAD 4 LEFT: Chapter 04 / 10 */}
              {currentSpread === 4 && (
                <div className="space-y-2.5">
                  <div className="border-b border-stone-300 pb-1">
                    <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#0A192F] font-bold">
                      {isHuberman ? 'Chapter 04 · Mastery Timeline' : 'Chapter 10 & 11 · True ROI'}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'The 10-Year Mastery Framework' : 'ROI = X (Financial) + Y (Agency)'}
                    </h4>
                  </div>
                  {isHuberman ? (
                    <div className="space-y-1.5 text-[9.5px] text-stone-700">
                      <div className="p-1.5 bg-stone-100 rounded border-l-2 border-[#E07A5F]">
                        <strong>Years 1–3 (Gas Pedal):</strong> Go all-in. High volume, discovery, find your edge. Just don’t die.
                      </div>
                      <div className="p-1.5 bg-stone-100 rounded border-l-2 border-stone-400">
                        <strong>Years 4–6 (Dynamic Regulation):</strong> Balance capacity ±2 hrs. Avoid autoimmune crashes and high night cortisol.
                      </div>
                      <div className="p-1.5 bg-stone-100 rounded border-l-2 border-emerald-600">
                        <strong>Years 7–10+ (The Pro Stage):</strong> Focused intensity in fewer reps. Ultra-discipline paired with playfulness.
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="p-2 bg-stone-100 rounded border border-stone-300 font-mono text-[9.5px] text-[#0A192F]">
                        ROI = X (Starting Salary & Debt Amortization) + Y (Critical Judgment & Global Network)
                      </div>
                      <p className="text-[10px] text-stone-700 leading-relaxed text-justify">
                        Outside India, placement cells do not exist. You are buying judgment, sovereignty, and high-agency networks.
                      </p>
                      <div className="space-y-1 text-[9.5px] text-stone-700">
                        <p><strong>• 100% Free Tuition:</strong> Graduate Assistantships (TA/RA).</p>
                        <p><strong>• Cosigner-Free Loans:</strong> Up to ₹1 Crore+ via Prodigy/MPOWER.</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Page Number Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-[9.5px] text-stone-400 font-mono">
                <span>Page {currentSpread * 2 - 1}</span>
                <span className="flex items-center gap-1 text-stone-600 font-sans font-semibold">
                  <ChevronLeft className="w-3 h-3" />
                  Previous
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* RIGHT PAGE (RECTO)                                           */}
            {/* ------------------------------------------------------------ */}
            <div
              onClick={handleNext}
              className="relative p-5 sm:p-6 bg-[#FDFBF7] flex flex-col justify-between cursor-pointer overflow-hidden paper-texture"
              title="Click to Flip Next"
            >
              <div className="absolute top-0 right-0 bottom-0 w-6 page-curl-shadow-right pointer-events-none" />

              {/* SPREAD 1 RIGHT: Complete Table of Contents */}
              {currentSpread === 1 && (
                <div className="space-y-1.5">
                  <div className="border-b border-stone-300 pb-1">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      Table of Contents
                    </h4>
                    <div className="w-8 h-0.5" style={{ backgroundColor: accentColor }} />
                  </div>
                  <ul className="text-[9px] sm:text-[9.5px] text-stone-700 space-y-0.5 font-sans">
                    {isHuberman ? (
                      <>
                        <li><strong style={{ color: accentColor }}>01</strong> The Cortisol Code</li>
                        <li><strong style={{ color: accentColor }}>02</strong> The Art of Turning Off</li>
                        <li><strong style={{ color: accentColor }}>03</strong> Yoga Nidra & The Sleep Reset</li>
                        <li><strong style={{ color: accentColor }}>04</strong> The 10-Year Mastery Framework</li>
                        <li><strong style={{ color: accentColor }}>05</strong> The Neuroscience of Choking</li>
                        <li><strong style={{ color: accentColor }}>06</strong> Building Courage & Resilience</li>
                        <li><strong style={{ color: accentColor }}>07</strong> Clutch States Over Flow States</li>
                        <li><strong style={{ color: accentColor }}>08</strong> The Winner’s Mentality</li>
                        <li><strong style={{ color: accentColor }}>09</strong> The Immigrant Edge & Identity</li>
                        <li><strong style={{ color: accentColor }}>10</strong> The Cost of Greatness</li>
                        <li><strong style={{ color: accentColor }}>A</strong> Appendix: The Complete Playbook</li>
                      </>
                    ) : (
                      <>
                        <li><strong style={{ color: accentColor }}>01</strong> The Brutal Reality Check</li>
                        <li><strong style={{ color: accentColor }}>02</strong> The Five Removals Test</li>
                        <li><strong style={{ color: accentColor }}>03</strong> The Five Student Personas</li>
                        <li><strong style={{ color: accentColor }}>04</strong> The Country Cycle & Visa Mirage</li>
                        <li><strong style={{ color: accentColor }}>05</strong> Future-Proofing Degrees With Tech</li>
                        <li><strong style={{ color: accentColor }}>06</strong> GCCs: India’s Hidden $100B Goldmine</li>
                        <li><strong style={{ color: accentColor }}>07</strong> Rankings vs. Reality: The Harvard Truth</li>
                        <li><strong style={{ color: accentColor }}>08</strong> The Elite Network & Jan Koum Rule</li>
                        <li><strong style={{ color: accentColor }}>09</strong> 5 Whys & The SSF Conflict</li>
                        <li><strong style={{ color: accentColor }}>10</strong> The Real Education ROI Equation</li>
                        <li><strong style={{ color: accentColor }}>11</strong> Funding, Scholarships & 3-Box Profile</li>
                        <li><strong style={{ color: accentColor }}>12</strong> The MATCH Strategy & Emotional Cost</li>
                      </>
                    )}
                  </ul>
                  <p className="text-[9px] font-semibold pt-1" style={{ color: accentColor }}>
                    👉 Click to turn to Chapter 01
                  </p>
                </div>
              )}

              {/* SPREAD 2 RIGHT: Chapter 02 (Huberman: Left vs Right Column / Study Abroad: Dundee vs Bath) */}
              {currentSpread === 2 && (
                <div className="space-y-2">
                  <div className="border-b border-stone-300 pb-1">
                    <span
                      className="text-[9.5px] font-mono uppercase tracking-widest font-bold"
                      style={{ color: accentColor }}
                    >
                      {isHuberman ? 'Chapter 02 · Mental Operational Filter' : 'Case Comparison'}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'Navy SEAL Left vs. Right Column' : 'A Tale of Two Outcomes'}
                    </h4>
                  </div>
                  {isHuberman ? (
                    <div className="space-y-1.5 text-[9.5px] text-stone-700">
                      <div className="p-2 rounded bg-red-50 border-l-2 border-red-500">
                        <strong className="text-red-700 block text-[10px]">LEFT COLUMN (0% CONTROL)</strong>
                        Past regrets, online comments, flight delays, algorithms, others’ opinions. Obsessing over this creates chronic elevated night cortisol.
                      </div>
                      <div className="p-2 rounded bg-teal-50 border-l-2 border-teal-600">
                        <strong className="text-teal-800 block text-[10px]">RIGHT COLUMN (100% CONTROL)</strong>
                        Hydration, sleep timing, sunlight, workout intensity, next action. Filter all daily cognitive energy into this column exclusively.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5 text-[9.5px] text-stone-700">
                      <div className="p-2 rounded bg-red-50 border-l-2 border-[#E63946]">
                        <strong className="text-[#E63946] block text-[10px]">CASE A: DUNDEE (£25,000 Loan)</strong>
                        Took a generic Finance Master’s in Dundee. No jobs materialized. Spent an entire year washing vegetables before returning in heavy debt.
                      </div>
                      <div className="p-2 rounded bg-teal-50 border-l-2 border-teal-600">
                        <strong className="text-teal-800 block text-[10px]">CASE B: BATH & NOTTINGHAM</strong>
                        Targeted Bath, interned strategically with King Cobra and House of Lords, secured high-growth UK tech career.
                      </div>
                    </div>
                  )}
                  <p className="text-[9px] text-stone-600 font-sans italic">
                    {isHuberman
                      ? 'The person who can turn off their brain in the final hour will surpass the grinder in 5 to 10 years.'
                      : 'The difference wasn’t luck: it was pedigree, specialization, and networking initiative.'}
                  </p>
                </div>
              )}

              {/* SPREAD 3 RIGHT: Interactive Diagnostic */}
              {currentSpread === 3 && (
                <div className="space-y-2">
                  <div className="border-b border-stone-300 pb-1">
                    <span
                      className="text-[9.5px] font-mono uppercase tracking-widest font-bold"
                      style={{ color: accentColor }}
                    >
                      Interactive Diagnostic
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F]">
                      {isHuberman ? 'The Daily Neuro-Stack Checklist' : 'The Five Removals Test'}
                    </h4>
                  </div>
                  <p className="text-[9.5px] text-stone-600">
                    {isHuberman
                      ? 'Click each behavioral checkpoint to audit your daily neurochemistry:'
                      : 'Click each filter to test your candidate university:'}
                  </p>
                  <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                    {isHuberman
                      ? hubermanChecklist.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleHubermanItem(idx)}
                            className="flex items-start gap-1.5 p-1.5 rounded bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer border border-stone-200 text-[9.5px]"
                          >
                            {item.checked ? (
                              <CheckSquare className="w-3.5 h-3.5 text-[#E07A5F] shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                            )}
                            <span className={item.checked ? 'text-stone-900 font-medium' : 'text-stone-500'}>
                              {item.label}
                            </span>
                          </div>
                        ))
                      : removalsChecklist.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleRemoval(idx)}
                            className="flex items-start gap-1.5 p-1.5 rounded bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer border border-stone-200 text-[9.5px]"
                          >
                            {item.checked ? (
                              <CheckSquare className="w-3.5 h-3.5 text-[#E63946] shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                            )}
                            <span className={item.checked ? 'text-stone-900 font-medium' : 'text-stone-500'}>
                              {item.label}
                            </span>
                          </div>
                        ))}
                  </div>
                  <p className="text-[9px] text-stone-500">
                    {isHuberman
                      ? 'Consistency beats intensity. Execute this neurochemical baseline every day.'
                      : 'If the curriculum still seduces you after all 5 removals—only then go!'}
                  </p>
                </div>
              )}

              {/* SPREAD 4 RIGHT: Unlock Full Edition */}
              {currentSpread === 4 && (
                <div className="space-y-2 text-center flex flex-col justify-between h-full py-1">
                  <div>
                    <span
                      className="text-[9.5px] font-mono uppercase tracking-widest font-bold block"
                      style={{ color: accentColor }}
                    >
                      {isHuberman ? 'Official Master Edition' : 'Chapter 12 · Job Acquisition'}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#0A192F] mt-0.5">
                      {isHuberman ? 'Unlock The Complete 54-Page Blueprint' : 'The MATCH Strategy'}
                    </h4>
                    <p className="text-[9.5px] text-stone-600">
                      {isHuberman
                        ? 'Instant access to all 10 chapters, the complete Appendix, VO2 max protocols & audio guidance.'
                        : 'Map Market · Assemble Evidence · Target Ecosystem · Combine AI & Humans · Hone Mock Interviews'}
                    </p>
                  </div>

                  {/* Immediate Download & Purchase Box */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-stone-300" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-2xl font-serif font-black text-[#0A192F]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <PaysafeCheckoutButton
                      product={product}
                      variant="primary"
                      size="sm"
                      label={isHuberman ? 'Unlock The Huberman Blueprint' : 'Unlock The Complete Playbook'}
                    />
                    <a
                      href={samplePdfUrl}
                      download={isHuberman ? 'Huberman_Cortisol_Protocol_Sample_Guide.pdf' : 'Study_Abroad_5_Removals_Sample_Playbook.pdf'}
                      className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-stone-700 hover:text-[#E07A5F] font-semibold underline underline-offset-2"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Free 4-Page Field Guide Sample</span>
                    </a>
                  </div>

                  <p className="text-[9px] text-stone-500">
                    {isHuberman
                      ? '&ldquo;I look forward to the day that someone says: I heard this conversation and I went for it.&rdquo;'
                      : '&ldquo;Information will expire. Judgment travels forever.&rdquo;'}
                  </p>
                </div>
              )}

              {/* Page Number Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-[9.5px] text-stone-400 font-mono">
                <span className="flex items-center gap-1 text-stone-600 font-sans font-semibold">
                  Next
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
              ? 'text-white shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
          style={{ backgroundColor: currentSpread === 0 ? accentColor : undefined }}
        >
          Book Cover
        </button>
        <button
          onClick={() => jumpToSpread(1)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 1
              ? 'text-white shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
          style={{ backgroundColor: currentSpread === 1 ? accentColor : undefined }}
        >
          TOC & Credentials
        </button>
        <button
          onClick={() => jumpToSpread(2)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 2
              ? 'text-white shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
          style={{ backgroundColor: currentSpread === 2 ? accentColor : undefined }}
        >
          {isHuberman ? 'Ch 01 Cortisol & Turning Off' : 'Ch 01 Scarcity & Dundee vs Bath'}
        </button>
        <button
          onClick={() => jumpToSpread(3)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 3
              ? 'text-white shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
          style={{ backgroundColor: currentSpread === 3 ? accentColor : undefined }}
        >
          {isHuberman ? 'NSDR & Neuro-Stack' : 'The 5 Removals Diagnostic'}
        </button>
        <button
          onClick={() => jumpToSpread(4)}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
            currentSpread === 4
              ? 'text-white shadow-md font-bold'
              : 'bg-obsidian-800 text-obsidian-300 hover:text-white border border-white/10'
          }`}
          style={{ backgroundColor: currentSpread === 4 ? accentColor : undefined }}
        >
          {isHuberman ? 'Unlock 54-Page Blueprint' : 'Unlock Full Playbook'}
        </button>
      </div>
    </div>
  );
}
