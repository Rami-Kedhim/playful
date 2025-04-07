/**
 * HermesApiService - Integration with the external HERMES-OXUM intelligence system
 * Enhanced with AI companion recommendations and personalization
 */
import { toast } from "@/components/ui/use-toast";
import hermesOxumEngine from "../boost/HermesOxumEngine";
import { visibilitySystem } from "../visibility/VisibilitySystem";

export interface HermesUserAction {
  user_id: string;
  action: string;
  category?: string;
  interaction_data?: Record<string, any>;
}

export interface HermesResponse {
  trigger_luxlife?: boolean;
  recommended_profile?: string;
  recommended_companion_id?: string;
  boost_offer?: {
    value: string;
    expires: string;
  };
  vr_event?: string;
  ai_suggestion?: {
    message: string;
    confidence: number;
  };
  popular_category?: string;
  trending_tag?: string;
}

export interface CompanionRecommendation {
  companion_id: string;
  score: number;
  reason: string;
}

export interface CompanionRecommendationsResponse {
  recommendations: CompanionRecommendation[];
}

class HermesApiService {
  private apiUrl = "https://hermes.uberescorts.ai/api/hermes";
  private mockMode = true; // For development before API is available
  
  /**
   * Initialize the HERMES API Service
   */
  constructor() {
    // Check environment variables to toggle mock mode
    this.mockMode = process.env.NODE_ENV === 'development';
    console.log(`HERMES API initialized in ${this.mockMode ? 'mock' : 'live'} mode`);
  }

  /**
   * Send user action data to HERMES for analysis
   * Enhanced with interaction_data for AI personalization
   * 
   * @param actionData User action data to analyze
   * @returns HERMES intelligence response
   */
  public async analyzeUserAction(actionData: HermesUserAction): Promise<HermesResponse> {
    try {
      if (this.mockMode) {
        return this.getMockResponse(actionData);
      }
      
      const response = await fetch(`${this.apiUrl}/analyze-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actionData),
      });
      
      if (!response.ok) {
        throw new Error(`HERMES API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Process any real-time instructions from HERMES
      this.processHermesInstructions(data);
      
      return data;
    } catch (error) {
      console.error('Error communicating with HERMES API:', error);
      
      // Return fallback response
      return {
        trigger_luxlife: false
      };
    }
  }

  /**
   * Get AI companion recommendations for a user
   * 
   * @param userId User ID to get recommendations for
   * @returns List of recommended companions
   */
  public async getCompanionRecommendations(userId: string): Promise<CompanionRecommendationsResponse> {
    try {
      if (this.mockMode) {
        return this.getMockCompanionRecommendations(userId);
      }
      
      const response = await fetch(`${this.apiUrl}/companion-recommendations/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HERMES API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting companion recommendations:', error);
      
      // Return empty recommendations
      return {
        recommendations: []
      };
    }
  }
  
  /**
   * Process instructions from HERMES response
   * This includes boost offers, visibility adjustments, etc.
   */
  private processHermesInstructions(response: HermesResponse): void {
    // Handle boost offers by updating the system
    if (response.boost_offer) {
      const boostValue = response.boost_offer.value;
      const boostExpiry = response.boost_offer.expires;
      
      // Update the local system with HERMES boost suggestions
      hermesOxumEngine.updateSystemLoad(0.7); // Adjust based on HERMES recommendation
      
      console.log(`HERMES suggested boost offer: ${boostValue} (expires: ${boostExpiry})`);
    }
    
    // Handle recommendations by updating visibility
    if (response.recommended_profile) {
      visibilitySystem.updateItemScore(
        response.recommended_profile, 
        85 // Give a visibility boost to recommended profiles
      );
    }
    
    // Log VR events for handling
    if (response.vr_event) {
      console.log(`HERMES triggered VR event: ${response.vr_event}`);
    }
    
    // Handle AI suggestions
    if (response.ai_suggestion && response.ai_suggestion.confidence > 0.8) {
      // Only show high confidence suggestions
      console.log(`HERMES AI suggestion: ${response.ai_suggestion.message} (${response.ai_suggestion.confidence * 100}% confidence)`);
    }
  }

  /**
   * Get mock HERMES response for development
   * Enhanced with AI companion data
   */
  private getMockResponse(actionData: HermesUserAction): HermesResponse {
    // AI companion interaction handling
    if (actionData.action === 'ai_companion_interaction') {
      return {
        trigger_luxlife: true,
        recommended_companion_id: 'sophia-1',
        ai_suggestion: {
          message: "Based on your conversation, you might enjoy our new romantic experiences feature.",
          confidence: 0.85
        }
      };
    }

    // Simple heuristics for development testing
    const responses: HermesResponse[] = [
      {
        trigger_luxlife: true,
        recommended_profile: "profile-123",
        recommended_companion_id: "aria-3",
        boost_offer: {
          value: "25% off",
          expires: "10 minutes"
        }
      },
      {
        trigger_luxlife: false,
        recommended_profile: "profile-456",
        ai_suggestion: {
          message: "Try asking our AI companion about date recommendations.",
          confidence: 0.9
        }
      },
      {
        trigger_luxlife: true,
        vr_event: "Golden Halo Night",
        recommended_companion_id: "max-2"
      }
    ];
    
    // Choose a response based on action type
    let responseIndex = 0;
    
    if (actionData.action === "viewed_profile") {
      responseIndex = 0;
    } else if (actionData.action === "selected_favorite") {
      responseIndex = 1;
    } else if (actionData.action === "requested_boost") {
      responseIndex = 2;
    }
    
    console.log('Mock HERMES response:', responses[responseIndex]);
    return responses[responseIndex];
  }
  
  /**
   * Get mock AI companion recommendations
   */
  private getMockCompanionRecommendations(userId: string): CompanionRecommendationsResponse {
    return {
      recommendations: [
        {
          companion_id: "sophia-1",
          score: 0.95,
          reason: "Based on your interests in art and psychology"
        },
        {
          companion_id: "aria-3",
          score: 0.87,
          reason: "Matches your creative writing interests"
        },
        {
          companion_id: "max-2",
          score: 0.72,
          reason: "Popular with users who share your gaming interests"
        }
      ]
    };
  }
}

// Export singleton instance
export const hermesApiService = new HermesApiService();

export default hermesApiService;
