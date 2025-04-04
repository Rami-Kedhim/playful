
/**
 * Oxum Algorithm - Rotational Fairness Engine
 * Handles fair rotation of boosted profiles in search results
 */

import { 
  calculateVisibilityDecay, 
  calculateBoostScore, 
  getOptimalTimeWindow, 
  calculateGeoBoostMultiplier,
  calculateEngagementFactor,
  calculateBoostPriority
} from "../hermes/hermesMath";

// Tunable weights for the composite score calculation
const WEIGHTS = {
  boostScore: 0.35,
  engagementScore: 0.25,
  timeSinceLastTop: 0.25,
  repetitionPenalty: 0.15
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

// Additional metadata for profiles in the queue
interface QueueProfileMetadata {
  geoMultiplier: number;
  priorityScore: number;
  originalPosition: number;
  engagementFactor: number;
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
  // Calculate time since last top score (higher for profiles waiting longer)
  const waitTimeScore = Math.min(100, profile.timeSinceLastTop * 20);
  
  return (
    WEIGHTS.boostScore * profile.boostScore +
    WEIGHTS.engagementScore * profile.engagementScore +
    WEIGHTS.timeSinceLastTop * waitTimeScore -
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
      
      // Calculate geographic multiplier (default to 1 if no region info)
      const geoMultiplier = profile.region ? 
        calculateGeoBoostMultiplier('America/New_York', 'Europe/Berlin') : 1;
      
      // Get priority score based on wait time
      const priorityScore = calculateBoostPriority(
        profile.timeSinceLastTop + timeElapsedHours,
        profile.boostScore
      );
      
      // Update the profile with new score
      return {
        ...profile,
        boostScore: (visibilityFactor * boostImpact * geoMultiplier) / 100,
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
  
  // Enhanced sorting logic that combines composite score with fair rotation
  // Store original positions for fairness calculations
  const profilesWithMetadata = filteredProfiles.map((profile, idx) => {
    const compositeScore = computeCompositeScore(profile);
    
    // Calculate profile metadata
    const metadata: QueueProfileMetadata = {
      geoMultiplier: profile.region ? 
        calculateGeoBoostMultiplier('America/New_York', 'Europe/Berlin') : 1,
      priorityScore: calculateBoostPriority(profile.timeSinceLastTop, profile.boostScore),
      originalPosition: idx,
      engagementFactor: Math.min(1, profile.engagementScore / 100)
    };
    
    return {
      profile,
      compositeScore,
      metadata
    };
  });
  
  // Fair rotation sort - combine score with wait time priority
  profilesWithMetadata.sort((a, b) => {
    // Primary sort by composite score
    const scoreDiff = b.compositeScore - a.compositeScore;
    
    // If scores are close (within 5%), consider wait time to ensure rotation
    if (Math.abs(scoreDiff) < 5) {
      return b.metadata.priorityScore - a.metadata.priorityScore;
    }
    
    return scoreDiff;
  });
  
  // Extract just the profiles from the sorted metadata structure
  return profilesWithMetadata.map(item => item.profile);
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
    // Check recent view history to determine penalty
    const recencyIndex = recentlyViewedIds.indexOf(profile.profileId);
    
    if (recencyIndex >= 0) {
      // Apply stronger penalty for more recently viewed profiles
      // (inversely proportional to position in recently viewed list)
      const recencyScore = (recentlyViewedIds.length - recencyIndex) / recentlyViewedIds.length;
      const scaledPenaltyFactor = penaltyFactor * recencyScore;
      
      return {
        ...profile,
        repetitionPenalty: profile.repetitionPenalty * scaledPenaltyFactor
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
    
    // If enough time has passed, gradually reduce penalty
    if (hoursSinceLastCalculated > 0) {
      // Calculate decay factor (0.5 means halving penalty every resetThresholdHours)
      const decayFactor = Math.pow(0.5, hoursSinceLastCalculated / resetThresholdHours);
      
      return {
        ...profile,
        repetitionPenalty: profile.repetitionPenalty * decayFactor
      };
    }
    return profile;
  });
}

/**
 * Calculate fair boost duration based on current queue and system load
 * 
 * @param currentQueueSize - Number of profiles in boost queue
 * @param systemLoad - Current system load (0-1)
 * @returns Recommended boost duration in hours
 */
export function calculateFairBoostDuration(
  currentQueueSize: number, 
  systemLoad: number
): number {
  // Base duration is 3 hours
  const baseDuration = 3;
  
  // Adjust for queue size - smaller queue means longer boosts can be allowed
  const queueFactor = Math.max(0.5, Math.min(1.5, 10 / Math.max(1, currentQueueSize)));
  
  // Adjust for system load - higher load means shorter boosts for better rotation
  const loadFactor = 1 - (systemLoad * 0.5); // 0.5 to 1 range
  
  // Calculate final duration
  return Math.max(1, Math.min(24, baseDuration * queueFactor * loadFactor));
}

/**
 * Analyze profile performance during boost period
 * 
 * @param viewsBefore - Views before boost
 * @param viewsDuring - Views during boost
 * @param boostDuration - Boost duration in hours
 * @returns Performance metrics
 */
export function analyzeBoostPerformance(
  viewsBefore: number,
  viewsDuring: number,
  boostDuration: number
): { 
  effectivenessScore: number; 
  viewsPerHour: number;
  improvementFactor: number;
} {
  // Calculate views per hour during boost
  const viewsPerHour = viewsDuring / boostDuration;
  
  // Calculate improvement factor compared to before
  // Avoid division by zero
  const improvementFactor = viewsBefore > 0 ? 
    (viewsDuring / boostDuration) / (viewsBefore / 24) : // Compare hourly rates
    viewsDuring > 0 ? 
      5 : // If views during but none before, assume 5x improvement
      1;  // If no views at all, assume no improvement
  
  // Calculate effectiveness score (0-100)
  const effectivenessScore = Math.min(100, 
    // Base score from views per hour (0-50 points)
    Math.min(50, viewsPerHour * 5) + 
    // Bonus from improvement factor (0-50 points)
    Math.min(50, improvementFactor * 10)
  );
  
  return {
    effectivenessScore,
    viewsPerHour,
    improvementFactor
  };
}
