
// Currency conversion rates (simplified, in a real app you'd fetch from an API)
const conversionRates: Record<string, number> = {
  USD: 0.10,  // 1 UBX = $0.10 USD
  EUR: 0.092, // 1 UBX = €0.092 EUR
  GBP: 0.079, // 1 UBX = £0.079 GBP
  JPY: 15.12, // 1 UBX = ¥15.12 JPY
};

export type SupportedCurrency = keyof typeof conversionRates | 'UBX';

export function convertUBXToCurrency(amount: number, currency: SupportedCurrency): number {
  if (currency === 'UBX') return amount;
  
  const rate = conversionRates[currency];
  if (!rate) throw new Error(`Unsupported currency: ${currency}`);
  
  return amount * rate;
}

export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  if (currency === 'UBX') return `${amount} UBX`;
  
  const options: Intl.NumberFormatOptions = { 
    style: 'currency', 
    currency 
  };
  
  return new Intl.NumberFormat(undefined, options).format(amount);
}

// Format UBX with optional currency conversion
export function formatUBX(amount: number, showAlternativeCurrency?: SupportedCurrency): string {
  if (!showAlternativeCurrency || showAlternativeCurrency === 'UBX') {
    return `${amount} UBX`;
  }
  
  const convertedAmount = convertUBXToCurrency(amount, showAlternativeCurrency);
  return `${amount} UBX (≈ ${formatCurrency(convertedAmount, showAlternativeCurrency)})`;
}
