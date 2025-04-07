
/**
 * Adapter to integrate livecams with the visibility system
 */
import { visibilitySystem } from "./VisibilitySystem";
import { Livecam } from "@/types/livecams";

export class LivecamVisibilityAdapter {
  /**
   * Register a livecam with the visibility system
   */
  public registerLivecam(livecam: Livecam): void {
    // Calculate base visibility score from livecam attributes
    const baseScore = this.calculateLivecamScore(livecam);
    
    visibilitySystem.registerItem({
      id: livecam.id,
      type: 'livecam',
      score: baseScore,
      region: livecam.region,
      language: livecam.language,
      metadata: {
        isStreaming: livecam.isStreaming,
        viewerCount: livecam.viewerCount,
        tags: livecam.tags,
        category: livecam.category
      }
    });
  }
  
  /**
   * Calculate a base score for livecams based on their profile data
   */
  private calculateLivecamScore(livecam: Livecam): number {
    // Base score components
    const isStreamingBoost = livecam.isStreaming ? 30 : 0;
    const viewerCountFactor = Math.min(50, (livecam.viewerCount || 0) / 5);
    const ratingFactor = ((livecam.rating || 3) - 3) * 10; // -20 to +20
    
    // Calculate weighted score
    const score = 
      (isStreamingBoost * 0.4) +
      (viewerCountFactor * 0.4) +
      (ratingFactor * 0.2) +
      50; // Base value
    
    // Ensure score is between 0-100
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Record a livecam view to update rotation
   */
  public recordLivecamView(livecamId: string): void {
    visibilitySystem.recordView(livecamId);
  }
  
  /**
   * Get sorted livecams based on visibility
   */
  public getSortedLivecams(options: {
    region?: string,
    limit?: number,
    categories?: string[]
  } = {}): string[] {
    const visibleItems = visibilitySystem.getSortedItems({
      region: options.region,
      contentType: 'livecam',
      limit: options.limit
    });
    
    // Filter by categories if specified
    if (options.categories && options.categories.length > 0) {
      return visibleItems
        .filter(item => {
          const category = item.metadata?.category || '';
          return options.categories!.includes(category);
        })
        .map(item => item.id);
    }
    
    return visibleItems.map(item => item.id);
  }
}

// Create singleton instance
export const livecamVisibility = new LivecamVisibilityAdapter();

export default livecamVisibility;
