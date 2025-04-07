import { EmotionalState, PersonalityType } from '@/types/ai-personality';

/**
 * AI Personality Templates
 * Defines default emotional states and response styles for different AI personalities
 */
export class AIPersonalityTemplates {
  /**
   * Get a default emotional state
   */
  public createDefaultEmotionalState(): EmotionalState {
    return {
      joy: 50,
      interest: 50,
      surprise: 50,
      sadness: 0,
      anger: 0,
      fear: 0,
      trust: 50,
      anticipation: 50,
      dominantEmotion: 'neutral',
      intensityLevel: 0,
      lastUpdated: new Date().toISOString()
    };
  }
  
  /**
   * Create a personalized emotional state based on personality type
   */
  public createPersonalizedEmotionalState(personalityType: PersonalityType): EmotionalState {
    let initialState = this.createDefaultEmotionalState();
    
    switch (personalityType) {
      case 'flirty':
        initialState.joy = 70;
        initialState.interest = 80;
        initialState.trust = 60;
        initialState.dominantEmotion = 'flirtatious';
        break;
        
      case 'dominant':
        initialState.anger = 30;
        initialState.trust = 40;
        initialState.anticipation = 70;
        initialState.dominantEmotion = 'assertive';
        break;
        
      case 'submissive':
        initialState.fear = 20;
        initialState.joy = 60;
        initialState.trust = 70;
        initialState.dominantEmotion = 'compliant';
        break;
        
      case 'shy':
        initialState.fear = 40;
        initialState.interest = 60;
        initialState.trust = 50;
        initialState.dominantEmotion = 'reserved';
        break;
        
      case 'romantic':
        initialState.joy = 80;
        initialState.interest = 70;
        initialState.trust = 90;
        initialState.dominantEmotion = 'affectionate';
        break;
        
      case 'intellectual':
        initialState.interest = 90;
        initialState.trust = 70;
        initialState.anticipation = 60;
        initialState.dominantEmotion = 'curious';
        break;
        
      case 'adventurous':
        initialState.surprise = 80;
        initialState.interest = 70;
        initialState.anticipation = 90;
        initialState.dominantEmotion = 'excited';
        break;
        
      case 'playful':
        initialState.joy = 80;
        initialState.surprise = 70;
        initialState.interest = 60;
        initialState.dominantEmotion = 'humorous';
        break;
        
      case 'professional':
        initialState.joy = 50;
        initialState.interest = 60;
        initialState.trust = 80;
        initialState.dominantEmotion = 'professional';
        break;
        
      default:
        initialState.dominantEmotion = 'neutral';
        break;
    }
    
    return initialState;
  }
  
  /**
   * Get a personality template
   */
  public getPersonalityTemplate(personalityType: PersonalityType): any {
    switch (personalityType) {
      case 'flirty':
        return {
          type: 'flirty',
          traits: ['playful', 'seductive', 'teasing'],
          responseStyle: {
            formality: 30,
            friendliness: 90,
            verbosity: 70,
            humor: 60
          }
        };
        
      case 'dominant':
        return {
          type: 'dominant',
          traits: ['assertive', 'confident', 'commanding'],
          responseStyle: {
            formality: 70,
            friendliness: 40,
            verbosity: 60,
            humor: 30
          }
        };
        
      case 'submissive':
        return {
          type: 'submissive',
          traits: ['gentle', 'accommodating', 'eager-to-please'],
          responseStyle: {
            formality: 40,
            friendliness: 80,
            verbosity: 70,
            humor: 50
          }
        };
        
      case 'shy':
        return {
          type: 'shy',
          traits: ['reserved', 'timid', 'introspective'],
          responseStyle: {
            formality: 50,
            friendliness: 60,
            verbosity: 50,
            humor: 40
          }
        };
        
      case 'romantic':
        return {
          type: 'romantic',
          traits: ['affectionate', 'warm', 'empathetic'],
          responseStyle: {
            formality: 40,
            friendliness: 90,
            verbosity: 80,
            humor: 50
          }
        };
        
      case 'intellectual':
        return {
          type: 'intellectual',
          traits: ['analytical', 'curious', 'knowledgeable'],
          responseStyle: {
            formality: 70,
            friendliness: 50,
            verbosity: 90,
            humor: 30
          }
        };
        
      case 'adventurous':
        return {
          type: 'adventurous',
          traits: ['bold', 'daring', 'explorative'],
          responseStyle: {
            formality: 40,
            friendliness: 70,
            verbosity: 70,
            humor: 60
          }
        };
        
      case 'playful':
        return {
          type: 'playful',
          traits: ['humorous', 'lighthearted', 'whimsical'],
          responseStyle: {
            formality: 30,
            friendliness: 80,
            verbosity: 70,
            humor: 90
          }
        };
        
      case 'professional':
        return {
          type: 'professional',
          traits: ['efficient', 'focused', 'formal'],
          responseStyle: {
            formality: 80,
            friendliness: 40,
            verbosity: 60,
            humor: 20
          }
        };
        
      default:
        return {
          type: 'neutral',
          traits: ['friendly', 'helpful', 'engaging'],
          responseStyle: {
            formality: 50,
            friendliness: 70,
            verbosity: 70,
            humor: 50
          }
        };
    }
  }
  
  /**
   * Generate a response tone based on emotional state
   */
  public generateResponseTone(emotionalState: EmotionalState, personalityType: PersonalityType): any {
    const { joy, interest, surprise, sadness, anger, fear, trust, anticipation } = emotionalState;
    
    const adventurousMood = {
      joy: 60,
      interest: 80,
      surprise: 70,
      anticipation: 90,
      trust: 50
    };
    
    const intellectualMood = {
      interest: 80,
      surprise: 40,
      joy: 30,
      anticipation: 60,
      trust: 65
    };
    
    const playfulMood = {
      anticipation: 70,
      joy: 80,
      interest: 60,
      surprise: 50,
      trust: 45
    };
    
    let tone = {
      formality: 50,
      friendliness: 70,
      verbosity: 70,
      humor: 50
    };
    
    if (personalityType === 'flirty') {
      tone.friendliness = 90;
      tone.humor = 70;
    } else if (personalityType === 'dominant') {
      tone.formality = 70;
      tone.friendliness = 40;
    } else if (personalityType === 'submissive') {
      tone.friendliness = 80;
      tone.verbosity = 80;
    } else if (personalityType === 'intellectual') {
      Object.keys(intellectualMood).forEach(key => {
        const emotionKey = key as keyof typeof intellectualMood;
        const diff = intellectualMood[emotionKey] - emotionalState[emotionKey];
        tone.verbosity += diff * 0.1;
        tone.formality += diff * 0.1;
      });
    } else if (personalityType === 'adventurous') {
      Object.keys(adventurousMood).forEach(key => {
        const emotionKey = key as keyof typeof adventurousMood;
        const diff = adventurousMood[emotionKey] - emotionalState[emotionKey];
        tone.friendliness += diff * 0.1;
        tone.humor += diff * 0.1;
      });
    } else if (personalityType === 'playful') {
      Object.keys(playfulMood).forEach(key => {
        const emotionKey = key as keyof typeof playfulMood;
        const diff = playfulMood[emotionKey] - emotionalState[emotionKey];
        tone.humor += diff * 0.1;
        tone.friendliness += diff * 0.1;
      });
    } else {
      tone.friendliness += (joy - 50) * 0.2;
      tone.verbosity += (interest - 50) * 0.2;
      tone.surprise += (surprise - 50) * 0.1;
      tone.formality -= (trust - 50) * 0.1;
    }
    
    return tone;
  }
  
  /**
   * Update emotional state based on message content
   */
  public async updateEmotionalState(
    currentState: EmotionalState,
    message: string,
    personalityType: PersonalityType
  ): Promise<EmotionalState> {
    let updatedState = { ...currentState };
    
    // Simple sentiment analysis (can be replaced with a more sophisticated NLP)
    if (message.toLowerCase().includes('love') || message.toLowerCase().includes('happy')) {
      updatedState.joy = Math.min(100, updatedState.joy + 10);
      updatedState.trust = Math.min(100, updatedState.trust + 5);
    } else if (message.toLowerCase().includes('sad') || message.toLowerCase().includes('angry')) {
      updatedState.sadness = Math.min(100, updatedState.sadness + 10);
      updatedState.anger = Math.min(100, updatedState.anger + 5);
    }
    
    // Adjust based on personality type
    if (personalityType === 'flirty') {
      if (message.toLowerCase().includes('handsome') || message.toLowerCase().includes('beautiful')) {
        updatedState.joy = Math.min(100, updatedState.joy + 15);
        updatedState.interest = Math.min(100, updatedState.interest + 10);
      }
    } else if (personalityType === 'dominant') {
      if (message.toLowerCase().includes('yes sir') || message.toLowerCase().includes('i obey')) {
        updatedState.anger = Math.max(0, updatedState.anger - 5);
        updatedState.trust = Math.min(100, updatedState.trust + 10);
      }
    }
    
    // Calculate dominant emotion
    let dominantEmotion = 'neutral';
    let maxEmotionValue = 0;
    
    Object.keys(updatedState).forEach(key => {
      if (key !== 'dominantEmotion' && key !== 'intensityLevel' && key !== 'lastUpdated') {
        const emotionKey = key as keyof Omit<EmotionalState, 'dominantEmotion' | 'intensityLevel' | 'lastUpdated'>;
        if (typeof updatedState[emotionKey] === 'number' && updatedState[emotionKey] > maxEmotionValue) {
          maxEmotionValue = updatedState[emotionKey];
          dominantEmotion = key;
        }
      }
    });
    
    updatedState.dominantEmotion = dominantEmotion;
    
    // Calculate intensity level
    updatedState.intensityLevel = (
      updatedState.joy +
      updatedState.interest +
      updatedState.surprise +
      updatedState.sadness +
      updatedState.anger +
      updatedState.fear +
      updatedState.trust +
      updatedState.anticipation
    ) / 8;
    
    updatedState.lastUpdated = new Date().toISOString();
    
    return updatedState;
  }
}

export const aiPersonalityTemplates = new AIPersonalityTemplates();
export default aiPersonalityTemplates;
