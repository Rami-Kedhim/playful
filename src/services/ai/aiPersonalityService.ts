
// Fix import of redisEmotionalMemoryService as default import
// Fix EmotionalState initialization for missing properties primary, intensity, intensityLevel

import redisEmotionalMemoryService from './redisEmotionalMemoryService';
import { EmotionalState } from '@/types/ai-personality';

// Provide default EmotionalState initialization with required properties
const defaultEmotionalState: EmotionalState = {
  primary: "neutral",
  intensity: 0,
  joy: 0.0,
  interest: 0.0,
  surprise: 0.0,
  sadness: 0.0,
  anger: 0.0,
  fear: 0.0,
  trust: 0.0,
  anticipation: 0.0,
  dominantEmotion: "neutral",
  intensityLevel: 0,
  lastUpdated: new Date().toISOString(),
};

export class AIPersonalityService {
  private emotionalMemory = redisEmotionalMemoryService;

  async getEmotionalState(characterId: string): Promise<EmotionalState> {
    const state = await this.emotionalMemory.getEmotionalState(characterId);
    if (!state) {
      return defaultEmotionalState;
    }
    return state;
  }

  async updateEmotionalState(characterId: string, updates: Partial<EmotionalState>): Promise<void> {
    const state = await this.getEmotionalState(characterId);
    const newState = {
      ...state,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    await this.emotionalMemory.setEmotionalState(characterId, newState);
  }
}

export default new AIPersonalityService();

