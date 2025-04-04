
/**
 * Adapter to integrate livecam boosts with the visibility system
 */
import { visibilitySystem } from "./VisibilitySystem";
import type { Livecam } from "@/types/livecams";
import { calculateLivecamBoostScore, getViewerBasedBoostIntensity } from "@/utils/boost/livecamBoostScore";
import { calculateBoostEffect } from "@/utils/boost/boostCalculation";

export class LivecamBoostAdapter {
  // Track boosted livecams
  private boostedLivecams: Map<string, {
    startTime: number;
    intensity: number;
  }> = new Map();
  
  /**
   * Apply a boost to a livecam in the visibility system
   */
  public boostLivecam(
    livecam: Livecam, 
    intensity: number = 30, 
    durationHours: number = 24
  ): void {
    // Register boost start time and intensity
    this.boostedLivecams.set(livecam.id, {
      startTime: Date.now(),
      intensity
    });
    
    // Update visibility score with boost
    const baseScore = this.calculateBaseLivecamScore(livecam);
    const boostedScore = baseScore + intensity;
    
    // Register with visibility system
    visibilitySystem.updateItemScore(livecam.id, boostedScore);
    
    // Set timeout to remove boost after duration
    setTimeout(() => {
      this.removeLivecamBoost(livecam.id);
    }, durationHours * 60 * 60 * 1000);
  }
  
  /**
   * Remove boost from a livecam
   */
  public removeLivecamBoost(livecamId: string): void {
    this.boostedLivecams.delete(livecamId);
    
    // Attempt to fetch livecam from visibility system
    const item = visibilitySystem.getItem(livecamId);
    if (item && item.metadata) {
      const livecam = {
        id: livecamId,
        isStreaming: item.metadata.isStreaming || false,
        viewerCount: item.metadata.viewerCount || 0,
        region: item.region || 'unknown',
        language: 'en',
        username: 'unknown',
        imageUrl: '',
        tags: [],
        category: ''
      } as Livecam;
      
      // Recalculate base score without boost
      const baseScore = this.calculateBaseLivecamScore(livecam);
      visibilitySystem.updateItemScore(livecamId, baseScore);
    }
  }
  
  /**
   * Update boost effect based on elapsed time (decay)
   */
  public updateBoostEffects(): void {
    const now = Date.now();
    
    // Process each boosted livecam
    this.boostedLivecams.forEach((boost, livecamId) => {
      const item = visibilitySystem.getItem(livecamId);
      if (!item) {
        this.boostedLivecams.delete(livecamId);
        return;
      }
      
      // Calculate hours elapsed since boost started
      const hoursElapsed = (now - boost.startTime) / (1000 * 60 * 60);
      
      // Calculate decayed boost effect
      const decayedBoostEffect = calculateBoostEffect(
        boost.intensity,
        hoursElapsed,
        0.05 // Standard decay rate
      );
      
      // Create minimal livecam from visibility item for score calculation
      const livecam = {
        id: livecamId,
        isStreaming: item.metadata?.isStreaming || false,
        viewerCount: item.metadata?.viewerCount || 0,
        region: item.region || 'unknown',
        language: 'en',
        username: 'unknown',
        imageUrl: '',
        tags: [],
        category: ''
      } as Livecam;
      
      // Calculate base score without boost
      const baseScore = this.calculateBaseLivecamScore(livecam);
      
      // Apply decayed boost
      const boostedScore = baseScore + decayedBoostEffect;
      
      // Update score in visibility system
      visibilitySystem.updateItemScore(livecamId, boostedScore);
    });
  }
  
  /**
   * Calculate base score for livecams
   */
  private calculateBaseLivecamScore(livecam: Livecam): number {
    // If streaming, use viewer count for boost intensity
    const viewerBasedIntensity = livecam.isStreaming 
      ? getViewerBasedBoostIntensity(livecam.viewerCount)
      : 0;
    
    // Calculate boost score
    return calculateLivecamBoostScore(
      livecam, 
      {
        views: livecam.viewerCount * 2, // Estimate views from viewer count
        engagements: livecam.viewerCount / 5 // Estimate engagements
      }
    ) + viewerBasedIntensity;
  }
}

// Create singleton instance
export const livecamBoost = new LivecamBoostAdapter();

export default livecamBoost;
