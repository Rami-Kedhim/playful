
/**
 * Oxum - Boost and Visibility System
 * Manages profile boosting, visibility, and ranking in the ecosystem
 */

import { UberPersona } from '@/types/uberPersona';
import { LiveBoostMapEntry } from '@/types/home';

export interface OxumBoostResult {
  success: boolean;
  transactionId?: string;
  visibilityScore?: number;
  expires?: Date;
}

export interface OxumBoostOptions {
  duration?: number;  // Duration in hours
  intensity?: number; // 1-100 scale
  geoTargeting?: string[];
  timeTargeting?: {
    startHour: number;
    endHour: number;
  };
}

export class Oxum {
  private initialized: boolean = false;
  private activeBoosts: Map<string, {
    level: number;
    expires: Date;
    boostId: string;
  }> = new Map();
  
  /**
   * Initialize the Oxum boosting system
   */
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      return true;
    }
    
    // In a real implementation, this would load boost data from storage
    this.initialized = true;
    return true;
  }
  
  /**
   * Apply a boost to a profile
   */
  public async applyBoost(
    profileId: string, 
    boostLevel: number, 
    options?: OxumBoostOptions
  ): Promise<OxumBoostResult> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // Default expiration is 24 hours from now
    const expireHours = options?.duration || 24;
    const expires = new Date();
    expires.setHours(expires.getHours() + expireHours);
    
    // Generate a boost ID
    const boostId = `boost-${Date.now()}-${profileId.substring(0, 8)}`;
    
    // Store the boost
    this.activeBoosts.set(profileId, {
      level: boostLevel,
      expires,
      boostId
    });
    
    // Calculate visibility score based on boost level
    const visibilityScore = this.calculateVisibilityScore(boostLevel, options);
    
    return {
      success: true,
      transactionId: boostId,
      visibilityScore,
      expires
    };
  }
  
  /**
   * Cancel an active boost
   */
  public async cancelBoost(profileId: string): Promise<boolean> {
    if (!this.activeBoosts.has(profileId)) {
      return false;
    }
    
    this.activeBoosts.delete(profileId);
    return true;
  }
  
  /**
   * Check if a profile has an active boost
   */
  public hasActiveBoost(profileId: string): boolean {
    if (!this.activeBoosts.has(profileId)) {
      return false;
    }
    
    // Check if the boost has expired
    const boost = this.activeBoosts.get(profileId);
    if (!boost) {
      return false;
    }
    
    if (boost.expires < new Date()) {
      // Boost has expired, remove it
      this.activeBoosts.delete(profileId);
      return false;
    }
    
    return true;
  }
  
  /**
   * Get details of an active boost
   */
  public getBoostDetails(profileId: string): {
    level: number;
    expires: Date;
    boostId: string;
    remainingTime: number;  // in milliseconds
  } | null {
    if (!this.hasActiveBoost(profileId)) {
      return null;
    }
    
    const boost = this.activeBoosts.get(profileId);
    if (!boost) {
      return null;
    }
    
    return {
      ...boost,
      remainingTime: boost.expires.getTime() - Date.now()
    };
  }
  
  /**
   * Calculate boost score for a profile
   */
  public calculateBoostScore(profileId: string): number {
    if (!this.hasActiveBoost(profileId)) {
      return 0;
    }
    
    const boost = this.activeBoosts.get(profileId);
    if (!boost) {
      return 0;
    }
    
    // Calculate score based on level and remaining time
    const remainingMs = boost.expires.getTime() - Date.now();
    const remainingHours = remainingMs / (1000 * 60 * 60);
    const remainingPercentage = Math.min(1, remainingHours / 24);
    
    // Score decreases as the boost approaches expiration
    return boost.level * (0.7 + remainingPercentage * 0.3);
  }
  
  /**
   * Generate a live map of boosted profiles
   */
  public getLiveBoostMap(limit: number = 10): LiveBoostMapEntry[] {
    const entries: LiveBoostMapEntry[] = [];
    
    // In a real implementation, this would use actual boosted profile data
    // This implementation creates mock data
    for (let i = 0; i < limit; i++) {
      entries.push({
        id: `profile-${i + 1}`,
        type: ['escort', 'creator', 'livecam', 'ai'][Math.floor(Math.random() * 4)],
        location: ['New York', 'Los Angeles', 'Miami', 'London', 'Paris'][Math.floor(Math.random() * 5)],
        boostScore: Math.floor(Math.random() * 100) + 50,
        trend: ['rising', 'stable', 'falling'][Math.floor(Math.random() * 3)] as 'rising' | 'stable' | 'falling',
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 60) * 60000)
      });
    }
    
    return entries;
  }
  
  /**
   * Sort a list of personas based on boost status
   */
  public sortByBoostScore(personas: UberPersona[]): UberPersona[] {
    return [...personas].sort((a, b) => {
      const scoreA = this.calculateBoostScore(a.id);
      const scoreB = this.calculateBoostScore(b.id);
      return scoreB - scoreA;
    });
  }
  
  /**
   * Calculate visibility score based on boost level and options
   */
  private calculateVisibilityScore(boostLevel: number, options?: OxumBoostOptions): number {
    let score = boostLevel * 10;
    
    if (options?.intensity) {
      // Apply intensity modifier
      score *= (0.5 + (options.intensity / 100) * 0.5);
    }
    
    return Math.min(100, Math.max(0, score));
  }
}

// Export singleton instance
export const oxum = new Oxum();
