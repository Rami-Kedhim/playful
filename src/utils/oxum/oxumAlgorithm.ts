
/**
 * Oxum Algorithm - Core algorithms for the Oxum boosting system
 */

export interface ProfileScoreData {
  profileId: string;
  boostScore: number;
  engagementScore: number;
  timeSinceLastTop: number;
  repetitionPenalty: number;
  region: string;
  language: string;
  lastCalculated: Date;
}

interface ProfileFilters {
  region?: string;
  language?: string;
}

/**
 * Compute a composite score for a profile based on various factors
 */
export function computeCompositeScore(profile: ProfileScoreData): number {
  // Weights for different factors
  const boostWeight = 0.6;
  const engagementWeight = 0.3;
  const timeWeight = 0.1;
  
  // Calculate time factor - decreases as time since last top increases
  const timeFactor = Math.max(0, 1 - (profile.timeSinceLastTop / 48)); // Normalize to 48 hours
  
  // Apply repetition penalty
  const repetitionFactor = Math.max(0.2, 1 - profile.repetitionPenalty);
  
  // Compute weighted score
  const rawScore = (
    (profile.boostScore * boostWeight) +
    (profile.engagementScore * engagementWeight) +
    (timeFactor * timeWeight)
  );
  
  // Apply repetition factor
  return rawScore * repetitionFactor;
}

/**
 * Sort profiles by their composite score
 */
export function sortProfilesByScore(
  profiles: ProfileScoreData[],
  filters?: ProfileFilters
): ProfileScoreData[] {
  // Filter profiles if needed
  let filteredProfiles = [...profiles];
  
  if (filters) {
    if (filters.region) {
      filteredProfiles = filteredProfiles.filter(
        p => p.region === filters.region
      );
    }
    
    if (filters.language) {
      filteredProfiles = filteredProfiles.filter(
        p => p.language === filters.language
      );
    }
  }
  
  // Compute scores for each profile
  const withScores = filteredProfiles.map(profile => ({
    profile,
    score: computeCompositeScore(profile)
  }));
  
  // Sort by score descending
  withScores.sort((a, b) => b.score - a.score);
  
  // Return sorted profiles
  return withScores.map(item => item.profile);
}

/**
 * Apply repetition penalty to profiles that have been viewed recently
 */
export function applyRepetitionPenalty(
  profiles: ProfileScoreData[],
  recentlyViewedIds: string[],
  penaltyFactor: number
): ProfileScoreData[] {
  return profiles.map(profile => {
    if (recentlyViewedIds.includes(profile.profileId)) {
      // Apply penalty to this profile
      return {
        ...profile,
        repetitionPenalty: profile.repetitionPenalty + penaltyFactor
      };
    }
    return profile;
  });
}

/**
 * Reset repetition penalties for all profiles
 */
export function resetRepetitionPenalties(profiles: ProfileScoreData[]): ProfileScoreData[] {
  return profiles.map(profile => ({
    ...profile,
    repetitionPenalty: 0
  }));
}

/**
 * Calculate fair boost duration based on profile stats
 */
export function calculateFairBoostDuration(
  profileCompleteness: number,
  activity: { completeness: number; activity: number; popularity: number; }
): number {
  // Base duration in hours
  const baseDuration = 24;
  
  // Adjust based on profile completeness (0-100%)
  const completenessMultiplier = 1 + (profileCompleteness / 100);
  
  // Adjust based on activity metrics
  const activityMultiplier = 1 + (
    (activity.completeness + activity.activity + activity.popularity) / 300
  );
  
  // Calculate final duration
  return Math.round(baseDuration * completenessMultiplier * activityMultiplier);
}
