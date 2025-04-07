
import { InfluencePhase, InfluenceTechnique } from '@/types/chaseHughes';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

interface EmotionalSignal {
  phase: InfluencePhase;
  strength: number; // 0-100
  timestamp: Date;
}

interface EmotionalPhaseData {
  currentPhase: InfluencePhase;
  phaseProgress: number; // 0-100
  phaseDuration: number; // milliseconds in current phase
  phaseStarted: Date;
  phaseHistory: EmotionalSignal[];
  recommendedTechniques: InfluenceTechnique[];
}

interface UserInteractionData {
  messageCount: number;
  averageResponseTime: number; // milliseconds
  lastInteraction: Date;
  engagementScore: number; // 0-100
}

/**
 * EmotionalPhaseAnalyzer - Service for tracking and analyzing emotional phases
 * based on Chase Hughes' Chain of Influence framework
 */
export class EmotionalPhaseAnalyzer {
  private static instance: EmotionalPhaseAnalyzer;
  private userEmotionalData: Record<string, EmotionalPhaseData> = {};
  private userInteractionData: Record<string, UserInteractionData> = {};

  // Default phase progression thresholds
  private readonly phaseThresholds = {
    interest: 75, // Need 75% interest completion to move to trust
    trust: 85,    // Need 85% trust completion to move to desire
    desire: 70,   // Need 70% desire completion to move to action
    action: 90,   // Need 90% action completion to move to loyalty
    loyalty: 100  // Loyalty is ongoing
  };

  private constructor() {}

  public static getInstance(): EmotionalPhaseAnalyzer {
    if (!EmotionalPhaseAnalyzer.instance) {
      EmotionalPhaseAnalyzer.instance = new EmotionalPhaseAnalyzer();
    }
    return EmotionalPhaseAnalyzer.instance;
  }

  /**
   * Initialize or get a user's emotional phase data
   */
  private initUserData(userId: string): EmotionalPhaseData {
    if (!this.userEmotionalData[userId]) {
      const now = new Date();
      this.userEmotionalData[userId] = {
        currentPhase: 'interest',
        phaseProgress: 10, // Start with some initial progress
        phaseDuration: 0,
        phaseStarted: now,
        phaseHistory: [{
          phase: 'interest',
          strength: 10,
          timestamp: now
        }],
        recommendedTechniques: ['yes_ladder', 'likeability_enhancement']
      };
      
      // Initialize interaction data
      this.userInteractionData[userId] = {
        messageCount: 0,
        averageResponseTime: 0,
        lastInteraction: now,
        engagementScore: 50
      };
    }
    
    return this.userEmotionalData[userId];
  }

  /**
   * Track a user interaction and update emotional phase data
   */
  public trackInteraction(userId: string, interactionType: string, data: any): void {
    const emotionalData = this.initUserData(userId);
    const interactionData = this.userInteractionData[userId];
    const now = new Date();
    
    // Update interaction metrics
    interactionData.messageCount++;
    
    // Calculate response time
    const timeSinceLastInteraction = now.getTime() - interactionData.lastInteraction.getTime();
    interactionData.averageResponseTime = 
      (interactionData.averageResponseTime * (interactionData.messageCount - 1) + timeSinceLastInteraction) / 
      interactionData.messageCount;
    interactionData.lastInteraction = now;
    
    // Calculate phase progress based on interaction type and neural hub metrics
    let progressIncrease = 0;
    const hermesMetrics = neuralHub.getHealthMetrics();
    
    switch (interactionType) {
      case 'message':
        // Messages advance current phase slightly
        progressIncrease = 2 + (hermesMetrics.userEngagement * 3);
        break;
        
      case 'click':
        // Clicks indicate interest
        progressIncrease = 1 + (hermesMetrics.userEngagement * 2);
        break;
        
      case 'purchase':
        // Purchases advance strongly toward the action phase
        if (emotionalData.currentPhase === 'desire') {
          progressIncrease = 30;
        } else {
          progressIncrease = 10;
        }
        break;
        
      case 'share':
        // Sharing indicates loyalty
        if (emotionalData.currentPhase === 'action' || emotionalData.currentPhase === 'loyalty') {
          progressIncrease = 15;
        } else {
          progressIncrease = 5;
        }
        break;
        
      default:
        progressIncrease = 1;
    }
    
    // Apply stability factor from neural hub - more stable users progress more steadily
    progressIncrease *= Math.max(0.5, hermesMetrics.stability);
    
    // Update phase progress
    emotionalData.phaseProgress = Math.min(100, emotionalData.phaseProgress + progressIncrease);
    
    // Update phase duration
    emotionalData.phaseDuration = now.getTime() - emotionalData.phaseStarted.getTime();
    
    // Check if we should advance to the next phase
    this.checkPhaseTransition(userId);
    
    // Update recommended techniques based on current phase
    this.updateRecommendedTechniques(userId);
    
    // Add to emotional signal history
    emotionalData.phaseHistory.push({
      phase: emotionalData.currentPhase,
      strength: emotionalData.phaseProgress,
      timestamp: now
    });
    
    // Limit history length
    if (emotionalData.phaseHistory.length > 50) {
      emotionalData.phaseHistory.shift();
    }
    
    // Update engagement score
    this.updateEngagementScore(userId);
    
    console.log(`Updated emotional phase for user ${userId}:`, emotionalData.currentPhase, emotionalData.phaseProgress);
  }
  
  /**
   * Check if the user should transition to the next emotional phase
   */
  private checkPhaseTransition(userId: string): void {
    const emotionalData = this.initUserData(userId);
    
    // Check if we've met the threshold to move to the next phase
    if (emotionalData.phaseProgress >= this.phaseThresholds[emotionalData.currentPhase]) {
      // Get the next phase in the sequence
      const nextPhase = this.getNextPhase(emotionalData.currentPhase);
      
      // If there's a next phase, transition to it
      if (nextPhase && nextPhase !== emotionalData.currentPhase) {
        emotionalData.currentPhase = nextPhase;
        emotionalData.phaseProgress = 10; // Start new phase with some initial progress
        emotionalData.phaseStarted = new Date();
        emotionalData.phaseDuration = 0;
        
        console.log(`User ${userId} transitioned to emotional phase:`, nextPhase);
      }
    }
  }
  
  /**
   * Get the next phase in the Chain of Influence sequence
   */
  private getNextPhase(currentPhase: InfluencePhase): InfluencePhase {
    const phaseSequence: InfluencePhase[] = ['interest', 'trust', 'desire', 'action', 'loyalty'];
    const currentIndex = phaseSequence.indexOf(currentPhase);
    
    if (currentIndex >= 0 && currentIndex < phaseSequence.length - 1) {
      return phaseSequence[currentIndex + 1];
    }
    
    return currentPhase; // Stay in current phase if it's the last one
  }
  
  /**
   * Update the recommended influence techniques based on current phase
   */
  private updateRecommendedTechniques(userId: string): void {
    const emotionalData = this.initUserData(userId);
    
    // Techniques appropriate to each phase in the Chain of Influence
    switch (emotionalData.currentPhase) {
      case 'interest':
        emotionalData.recommendedTechniques = [
          'likeability_enhancement', 
          'yes_ladder',
          'interrogation_encapsulation'
        ];
        break;
        
      case 'trust':
        emotionalData.recommendedTechniques = [
          'interrogation_encapsulation', 
          'social_proof', 
          'authority_positioning'
        ];
        break;
        
      case 'desire':
        emotionalData.recommendedTechniques = [
          'reciprocity_trigger', 
          'scarcity_framing', 
          'social_proof'
        ];
        break;
        
      case 'action':
        emotionalData.recommendedTechniques = [
          'commitment_consistency', 
          'yes_ladder', 
          'scarcity_framing'
        ];
        break;
        
      case 'loyalty':
        emotionalData.recommendedTechniques = [
          'reciprocity_trigger', 
          'commitment_consistency', 
          'likeability_enhancement'
        ];
        break;
    }
  }
  
  /**
   * Update the user's engagement score based on interaction patterns
   */
  private updateEngagementScore(userId: string): void {
    const interactionData = this.userInteractionData[userId];
    const emotionalData = this.userEmotionalData[userId];
    
    if (!interactionData || !emotionalData) return;
    
    // Calculate time since last interaction in minutes
    const now = new Date();
    const minutesSinceLastInteraction = 
      (now.getTime() - interactionData.lastInteraction.getTime()) / (1000 * 60);
    
    // Base score on message count and recency
    let engagementScore = Math.min(100, interactionData.messageCount * 5);
    
    // Decrease score for long gaps between interactions
    if (minutesSinceLastInteraction > 60) { // More than an hour
      engagementScore *= 0.8;
    } else if (minutesSinceLastInteraction > 15) { // More than 15 minutes
      engagementScore *= 0.9;
    }
    
    // Boost score based on emotional phase
    const phaseBoostFactor = {
      interest: 1.0,
      trust: 1.2,
      desire: 1.4,
      action: 1.6,
      loyalty: 2.0
    };
    
    engagementScore *= phaseBoostFactor[emotionalData.currentPhase];
    
    // Cap at 100
    interactionData.engagementScore = Math.min(100, engagementScore);
  }
  
  /**
   * Get a user's current emotional phase data
   */
  public getUserEmotionalData(userId: string): {
    phase: InfluencePhase;
    progress: number;
    recommendedTechniques: InfluenceTechnique[];
    engagementScore: number;
  } {
    const emotionalData = this.userEmotionalData[userId];
    const interactionData = this.userInteractionData[userId];
    
    if (!emotionalData || !interactionData) {
      return {
        phase: 'interest',
        progress: 0,
        recommendedTechniques: ['yes_ladder', 'likeability_enhancement'],
        engagementScore: 0
      };
    }
    
    return {
      phase: emotionalData.currentPhase,
      progress: emotionalData.phaseProgress,
      recommendedTechniques: emotionalData.recommendedTechniques,
      engagementScore: interactionData.engagementScore
    };
  }
  
  /**
   * Get a user's emotional phase history for visualization
   */
  public getUserEmotionalHistory(userId: string): EmotionalSignal[] {
    const emotionalData = this.userEmotionalData[userId];
    
    if (!emotionalData) {
      return [];
    }
    
    return [...emotionalData.phaseHistory];
  }
  
  /**
   * Clear a user's emotional data
   */
  public clearUserData(userId: string): void {
    delete this.userEmotionalData[userId];
    delete this.userInteractionData[userId];
  }
}

export const emotionalPhaseAnalyzer = EmotionalPhaseAnalyzer.getInstance();
export default emotionalPhaseAnalyzer;
