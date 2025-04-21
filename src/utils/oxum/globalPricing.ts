
// Global price constants for the Oxum system
export const GLOBAL_UBX_RATE = 25;
export const BASE_PRICE_UBX = 50;
export const PRIME_PRICE_MULTIPLIER = 1.5;

/**
 * Validates that the price conforms to the global price symmetry rule
 * @param price The price to validate
 * @returns true if valid, otherwise throws error
 */
export const validateGlobalPrice = (price: number): boolean => {
  if (price < GLOBAL_UBX_RATE) {
    throw new Error(`Price ${price} UBX violates Oxum Rule #001: Price below global minimum (${GLOBAL_UBX_RATE} UBX)`);
  }
  
  return true;
}

/**
 * Calculates the recommended boost price based on profile metrics
 * @param profileLevel The profile level (0-10)
 * @param engagement The engagement score (0-100)
 * @returns Recommended boost price in UBX
 */
export const calculateBoostPriceUBX = (profileLevel: number, engagement: number): number => {
  const baseFactor = Math.max(1, profileLevel / 5);
  const engagementFactor = Math.max(1, engagement / 50);
  
  return Math.ceil(BASE_PRICE_UBX * baseFactor * engagementFactor);
};

/**
 * Converts Lucoins to UBX tokens
 * @param lucoins Amount in Lucoins
 * @returns Equivalent amount in UBX
 */
export const convertLucoinToUBX = (lucoins: number): number => {
  return Math.ceil(lucoins * 2.5);
};

/**
 * Converts UBX to Lucoins
 * @param ubx Amount in UBX
 * @returns Equivalent amount in Lucoins
 */
export const convertUBXToLucoin = (ubx: number): number => {
  return Math.floor(ubx / 2.5);
};

/**
 * Formats price in UBX with proper currency symbol
 * @param amount The amount in UBX
 * @returns Formatted string with UBX symbol
 */
export const formatUBXPrice = (amount: number): string => {
  return `${amount} UBX`;
};
