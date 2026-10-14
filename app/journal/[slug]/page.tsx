import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { PRODUCTS } from '@/data/products';
import { ArrowLeft, Clock, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Essay Not Found' };

  return {
    title: `${article.title} — The Inner Method Journal`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const recommendedProduct =
    article.category === 'Emotional Regulation'
      ? PRODUCTS[1]
      : PRODUCTS[0];

  return (
    <div className="min-h-screen py-12 md:py-20 bg-obsidian-950 text-obsidian-100">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-obsidian-400 hover:text-gold-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Essays</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3 text-xs text-obsidian-400 font-mono">
            <span className="px-2.5 py-1 rounded bg-gold-500/15 text-gold-300 font-semibold font-sans border border-gold-500/30">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-obsidian-400" />
              {article.publishedAt}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-obsidian-400" />
              {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-gold-100/80 italic leading-relaxed">
            {article.subtitle}
          </p>
        </header>

        {/* Key Takeaways Callout Box */}
        <div className="my-10 p-6 rounded-2xl bg-obsidian-900 border border-gold-500/30 space-y-3 border-glow-gold">
          <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>Key Takeaways at a Glance</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-obsidian-300">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-obsidian-200 text-base sm:text-lg leading-relaxed font-normal">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Author sign-off & Imprint */}
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-obsidian-400">
          <div>
            <strong className="block text-white font-serif text-sm">
              The Inner Method Editorial Team
            </strong>
            <span>Dedicated to science-backed cognitive sovereignty</span>
          </div>
        </div>

        {/* Recommended Book Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-obsidian-900 border border-gold-500/30 shadow-2xl border-glow-gold">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            Related Publication
          </span>
          <h3 className="font-serif text-2xl font-bold text-white mb-2">
            Go Deeper with {recommendedProduct.title}
          </h3>
          <p className="text-sm text-obsidian-300 mb-6 leading-relaxed">
            {recommendedProduct.shortDescription}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/shop/${recommendedProduct.slug}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-xs font-bold hover:brightness-110 text-center transition-all shadow-glow-gold"
            >
              Inspect 3D Edition & Preview
            </Link>
            <span className="text-xs text-gold-300 font-mono">
              ${recommendedProduct.price.toFixed(2)} USD · Instant Digital Download
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
