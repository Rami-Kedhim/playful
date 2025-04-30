
/**
 * Oxum Algorithm - Core utilities for fair rotation and boosting algorithms
 */

export interface ProfileScoreData {
  profileId: string;
  baseScore: number;
  boostMultiplier: number;
  timeSinceLastTop: number;
  penaltyFactor: number;
  lastCalculated: Date;
  region?: string;
  language?: string;
  tags?: string[];
}

/**
 * Calculate a composite score for a profile based on multiple factors
 */
export const computeCompositeScore = (profile: ProfileScoreData): number => {
  const baseScore = profile.baseScore;
  const boostFactor = profile.boostMultiplier;
  const timeFactor = Math.min(5, profile.timeSinceLastTop); // Cap time factor at 5
  const penaltyFactor = profile.penaltyFactor;
  
  // Formula for composite score
  const score = baseScore * boostFactor * (1 + timeFactor * 0.2) / penaltyFactor;
  return Math.round(score * 100) / 100; // Round to 2 decimal places
};

/**
 * Sort profiles by their computed composite scores
 */
export const sortProfilesByScore = (
  profiles: ProfileScoreData[],
  filters?: { region?: string, language?: string }
): ProfileScoreData[] => {
  const filteredProfiles = filters 
    ? profiles.filter(profile => 
        (!filters.region || profile.region === filters.region) && 
        (!filters.language || profile.language === filters.language))
    : profiles;
    
  return [...filteredProfiles].sort((a, b) => {
    const scoreA = computeCompositeScore(a);
    const scoreB = computeCompositeScore(b);
    return scoreB - scoreA; // Sort in descending order
  });
};

/**
 * Apply repetition penalty for profiles that have been viewed recently
 */
export const applyRepetitionPenalty = (
  profiles: ProfileScoreData[],
  recentlyViewedIds: string[],
  penaltyFactor: number
): ProfileScoreData[] => {
  return profiles.map(profile => {
    if (recentlyViewedIds.includes(profile.profileId)) {
      // Apply penalty to recently viewed profiles
      return {
        ...profile,
        penaltyFactor: profile.penaltyFactor * penaltyFactor
      };
    }
    return profile;
  });
};

/**
 * Reset repetition penalties for profiles after a certain time
 */
export const resetRepetitionPenalties = (
  profiles: ProfileScoreData[],
  thresholdHours: number
): ProfileScoreData[] => {
  return profiles.map(profile => {
    if (profile.timeSinceLastTop >= thresholdHours) {
      // Reset penalty if profile hasn't been at top for threshold hours
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
 * @param activeProfilesCount Number of active profiles in the boost system
 * @param systemLoad Optional system load factor (0-1)
 */
export const calculateFairBoostDuration = (
  activeProfilesCount: number,
  systemLoad: number = 0.5
): number => {
  // Base duration in hours
  const baseDuration = 24;
  
  // Adjust based on active profiles - more profiles means shorter durations
  const profileFactor = Math.max(0.5, Math.min(1.5, 10 / Math.max(1, activeProfilesCount)));
  
  // Adjust based on system load - higher load means shorter durations
  const loadFactor = 1 - (systemLoad * 0.3);
  
  // Calculate final duration in hours
  return Math.round(baseDuration * profileFactor * loadFactor);
};

/**
 * Create a new profile score data object with default values
 */
export const createProfileScoreData = (
  profileId: string,
  baseScore: number = 100,
  boostMultiplier: number = 1
): ProfileScoreData => {
  return {
    profileId,
    baseScore,
    boostMultiplier,
    timeSinceLastTop: 0,
    penaltyFactor: 1.0,
    lastCalculated: new Date()
  };
};
