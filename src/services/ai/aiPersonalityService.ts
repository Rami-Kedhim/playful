
// Change aiPersonalityService to dynamically select backend implementation so redis client is never imported in frontend bundle
import { useEffect, useState } from 'react';
import { EmotionalState } from '@/types/ai-personality';

// Safe in-memory implementation for frontend/client usage
class InMemoryEmotionalMemoryService {
  private memory: Record<string, EmotionalState> = {};

  async getEmotionalState(characterId: string): Promise<EmotionalState> {
    if (!this.memory[characterId]) {
      this.memory[characterId] = {
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
    }
    return this.memory[characterId];
  }

  async updateEmotionalState(characterId: string, updates: Partial<EmotionalState>): Promise<void> {
    const currentState = await this.getEmotionalState(characterId);
    this.memory[characterId] = {
      ...currentState,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
  }
}

// Check environment and conditionally load redis implementation only on server or edge functions
let redisService: any = null;

// Only load redisEmotionalMemoryService if running in server environment (Node.js). We check for window being undefined.
if (typeof window === 'undefined') {
  // Dynamic import to defer redis client import to server-side only
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  try {
    const RedisEmotionalMemoryService = require('./redisEmotionalMemoryService').default;
    redisService = new RedisEmotionalMemoryService();
  } catch (err) {
    console.warn("RedisEmotionalMemoryService load failed, falling back to in-memory", err);
  }
}

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

class AIPersonalityService {
  private emotionalMemory: any;

  constructor() {
    if (redisService) {
      this.emotionalMemory = redisService;
    } else {
      this.emotionalMemory = new InMemoryEmotionalMemoryService();
    }
  }

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

