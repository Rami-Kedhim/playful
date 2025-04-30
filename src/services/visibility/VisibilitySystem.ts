
import { ProfileScoreData } from "@/utils/oxum/oxumAlgorithm";

export class VisibilitySystem {
  private profiles: ProfileScoreData[] = [];
  private systemLoad: number = 0.5;
  
  /**
   * Add a profile to the visibility system
   */
  public addProfile(profile: ProfileScoreData): void {
    const existingIndex = this.profiles.findIndex(p => p.profileId === profile.profileId);
    if (existingIndex >= 0) {
      this.profiles[existingIndex] = profile;
    } else {
      this.profiles.push(profile);
    }
  }
  
  /**
   * Get all profiles in the visibility system
   */
  public getProfiles(): ProfileScoreData[] {
    return [...this.profiles];
  }
  
  /**
   * Calculate visibility score for a profile
   */
  public calculateVisibility(profileId: string, boostFactor: number = 1): number {
    // Simple scoring algorithm
    const baseScore = 50;
    const profile = this.profiles.find(p => p.profileId === profileId);
    
    if (!profile) {
      const newProfile: ProfileScoreData = {
        profileId,
        baseScore: 100,
        boostMultiplier: boostFactor,
        timeSinceLastTop: 0,
        penaltyFactor: 1.0,
        lastCalculated: new Date(),
        boostScore: baseScore * boostFactor // Now matches interface
      };
      
      this.addProfile(newProfile);
      return baseScore * boostFactor;
    }
    
    // Apply boost factor and penalty
    const score = profile.baseScore * profile.boostMultiplier / profile.penaltyFactor;
    return Math.min(100, Math.max(0, score));
  }
  
  /**
   * Set system load
   */
  public setSystemLoad(load: number): void {
    this.systemLoad = Math.max(0, Math.min(1, load));
  }
}

export const visibilitySystem = new VisibilitySystem();
export default visibilitySystem;
