
import { BaseNeuralService, NeuralServiceConfig } from '../modules/BaseNeuralService';
import { ModuleType } from '../registry/NeuralServiceRegistry';
import { EmotionalState } from '@/types/brainHub';

/**
 * UbxEmoService - Core Emotional Module for UberCore Architecture
 * Handles emotion detection, UI adjustment, and personalization based on emotional state
 */
class UbxEmoService extends BaseNeuralService {
  private emotionalDetectionEnabled: boolean;
  private defaultEmotionalState: EmotionalState;
  private userEmotionalProfiles: Map<string, EmotionalState>;
  private interactionHistory: Array<{userId: string, emotionVector: Record<string, number>, timestamp: Date}>;
  private adaptiveResponses: Map<string, Array<{trigger: string, response: string}>>;
  
  constructor() {
    // Configure the service with default settings
    const config: NeuralServiceConfig = {
      moduleId: 'ubx-emotional',
      moduleType: 'ubx-emotional' as ModuleType,
      moduleName: 'UBX Emotional Intelligence Service',
      description: 'Emotional intelligence and adaptive interface service for the UberCore architecture',
      version: '1.0.0',
      enabled: true,
      priority: 85,
      autonomyLevel: 75,
      resourceAllocation: 60
    };
    
    super(config);
    this.emotionalDetectionEnabled = true;
    this.defaultEmotionalState = {
      dominantEmotion: 'neutral',
      emotionIntensity: 0.5,
      emotionVector: {
        happiness: 0.5,
        interest: 0.5,
        contentment: 0.5,
        excitement: 0.5
      }
    };
    this.userEmotionalProfiles = new Map();
    this.interactionHistory = [];
    this.adaptiveResponses = new Map([
      ['happiness', [
        { trigger: 'high', response: 'enthusiastic' },
        { trigger: 'low', response: 'encouraging' }
      ]],
      ['interest', [
        { trigger: 'high', response: 'detailed' },
        { trigger: 'low', response: 'engaging' }
      ]],
      ['contentment', [
        { trigger: 'high', response: 'affirming' },
        { trigger: 'low', response: 'supportive' }
      ]],
      ['excitement', [
        { trigger: 'high', response: 'energetic' },
        { trigger: 'low', response: 'stimulating' }
      ]]
    ]);
  }
  
  /**
   * Process user interaction to detect emotional state
   * @param userId User identifier
   * @param interaction User interaction data
   * @param context Additional context information
   * @returns Detected emotional state and recommended adaptation
   */
  public processInteraction(
    userId: string, 
    interaction: { 
      text?: string; 
      actions?: string[]; 
      duration?: number; 
      clickPattern?: string[];
    },
    context?: any
  ): { 
    emotionalState: EmotionalState; 
    recommendedAdaptation: { 
      tone: string; 
      visualMode: string; 
      contentPriority: string;
    } 
  } {
    console.log(`Processing emotional interaction for user ${userId}`);
    
    if (!this.emotionalDetectionEnabled || !this.config.enabled) {
      console.warn('UBX Emotional processing is disabled');
      return {
        emotionalState: this.defaultEmotionalState,
        recommendedAdaptation: {
          tone: 'neutral',
          visualMode: 'standard',
          contentPriority: 'balanced'
        }
      };
    }
    
    // Extract emotion signals from the interaction
    const emotionSignals = this.extractEmotionSignals(interaction, context);
    
    // Generate emotional state
    const emotionalState = this.generateEmotionalState(userId, emotionSignals);
    
    // Store this interaction in history
    this.interactionHistory.push({
      userId,
      emotionVector: emotionalState.emotionVector,
      timestamp: new Date()
    });
    
    // Update user emotional profile
    this.updateUserEmotionalProfile(userId, emotionalState);
    
    // Generate recommended adaptations
    const recommendedAdaptation = this.generateRecommendedAdaptation(emotionalState);
    
    return {
      emotionalState,
      recommendedAdaptation
    };
  }
  
  /**
   * Extract emotion signals from user interaction
   */
  private extractEmotionSignals(interaction: any, context?: any): Record<string, number> {
    const signals: Record<string, number> = {
      happiness: 0.5,
      interest: 0.5,
      contentment: 0.5,
      excitement: 0.5
    };
    
    // Text-based emotion detection (simplified)
    if (interaction.text) {
      const text = interaction.text.toLowerCase();
      
      // Simple keyword-based signal extraction
      const happinessWords = ['happy', 'great', 'excited', 'love', 'awesome'];
      const interestWords = ['curious', 'interested', 'tell me more', 'fascinating'];
      const contentmentWords = ['satisfied', 'content', 'pleased', 'good'];
      const excitementWords = ['wow', 'amazing', 'incredible', 'can\'t wait'];
      
      signals.happiness += this.calculateKeywordScore(text, happinessWords) * 0.3;
      signals.interest += this.calculateKeywordScore(text, interestWords) * 0.3;
      signals.contentment += this.calculateKeywordScore(text, contentmentWords) * 0.3;
      signals.excitement += this.calculateKeywordScore(text, excitementWords) * 0.3;
    }
    
    // Action-based signals
    if (interaction.actions) {
      if (interaction.actions.includes('bookmark') || interaction.actions.includes('favorite')) {
        signals.interest += 0.2;
      }
      
      if (interaction.actions.includes('share')) {
        signals.excitement += 0.2;
        signals.happiness += 0.1;
      }
      
      if (interaction.actions.includes('purchase')) {
        signals.contentment += 0.3;
      }
    }
    
    // Click pattern analysis
    if (interaction.clickPattern) {
      const rapidClicks = interaction.clickPattern.length > 5;
      if (rapidClicks) {
        signals.excitement += 0.1;
      }
      
      const exploratoryClicks = new Set(interaction.clickPattern).size > 3;
      if (exploratoryClicks) {
        signals.interest += 0.2;
      }
    }
    
    // Duration-based signals
    if (interaction.duration) {
      // Longer engagement suggests higher interest
      if (interaction.duration > 120) { // more than 2 minutes
        signals.interest += 0.2;
        signals.contentment += 0.1;
      }
    }
    
    // Include context information if available
    if (context) {
      // If previous emotional state is available, use it for continuity
      if (context.previousEmotionalState) {
        Object.keys(signals).forEach(emotion => {
          if (context.previousEmotionalState.emotionVector[emotion]) {
            // Blend with previous state for smoothing (70% new, 30% old)
            signals[emotion] = signals[emotion] * 0.7 + 
              context.previousEmotionalState.emotionVector[emotion] * 0.3;
          }
        });
      }
      
      // Adjust based on explicit user preferences if available
      if (context.userPreferences) {
        if (context.userPreferences.preferredContentType === 'exciting') {
          signals.excitement += 0.1;
        } else if (context.userPreferences.preferredContentType === 'informative') {
          signals.interest += 0.1;
        }
      }
    }
    
    // Normalize all signals to 0-1 range
    Object.keys(signals).forEach(key => {
      signals[key] = Math.min(1, Math.max(0, signals[key]));
    });
    
    return signals;
  }
  
  /**
   * Calculate keyword score based on presence in text
   */
  private calculateKeywordScore(text: string, keywords: string[]): number {
    let score = 0;
    keywords.forEach(word => {
      if (text.includes(word)) {
        score += 1 / keywords.length;
      }
    });
    return score;
  }
  
  /**
   * Generate emotional state based on signals
   */
  private generateEmotionalState(userId: string, emotionSignals: Record<string, number>): EmotionalState {
    // Get existing profile or create new one
    const existingProfile = this.userEmotionalProfiles.get(userId) || this.defaultEmotionalState;
    
    // Update emotion vector by combining signals with existing profile
    const emotionVector = { ...emotionSignals };
    
    // Find dominant emotion
    let dominantEmotion = 'neutral';
    let highestValue = 0;
    
    Object.entries(emotionVector).forEach(([emotion, value]) => {
      if (value > highestValue) {
        highestValue = value;
        dominantEmotion = emotion;
      }
    });
    
    // Calculate overall intensity
    const emotionValues = Object.values(emotionVector);
    const emotionIntensity = emotionValues.reduce((sum, value) => sum + value, 0) / emotionValues.length;
    
    return {
      dominantEmotion,
      emotionIntensity,
      emotionVector
    };
  }
  
  /**
   * Update user emotional profile
   */
  private updateUserEmotionalProfile(userId: string, emotionalState: EmotionalState): void {
    this.userEmotionalProfiles.set(userId, emotionalState);
  }
  
  /**
   * Generate recommended adaptations based on emotional state
   */
  private generateRecommendedAdaptation(emotionalState: EmotionalState): {
    tone: string;
    visualMode: string;
    contentPriority: string;
  } {
    // Default recommendations
    let tone = 'neutral';
    let visualMode = 'standard';
    let contentPriority = 'balanced';
    
    // Determine tone based on dominant emotion
    const { dominantEmotion, emotionIntensity } = emotionalState;
    const intensityLevel = emotionIntensity > 0.7 ? 'high' : 'low';
    
    // Get adaptive responses for the dominant emotion
    const responses = this.adaptiveResponses.get(dominantEmotion);
    if (responses) {
      const matchingResponse = responses.find(r => r.trigger === intensityLevel);
      if (matchingResponse) {
        tone = matchingResponse.response;
      }
    }
    
    // Determine visual mode based on emotion vector
    if (emotionalState.emotionVector.excitement > 0.7) {
      visualMode = 'vibrant';
    } else if (emotionalState.emotionVector.contentment > 0.7) {
      visualMode = 'calm';
    } else if (emotionalState.emotionVector.interest > 0.7) {
      visualMode = 'focused';
    }
    
    // Determine content priority
    if (emotionalState.emotionVector.interest > 0.7) {
      contentPriority = 'informational';
    } else if (emotionalState.emotionVector.excitement > 0.7) {
      contentPriority = 'engaging';
    } else if (emotionalState.emotionVector.happiness > 0.7) {
      contentPriority = 'entertaining';
    } else if (emotionalState.emotionVector.contentment > 0.7) {
      contentPriority = 'familiar';
    }
    
    return {
      tone,
      visualMode,
      contentPriority
    };
  }
  
  /**
   * Get user emotional profile
   * @param userId User identifier
   */
  public getUserEmotionalProfile(userId: string): EmotionalState | undefined {
    return this.userEmotionalProfiles.get(userId);
  }
  
  /**
   * Get all user emotional profiles
   */
  public getAllEmotionalProfiles(): Record<string, EmotionalState> {
    const profiles: Record<string, EmotionalState> = {};
    this.userEmotionalProfiles.forEach((profile, userId) => {
      profiles[userId] = profile;
    });
    return profiles;
  }
  
  /**
   * Enable or disable emotional detection
   */
  public setEmotionalDetectionEnabled(enabled: boolean): void {
    this.emotionalDetectionEnabled = enabled;
    console.log(`Emotional detection ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  /**
   * Get service status and metrics
   */
  public getStatus(): Record<string, any> {
    return {
      enabled: this.emotionalDetectionEnabled && this.config.enabled,
      profileCount: this.userEmotionalProfiles.size,
      interactionCount: this.interactionHistory.length,
      lastUpdate: this.interactionHistory.length > 0 
        ? this.interactionHistory[this.interactionHistory.length - 1].timestamp
        : null,
      moduleStatus: 'operational'
    };
  }
  
  /**
   * @override
   * Get capabilities of this neural service
   */
  public getCapabilities(): string[] {
    return [
      'emotion-detection',
      'adaptive-interface',
      'mood-responsive-content',
      'personality-adaptation',
      'emotional-continuity-tracking',
      'user-experience-optimization'
    ];
  }
  
  /**
   * @override
   * Initialize the service
   */
  public async initialize(): Promise<boolean> {
    console.log('Initializing UBX Emotional Intelligence Service...');
    // Simulate initialization process
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('UBX Emotional Intelligence Service initialized successfully');
    return true;
  }
}

// Export singleton instance
export const ubxEmoService = new UbxEmoService();

// Export the class for typing and extending
export { UbxEmoService };
