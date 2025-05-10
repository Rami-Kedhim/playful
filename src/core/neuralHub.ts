
import { lucieAI } from './Lucie';
import { oxum } from './index';
import { hermes } from './index';
import { GenerateContentParams } from '@/types/core-systems';

/**
 * Neural hub for integrating AI functions across systems
 */
class NeuralHub {
  /**
   * Initialize hub and subsystems
   */
  async initialize(): Promise<boolean> {
    try {
      await Promise.all([
        lucieAI.initialize(),
        oxum.initialize()
      ]);
      
      return true;
    } catch (error) {
      console.error('Failed to initialize neural hub:', error);
      return false;
    }
  }
  
  /**
   * Process text with enhanced AI capabilities
   */
  async processText(prompt: string): Promise<string> {
    // Create proper params object
    const params: GenerateContentParams = {
      prompt
    };
    
    const result = await lucieAI.generateContent(params);
    return result.content;
  }
  
  /**
   * Calculate boost score for profile
   */
  async calculateBoostScore(profileId: string): Promise<number> {
    const score = await hermes.calculateBoostScore(profileId);
    return score;
  }
  
  /**
   * Analyze image and extract features
   */
  async analyzeImage(imageUrl: string): Promise<any> {
    const features = await oxum.processImageFeatures(imageUrl);
    return features;
  }
}

export const neuralHub = new NeuralHub();
