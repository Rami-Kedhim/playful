
/**
 * Utilities for calculating boost scores
 */
import { supabase } from "@/integrations/supabase/client";

/**
 * Factors that contribute to the boost score of an escort profile
 */
export type BoostFactors = {
  isVerified: boolean;           // Escort has completed ID + selfie verification
  profileCompletion: number;     // Percentage from 0 to 100
  lastActiveHours: number;       // Hours since last activity (lower is better)
  interactionScore: number;      // Normalized score from user interactions (0-100)
  contentScore: number;          // Presence and quality of content (0-100)
  lucoinBoostCredits: number;    // Amount of Lucoin used in the last 7 days
};

/**
 * Calculates a boost score (0-100) based on multiple weighted factors
 */
export function calculateBoostScore(factors: BoostFactors): number {
  const {
    isVerified,
    profileCompletion,
    lastActiveHours,
    interactionScore,
    contentScore,
    lucoinBoostCredits,
  } = factors;

  const activityScore = Math.max(0, 100 - Math.min(lastActiveHours, 72));
  const lucoinScore = Math.min(lucoinBoostCredits, 100);

  const weights = {
    verification: 0.25,
    completion: 0.20,
    activity: 0.15,
    interaction: 0.10,
    content: 0.15,
    lucoin: 0.15,
  };

  const score = 
    (isVerified ? 100 : 0) * weights.verification +
    profileCompletion * weights.completion +
    activityScore * weights.activity +
    interactionScore * weights.interaction +
    contentScore * weights.content +
    lucoinScore * weights.lucoin;

  return Math.round(score);
}

/**
 * Calculate Lucoin boost credits used in the last 7 days
 */
export async function getLucoinBoostCredits(userId: string): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Use a type assertion to bypass type checks for the boost history table
    const { data, error } = await (supabase as any)
      .from('boost_history')
      .select('credits_spent')
      .eq('escort_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString());
      
    if (error) throw error;
    
    // Sum up all credits spent
    const totalCredits = data.reduce((sum: number, item: any) => 
      sum + (item.credits_spent || 0), 0);
      
    return totalCredits;
  } catch (error) {
    console.error("Error fetching Lucoin boost credits:", error);
    return 0;
  }
}
