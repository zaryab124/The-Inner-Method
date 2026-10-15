'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import GumroadButton from '@/components/GumroadButton';

interface BookCard3DProps {
  product: Product;
  onOpenReader?: (product: Product) => void;
  showActions?: boolean;
}

export default function BookCard3D({
  product,
  onOpenReader,
  showActions = true,
}: BookCard3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking for 3D card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 16;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isComingSoon = product.status === 'coming_soon';

  return (
    <div className="group relative flex flex-col bg-obsidian-900 rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:shadow-2xl hover:border-gold-500/40 hover:-translate-y-1">
      {/* Badge Header */}
      <div className="flex items-center justify-between mb-4">
        {product.badge ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30">
            <Sparkles className="w-3 h-3 text-gold-400" />
            {product.badge}
          </span>
        ) : (
          <span className="text-xs uppercase tracking-wider text-obsidian-400 font-mono">
            {product.category}
          </span>
        )}
        <span className="text-xs text-obsidian-400 font-mono">{product.readTime}</span>
      </div>

      {/* 3D Realistic Book Perspective Container */}
      <div
        className="relative w-full h-[320px] flex items-center justify-center perspective-1200 cursor-pointer my-2"
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft Desk Ambient Drop Shadow */}
        <div
          className={`absolute bottom-6 w-44 h-8 bg-black/80 rounded-full filter blur-xl transition-all duration-500 transform ${
            isHovered ? 'scale-110 opacity-90 translate-y-3' : 'opacity-60'
          }`}
        />

        {/* 3D Book Assembly */}
        <div
          className="relative w-[190px] h-[270px] transform-style-3d transition-transform duration-300 ease-out"
          style={{
            transform: isHovered
              ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(20px)`
              : 'rotateX(8deg) rotateY(-18deg) rotateZ(1deg)',
          }}
        >
          {/* Book Spine (Left 3D side) */}
          <div
            className="absolute top-0 left-0 w-[30px] h-full origin-left bg-obsidian-950 border-l border-gold-500/30 transform-style-3d"
            style={{
              transform: 'rotateY(-90deg) translateX(-30px)',
              backgroundColor: product.coverTheme.spineColor,
            }}
          >
            <div className="w-full h-full flex flex-col justify-between py-4 items-center book-spine-gradient">
              <span className="text-[9px] uppercase tracking-widest text-gold-300/80 font-semibold rotate-90 whitespace-nowrap">
                {product.slug === 'the-huberman-blueprint'
                  ? 'DR. HUBERMAN'
                  : product.slug === 'the-study-abroad-playbook'
                  ? 'DR. GUPTA'
                  : 'THE INNER METHOD'}
              </span>
              <span className="text-[10px] font-serif font-bold text-white tracking-wider rotate-90 whitespace-nowrap">
                {product.title}
              </span>
              <span className="text-[8px] text-gold-400 rotate-90 font-mono">2026</span>
            </div>
          </div>

          {/* Book Pages Thickness (Right Edge) */}
          <div
            className="absolute top-1 right-0 w-[24px] h-[264px] origin-right book-pages-side transform-style-3d rounded-r-sm border-r border-stone-400 shadow"
            style={{
              transform: 'rotateY(90deg) translateZ(-1px)',
            }}
          />

          {/* Book Bottom Pages Thickness */}
          <div
            className="absolute bottom-0 left-0 w-full h-[24px] origin-bottom book-pages-side transform-style-3d border-b border-stone-400"
            style={{
              transform: 'rotateX(-90deg)',
            }}
          />

          {/* Hardcover Front Plate */}
          <div
            className={`absolute inset-0 rounded-r-md rounded-l-xs bg-gradient-to-br ${product.coverTheme.bgGradient} p-4 flex flex-col justify-between border border-gold-500/40 shadow-book overflow-hidden`}
          >
            {/* If product has cover image, show it as background */}
            {product.coverImage && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={product.coverImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Spine Crease visual highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/70 via-gold-500/10 to-transparent pointer-events-none z-10" />

            {/* Foil Border Accent */}
            <div className="absolute inset-2 border border-gold-500/30 rounded pointer-events-none z-10" />

            {!product.coverImage && (
              <>
                {/* Top publisher emblem */}
                <div className="relative z-10 flex flex-col items-center text-center pt-2">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold-300/90 font-medium">
                    MASTERCLASS EDITION
                  </span>
                  <div className="w-8 h-px bg-gold-500/40 my-1.5" />
                </div>

                {/* Center Book Title */}
                <div className="relative z-10 text-center px-1">
                  <h3 className="font-serif text-lg font-bold text-white leading-snug drop-shadow-sm">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-gold-100/80 mt-1 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Center Foil Geometry Badge */}
                <div className="relative z-10 flex justify-center py-1">
                  <div className="w-10 h-10 rounded-full border border-gold-500/50 flex items-center justify-center bg-gold-500/10 shadow-glow-gold">
                    <div className="w-6 h-6 rotate-45 border border-gold-400/70 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom Format & Pages */}
                <div className="relative z-10 text-center border-t border-gold-500/20 pt-2 pb-1">
                  <span className="text-[9px] uppercase tracking-wider text-gold-300/90 font-mono">
                    {product.pageCount > 0 ? `${product.pageCount} Pages · Master Edition` : 'Coming Soon'}
                  </span>
                </div>
              </>
            )}

            {/* Dynamic Hover Specular Sheen */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent transition-opacity duration-300"
                style={{
                  transform: `translate(${rotate.y * 3}px, ${rotate.x * 3}px)`,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Book Metadata & Pricing */}
      <div className="flex-1 flex flex-col justify-between mt-4">
        <div>
          <Link href={`/shop/${product.slug}`} className="group/link block">
            <h4 className="font-serif text-xl font-bold text-white group-hover/link:text-gold-300 transition-colors">
              {product.title}
            </h4>
          </Link>
          <p className="text-xs text-obsidian-300 mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Deliverables summary */}
        <div className="my-4 space-y-1.5 pt-3 border-t border-white/10 text-xs text-obsidian-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{product.formats[0]} & {product.formats[1] || 'Guides'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Instant delivery worldwide via Gumroad</span>
          </div>
        </div>

        {/* Price & CTA Action Buttons */}
        <div className="pt-2">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-2xl font-bold font-serif text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-obsidian-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-emerald-400 font-medium">
              {isComingSoon ? 'Pre-launch notification' : '30-Day Guarantee'}
            </span>
          </div>

          {showActions && (
            <div className="grid grid-cols-2 gap-2">
              {onOpenReader && !isComingSoon ? (
                <button
                  type="button"
                  onClick={() => onOpenReader(product)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/15 text-obsidian-200 hover:bg-white/10 hover:text-white text-xs font-semibold transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-gold-400" />
                  <span>Preview</span>
                </button>
              ) : (
                <Link
                  href={`/shop/${product.slug}`}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/15 text-obsidian-200 hover:bg-white/10 text-xs font-semibold transition-all"
                >
                  <span>Details</span>
                </Link>
              )}

              {isComingSoon ? (
                <Link
                  href="/free-resources"
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-obsidian-800 text-white text-xs font-semibold hover:bg-obsidian-750 transition-colors"
                >
                  Notify Me
                </Link>
              ) : (
                <GumroadButton
                  product={product}
                  variant="primary"
                  size="sm"
                  label="Purchase"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
