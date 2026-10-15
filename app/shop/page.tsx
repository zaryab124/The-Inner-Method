'use client';

import React, { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import BookCard3D from '@/components/BookCard3D';
import BookReaderModal from '@/components/BookReaderModal';
import { Sparkles, CheckCircle2, ShieldCheck, Filter, BookOpen } from 'lucide-react';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [readerProduct, setReaderProduct] = useState<Product | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  const categories = [
    'All',
    'Neuroscience & Performance',
    'Global Education',
    'Admissions & Strategy',
    'Master Bundles',
  ];

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleOpenReader = (product: Product) => {
    setReaderProduct(product);
    setIsReaderOpen(true);
  };

  return (
    <div className="min-h-screen py-12 md:py-20 bg-obsidian-950 text-obsidian-100">
      {/* 3D Reader Modal */}
      <BookReaderModal
        product={readerProduct}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            <span>Masterclass Publications Suite</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            The Inner Method Publications & Toolkits
          </h1>
          <p className="text-base text-obsidian-300 leading-relaxed">
            Instant digital access to original masterclass editions by Stanford neuroscientist Dr. Andrew Huberman and Harvard alumnus Dr. Karan Gupta. Delivered in high-resolution printable PDF and interactive 3D browser editions.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-white/10 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-obsidian-400 mr-2 flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-gold-400" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold shadow-glow-gold'
                  : 'bg-obsidian-900 text-obsidian-300 hover:text-white hover:bg-obsidian-850 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <BookCard3D
              key={product.id}
              product={product}
              onOpenReader={handleOpenReader}
            />
          ))}
        </div>

        {/* Buying with Confidence Box */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-obsidian-900 border border-gold-500/30 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Paysafe Secure Checkout</span>
              </h4>
              <p className="text-xs text-obsidian-300 leading-relaxed">
                All purchases are processed securely through our private Paysafe payment channel with bank-level encryption. Your card data is never stored on our servers.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Instant Digital Delivery</span>
              </h4>
              <p className="text-xs text-obsidian-300 leading-relaxed">
                Receive download links immediately on screen and via email right after purchase. Access your library whenever you need.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <span>30-Day Money-Back Guarantee</span>
              </h4>
              <p className="text-xs text-obsidian-300 leading-relaxed">
                If the framework does not provide tangible value for your focus or emotional clarity, request a full refund within 30 days without hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
