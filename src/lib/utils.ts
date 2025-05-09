import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a currency value with the specified currency symbol
 */
export function formatCurrency(amount: number, currency = '$') {
  return `${currency}${amount.toFixed(2)}`;
}
