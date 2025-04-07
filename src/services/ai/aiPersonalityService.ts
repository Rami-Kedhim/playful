
import { AIPersonalityConfig, EmotionalState, PersonalityType } from '@/types/ai-personality';
import { getPersonalityTemplate } from './aiPersonalityTemplates';
import { redisEmotionalMemoryService } from './redisEmotionalMemoryService';
import { sentimentAnalysisService } from './sentimentAnalysisService';

/**
 * AI Personality Service
 * Manages AI companion personalities and emotional responses
 */
export class AIPersonalityService {
  /**
   * Get personality template for a specific type
   */
  public getPersonalityTemplate(type: PersonalityType): AIPersonalityConfig {
    return getPersonalityTemplate(type);
  }
  
  /**
   * Create default emotional state with balanced starting values
   */
  public createDefaultEmotionalState(): EmotionalState {
    return {
      joy: 50,
      interest: 60,
      surprise: 40,
      sadness: 20,
      anger: 10,
      fear: 15,
      trust: 50,
      anticipation: 60,
      intensityLevel: 50,
      lastUpdated: new Date().toISOString()
    };
  }
  
  /**
   * Create personalized emotional state based on personality type
   */
  public createPersonalizedEmotionalState(personality: PersonalityType): EmotionalState {
    const baseState = this.createDefaultEmotionalState();
    
    // Adjust based on personality type
    switch (personality) {
      case 'flirty':
        return {
          ...baseState,
          joy: 70,
          interest: 85,
          trust: 60,
          anticipation: 75,
          dominantEmotion: 'interest'
        };
        
      case 'dominant':
        return {
          ...baseState,
          joy: 45,
          interest: 65,
          trust: 40,
          surprise: 30,
          anger: 20,
          dominantEmotion: 'interest'
        };
        
      case 'submissive':
        return {
          ...baseState,
          joy: 60,
          interest: 70,
          trust: 80,
          fear: 30,
          dominantEmotion: 'trust'
        };
        
      case 'romantic':
        return {
          ...baseState,
          joy: 75,
          interest: 70,
          trust: 75,
          sadness: 35, // more emotional range
          anticipation: 70,
          dominantEmotion: 'joy'
        };
        
      case 'shy':
        return {
          ...baseState,
          joy: 45,
          interest: 60,
          fear: 40,
          trust: 35,
          anticipation: 50,
          dominantEmotion: 'interest'
        };
        
      case 'intellectual':
        return {
          ...baseState,
          joy: 40,
          interest: 90,
          surprise: 50,
          trust: 60,
          dominantEmotion: 'interest'
        };
        
      case 'playful':
        return {
          ...baseState,
          joy: 85,
          interest: 75,
          surprise: 70,
          anticipation: 80,
          dominantEmotion: 'joy'
        };
        
      case 'adventurous':
        return {
          ...baseState,
          joy: 65,
          interest: 85,
          surprise: 70,
          fear: 20,
          anticipation: 90,
          dominantEmotion: 'anticipation'
        };
        
      default:
        return {
          ...baseState,
          dominantEmotion: 'interest'
        };
    }
  }
  
  /**
   * Update emotional state based on user message
   */
  public async updateEmotionalState(
    currentState: EmotionalState,
    userMessage: string,
    personalityType: PersonalityType
  ): Promise<EmotionalState> {
    try {
      // Run sentiment analysis
      const sentiment = await sentimentAnalysisService.analyzeSentiment(userMessage);
      
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
  public generateResponseTone(
    emotionalState: EmotionalState,
    personalityType: PersonalityType
  ): string {
    const dominantEmotion = emotionalState.dominantEmotion || 'neutral';
    const intensity = emotionalState.intensityLevel;
    const personality = this.getPersonalityTemplate(personalityType);
    
    let tone = personality.responseStyle;
    
    // Add emotional flavor based on dominant emotion and intensity
    switch (dominantEmotion) {
      case 'joy':
        tone += intensity > 75 ? " Exceptionally cheerful and enthusiastic." : 
                intensity > 50 ? " Warm and pleasant." : " Mildly positive.";
        break;
        
      case 'interest':
        tone += intensity > 75 ? " Deeply engaged and captivated." : 
                intensity > 50 ? " Curious and attentive." : " Somewhat interested.";
        break;
        
      case 'surprise':
        tone += intensity > 75 ? " Utterly astonished and amazed." : 
                intensity > 50 ? " Surprised and taken aback." : " Slightly unexpected.";
        break;
        
      case 'sadness':
        tone += intensity > 75 ? " Deeply melancholic and somber." : 
                intensity > 50 ? " Noticeably sad and downcast." : " Tinged with mild disappointment.";
        break;
        
      case 'anger':
        tone += intensity > 75 ? " Intensely frustrated and heated." : 
                intensity > 50 ? " Irritated and terse." : " Slightly annoyed.";
        break;
        
      case 'fear':
        tone += intensity > 75 ? " Extremely anxious and worried." : 
                intensity > 50 ? " Nervous and unsettled." : " Slightly apprehensive.";
        break;
        
      case 'trust':
        tone += intensity > 75 ? " Completely open and trusting." : 
                intensity > 50 ? " Comfortable and relaxed." : " Cautiously receptive.";
        break;
        
      case 'anticipation':
        tone += intensity > 75 ? " Highly excited and expectant." : 
                intensity > 50 ? " Looking forward with eagerness." : " Mildly anticipating what comes next.";
        break;
        
      default:
        tone += " Balanced and measured in response.";
    }
    
    return tone;
  }
}

export const aiPersonalityService = new AIPersonalityService();
export default aiPersonalityService;
