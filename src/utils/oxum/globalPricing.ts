
/**
 * Global UBX token rate - ensures price consistency across the platform
 * as per Oxum Rule #001
 */
export const GLOBAL_UBX_RATE = 15;

/**
 * Validates that a price adheres to the global pricing structure
 * @param price The price to validate
 * @throws Error if price violates global pricing rules
 */
export const validateGlobalPrice = (price: number): void => {
  if (price !== GLOBAL_UBX_RATE && price !== GLOBAL_UBX_RATE * 2.5 && price !== GLOBAL_UBX_RATE * 5) {
    throw new Error(`Price ${price} violates Oxum Rule #001: Global Price Symmetry`);
  }
};

/**
 * Converts a price in UBX to the user's local currency
 * @param ubxAmount Amount in UBX tokens
 * @param localCurrency Target currency code (e.g., 'USD', 'EUR')
 * @returns Formatted price in local currency
 */
export const convertUbxToLocalCurrency = (
  ubxAmount: number,
  localCurrency = 'USD'
): string => {
  // Mock exchange rates - in a real app, this would come from an API
  const rates = {
    USD: 0.15,
    EUR: 0.14,
    GBP: 0.12,
    JPY: 16.5,
  };
  
  const rate = rates[localCurrency as keyof typeof rates] || rates.USD;
  const localAmount = ubxAmount * rate;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: localCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(localAmount);
};

/**
 * Formats a UBX token amount according to Oxum display standards
 * @param amount Amount in UBX tokens
 * @returns Formatted UBX string
 */
export const formatUbxAmount = (amount: number): string => {
  return `${amount.toFixed(0)} UBX`;
};

/**
 * Gets the current exchange rate for UBX tokens
 * @param currency Target currency code
 * @returns Exchange rate value
 */
export const getUbxExchangeRate = (currency = 'USD'): number => {
  const rates = {
    USD: 0.15,
    EUR: 0.14,
    GBP: 0.12,
    JPY: 16.5,
  };
  
  return rates[currency as keyof typeof rates] || rates.USD;
};
