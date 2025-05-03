
/**
 * Oxum Algorithm Utilities
 */

export interface ProfileScoreData {
  profileId: string;
  baseScore: number;
  boostMultiplier: number;
  timeSinceLastTop: number;
  penaltyFactor: number;
  lastCalculated: Date;
  region: string;
  language: string;
  boostScore: number;
  engagementScore: number;
}

/**
 * Compute composite score for profiles based on their metrics
 */
export const computeCompositeScore = (profile: ProfileScoreData): number => {
  // Base formula: (baseScore * boostMultiplier * (1 / penaltyFactor)) + boostScore
  return (profile.baseScore * profile.boostMultiplier * (1 / profile.penaltyFactor)) + 
         profile.boostScore;
};

/**
 * Sort profiles by their composite scores
 */
export const sortProfilesByScore = (
  profiles: ProfileScoreData[],
  filters?: { region?: string; language?: string }
): ProfileScoreData[] => {
  // Apply filters if provided
  let filteredProfiles = [...profiles];
  
  if (filters) {
    if (filters.region) {
      filteredProfiles = filteredProfiles.filter(p => p.region === filters.region);
    }
    
    if (filters.language) {
      filteredProfiles = filteredProfiles.filter(p => p.language === filters.language);
    }
  }
  
  // Calculate composite scores and sort
  return filteredProfiles
    .map(p => ({ ...p, compositeScore: computeCompositeScore(p) }))
    .sort((a: any, b: any) => b.compositeScore - a.compositeScore);
};

/**
 * Apply repetition penalty to profiles that have been seen recently
 */
export const applyRepetitionPenalty = (
  profiles: ProfileScoreData[],
  recentlyViewed: string[],
  penaltyFactor: number
): ProfileScoreData[] => {
  return profiles.map(profile => {
    // If profile was recently viewed, apply penalty
    if (recentlyViewed.includes(profile.profileId)) {
      return {
        ...profile,
        penaltyFactor: profile.penaltyFactor * penaltyFactor
      };
    }
    
    return profile;
  });
};

/**
 * Reset repetition penalties for profiles not seen recently
 */
export const resetRepetitionPenalties = (
  profiles: ProfileScoreData[],
  resetThresholdHours: number
): ProfileScoreData[] => {
  const now = new Date();
  
  return profiles.map(profile => {
    // If profile hasn't been at top position for threshold hours, reset penalty
    if (profile.timeSinceLastTop >= resetThresholdHours) {
      return {
        ...profile,
        penaltyFactor: 1.0
      };
    }
    
    return profile;
  });
};

/**
 * Calculate fair boost duration based on system conditions
 */
export const calculateFairBoostDuration = (
  activeProfilesCount: number,
  systemLoad: number
): number => {
  // Base duration in hours
  const baseDuration = 24;
  
  // Adjust based on active profiles and system load
  const adjustmentFactor = Math.max(0.5, 1 - (activeProfilesCount / 100) - (systemLoad * 0.3));
  
  return Math.round(baseDuration * adjustmentFactor);
};
