'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import GumroadButton from '@/components/GumroadButton';

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
                <span className="text-xs uppercase tracking-[0.3em] text-sage-700 font-semibold">
                  THE INNER METHOD PUBLISHING
                </span>
                <div className="w-12 h-px bg-sage-400 mx-auto my-4" />
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
                  {chapters.slice(0, 4).map((ch, idx) => (
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
                  <span className="text-xs uppercase font-mono tracking-wider text-sage-700">
                    Publisher&apos;s Note
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-1">
                    On Depth, Willpower, and Neural Architecture
                  </h3>
                </div>

                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-charcoal-900">
                  We live in an age where distraction is not an accidental byproduct of modern life; it is the deliberate objective of multi-billion-dollar algorithms engineered to monetize human attention scatter.
                </p>

                <p>
                  For years, mainstream self-help urged individuals to cultivate more willpower, to force themselves into discipline through harsh inner reprimands. Yet modern neuroimaging reveals that the prefrontal cortex—the biological seat of executive focus—has a strict metabolic limit.
                </p>

                <blockquote className="border-l-2 border-sage-500 pl-4 py-1 italic font-serif text-charcoal-700 bg-sage-50/60 rounded-r-md">
                  &ldquo;When you change the architecture of your environment and somatic baseline, deep focus stops feeling like an exhausting battle and returns as your organic state.&rdquo;
                </blockquote>

                <p>
                  Every workbook and audio protocol from The Inner Method is built around this single premise: <span className="font-medium text-charcoal-900">sustainable cognitive sovereignty requires changing your system, not your self-worth.</span>
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
                ${product.price.toFixed(2)} USD
              </span>
            </div>
            <GumroadButton
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
