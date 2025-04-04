import { 
  calculateVisibilityDecay,
  calculateBoostScore,
  getOptimalTimeWindow,
  calculateDynamicDecayConstant 
} from "@/utils/hermes/hermesMath";
import {
  computeCompositeScore,
  updateBoostScores,
  sortProfilesByScore,
  applyRepetitionPenalty,
  resetRepetitionPenalties,
  ProfileScoreData
} from "@/utils/oxum/oxumAlgorithm";

/**
 * HermesOxumEngine - Core service that integrates Hermes visibility algorithms
 * with Oxum's fair rotation system to create an ethical and balanced boosting experience
 */
export class HermesOxumEngine {
  private systemLoad: number = 0.5; // Default to medium load
  private recentlyViewedProfiles: string[] = [];
  private activeProfiles: Map<string, ProfileScoreData> = new Map();
  private boostRotationInterval: number = 180; // 3 minutes in seconds
  private lastRotationTime: number = Date.now();
  
  // Algorithm configuration constants
  private config = {
    maxBoostEffect: 100,
    baseDecayConstant: 0.2,
    aggressionFactor: 0.5,
    rotationFactor: 0.85,
    repetitionPenaltyFactor: 1.5,
    resetThresholdHours: 4
  };

  constructor(initialConfig?: Partial<HermesOxumEngine['config']>) {
    if (initialConfig) {
      this.config = { ...this.config, ...initialConfig };
    }
    
    // Start the rotation cycle
    this.scheduleNextRotation();
  }

  /**
   * Calculate effective boost score for a profile
   */
  public calculateEffectiveBoostScore(
    profileId: string,
    boostScore: number,
    engagementScore: number,
    timeSinceLastTop: number = 0
  ): number {
    // Create or update profile data in active profiles
    const currentTime = new Date();
    
    const profileData: ProfileScoreData = this.activeProfiles.get(profileId) || {
      profileId,
      boostScore,
      engagementScore,
      timeSinceLastTop,
      repetitionPenalty: 0, // Start with no penalty
      region: '',
      language: '',
      lastCalculated: currentTime
    };
    
    // Update existing profile with new values
    profileData.boostScore = boostScore;
    profileData.engagementScore = engagementScore;
    profileData.timeSinceLastTop = timeSinceLastTop;
    profileData.lastCalculated = currentTime;
    
    // Store updated profile
    this.activeProfiles.set(profileId, profileData);
    
    // Calculate time of day factor using Hermes visibility equations
    const currentHour = currentTime.getHours() + (currentTime.getMinutes() / 60);
    const optimalTime = getOptimalTimeWindow();
    const timeImpact = calculateBoostScore(
      this.config.maxBoostEffect,
      this.config.aggressionFactor,
      currentHour,
      optimalTime
    );
    
    // Calculate decay based on time since boost activation
    const decayConstant = calculateDynamicDecayConstant(
      this.config.baseDecayConstant,
      this.systemLoad
    );
    
    const visibilityFactor = calculateVisibilityDecay(
      100, // Start from maximum
      decayConstant,
      timeSinceLastTop
    );
    
    // Combine time impact and visibility decay
    const adjustedBoostScore = boostScore * (timeImpact / 100) * (visibilityFactor / 100);
    
    // Calculate final score using Oxum's composite scoring
    const compositeScore = computeCompositeScore(profileData);
    
    return compositeScore;
  }
  
  /**
   * Get the current queue positions for boosted profiles
   */
  public getBoostQueue(filters?: { region?: string, language?: string }): ProfileScoreData[] {
    // Convert active profiles map to array
    const profilesArray = Array.from(this.activeProfiles.values());
    
    // Update scores based on time elapsed
    const updatedProfiles = updateBoostScores(profilesArray);
    
    // Apply penalties for recently viewed profiles
    const penalizedProfiles = applyRepetitionPenalty(
      updatedProfiles,
      this.recentlyViewedProfiles,
      this.config.repetitionPenaltyFactor
    );
    
    // Sort profiles by their updated composite score
    return sortProfilesByScore(penalizedProfiles, filters);
  }
  
  /**
   * Record a profile view to implement fair rotation
   */
  public recordProfileView(profileId: string): void {
    // Add to recently viewed list
    if (!this.recentlyViewedProfiles.includes(profileId)) {
      this.recentlyViewedProfiles.push(profileId);
      
      // Keep list at reasonable size
      if (this.recentlyViewedProfiles.length > 50) {
        this.recentlyViewedProfiles.shift();
      }
    }
    
    // Update profile's time since last top position
    const profile = this.activeProfiles.get(profileId);
    if (profile) {
      profile.timeSinceLastTop = 0; // Reset time since last top
      this.activeProfiles.set(profileId, profile);
    }
  }
  
  /**
   * Update system load to dynamically adjust algorithms
   */
  public updateSystemLoad(load: number): void {
    this.systemLoad = Math.max(0, Math.min(1, load));
  }
  
  /**
   * Add a profile to the boost queue
   */
  public activateBoost(profileData: ProfileScoreData): void {
    this.activeProfiles.set(profileData.profileId, profileData);
  }
  
  /**
   * Remove a profile from the boost queue
   */
  public deactivateBoost(profileId: string): void {
    this.activeProfiles.delete(profileId);
  }
  
  /**
   * Reset penalties periodically to ensure fair rotation
   */
  private resetPenalties(): void {
    // Get all profiles as array
    const profilesArray = Array.from(this.activeProfiles.values());
    
    // Reset penalties for profiles not seen recently
    const resetProfiles = resetRepetitionPenalties(
      profilesArray,
      this.config.resetThresholdHours
    );
    
    // Update active profiles map with reset penalties
    resetProfiles.forEach(profile => {
      this.activeProfiles.set(profile.profileId, profile);
    });
  }
  
  /**
   * Schedule the next rotation to ensure fair distribution
   */
  private scheduleNextRotation(): void {
    setTimeout(() => {
      this.performRotation();
      this.scheduleNextRotation();
    }, this.boostRotationInterval * 1000);
  }
  
  /**
   * Perform rotation of boosted profiles
   */
  private performRotation(): void {
    // Reset penalties
    this.resetPenalties();
    
    // Calculate time since last rotation
    const currentTime = Date.now();
    const timeSinceLastRotation = (currentTime - this.lastRotationTime) / 1000;
    
    // Update time since last top for all profiles
    this.activeProfiles.forEach(profile => {
      profile.timeSinceLastTop += timeSinceLastRotation / 3600; // Convert seconds to hours
    });
    
    // Update last rotation time
    this.lastRotationTime = currentTime;
  }
  
  /**
   * Update engine configuration
   */
  public updateConfig(newConfig: Partial<HermesOxumEngine['config']>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

/**
 * Singleton instance of the HermesOxumEngine
 */
export const hermesOxumEngine = new HermesOxumEngine();

export default hermesOxumEngine;
