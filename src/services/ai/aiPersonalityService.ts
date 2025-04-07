import { 
  AIPersonalityConfig, 
  EmotionalState, 
  PersonalityType 
} from '@/types/ai-personality';
import { aiPersonalityTemplates } from './aiPersonalityTemplates';
import { redisEmotionalMemoryService } from './redisEmotionalMemoryService';
import { sentimentAnalysisService } from './sentimentAnalysisService';

/**
 * AI Personality Service
 * Manages personality traits and emotional responses for AI companions
 */
export class AIPersonalityService {
  /**
   * Create default emotional state
   */
  createDefaultEmotionalState(): EmotionalState {
    return {
      joy: 50,
      interest: 50,
      surprise: 30,
      sadness: 10,
      anger: 0,
      fear: 5,
      trust: 30,
      anticipation: 40,
      dominantEmotion: 'interest', // Add missing required property
      intensityLevel: 5,
      lastUpdated: new Date().toISOString()
    };
  }
  
  /**
   * Create personalized emotional state based on personality
   */
  createPersonalizedEmotionalState(personality: PersonalityType): EmotionalState {
    const baseState = this.createDefaultEmotionalState();
    
    switch (personality) {
      case 'flirty':
        return {
          ...baseState,
          joy: 70,
          interest: 80,
          trust: 60,
          dominantEmotion: 'interest',
          intensityLevel: 7
        };
        
      case 'shy':
        return {
          ...baseState,
          joy: 40,
          interest: 60,
          fear: 20,
          trust: 20,
          dominantEmotion: 'interest',
          intensityLevel: 4
        };
        
      case 'dominant':
        return {
          ...baseState,
          joy: 60,
          interest: 70,
          trust: 40,
          dominantEmotion: 'interest',
          intensityLevel: 8
        };
        
      case 'romantic':
        return {
          ...baseState,
          joy: 75,
          interest: 70,
          trust: 75,
          sadness: 35, // more emotional range
          anticipation: 70,
          dominantEmotion: 'joy',
          intensityLevel: 6,
          lastUpdated: new Date().toISOString()
        };
        
      case 'intellectual':
        return {
          ...baseState,
          joy: 40,
          interest: 90,
          surprise: 50,
          trust: 60,
          dominantEmotion: 'interest',
          intensityLevel: 7,
          lastUpdated: new Date().toISOString()
        };
        
      case 'playful':
        return {
          ...baseState,
          joy: 85,
          interest: 75,
          surprise: 70,
          anticipation: 80,
          dominantEmotion: 'joy',
          intensityLevel: 8,
          lastUpdated: new Date().toISOString()
        };
        
      case 'adventurous':
        return {
          ...baseState,
          joy: 65,
          interest: 85,
          surprise: 70,
          fear: 20,
          anticipation: 90,
          dominantEmotion: 'anticipation',
          intensityLevel: 9,
          lastUpdated: new Date().toISOString()
        };
        
      case 'submissive':
        return {
          ...baseState,
          joy: 60,
          interest: 70,
          trust: 80,
          fear: 30,
          dominantEmotion: 'trust',
          intensityLevel: 5,
          lastUpdated: new Date().toISOString()
        };
        
      default:
        return baseState;
    }
  }
  
  /**
   * Get personality template from the predefined collection
   */
  getPersonalityTemplate(personality: PersonalityType): AIPersonalityConfig {
    return aiPersonalityTemplates[personality];
  }
  
  /**
   * Update emotional state based on a user message
   */
  async updateEmotionalState(
    currentState: EmotionalState,
    message: string,
    personalityType: PersonalityType
  ): Promise<EmotionalState> {
    try {
      // Run sentiment analysis
      const sentiment = await sentimentAnalysisService.analyzeSentiment(message);
      
      // Create a copy of the current state
      const newState: EmotionalState = { ...currentState };
      
      // Update emotions based on sentiment and personality type
      if (sentiment.positive > sentiment.negative) {
        // Positive sentiment adjustments
        newState.joy = Math.min(100, newState.joy + sentiment.positive * 15);
        newState.trust = Math.min(100, newState.trust + sentiment.positive * 10);
        newState.sadness = Math.max(0, newState.sadness - sentiment.positive * 5);
        newState.anger = Math.max(0, newState.anger - sentiment.positive * 8);
        
        // Personality-specific adjustments for positive messages
        switch (personalityType) {
          case 'flirty':
            newState.interest = Math.min(100, newState.interest + sentiment.positive * 20);
            break;
            
          case 'submissive':
            newState.joy = Math.min(100, newState.joy + sentiment.positive * 25);
            break;
            
          case 'romantic':
            newState.joy = Math.min(100, newState.joy + sentiment.positive * 18);
            newState.anticipation = Math.min(100, newState.anticipation + sentiment.positive * 15);
            break;
        }
      } else {
        // Negative sentiment adjustments
        newState.sadness = Math.min(100, newState.sadness + sentiment.negative * 12);
        newState.joy = Math.max(0, newState.joy - sentiment.negative * 8);
        
        // Check for anger words
        if (sentiment.anger > 0.3) {
          newState.anger = Math.min(100, newState.anger + sentiment.anger * 30);
          newState.trust = Math.max(0, newState.trust - sentiment.anger * 15);
        }
        
        // Personality-specific adjustments for negative messages
        switch (personalityType) {
          case 'dominant':
            newState.anger = Math.min(100, newState.anger + sentiment.negative * 18);
            break;
            
          case 'submissive':
            newState.fear = Math.min(100, newState.fear + sentiment.negative * 25);
            break;
            
          case 'shy':
            newState.fear = Math.min(100, newState.fear + sentiment.negative * 20);
            newState.sadness = Math.min(100, newState.sadness + sentiment.negative * 15);
            break;
        }
      }
      
      // Natural decay for emotions that weren't strongly affected
      newState.joy = this.applyDecay(newState.joy, currentState.joy);
      newState.sadness = this.applyDecay(newState.sadness, currentState.sadness);
      newState.anger = this.applyDecay(newState.anger, currentState.anger);
      newState.fear = this.applyDecay(newState.fear, currentState.fear);
      newState.trust = this.applyDecay(newState.trust, currentState.trust);
      newState.surprise = this.applyDecay(newState.surprise, currentState.surprise);
      newState.anticipation = this.applyDecay(newState.anticipation, currentState.anticipation);
      newState.interest = this.applyDecay(newState.interest, currentState.interest);
      
      // Update intensity level based on dominant emotion
      const emotionValues = [
        newState.joy, newState.sadness, newState.anger, 
        newState.fear, newState.trust, newState.surprise,
        newState.anticipation, newState.interest
      ];
      
      // Calculate intensity as the highest emotion value
      newState.intensityLevel = Math.max(...emotionValues);
      
      // Determine dominant emotion
      newState.dominantEmotion = this.getDominantEmotion(newState);
      
      // Update timestamp
      newState.lastUpdated = new Date().toISOString();
      
      return newState;
    } catch (error) {
      console.error('Error updating emotional state:', error);
      return currentState;
    }
  }
  
  /**
   * Apply natural decay to emotions that weren't strongly affected
   */
  private applyDecay(newValue: number, oldValue: number): number {
    // If values are close, apply decay toward baseline (50)
    if (Math.abs(newValue - oldValue) < 10) {
      const baseline = 50;
      // Move 5% of the distance to baseline
      return oldValue > baseline ? 
        oldValue - (oldValue - baseline) * 0.05 : 
        oldValue + (baseline - oldValue) * 0.05;
    }
    return newValue;
  }
  
  /**
   * Get dominant emotion based on emotional state
   */
  private getDominantEmotion(state: EmotionalState): string {
    const emotions: {[key: string]: number} = {
      joy: state.joy,
      interest: state.interest,
      surprise: state.surprise,
      sadness: state.sadness,
      anger: state.anger,
      fear: state.fear,
      trust: state.trust,
      anticipation: state.anticipation
    };
    
    let dominantEmotion = 'neutral';
    let highestIntensity = 0;
    
    for (const emotion in emotions) {
      if (emotions[emotion] > highestIntensity) {
        highestIntensity = emotions[emotion];
        dominantEmotion = emotion;
      }
    }
    
    return dominantEmotion;
  }
  
  /**
   * Generate response tone based on emotional state and personality
   */
  generateResponseTone(
    state: EmotionalState,
    personalityType: PersonalityType
  ): string {
    // Base tone on dominant emotion and intensity
    const { dominantEmotion, intensityLevel } = state;
    
    switch (dominantEmotion) {
      case 'joy':
        return `cheerful and ${intensityLevel > 7 ? 'excited' : 'happy'}`;
      
      case 'trust':
        return `warm and ${intensityLevel > 7 ? 'affectionate' : 'friendly'}`;
      
      case 'fear':
        return `${intensityLevel > 7 ? 'nervous' : 'cautious'} and hesitant`;
      
      case 'surprise':
        return `${intensityLevel > 7 ? 'shocked' : 'surprised'} and curious`;
      
      case 'sadness':
        return `${intensityLevel > 7 ? 'melancholic' : 'somber'} and reflective`;
      
      case 'anger':
        return `${intensityLevel > 7 ? 'frustrated' : 'annoyed'} but controlled`;
      
      case 'anticipation':
        return `eager and ${intensityLevel > 7 ? 'enthusiastic' : 'hopeful'}`;
      
      case 'interest':
        return `engaged and ${intensityLevel > 7 ? 'fascinated' : 'attentive'}`;
      
      default:
        return 'neutral but attentive';
    }
    
    // Returning a proper object-based response style (as part of AIPersonalityConfig)
    return {
      formality: intensityLevel > 5 ? 3 : 4,
      friendliness: dominantEmotion === 'joy' || dominantEmotion === 'trust' ? 5 : 3,
      verbosity: dominantEmotion === 'interest' ? 4 : 3,
      humor: dominantEmotion === 'joy' ? 4 : 2
    };
  }
  
  // Add a method to get the personality configuration
  getPersonalityConfig(personalityType: PersonalityType): AIPersonalityConfig {
    return aiPersonalityTemplates[personalityType];
  }
}

export const aiPersonalityService = new AIPersonalityService();
export default aiPersonalityService;
