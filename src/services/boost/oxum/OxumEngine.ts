/**
 * Oxum Engine - Fair rotation and prioritization algorithms
 * This handles how profiles rotate in search results to ensure fairness
 */
import {
  computeCompositeScore,
  sortProfilesByScore,
  applyRepetitionPenalty,
  resetRepetitionPenalties,
  calculateFairBoostDuration,
  ProfileScoreData
} from "@/utils/oxum/oxumAlgorithm";

export class OxumEngine {
  private recentlyViewedProfiles: string[] = [];
  private activeProfiles: Map<string, ProfileScoreData> = new Map();
  private lastRotationTime: number = Date.now();
  private boostRotationInterval: number = 180; // 3 minutes in seconds
  
  // Configuration constants
  private config = {
    rotationFactor: 0.85,
    repetitionPenaltyFactor: 1.5,
    resetThresholdHours: 4
  };

  constructor(initialConfig?: Partial<OxumEngine['config']>) {
    if (initialConfig) {
      this.config = { ...this.config, ...initialConfig };
    }
    
    // Start the rotation cycle
    this.scheduleNextRotation();
  }
  
  /**
   * Get the current queue positions for boosted profiles
   */
  public getBoostQueue(filters?: { region?: string, language?: string }): ProfileScoreData[] {
    // Convert active profiles map to array
    const profilesArray = Array.from(this.activeProfiles.values());
    
    // Update scores based on time elapsed
    const updatedProfiles = this.updateBoostScores(profilesArray);
    
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
   * Update boost scores for all profiles
   */
  private updateBoostScores(profiles: ProfileScoreData[]): ProfileScoreData[] {
    const currentTime = new Date();
    
    return profiles.map(profile => {
      const timeElapsedHours = 
        (currentTime.getTime() - profile.lastCalculated.getTime()) / (1000 * 60 * 60);
      
      // Update time since last top for all profiles
      const updatedProfile = {
        ...profile,
        timeSinceLastTop: profile.timeSinceLastTop + timeElapsedHours,
        lastCalculated: currentTime
      };
      
      // Store updated profile
      this.activeProfiles.set(profile.profileId, updatedProfile);
      
      return updatedProfile;
    });
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
   * Calculate optimal boost duration based on current conditions
   */
  public calculateOptimalBoostDuration(): number {
    return calculateFairBoostDuration(
      this.activeProfiles.size,
      0.5 // Default system load
    );
  }
  
  /**
   * Update engine configuration
   */
  public updateConfig(newConfig: Partial<OxumEngine['config']>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

// Create singleton instance
export const oxumEngine = new OxumEngine();

export default oxumEngine;
