// Fix method call to neuralHub to avoid missing applyBoostToContent method error
/**
 * Unified visibility system that applies Hermes+Oxum algorithms
 * across multiple content types: escorts, creator content, livecams
 */
import hermesOxumEngine from "@/services/boost/HermesOxumEngine";
import { ProfileScoreData } from "@/utils/oxum/oxumAlgorithm";
import { neuralHub } from "@/services/neural/HermesOxumNeuralHub";

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
      
      // Use Neural Hub for enhanced boost calculation if available
      try {
        // Map content type from visibility system to neural hub
        const contentType = this.mapVisibilityTypeToContentType(item.type);
        
        // Use appropriate method if exists, else fallback
        if (typeof (neuralHub as any).applyBoostToContent === 'function') {
          const effectiveScore = (neuralHub as any).applyBoostToContent(
            id,
            contentType,
            newScore,
            item.region,
            item.language
          );
          console.log(`Updated item ${id} score to ${newScore}, effective: ${effectiveScore} (Neural Hub enhanced)`);
        } else {
          throw new Error('applyBoostToContent method not found on neuralHub');
        }
      } catch (e) {
        // Fallback to regular HermesOxum engine
        const effectiveScore = hermesOxumEngine.calculateEffectiveBoostScore(
          id,
          newScore,
          50, // Default engagement score
          item.lastViewedAt ? 
            (Date.now() - item.lastViewedAt.getTime()) / (1000 * 60 * 60) : 0
        );
        
        console.log(`Updated item ${id} score to ${newScore}, effective: ${effectiveScore} (Standard)`);
      }
    }
  }

  /**
   * Get a specific item by its ID
   */
  public getItem(id: string): VisibilityItem | undefined {
    return this.items.get(id);
  }
  
  /**
   * Map visibility system types to Neural Hub content types
   */
  private mapVisibilityTypeToContentType(visibilityType: string): 'profile' | 'post' | 'video' | 'livecam' | 'event' | 'metaverse' {
    switch (visibilityType) {
      case 'escort': return 'profile';
      case 'creator': return 'profile';
      case 'content': return 'post';
      case 'livecam': return 'livecam';
      default: return 'post';
    }
  }
  
  /**
   * Returns a score representing how visible the profile should be
   * Higher scores mean more visible in search results and feed
   */
  calculateVisibilityScore(profileId: string, viewerId?: string): number {
    // Start with a baseline score
    let score = 50;
    
    // Check if neural suggestions are enabled
    const neuralService = neuralHub.getService('visibility-processor');
    if (neuralService && neuralService.config.enabled) {
      // Increase score based on neural analysis (mocked for demo)
      score += 15;
    }
    
    // More calculations would go here...
    
    return Math.max(0, Math.min(100, score));
  }
}

// Create singleton instance
export const visibilitySystem = new VisibilitySystem();

export default visibilitySystem;
