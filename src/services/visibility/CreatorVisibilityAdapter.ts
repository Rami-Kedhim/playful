
/**
 * Adapter to integrate content creators with the visibility system
 */
import { visibilitySystem } from "./VisibilitySystem";
import { ContentCreator } from "@/types/creator";

export class CreatorVisibilityAdapter {
  /**
   * Register a content creator with the visibility system
   */
  public registerCreator(creator: ContentCreator): void {
    // Calculate base visibility score from creator attributes
    const baseScore = this.calculateCreatorScore(creator);
    
    visibilitySystem.registerItem({
      id: creator.id,
      type: 'creator',
      score: baseScore,
      region: creator.region || creator.location || '',
      language: creator.language || (creator.languages && creator.languages[0]) || '',
      metadata: {
        isPremium: creator.isPremium,
        isAI: creator.isAI,
        subscriberCount: creator.subscriberCount,
        contentCount: creator.contentCount,
        tags: creator.tags
      }
    });
  }
  
  /**
   * Calculate a base score for creators based on their profile data
   */
  private calculateCreatorScore(creator: ContentCreator): number {
    // Base score components
    const subscriptionFactor = Math.min(100, creator.subscriberCount / 10);
    const contentFactor = Math.min(100, 
      (creator.contentCount?.photos || 0) / 2 + 
      (creator.contentCount?.videos || 0) * 5
    );
    const premiumBonus = creator.isPremium ? 20 : 0;
    const ratingFactor = ((creator.rating || 3) - 3) * 10; // -20 to +20
    
    // Calculate weighted score
    const score = 
      (subscriptionFactor * 0.3) +
      (contentFactor * 0.3) +
      (premiumBonus * 0.2) +
      (ratingFactor * 0.2) +
      50; // Base value
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Record a creator view to update rotation
   */
  public recordCreatorView(creatorId: string): void {
    visibilitySystem.recordView(creatorId);
  }
  
  /**
   * Get sorted creators based on visibility
   */
  public getSortedCreators(options: {
    region?: string,
    limit?: number,
    tags?: string[]
  } = {}): string[] {
    const visibleItems = visibilitySystem.getSortedItems({
      region: options.region,
      contentType: 'creator',
      limit: options.limit
    });
    
    // Filter by tags if specified
    if (options.tags && options.tags.length > 0) {
      return visibleItems
        .filter(item => {
          const creatorTags = item.metadata?.tags || [];
          return options.tags!.some(tag => creatorTags.includes(tag));
        })
        .map(item => item.id);
    }
    
    return visibleItems.map(item => item.id);
  }
}

// Create singleton instance
export const creatorVisibility = new CreatorVisibilityAdapter();

export default creatorVisibility;
