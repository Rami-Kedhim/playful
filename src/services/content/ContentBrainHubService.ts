
import { brainHubConnection } from "@/services/BrainHubConnectionService";
import { brainHub } from "@/services/neural/HermesOxumBrainHub";
import { useHermesInsights } from "@/hooks/useHermesInsights";
import { calculateExpiryDate, calculateDaysRemaining } from "@/utils/dateUtils";

// Unique identifier for the content manager in Brain Hub
const CONTENT_MANAGER_ID = "content-management-system";

/**
 * Service to connect content management features to Brain Hub
 */
export class ContentBrainHubService {
  private static instance: ContentBrainHubService;
  private isConnected: boolean = false;
  
  private constructor() {
    this.connectToBrainHub();
  }
  
  public static getInstance(): ContentBrainHubService {
    if (!ContentBrainHubService.instance) {
      ContentBrainHubService.instance = new ContentBrainHubService();
    }
    return ContentBrainHubService.instance;
  }
  
  /**
   * Connect the content management system to Brain Hub
   */
  private connectToBrainHub(): boolean {
    if (this.isConnected) return true;
    
    try {
      console.log("Connecting content management system to Brain Hub...");
      const connected = brainHubConnection.connectComponent(CONTENT_MANAGER_ID);
      
      if (connected) {
        console.log("Content management successfully connected to Brain Hub");
        this.isConnected = true;
        
        // Register content capabilities with Brain Hub
        brainHub.processRequest({
          type: "register_capabilities",
          data: {
            componentId: CONTENT_MANAGER_ID,
            capabilities: [
              "content_lifecycle_management",
              "content_expiry_prediction",
              "content_visibility_optimization"
            ]
          },
          filters: {
            geoRestrictions: false
          }
        });
        
        return true;
      } else {
        console.warn("Failed to connect content management to Brain Hub");
        return false;
      }
    } catch (error) {
      console.error("Error connecting to Brain Hub:", error);
      return false;
    }
  }
  
  /**
   * Process content through Brain Hub for optimization
   * @param contentItems Array of content items to process
   * @returns Processed content with enhanced metadata
   */
  public processContentItems<T extends {id: string, status: string, createdAt: Date}>(
    contentItems: T[]
  ): T[] {
    if (!this.isConnected) {
      console.warn("Content Brain Hub service not connected");
      return contentItems;
    }
    
    try {
      // Process through Brain Hub for content optimization
      const response = brainHub.processRequest({
        type: "content_optimization",
        data: {
          content: contentItems.map(item => ({
            id: item.id,
            createdAt: item.createdAt,
            status: item.status
          }))
        }
      });
      
      if (response.success && response.data) {
        // Merge Brain Hub optimization data with original content
        const optimizedData = response.data.optimizedContent || [];
        
        return contentItems.map(item => {
          const optimized = optimizedData.find((o: any) => o.id === item.id);
          
          if (optimized) {
            return {
              ...item,
              brainHubProcessed: true,
              optimizationScore: optimized.score,
              recommendedActions: optimized.recommendations
            };
          }
          
          return item;
        });
      }
    } catch (error) {
      console.error("Error processing content through Brain Hub:", error);
    }
    
    return contentItems;
  }
  
  /**
   * Calculate optimal renewal cost using Brain Hub intelligence
   * @param status Content status
   * @param type Content type
   * @returns Calculated renewal cost
   */
  public calculateOptimalRenewalCost(status: string, type: string): number {
    if (!this.isConnected) {
      // Fallback to standard calculation if not connected
      return this.getStandardRenewalCost(status, type);
    }
    
    try {
      // Use Brain Hub for intelligent cost calculation
      const response = brainHub.processRequest({
        type: "calculate_renewal_value",
        data: {
          contentStatus: status,
          contentType: type,
          marketConditions: {
            supply: "medium",
            demand: "high"
          }
        }
      });
      
      if (response.success && response.data && response.data.cost) {
        return response.data.cost;
      }
    } catch (error) {
      console.error("Error calculating optimal renewal cost:", error);
    }
    
    // Fallback to standard calculation
    return this.getStandardRenewalCost(status, type);
  }
  
  /**
   * Get standard renewal cost without Brain Hub intelligence
   */
  private getStandardRenewalCost(status: string, type: string): number {
    // Base cost determined by status
    const basePrice = status === 'expired' ? 2 : 1;
    
    // Premium content types cost more
    const typeMultiplier = type === 'video' ? 1.5 : 1;
    
    return Math.round(basePrice * typeMultiplier);
  }
  
  /**
   * Predict optimal content renewal time using Brain Hub
   * @param contentId Content ID
   * @param createdAt Creation date
   * @returns Recommended renewal date
   */
  public predictOptimalRenewalTime(contentId: string, createdAt: Date): Date | null {
    if (!this.isConnected) {
      return null;
    }
    
    try {
      const response = brainHub.processRequest({
        type: "predict_renewal_time",
        data: {
          contentId,
          createdAt
        }
      });
      
      if (response.success && response.data && response.data.optimalRenewalDate) {
        return new Date(response.data.optimalRenewalDate);
      }
    } catch (error) {
      console.error("Error predicting optimal renewal time:", error);
    }
    
    return null;
  }
  
  /**
   * Record content interaction in Brain Hub
   * @param contentId Content ID
   * @param interactionType Type of interaction
   * @param userId User who interacted (optional)
   */
  public recordContentInteraction(
    contentId: string,
    interactionType: 'view' | 'renew' | 'like' | 'share',
    userId?: string
  ): void {
    if (!this.isConnected) return;
    
    try {
      brainHub.processRequest({
        type: "record_content_interaction",
        data: {
          contentId,
          interactionType,
          userId,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Error recording content interaction:", error);
    }
  }
}

// Export singleton instance
export const contentBrainHub = ContentBrainHubService.getInstance();
export default contentBrainHub;
