
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatCurrency as formatCurrencyUtil } from "@/utils/formatters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @deprecated Use formatCurrency from @/utils/formatters instead
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US') {
  return formatCurrencyUtil(value, currency, locale);
}
