
/**
 * HermesOxumEngine - Integration of Hermes visibility algorithms
 * with Oxum's fair rotation system
 */
import { hermesEngine } from "./hermes/HermesEngine";
import { oxumEngine } from "./oxum/OxumEngine";
import { ProfileScoreData } from "@/utils/oxum/oxumAlgorithm";

export class HermesOxumEngine {
  /**
   * Calculate effective boost score for a profile
   */
  public calculateEffectiveBoostScore(
    profileId: string,
    boostScore: number,
    engagementScore: number,
    timeSinceLastTop: number = 0
  ): number {
    // Create profile data
    const currentTime = new Date();
    
    const profileData: ProfileScoreData = {
      profileId,
      boostScore,
      engagementScore,
      timeSinceLastTop,
      repetitionPenalty: 0, // Start with no penalty
      region: '',
      language: '',
      lastCalculated: currentTime
    };
    
    // Calculate time of day impact using Hermes
    const currentHour = currentTime.getHours() + (currentTime.getMinutes() / 60);
    const timeImpact = hermesEngine.calculateTimeImpact(currentHour);
    
    // Calculate visibility decay using Hermes
    const visibilityFactor = hermesEngine.calculateVisibilityScore(
      100, // Start from maximum
      timeSinceLastTop
    );
    
    // Apply time impact and visibility decay to boost score
    profileData.boostScore = boostScore * (timeImpact / 100) * (visibilityFactor / 100);
    
    // Add to Oxum engine for rotation management
    oxumEngine.activateBoost(profileData);
    
    // Get the final sorted queue to determine position
    const queue = oxumEngine.getBoostQueue();
    
    // Find profile's position in queue
    const position = queue.findIndex(p => p.profileId === profileId);
    
    // Calculate final effectiveness based on queue position
    const positionFactor = position >= 0 ? 
      Math.max(0.5, 1 - (position * 0.1)) : 0.5;
    
    return profileData.boostScore * positionFactor;
  }
  
  /**
   * Get the boost queue
   */
  public getBoostQueue(filters?: { region?: string, language?: string }): ProfileScoreData[] {
    return oxumEngine.getBoostQueue(filters);
  }
  
  /**
   * Record a profile view
   */
  public recordProfileView(profileId: string): void {
    oxumEngine.recordProfileView(profileId);
  }
  
  /**
   * Add a profile to boost queue
   */
  public activateBoost(profileData: ProfileScoreData): void {
    oxumEngine.activateBoost(profileData);
  }
  
  /**
   * Remove a profile from the boost queue
   */
  public deactivateBoost(profileId: string): void {
    oxumEngine.deactivateBoost(profileId);
  }
}

/**
 * Singleton instance of the HermesOxumEngine
 */
export const hermesOxumEngine = new HermesOxumEngine();

export default hermesOxumEngine;
