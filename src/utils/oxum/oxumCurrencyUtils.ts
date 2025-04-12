
import { GLOBAL_UBX_RATE } from './constants';

/**
 * Utility class for handling Oxum currency conversions and formatting
 */
export class OxumCurrencyUtils {
  private exchangeRates: Record<string, number> = {
    USD: 0.01, // 1 UBX = $0.01
    EUR: 0.009, // 1 UBX = €0.009
    GBP: 0.0078, // 1 UBX = £0.0078
    JPY: 1.5, // 1 UBX = ¥1.5
  };

  /**
   * Get list of supported currencies
   */
  getSupportedCurrencies(): string[] {
    return Object.keys(this.exchangeRates);
  }

  /**
   * Convert UBX amount to local currency
   */
  convertUBXToLocalCurrency(
    ubxAmount: number, 
    currency: string = 'USD'
  ): number {
    const rate = this.exchangeRates[currency];
    
    if (!rate) {
      console.warn(`Currency ${currency} not supported. Falling back to USD.`);
      return ubxAmount * this.exchangeRates.USD;
    }
    
    return ubxAmount * rate;
  }

  /**
   * Format currency with proper symbol
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
    };
    
    const symbol = symbols[currency] || '$';
    
    // Format numbers appropriately for each currency
    if (currency === 'JPY') {
      // JPY doesn't use decimal places typically
      return `${symbol}${Math.round(amount)}`;
    } else {
      return `${symbol}${amount.toFixed(2)}`;
    }
  }

  /**
   * Convert UBX amount to local currency and format
   */
  convertAndFormatUBX(
    ubxAmount: number, 
    currency: string = 'USD',
    isGlobalPrice: boolean = false
  ): string {
    // If this is a global price, enforce the global rate
    const amountToConvert = isGlobalPrice ? GLOBAL_UBX_RATE : ubxAmount;
    
    // Convert and format
    const localAmount = this.convertUBXToLocalCurrency(amountToConvert, currency);
    return this.formatCurrency(localAmount, currency);
  }
}

// Export a singleton instance
export const oxumCurrencyUtils = new OxumCurrencyUtils();
