export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'PKR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // Multiply USD price by this rate
  decimalPlaces: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1.0, decimalPlaces: 2 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.79, decimalPlaces: 2 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.92, decimalPlaces: 2 },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.36, decimalPlaces: 2 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 1.52, decimalPlaces: 2 },
  PKR: { code: 'PKR', symbol: 'Rs ', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 278.0, decimalPlaces: 0 },
};
