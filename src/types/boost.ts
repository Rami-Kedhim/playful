
/**
 * Boost Types for the UberEscorts system
 */

export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date;
  boostType?: string;
  boostMultiplier?: number;
  startedAt?: Date;
  remainingTime?: string;
}

export interface BoostEligibility {
  eligible: boolean;
  reason?: string;
  nextEligibleAt?: Date;
  suggestionMessage?: string;
}

export interface BoostAnalytics {
  impressions: number;
  profileViews: number;
  messages: number;
  bookings: number;
  conversion: {
    viewToMessage: number;
    messageToBooking: number;
  };
  comparisonToAverage: {
    impressions: number;
    profileViews: number;
    messages: number;
    bookings: number;
  };
}

export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  boostMultiplier: number;
  features: string[];
  isMostPopular?: boolean;
  isRecommended?: boolean;
}
