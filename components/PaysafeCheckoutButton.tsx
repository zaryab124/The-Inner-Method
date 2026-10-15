'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useCurrency } from '@/lib/currency';
import PaysafeCheckoutModal from './PaysafeCheckoutModal';

interface PaysafeCheckoutButtonProps {
  product: Product;
  variant?: 'primary' | 'secondary' | 'badge' | 'full';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showDisclaimer?: boolean;
  className?: string;
  onOpenReader?: (product: Product) => void;
}

export default function PaysafeCheckoutButton({
  product,
  variant = 'primary',
  size = 'md',
  label,
  showDisclaimer = false,
  className = '',
  onOpenReader,
}: PaysafeCheckoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const isComingSoon = product.status === 'coming_soon';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isComingSoon) return;

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('the_inner_method_event', {
          detail: {
            eventType: 'checkout_paysafe_initiated',
            productId: product.id,
            productSlug: product.slug,
            price: product.price,
            timestamp: new Date().toISOString(),
          },
        })
      );
    }

    setIsModalOpen(true);
  };

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs rounded-xl',
    md: 'px-5 py-3 text-sm rounded-xl',
    lg: 'px-7 py-4 text-base rounded-2xl font-bold',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all duration-200 border border-amber-300/50 font-bold',
    secondary:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition-all duration-200 border border-emerald-400 font-bold',
    badge:
      'bg-amber-600/90 text-white hover:bg-amber-500 transition-colors font-semibold',
    full:
      'w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all duration-200 border border-amber-300/50 font-bold',
  };

  if (isComingSoon) {
    return (
      <div className="flex flex-col gap-1.5">
        <button
          disabled
          className={`cursor-not-allowed opacity-60 bg-neutral-800 text-neutral-400 font-medium ${sizeClasses[size]} ${className}`}
        >
          Coming Soon · Pre-orders Opening
        </button>
      </div>
    );
  }

  const defaultButtonText = label || `Get Instant Access — ${formatPrice(product.price)}`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex items-center justify-center gap-2 group transition-transform active:scale-[0.98] cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
          title={`Purchase ${product.title} securely via Paysafe`}
        >
          <Lock className="w-3.5 h-3.5 shrink-0 opacity-80" />
          <span>{defaultButtonText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {showDisclaimer && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              Direct private checkout via Paysafe · Instant PDF download & VAT receipt.
            </span>
          </div>
        )}
      </div>

      {/* Paysafe Checkout Modal */}
      <PaysafeCheckoutModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenReader={onOpenReader}
      />
    </>
  );
}
