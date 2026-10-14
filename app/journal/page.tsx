import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Journal — Essays on Attention, Dopamine & Cognitive Psychology',
  description:
    'In-depth essays examining the neurobiology of attention, breaking emotional trigger loops, and designing deep work protocols.',
};

export default function JournalPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-obsidian-950 text-obsidian-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-gold-400" />
            <span>The Inner Method Journal</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight">
            Essays on Cognitive Depth & Self-Investigation
          </h1>

          <p className="text-base text-obsidian-300 leading-relaxed">
            Thoughtful dispatches dissecting the biological mechanics of distraction, emotional triggers, and deliberate life architecture.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-8">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="p-8 sm:p-10 rounded-3xl bg-obsidian-900 border border-white/10 shadow-soft hover:shadow-2xl hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-obsidian-400 font-mono mb-3">
                <span className="px-2.5 py-1 rounded-md bg-gold-500/15 text-gold-300 font-semibold font-sans border border-gold-500/30">
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

              <Link href={`/journal/${article.slug}`} className="block">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>

              <p className="font-serif italic text-gold-100/80 mt-2 text-sm sm:text-base">
                {article.subtitle}
              </p>

              <p className="text-obsidian-300 text-sm mt-4 leading-relaxed line-clamp-3">
                {article.summary}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3 Key Takeaways Included</span>
                </div>

                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 group-hover:text-gold-300 transition-colors"
                >
                  <span>Read Complete Essay</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
