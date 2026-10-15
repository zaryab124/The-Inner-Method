'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Download,
  BookOpen,
  X,
  Globe,
  HelpCircle,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Product } from '@/data/products';
import { useCurrency, CURRENCIES, CurrencyCode } from '@/lib/currency';

interface CompletedOrder {
  id: string;
  receiptNumber: string;
  customer: {
    name: string;
    email: string;
    country: string;
  };
  productTitle: string;
  totalAmount: number;
  currency: string;
  paymentMethod: string;
  paymentReference: string;
  createdAt: string;
  downloadUrl: string;
  downloadToken: string;
}

interface PaysafeCheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReader?: (product: Product) => void;
}

type TabType = 'card' | 'paysafecard' | 'skrill' | 'wallets' | 'wire';

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Netherlands',
  'Switzerland',
  'Singapore',
  'United Arab Emirates',
  'Saudi Arabia',
  'Pakistan',
  'India',
  'Ireland',
  'New Zealand',
  'South Africa',
  'Spain',
  'Italy',
  'Sweden',
  'Norway',
  'International / Other',
];

export default function PaysafeCheckoutModal({
  product,
  isOpen,
  onClose,
  onOpenReader,
}: PaysafeCheckoutModalProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Form State
  const [activeTab, setActiveTab] = useState<TabType>('card');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCountry, setCustomerCountry] = useState('United States');

  // Card details
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Paysafecard details
  const [pscPin, setPscPin] = useState('');

  // Skrill details
  const [skrillEmail, setSkrillEmail] = useState('');

  // UI state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isProcessing, onClose]);

  // Reset form when modal opens with new product
  useEffect(() => {
    if (isOpen) {
      setErrorMessage('');
      setCompletedOrder(null);
      setIsProcessing(false);
      setProcessingStep(0);
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const currentPriceFormatted = formatPrice(product.price);
  const originalPriceFormatted = product.originalPrice ? formatPrice(product.originalPrice) : null;

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  // Format Exp (MM/YY)
  const handleCardExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardExp(raw);
  };

  // Format Paysafecard PIN (XXXX-XXXX-XXXX-XXXX)
  const handlePscPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setPscPin(parts.join('-'));
  };

  // Detect card type
  const getCardType = () => {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'Mastercard';
    if (/^3[47]/.test(clean)) return 'American Express';
    return 'Card';
  };

  // Submit payment
  const handleProcessPayment = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name for order issuance.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address to receive your download link and receipt.');
      return;
    }

    // Specific payment method validations
    if (activeTab === 'card') {
      const cleanNum = cardNumber.replace(/\D/g, '');
      if (cleanNum.length < 15) {
        setErrorMessage('Please enter a valid 15 or 16-digit credit/debit card number.');
        return;
      }
      if (cardExp.length < 5) {
        setErrorMessage('Please enter card expiry in MM/YY format.');
        return;
      }
      if (cardCvv.length < 3) {
        setErrorMessage('Please enter a 3 or 4-digit CVV security code.');
        return;
      }
    } else if (activeTab === 'paysafecard') {
      const cleanPin = pscPin.replace(/\D/g, '');
      if (cleanPin.length !== 16) {
        setErrorMessage('Please enter your 16-digit paysafecard prepaid voucher PIN.');
        return;
      }
    }

    setIsProcessing(true);
    setProcessingStep(1);

    // Simulated 3-stage security handshake
    setTimeout(() => setProcessingStep(2), 700);
    setTimeout(() => setProcessingStep(3), 1300);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customer: {
            name: customerName,
            email: customerEmail,
            country: customerCountry,
          },
          paymentMethod:
            activeTab === 'card'
              ? 'paysafe_card'
              : activeTab === 'paysafecard'
              ? 'paysafecard'
              : activeTab === 'skrill'
              ? 'skrill'
              : activeTab === 'wire'
              ? 'bank_wire'
              : 'apple_pay',
          currency,
          cardDetails:
            activeTab === 'card'
              ? {
                  number: cardNumber,
                  exp: cardExp,
                  cvv: cardCvv,
                }
              : undefined,
          paysafecardPin: activeTab === 'paysafecard' ? pscPin : undefined,
          skrillEmail: activeTab === 'skrill' ? skrillEmail || customerEmail : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Payment gateway connection refused. Please try again.');
      }

      setCompletedOrder(data.order);
      setIsProcessing(false);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F59E0B', '#10B981', '#FFFFFF'],
        });
      } catch {
        // non-critical
      }
    } catch (err: unknown) {
      setIsProcessing(false);
      const msg = err instanceof Error ? err.message : 'Payment processing failed. Please check your details.';
      setErrorMessage(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-2xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-amber-500/30 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden text-neutral-100 my-auto"
      >
        {/* Top Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          aria-label="Close checkout modal"
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-full transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Body Container */}
        <div className="p-5 sm:p-7 max-h-[85vh] overflow-y-auto">
          {/* SUCCESS STATE */}
          {completedOrder ? (
            <div className="text-center py-4 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Paysafe Payment Verified & Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Your Publication is Ready
                </h2>
                <p className="text-neutral-400 text-sm mt-1 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{completedOrder.customer.name}</strong>. Your payment of{' '}
                  <strong className="text-amber-400 font-mono">
                    {completedOrder.currency} {completedOrder.totalAmount}
                  </strong>{' '}
                  has been verified.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Order Reference:</span>
                  <span className="text-amber-400 font-semibold">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">VAT / Tax Receipt:</span>
                  <span className="text-neutral-200">{completedOrder.receiptNumber}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-400">Licensed To:</span>
                  <span className="text-neutral-200 truncate max-w-[200px]">{completedOrder.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Payment Channel:</span>
                  <span className="text-neutral-200">Paysafe Private Gateway ({completedOrder.paymentMethod})</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                {/* Instant Download Button */}
                <a
                  href={completedOrder.downloadUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all text-sm sm:text-base"
                >
                  <Download className="w-5 h-5" />
                  Download Master Publication PDF (Instant)
                </a>

                {/* Read in 3D Button */}
                {onOpenReader && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenReader(product);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-medium text-neutral-200 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-amber-500/40 transition-colors text-sm"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    Open & Read in Interactive 3D FlipBook
                  </button>
                )}

                {/* Support & Lookup Link */}
                <div className="pt-2 flex items-center justify-center gap-4 text-xs text-neutral-400">
                  <a
                    href="/support"
                    target="_blank"
                    className="inline-flex items-center gap-1 hover:text-amber-300 underline underline-offset-4"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Order Lookup & VAT Invoices
                  </a>
                  <span>·</span>
                  <a
                    href="/support"
                    target="_blank"
                    className="inline-flex items-center gap-1 hover:text-amber-300 underline underline-offset-4"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Customer Support Portal
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <div>
              {/* Product Header Card */}
              <div className="flex gap-4 items-start pb-5 border-b border-neutral-800">
                <div className="relative w-16 h-22 sm:w-20 sm:h-28 rounded-lg overflow-hidden border border-amber-500/30 flex-shrink-0 bg-neutral-900 shadow-md">
                  {product.coverImage ? (
                    <Image
                      src={product.coverImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-400">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium tracking-wide bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1">
                    {product.badge || 'Digital Master Edition'}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug truncate">
                    {product.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    {product.subtitle}
                  </p>

                  {/* Price & Currency Bar */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/60">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                        {currentPriceFormatted}
                      </span>
                      {originalPriceFormatted && (
                        <span className="text-xs font-mono text-neutral-500 line-through">
                          {originalPriceFormatted}
                        </span>
                      )}
                    </div>

                    {/* Currency Selector */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Globe className="w-3.5 h-3.5 text-neutral-500" />
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                        className="bg-neutral-800 text-neutral-200 text-xs font-mono py-1 px-2 rounded border border-neutral-700 hover:border-amber-500/40 focus:outline-none"
                      >
                        {Object.values(CURRENCIES).map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.symbol.trim()})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ERROR ALERT */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-lg bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                  <span className="font-bold">Error:</span> {errorMessage}
                </div>
              )}

              {/* CHECKOUT FORM */}
              <form onSubmit={handleProcessPayment} className="mt-5 space-y-4">
                {/* Section 1: Customer Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      1. Customer & Delivery Details
                    </label>
                    <span className="text-[11px] text-neutral-500">Private & Confidential</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        disabled={isProcessing}
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Delivery Email Address"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        disabled={isProcessing}
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      value={customerCountry}
                      onChange={(e) => setCustomerCountry(e.target.value)}
                      disabled={isProcessing}
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 2: Payment Method Tabs */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                      2. Paysafe Payment Channel
                    </label>
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                    </span>
                  </div>

                  {/* Tabs Bar */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('card')}
                      className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center ${
                        activeTab === 'card'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      💳 Cards
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('paysafecard')}
                      className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center ${
                        activeTab === 'paysafecard'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🎟️ paysafecard
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('skrill')}
                      className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center ${
                        activeTab === 'skrill'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🟣 Skrill
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('wallets')}
                      className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center ${
                        activeTab === 'wallets'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      📱 Wallets
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('wire')}
                      className={`py-2 px-1 text-xs font-medium rounded-lg transition-all text-center ${
                        activeTab === 'wire'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      🏛️ Wire/IBAN
                    </button>
                  </div>

                  {/* TAB 1: CREDIT / DEBIT CARD */}
                  {activeTab === 'card' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                        <span>Visa · Mastercard · American Express · Discover</span>
                        <span className="text-amber-400 font-mono font-medium">{getCardType()}</span>
                      </div>

                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Card Number (4242 •••• •••• 4242)"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          disabled={isProcessing}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={cardExp}
                          onChange={handleCardExpChange}
                          disabled={isProcessing}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none"
                        />
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="CVV / CVC"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          disabled={isProcessing}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Protected by Paysafe 3D-Secure 2.0 biometric fraud shielding.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: PAYSAFECARD PREPAID PIN */}
                  {activeTab === 'paysafecard' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3"
                    >
                      <div className="text-xs text-neutral-300 leading-relaxed">
                        <strong>paysafecard</strong> allows cash-based online payments without requiring a bank account or credit card. Available in 50+ countries.
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          ENTER 16-DIGIT PREPAID VOUCHER PIN:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="0123 - 4567 - 8901 - 2345"
                          value={pscPin}
                          onChange={handlePscPinChange}
                          disabled={isProcessing}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-wider text-amber-400 placeholder-neutral-600 focus:outline-none"
                        />
                      </div>

                      <p className="text-[11px] text-neutral-500">
                        The purchase amount of <span className="text-neutral-300 font-mono">{currentPriceFormatted}</span> will be deducted directly from your voucher balance.
                      </p>
                    </motion.div>
                  )}

                  {/* TAB 3: SKRILL / NETELLER */}
                  {activeTab === 'skrill' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-3"
                    >
                      <div className="text-xs text-neutral-300">
                        Complete your purchase seamlessly using your <strong>Skrill Digital Wallet</strong> balance or Neteller account.
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          SKRILL WALLET ACCOUNT EMAIL:
                        </label>
                        <input
                          type="email"
                          placeholder={customerEmail || 'your-skrill@domain.com'}
                          value={skrillEmail}
                          onChange={(e) => setSkrillEmail(e.target.value)}
                          disabled={isProcessing}
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-400/60 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>

                      <div className="text-[11px] text-neutral-500">
                        1-Click Paysafe tokenized authentication is applied upon submitting.
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: WALLETS (APPLE PAY / GOOGLE PAY) */}
                  {activeTab === 'wallets' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 text-center space-y-3"
                    >
                      <div className="text-xs text-neutral-300">
                        Fast checkout with <strong>Apple Pay</strong> or <strong>Google Pay</strong> via Paysafe wallet tokenization.
                      </div>

                      <div className="py-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!customerName || !customerEmail) {
                              setErrorMessage('Please fill in your name and delivery email first.');
                              return;
                            }
                            handleProcessPayment();
                          }}
                          disabled={isProcessing}
                          className="w-full py-3 px-6 rounded-xl bg-white hover:bg-neutral-100 text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                        >
                          <span className="font-bold">Pay</span> / <span className="font-bold">G Pay</span>
                          <span>— Instant {currentPriceFormatted}</span>
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500">
                        Supported on compatible iOS, macOS, Android, and Chrome browsers.
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: WIRE / SWIFT / IBAN */}
                  {activeTab === 'wire' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 space-y-2 text-xs font-mono text-neutral-300"
                    >
                      <div className="text-neutral-400 font-sans text-xs">
                        For institutional or corporate international payments:
                      </div>
                      <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 space-y-1">
                        <div><strong>Beneficiary:</strong> The Inner Method Publishing Ltd.</div>
                        <div><strong>Routing Channel:</strong> Paysafe Direct Wire Network</div>
                        <div><strong>Reference Note:</strong> TIM-DIRECT-{Date.now().toString().slice(-6)}</div>
                      </div>
                      <div className="text-[11px] text-neutral-400 font-sans">
                        Clicking Purchase below generates your instant order license and lock-in invoice reference.
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* PROCESSING OVERLAY */}
                {isProcessing && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-amber-400 border-t-transparent" />
                    <div className="text-xs font-mono text-amber-300">
                      {processingStep === 1 && 'Connecting to Paysafe Secure Payment Gateway...'}
                      {processingStep === 2 && 'Validating 3D-Secure 2.0 & Tokenizing...'}
                      {processingStep === 3 && 'Authorizing order & issuing digital license...'}
                    </div>
                  </div>
                )}

                {/* SUBMIT BUTTON */}
                {activeTab !== 'wallets' && (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl font-semibold text-neutral-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay {currentPriceFormatted} & Unlock Instant Download</span>
                  </button>
                )}

                {/* TRUST BADGES FOOTER */}
                <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Paysafe Secured & Verified</span>
                  </div>
                  <div>
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div>
                    <span>Instant PDF & 3D Reader</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
