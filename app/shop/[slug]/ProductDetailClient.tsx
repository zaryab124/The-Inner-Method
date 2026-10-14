'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import ThreeBookCanvas from '@/components/ThreeBookCanvas';
import Realistic3DFlipBook from '@/components/Realistic3DFlipBook';
import BookReaderModal from '@/components/BookReaderModal';
import GumroadButton from '@/components/GumroadButton';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Download,
  Star,
  Eye,
  FileText,
  Check,
  BookOpen,
  RotateCw,
} from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'flipbook' | 'webgl'>('flipbook');
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'deliverables' | 'faq'>('overview');

  return (
    <div className="min-h-screen py-10 md:py-16 bg-obsidian-950 text-obsidian-100">
      {/* 3D Sample Reader Modal */}
      <BookReaderModal
        product={product}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-obsidian-400 mb-8 font-mono">
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold-300 transition-colors">
            Publications
          </Link>
          <span>/</span>
          <span className="text-white truncate">{product.title}</span>
        </nav>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Interactive 3D Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* View Mode Toggle */}
            <div className="mb-3 flex items-center gap-2 p-1 rounded-full bg-obsidian-900 border border-gold-500/30 text-xs shadow-soft">
              <button
                onClick={() => setViewMode('flipbook')}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'flipbook'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold shadow-glow-gold'
                    : 'text-obsidian-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>3D Page-Flip Book</span>
              </button>
              <button
                onClick={() => setViewMode('webgl')}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-semibold transition-all ${
                  viewMode === 'webgl'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold shadow-glow-gold'
                    : 'text-obsidian-300 hover:text-white'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>3D Orbit Hardcover</span>
              </button>
            </div>

            <div className="w-full bg-obsidian-900 rounded-3xl border border-gold-500/30 p-4 shadow-2xl border-glow-gold">
              {viewMode === 'flipbook' ? (
                <Realistic3DFlipBook
                  product={product}
                  onPurchaseClick={() => setIsReaderOpen(true)}
                />
              ) : (
                <ThreeBookCanvas
                  currentProduct={product}
                  onOpenReader={() => setIsReaderOpen(true)}
                />
              )}

              {/* Reader Action Strip */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-2">
                <button
                  type="button"
                  onClick={() => setIsReaderOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-gold-300 hover:text-gold-200 transition-colors"
                >
                  <Eye className="w-4 h-4 text-gold-400" />
                  <span>Open Full Screen Sample Reader</span>
                </button>
                <span className="text-[11px] text-obsidian-400 font-mono">
                  {product.pageCount > 0 ? `${product.pageCount} Pages` : 'Draft Edition'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Pricing & Purchase Box */}
          <div className="lg:col-span-6 space-y-6">
            {/* Category & Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-mono text-gold-400 font-bold">
                {product.category}
              </span>
              {product.badge && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/15 text-gold-300 border border-gold-500/30">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title & Subtitle */}
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {product.title}
              </h1>
              <p className="font-serif text-base sm:text-lg text-obsidian-300 mt-2 italic leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-3 text-xs text-obsidian-300">
                <div className="flex text-gold-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">{product.rating} / 5.0</span>
                <span>({product.reviewsCount} verified reader reviews)</span>
              </div>
            )}

            {/* Tagline Summary */}
            <p className="text-sm sm:text-base text-obsidian-200 leading-relaxed bg-obsidian-900 p-4 rounded-2xl border border-white/10">
              {product.tagline}
            </p>

            {/* Format Deliverables Badges */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-obsidian-400 block font-mono">
                Formats Delivered Instantly:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.formats.map((fmt, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-white/15 text-xs text-obsidian-200 font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{fmt}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Card */}
            <div className="p-6 rounded-3xl bg-obsidian-900 border border-gold-500/30 shadow-2xl space-y-4 border-glow-gold">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-serif font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-obsidian-400 ml-1 font-mono">USD</span>
                  {product.originalPrice && (
                    <span className="ml-3 text-sm text-obsidian-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  Single-User Lifetime License
                </span>
              </div>

              {/* Gumroad Hosted Button */}
              <GumroadButton
                product={product}
                variant="full"
                size="lg"
                showDisclaimer={true}
              />

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-obsidian-300">
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Immediate file download</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Content Tabs */}
        <div className="border-t border-white/10 pt-12">
          {/* Tab Navigation */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-white/10 pb-3 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-gold-300 border-b-2 border-gold-500'
                  : 'text-obsidian-400 hover:text-white'
              }`}
            >
              Book Overview & Psychology
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'text-gold-300 border-b-2 border-gold-500'
                  : 'text-obsidian-400 hover:text-white'
              }`}
            >
              Chapters & Sample Content ({product.chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'deliverables'
                  ? 'text-gold-300 border-b-2 border-gold-500'
                  : 'text-obsidian-400 hover:text-white'
              }`}
            >
              Included Files & Formats
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'text-gold-300 border-b-2 border-gold-500'
                  : 'text-obsidian-400 hover:text-white'
              }`}
            >
              Frequently Asked Questions
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 space-y-5 text-obsidian-300 leading-relaxed text-sm sm:text-base">
                <h3 className="font-serif text-2xl font-bold text-white">
                  About This Edition
                </h3>
                {product.longDescription.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                <div className="pt-6">
                  <h4 className="font-serif text-xl font-bold text-white mb-4">
                    Key Outcomes & Skills You Will Build
                  </h4>
                  <ul className="space-y-3 text-sm text-obsidian-200">
                    {product.keyOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl bg-obsidian-900 border border-white/10">
                  <h4 className="font-serif text-lg font-bold text-white mb-3">
                    Who This Book Is Written For:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-obsidian-300">
                    {product.targetAudience.map((audience, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                        <span>{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-3xl bg-obsidian-900 border border-white/10">
                  <h4 className="font-serif text-lg font-bold text-white mb-2">
                    Our Editorial Guarantee
                  </h4>
                  <p className="text-xs text-obsidian-300 leading-relaxed">
                    We do not publish generic summaries or AI-generated filler. Every chapter is designed with original exercises, clinical citations, and structured worksheets you can directly put into practice.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Curriculum / Chapters */}
          {activeTab === 'curriculum' && (
            <div className="py-8 space-y-6 max-w-4xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Table of Contents
                </h3>
                <button
                  onClick={() => setIsReaderOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch 3D Sample Reader</span>
                </button>
              </div>

              <div className="space-y-4">
                {product.chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 shadow-xs space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-gold-400 font-semibold uppercase tracking-wider">
                        Chapter {ch.number}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {ch.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-obsidian-300 leading-relaxed">
                      {ch.description}
                    </p>
                    {ch.sampleText && (
                      <div className="pt-2">
                        <blockquote className="border-l-2 border-gold-500 pl-3 italic text-xs text-obsidian-300 font-serif">
                          &ldquo;{ch.sampleText[0]}&rdquo;
                        </blockquote>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Included Files & Formats */}
          {activeTab === 'deliverables' && (
            <div className="py-8 max-w-4xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                What You Receive in Your Download Package
              </h3>
              <p className="text-sm text-obsidian-300 leading-relaxed">
                Immediately after completing checkout on Gumroad, you gain access to an organized digital archive containing:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.includedAssets.map((asset, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-obsidian-900 border border-white/10 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">{asset}</h5>
                      <span className="text-xs text-obsidian-400">Instant download · DRM-free</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="py-8 max-w-3xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Questions About This Title
              </h3>
              <div className="space-y-4">
                {product.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-2"
                  >
                    <h5 className="font-serif font-bold text-white text-base">
                      {faq.question}
                    </h5>
                    <p className="text-xs sm:text-sm text-obsidian-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
