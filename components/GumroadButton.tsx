'use client';

import React from 'react';
import { Product } from '@/data/products';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface GumroadButtonProps {
  product: Product;
  variant?: 'primary' | 'secondary' | 'badge' | 'full';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showDisclaimer?: boolean;
  className?: string;
}

export default function GumroadButton({
  product,
  variant = 'primary',
  size = 'md',
  label,
  showDisclaimer = false,
  className = '',
}: GumroadButtonProps) {
  const isComingSoon = product.status === 'coming_soon';
  const checkoutUrl = product.gumroadUrl || 'https://gumroad.com';

  const trackCheckoutClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('the_inner_method_event', {
          detail: {
            eventType: 'checkout_redirect',
            productId: product.id,
            productSlug: product.slug,
            price: product.price,
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  };

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs rounded-xl',
    md: 'px-5 py-3 text-sm rounded-xl',
    lg: 'px-7 py-4 text-base rounded-2xl font-bold',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian-950 hover:brightness-110 shadow-glow-gold transition-all duration-200 border border-gold-400/50 font-bold',
    secondary:
      'bg-emerald-600 text-white hover:bg-emerald-700 shadow-glow-emerald transition-all duration-200 border border-emerald-500 font-bold',
    badge:
      'bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors font-semibold',
    full:
      'w-full bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 text-obsidian-950 hover:brightness-110 shadow-glow-gold transition-all duration-200 border border-gold-400/50 font-bold',
  };

  if (isComingSoon) {
    return (
      <div className="flex flex-col gap-1.5">
        <button
          disabled
          className={`cursor-not-allowed opacity-60 bg-obsidian-800 text-obsidian-400 font-medium ${sizeClasses[size]} ${className}`}
        >
          Coming Soon · Pre-orders Opening
        </button>
      </div>
    );
  }

  const defaultButtonText = label || `Get Instant Access — $${product.price.toFixed(2)}`;

  return (
    <div className="flex flex-col gap-2">
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackCheckoutClick}
        className={`inline-flex items-center justify-center gap-2 group transition-transform active:scale-[0.98] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        title={`Purchase ${product.title} securely via Gumroad`}
      >
        <span>{defaultButtonText}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>

      {showDisclaimer && (
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-obsidian-400 mt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            Secure hosted checkout & instant digital download handled by Gumroad.
          </span>
        </div>
      )}
    </div>
  );
}
