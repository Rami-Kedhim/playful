
import { GLOBAL_UBX_RATE } from './globalPricing';

// Fictional exchange rates for demonstration purposes
const EXCHANGE_RATES = {
  USD: 0.1,   // 1 UBX = 0.1 USD
  EUR: 0.09,  // 1 UBX = 0.09 EUR
  GBP: 0.08,  // 1 UBX = 0.08 GBP
  JPY: 14.5,  // 1 UBX = 14.5 JPY
};

type SupportedCurrency = keyof typeof EXCHANGE_RATES;

/**
 * Utility for displaying UBX prices in different currencies
 * while maintaining Oxum Rule #001 enforcement
 */
export const oxumCurrencyUtils = {
  /**
   * Convert UBX amount to a local currency amount
   * Always enforces global price for boost transactions
   */
  convertUBXToLocal: (
    amount: number,
    currency: SupportedCurrency,
    isBoostTransaction: boolean = false
  ): number => {
    // For boost transactions, we always enforce the global price
    const ubxAmount = isBoostTransaction ? GLOBAL_UBX_RATE : amount;
    
    // Apply exchange rate
    return ubxAmount * EXCHANGE_RATES[currency];
  },

  /**
   * Format a currency amount with the appropriate symbol and decimals
   */
  formatLocalCurrency: (
    amount: number,
    currency: SupportedCurrency
  ): string => {
    switch (currency) {
      case 'USD':
        return `$${amount.toFixed(2)}`;
      case 'EUR':
        return `€${amount.toFixed(2)}`;
      case 'GBP':
        return `£${amount.toFixed(2)}`;
      case 'JPY':
        return `¥${Math.round(amount)}`; // JPY typically shown without decimals
      default:
        return `${amount.toFixed(2)} ${currency}`;
    }
  },
  
  /**
   * Get the UBX rate for a given currency
   * Used for display purposes only, actual transactions use GLOBAL_UBX_RATE
   */
  getExchangeRate: (currency: SupportedCurrency): number => {
    return EXCHANGE_RATES[currency] || 0;
  },
  
  /**
   * Gets all supported currencies
   */
  getSupportedCurrencies: (): SupportedCurrency[] => {
    return Object.keys(EXCHANGE_RATES) as SupportedCurrency[];
  },
  
  /**
   * Performs a full conversion and formatting in one step
   * For boost transactions, enforces the global UBX rate
   */
  convertAndFormatUBX: (
    amount: number,
    currency: SupportedCurrency,
    isBoostTransaction: boolean = false
  ): string => {
    const localAmount = oxumCurrencyUtils.convertUBXToLocal(
      amount,
      currency,
      isBoostTransaction
    );
    return oxumCurrencyUtils.formatLocalCurrency(localAmount, currency);
  },
  
  /**
   * Get the global boost price in local currency
   */
  getGlobalBoostPriceInLocal: (currency: SupportedCurrency): string => {
    return oxumCurrencyUtils.convertAndFormatUBX(
      GLOBAL_UBX_RATE,
      currency,
      true
    );
  }
};
