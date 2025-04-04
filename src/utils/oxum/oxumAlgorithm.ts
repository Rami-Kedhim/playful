
/**
 * Oxum Algorithm - Rotational Fairness Engine
 * Handles fair rotation of boosted profiles in search results
 */

import { calculateVisibilityDecay, calculateBoostScore, getOptimalTimeWindow } from "../hermes/hermesMath";

// Tunable weights for the composite score calculation
const WEIGHTS = {
  boostScore: 0.4,
  engagementScore: 0.3,
  timeSinceLastTop: 0.2,
  repetitionPenalty: 0.1
};

export interface ProfileScoreData {
  profileId: string;
  boostScore: number;
  engagementScore: number;
  timeSinceLastTop: number; // Hours
  repetitionPenalty: number;
  region: string;
  language: string;
  lastCalculated: Date;
}

/**
 * Calculates the composite score for a profile based on multiple weighted factors
 * 
 * S_i = w_1 · B_i + w_2 · E_i + w_3 · T_i - w_4 · R_i
 * 
 * @param profile - Profile data with all necessary score components
 * @returns Final composite score
 */
export function computeCompositeScore(profile: ProfileScoreData): number {
  return (
    WEIGHTS.boostScore * profile.boostScore +
    WEIGHTS.engagementScore * profile.engagementScore +
    WEIGHTS.timeSinceLastTop * profile.timeSinceLastTop -
    WEIGHTS.repetitionPenalty * profile.repetitionPenalty
  );
}

/**
 * Updates boost scores for all profiles based on elapsed time
 * 
 * @param profiles - Array of profiles to update
 * @param currentTime - Current timestamp
 * @returns Updated profile array with recalculated scores
 */
export function updateBoostScores(
  profiles: ProfileScoreData[],
  currentTime: Date = new Date()
): ProfileScoreData[] {
  const optimalTimeWindow = getOptimalTimeWindow();
  
  return profiles.map(profile => {
    const timeElapsedHours = 
      (currentTime.getTime() - profile.lastCalculated.getTime()) / (1000 * 60 * 60);
    
    // Only update if time has passed
    if (timeElapsedHours > 0) {
      // Set constants for calculations
      const initialBoost = 100;
      const decayConstant = 0.2;
      const maxBoostEffect = 100;
      const aggressionFactor = 0.5;
      
      // Calculate new boost score using Hermes equations
      const currentTimeValue = currentTime.getHours() + (currentTime.getMinutes() / 60);
      
      const visibilityFactor = calculateVisibilityDecay(
        initialBoost,
        decayConstant,
        timeElapsedHours
      );
      
      const boostImpact = calculateBoostScore(
        maxBoostEffect,
        aggressionFactor,
        currentTimeValue,
        optimalTimeWindow
      );
      
      // Update the profile with new score
      return {
        ...profile,
        boostScore: visibilityFactor * boostImpact,
        lastCalculated: currentTime,
        timeSinceLastTop: profile.timeSinceLastTop + timeElapsedHours
      };
    }
    
    return profile;
  });
}

/**
 * Sort profiles based on composite score for display in search results
 * 
 * @param profiles - Array of profiles to sort
 * @param filters - Optional filters for region, language, etc.
 * @returns Sorted array of profiles
 */
export function sortProfilesByScore(
  profiles: ProfileScoreData[],
  filters?: { region?: string, language?: string }
): ProfileScoreData[] {
  // First filter by region and language if specified
  let filteredProfiles = [...profiles];
  
  if (filters?.region) {
    filteredProfiles = filteredProfiles.filter(p => p.region === filters.region);
  }
  
  if (filters?.language) {
    filteredProfiles = filteredProfiles.filter(p => p.language === filters.language);
  }
  
  // Sort by composite score
  return filteredProfiles.sort((a, b) => {
    const scoreA = computeCompositeScore(a);
    const scoreB = computeCompositeScore(b);
    return scoreB - scoreA; // Descending order
  });
}

/**
 * Applies a repetition penalty to profiles that have been shown recently
 * 
 * @param profiles - Array of profiles
 * @param recentlyViewedIds - Array of recently viewed profile IDs
 * @param penaltyFactor - Multiplication factor for the penalty
 * @returns Updated profile array with penalties applied
 */
export function applyRepetitionPenalty(
  profiles: ProfileScoreData[],
  recentlyViewedIds: string[],
  penaltyFactor: number = 2
): ProfileScoreData[] {
  return profiles.map(profile => {
    if (recentlyViewedIds.includes(profile.profileId)) {
      return {
        ...profile,
        repetitionPenalty: profile.repetitionPenalty * penaltyFactor
      };
    }
    return profile;
  });
}

/**
 * Resets repetition penalty for profiles that haven't been viewed for a while
 * 
 * @param profiles - Array of profiles
 * @param resetThresholdHours - Hours threshold for penalty reset
 * @returns Updated profile array
 */
export function resetRepetitionPenalties(
  profiles: ProfileScoreData[],
  resetThresholdHours: number = 3
): ProfileScoreData[] {
  const currentTime = new Date();
  
  return profiles.map(profile => {
    const hoursSinceLastCalculated = 
      (currentTime.getTime() - profile.lastCalculated.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastCalculated >= resetThresholdHours) {
      return {
        ...profile,
        repetitionPenalty: 0
      };
    }
    return profile;
  });
}
