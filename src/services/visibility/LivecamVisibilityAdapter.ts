
/**
 * Adapter to integrate livecams with the visibility system
 */
import { visibilitySystem } from "./VisibilitySystem";
import { LivecamModel } from "@/types/livecams";

export class LivecamVisibilityAdapter {
  /**
   * Register a livecam model with the visibility system
   */
  public registerLivecam(model: LivecamModel): void {
    // Calculate base visibility score from model attributes
    const baseScore = this.calculateLivecamScore(model);
    
    visibilitySystem.registerItem({
      id: model.id,
      type: 'livecam',
      score: baseScore,
      region: model.country,
      language: model.language,
      metadata: {
        isLive: model.isLive,
        viewerCount: model.viewerCount,
        categories: model.categories
      }
    });
  }
  
  /**
   * Calculate a base score for livecams based on their data
   */
  private calculateLivecamScore(model: LivecamModel): number {
    // Base score components
    const viewerFactor = model.viewerCount ? Math.min(100, model.viewerCount / 2) : 0;
    const liveBonus = model.isLive ? 30 : 0;
    
    // Calculate weighted score
    const score = 
      (viewerFactor * 0.5) +
      (liveBonus * 0.5) +
      40; // Base value
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Record a livecam view to update rotation
   */
  public recordLivecamView(modelId: string): void {
    visibilitySystem.recordView(modelId);
  }
  
  /**
   * Get sorted livecams based on visibility
   */
  public getSortedLivecams(options: {
    region?: string,
    limit?: number,
    category?: string
  } = {}): string[] {
    const visibleItems = visibilitySystem.getSortedItems({
      region: options.region,
      contentType: 'livecam',
      limit: options.limit
    });
    
    // Filter by category if specified
    if (options.category) {
      return visibleItems
        .filter(item => {
          const categories = item.metadata?.categories || [];
          return categories.includes(options.category);
        })
        .map(item => item.id);
    }
    
    return visibleItems.map(item => item.id);
  }
  
  /**
   * Update livecam viewer count and recalculate visibility score
   */
  public updateViewerCount(modelId: string, viewerCount: number): void {
    const items = visibilitySystem.getSortedItems();
    const item = items.find(item => item.id === modelId);
    
    if (item && item.metadata) {
      // Update metadata
      item.metadata.viewerCount = viewerCount;
      
      // Recalculate score
      const viewerFactor = Math.min(100, viewerCount / 2);
      const liveBonus = item.metadata.isLive ? 30 : 0;
      
      const newScore = 
        (viewerFactor * 0.5) +
        (liveBonus * 0.5) +
        40; // Base value
      
      // Update in visibility system
      visibilitySystem.updateItemScore(modelId, newScore);
    }
  }
}

// Create singleton instance
export const livecamVisibility = new LivecamVisibilityAdapter();

export default livecamVisibility;
