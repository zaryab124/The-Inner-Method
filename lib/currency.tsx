'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { CURRENCIES, CurrencyCode, CurrencyConfig } from './currencyData';
export { CURRENCIES };
export type { CurrencyCode, CurrencyConfig };

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUsd: number, targetCurrency?: CurrencyCode) => string;
  convertPrice: (amountInUsd: number, targetCurrency?: CurrencyCode) => number;
  currentConfig: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tim_preferred_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      }
    } catch {
      // localStorage may fail in restricted/SSR environments
    }
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('tim_preferred_currency', c);
    } catch {
      // ignore
    }
  };

  const convertPrice = (amountInUsd: number, targetCurrency?: CurrencyCode): number => {
    const config = CURRENCIES[targetCurrency || currency] || CURRENCIES.USD;
    const converted = amountInUsd * config.rate;
    if (config.decimalPlaces === 0) {
      return Math.round(converted);
    }
    return Number(converted.toFixed(config.decimalPlaces));
  };

  const formatPrice = (amountInUsd: number, targetCurrency?: CurrencyCode): string => {
    const config = CURRENCIES[targetCurrency || currency] || CURRENCIES.USD;
    const value = convertPrice(amountInUsd, targetCurrency || currency);
    if (config.decimalPlaces === 0) {
      return `${config.symbol}${value.toLocaleString()}`;
    }
    return `${config.symbol}${value.toFixed(config.decimalPlaces)}`;
  };

  const currentConfig = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currentConfig,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback for non-provider components
    return {
      currency: 'USD',
      setCurrency: () => {},
      formatPrice: (amt: number) => `$${amt.toFixed(2)}`,
      convertPrice: (amt: number) => amt,
      currentConfig: CURRENCIES.USD,
    };
  }
  return context;
}

export function CurrencySelectorDropdown({ className = '' }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        aria-label="Select store display currency"
        className="bg-neutral-900/90 text-neutral-200 text-xs font-mono font-medium py-1.5 px-2.5 rounded-lg border border-amber-500/30 hover:border-amber-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-sm transition-colors"
      >
        {Object.values(CURRENCIES).map((curr) => (
          <option key={curr.code} value={curr.code} className="bg-neutral-950 text-white">
            {curr.flag} {curr.code} ({curr.symbol.trim()})
          </option>
        ))}
      </select>
    </div>
  );
}
