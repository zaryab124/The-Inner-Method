'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import PaysafeCheckoutButton from '@/components/PaysafeCheckoutButton';
import { useCurrency } from '@/lib/currency';

interface BookReaderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookReaderModal({
  product,
  isOpen,
  onClose,
}: BookReaderModalProps) {
  const { formatPrice } = useCurrency();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const chapters = product.chapters || [];
  const totalPages = chapters.length + 2; // Cover + Intro + Chapters

  const nextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-900/80 backdrop-blur-md animate-fadeIn">
      {/* Reader Dialog */}
      <div className="relative w-full max-w-4xl bg-ivory-100 rounded-3xl shadow-2xl border border-stone-300 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-ivory-200/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sage-700">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-charcoal-900 text-sm sm:text-base">
                {product.title} — Digital Sample Preview
              </h4>
              <p className="text-xs text-charcoal-500">
                Sample Reader · Page {currentPageIndex + 1} of {totalPages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200/80 text-charcoal-600 transition-colors"
              aria-label="Close preview reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reader Book Body: Two Page Spread Experience */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 paper-texture">
          <div className="max-w-2xl mx-auto bg-ivory-50 rounded-2xl border border-stone-200 shadow-book p-6 sm:p-10 relative">
            {/* Center Gutter Fold Shadow */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-stone-400/10 to-transparent pointer-events-none hidden md:block" />

            {/* Page 0: Cover & Front Matter */}
            {currentPageIndex === 0 && (
              <div className="text-center py-6">
                <span
                  className="text-xs uppercase tracking-[0.3em] font-semibold"
                  style={{
                    color: product.slug === 'the-huberman-blueprint' ? '#E07A5F' : '#E63946',
                  }}
                >
                  {product.slug === 'the-huberman-blueprint'
                    ? 'THE HUBERMAN BLUEPRINT'
                    : 'THE STUDY ABROAD PLAYBOOK'}
                </span>
                <div className="w-12 h-px bg-gold-400 mx-auto my-4" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-2">
                  {product.title}
                </h2>
                <p className="text-sm sm:text-base text-charcoal-600 max-w-md mx-auto mt-3 italic font-serif">
                  {product.subtitle}
                </p>

                <div className="my-8 py-6 border-y border-stone-200 text-left space-y-3 text-xs sm:text-sm text-charcoal-700">
                  <p className="font-medium text-charcoal-900 uppercase tracking-wider text-[11px]">
                    Table of Selected Chapters in Sample:
                  </p>
                  {chapters.slice(0, 6).map((ch, idx) => (
                    <div key={idx} className="flex justify-between items-baseline border-b border-dotted border-stone-300 pb-1">
                      <span className="font-serif">Chapter {ch.number}: {ch.title}</span>
                      <span className="text-charcoal-400 text-xs font-mono">Excerpt</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-charcoal-400">
                  Use the navigation controls below to flip to the first chapter excerpt.
                </p>
              </div>
            )}

            {/* Page 1: Author Note & Method Grounding */}
            {currentPageIndex === 1 && (
              <div className="space-y-5 text-charcoal-800 leading-relaxed text-sm sm:text-base">
                <div className="border-b border-stone-200 pb-3">
                  <span
                    className="text-xs uppercase font-mono tracking-wider font-bold"
                    style={{
                      color: product.slug === 'the-huberman-blueprint' ? '#E07A5F' : '#E63946',
                    }}
                  >
                    {product.slug === 'the-huberman-blueprint'
                      ? 'Masterclass Dialogue · Dr. Andrew Huberman & Raj Shamani'
                      : 'Masterclass Dialogue · Dr. Karan Gupta & Raj Shamani'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-1">
                    {product.slug === 'the-huberman-blueprint'
                      ? 'On Cortisol Timing, NSDR, Dynamic States & The Cost of Greatness'
                      : 'On Scarcity Math, Visa Mirages & Real Education ROI'}
                  </h3>
                </div>

                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-charcoal-900">
                  {product.slug === 'the-huberman-blueprint'
                    ? 'Dr. Andrew Huberman, tenured professor of neurobiology and ophthalmology at Stanford University School of Medicine and host of the Huberman Lab podcast, begins with a truth that transforms how we understand human biology: high performance is not an accident of genetics—it is an engineered neurochemical cascade.'
                    : 'Dr. Karan Gupta, an alumnus of Harvard Business School who has guided over 100,000 students across three decades of admissions counseling, begins with a truth that most education agents conceal: there is never a 100% guarantee of getting a job abroad unless you approach admissions with calculated precision.'}
                </p>

                <p>
                  {product.slug === 'the-huberman-blueprint'
                    ? 'Anyone can push for a few hours. The person who wins over 5 to 10 years is the one who knows how to calibrate their off-switch, process emotional stress without burnout, and harness friction.'
                    : 'Every year, hundreds of thousands of Indian families pledge their life savings or mortgage ancestral homes with a singular vision. But degrees alone do not guarantee outcomes outside India where campus placement cells do not exist.'}
                </p>

                <blockquote
                  className="border-l-2 pl-4 py-1 italic font-serif text-charcoal-700 bg-amber-50/60 rounded-r-md"
                  style={{
                    borderColor: product.slug === 'the-huberman-blueprint' ? '#E07A5F' : '#E63946',
                  }}
                >
                  {product.slug === 'the-huberman-blueprint' ? (
                    <>
                      &ldquo;If I only had 5 minutes to talk to somebody, I would say: this is the best thing you can do for your health and performance. High morning cortisol, low nighttime cortisol.&rdquo;
                    </>
                  ) : (
                    <>
                      &ldquo;If you are going to take a heavy loan, sell your mother’s jewelry, or mortgage your family home for an average degree at an unknown university—do not go abroad. We will find you something in India.&rdquo;
                    </>
                  )}
                </blockquote>

                <p>
                  {product.slug === 'the-huberman-blueprint'
                    ? 'This 54-page master blueprint distills protocols for morning light, autonomic nervous system down-regulation, non-sleep deep rest (Yoga Nidra), and the 10-Year Mastery Framework.'
                    : 'This playbook synthesizes operational algorithms, profile evaluation architectures, and the MATCH framework to ensure your foreign education compounds for life.'}
                </p>
              </div>
            )}

            {/* Chapter Excerpt Pages */}
            {currentPageIndex >= 2 && chapters[currentPageIndex - 2] && (
              <div className="space-y-4 text-charcoal-800 leading-relaxed text-sm sm:text-base">
                <div className="border-b border-stone-200 pb-3">
                  <span className="text-xs font-mono tracking-wider text-terracotta-600 font-semibold uppercase">
                    Chapter {chapters[currentPageIndex - 2].number}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-1">
                    {chapters[currentPageIndex - 2].title}
                  </h3>
                  <p className="text-xs text-charcoal-500 italic mt-0.5">
                    {chapters[currentPageIndex - 2].description}
                  </p>
                </div>

                {chapters[currentPageIndex - 2].sampleText?.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                <div className="mt-8 p-5 bg-sand-100 rounded-xl border border-sand-200">
                  <h5 className="font-serif font-bold text-charcoal-900 text-sm">
                    Interactive Workbook Exercise Included in Full Edition:
                  </h5>
                  <p className="text-xs text-charcoal-600 mt-1">
                    The complete purchase contains the fillable 14-day protocol worksheet, self-reflection prompts, and accompanying audio guidance for this chapter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-ivory-200/70 border-t border-stone-200/80">
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-charcoal-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <span className="text-xs text-charcoal-500 font-mono px-2">
              {currentPageIndex + 1} / {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPageIndex === totalPages - 1}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-charcoal-700 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden md:block">
              <span className="text-xs text-charcoal-500 block">Full Edition:</span>
              <span className="text-sm font-serif font-bold text-charcoal-900">
                {formatPrice(product.price)}
              </span>
            </div>
            <PaysafeCheckoutButton
              product={product}
              variant="primary"
              size="sm"
              label={`Unlock Full ${product.title}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
