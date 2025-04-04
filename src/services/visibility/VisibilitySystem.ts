
/**
 * Unified visibility system that applies Hermes+Oxum algorithms
 * across multiple content types: escorts, creator content, livecams
 */
import hermesOxumEngine from "@/services/boost/HermesOxumEngine";
import { ProfileScoreData } from "@/utils/oxum/oxumAlgorithm";

// Type definitions for content visibility
export interface VisibilityItem {
  id: string;
  type: 'escort' | 'creator' | 'content' | 'livecam';
  score: number;
  lastViewedAt?: Date;
  region?: string;
  language?: string;
  metadata?: Record<string, any>;
}

export interface VisibilityOptions {
  region?: string;
  language?: string;
  contentType?: string;
  limit?: number;
}

export class VisibilitySystem {
  private items = new Map<string, VisibilityItem>();
  
  /**
   * Register a content item to be managed by the visibility system
   */
  public registerItem(item: VisibilityItem): void {
    this.items.set(item.id, item);
    
    // Create profile data to be managed by HermesOxum
    const profileData: ProfileScoreData = {
      profileId: item.id,
      boostScore: item.score,
      engagementScore: 50, // Default value
      timeSinceLastTop: item.lastViewedAt ? 
        (Date.now() - item.lastViewedAt.getTime()) / (1000 * 60 * 60) : 0,
      repetitionPenalty: 0,
      region: item.region || '',
      language: item.language || '',
      lastCalculated: new Date()
    };
    
    // Add to HermesOxum engine
    hermesOxumEngine.activateBoost(profileData);
  }
  
  /**
   * Unregister an item
   */
  public unregisterItem(id: string): void {
    this.items.delete(id);
    hermesOxumEngine.deactivateBoost(id);
  }
  
  /**
   * Record a view of an item to update rotation logic
   */
  public recordView(id: string): void {
    const item = this.items.get(id);
    if (item) {
      item.lastViewedAt = new Date();
      this.items.set(id, item);
      hermesOxumEngine.recordProfileView(id);
    }
  }
  
  /**
   * Get sorted items based on visibility score using HermesOxum
   */
  public getSortedItems(options: VisibilityOptions = {}): VisibilityItem[] {
    // Get queue from HermesOxum
    const queue = hermesOxumEngine.getBoostQueue({
      region: options.region,
      language: options.language
    });
    
    // Map back to visibility items
    const sortedItems = queue
      .map(profileData => this.items.get(profileData.profileId))
      .filter((item): item is VisibilityItem => !!item);
    
    // Apply content type filter if specified
    const filteredItems = options.contentType ?
      sortedItems.filter(item => item.type === options.contentType) :
      sortedItems;
    
    // Apply limit if specified
    return options.limit ? 
      filteredItems.slice(0, options.limit) : 
      filteredItems;
  }
  
  /**
   * Update visibility score for an item
   */
  public updateItemScore(id: string, newScore: number): void {
    const item = this.items.get(id);
    if (item) {
      item.score = newScore;
      this.items.set(id, item);
      
      // Update in HermesOxum engine
      const effectiveScore = hermesOxumEngine.calculateEffectiveBoostScore(
        id,
        newScore,
        50, // Default engagement score
        item.lastViewedAt ? 
          (Date.now() - item.lastViewedAt.getTime()) / (1000 * 60 * 60) : 0
      );
      
      console.log(`Updated item ${id} score to ${newScore}, effective: ${effectiveScore}`);
    }
  }

  /**
   * Get a specific item by its ID
   */
  public getItem(id: string): VisibilityItem | undefined {
    return this.items.get(id);
  }
}

// Create singleton instance
export const visibilitySystem = new VisibilitySystem();

export default visibilitySystem;
