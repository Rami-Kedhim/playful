
/**
 * Represents a boost package that can be purchased
 */
export interface BoostPackage {
  id: string;
  name: string;
  duration: string; // Format: "HH:MM:SS"
  price_ubx: number;
  description?: string;
  features?: string[];
}

/**
 * Represents an active or inactive boost status
 */
export interface BoostStatus {
  isActive: boolean;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
  remainingTime: string;
  progress: number; // 0-100
}

/**
 * Analytics data for a boost
 */
export interface BoostAnalytics {
  id: string;
  boost_id: string;
  profile_id: string;
  views_before: number;
  views_after: number;
  clicks_before: number;
  clicks_after: number;
  ranking_before: number;
  ranking_after: number;
  effectiveness_score: number;
  created_at: string;
}

/**
 * History record of a boost purchase
 */
export interface BoostHistory {
  id: string;
  profile_id: string;
  package_id: string;
  package_name: string;
  price_paid: number;
  started_at: string;
  ended_at: string;
  duration: string;
  was_cancelled: boolean;
  created_at: string;
}
