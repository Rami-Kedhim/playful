
// Fix missing redis import type and add intensityLevel property in EmotionalState
// Provide some minimal type definition to avoid errors

import { createClient, RedisClientType } from 'redis';
import { EmotionalState } from '@/types/ai-personality';

class RedisEmotionalMemoryService {
  private redisClient: RedisClientType;
  private keyPrefix: string;

  constructor() {
    this.redisClient = createClient();
    this.keyPrefix = 'emotionalMemory';
    this.redisClient.connect();
  }

  private generateKey(entityId: string): string {
    return `${this.keyPrefix}:${entityId}`;
  }

  async initializeEmotionalState(entityId: string): Promise<EmotionalState> {
    const initialState: EmotionalState = {
      primary: 'neutral',
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
    await this.setEmotionalState(entityId, initialState);
    return initialState;
  }

  async getEmotionalState(entityId: string): Promise<EmotionalState | null> {
    const key = this.generateKey(entityId);
    const data = await this.redisClient.hGetAll(key);

    if (!data || Object.keys(data).length === 0) {
      return null;
    }

    const emotionalState: EmotionalState = {
      primary: data.primary,
      intensity: parseFloat(data.intensity),
      joy: parseFloat(data.joy),
      interest: parseFloat(data.interest),
      surprise: parseFloat(data.surprise),
      sadness: parseFloat(data.sadness),
      anger: parseFloat(data.anger),
      fear: parseFloat(data.fear),
      trust: parseFloat(data.trust),
      anticipation: parseFloat(data.anticipation),
      dominantEmotion: data.dominantEmotion,
      intensityLevel: parseInt(data.intensityLevel),
      lastUpdated: data.lastUpdated,
    };

    return emotionalState;
  }

  async setEmotionalState(entityId: string, emotionalState: EmotionalState): Promise<void> {
    const key = this.generateKey(entityId);
    await this.redisClient.hSet(key, {
      primary: emotionalState.primary,
      intensity: emotionalState.intensity.toString(),
      joy: emotionalState.joy.toString(),
      interest: emotionalState.interest.toString(),
      surprise: emotionalState.surprise.toString(),
      sadness: emotionalState.sadness.toString(),
      anger: emotionalState.anger.toString(),
      fear: emotionalState.fear.toString(),
      trust: emotionalState.trust.toString(),
      anticipation: emotionalState.anticipation.toString(),
      dominantEmotion: emotionalState.dominantEmotion,
      intensityLevel: emotionalState.intensityLevel.toString(),
      lastUpdated: emotionalState.lastUpdated,
    });
  }

  async updateEmotionalState(entityId: string, updates: Partial<EmotionalState>): Promise<EmotionalState | null> {
    const currentEmotionalState = await this.getEmotionalState(entityId);

    if (!currentEmotionalState) {
      return null;
    }

    const updatedEmotionalState: EmotionalState = {
      ...currentEmotionalState,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    await this.setEmotionalState(entityId, updatedEmotionalState);
    return updatedEmotionalState;
  }

  async clearEmotionalState(entityId: string): Promise<void> {
    const key = this.generateKey(entityId);
    await this.redisClient.del(key);
  }
}

const redisEmotionalMemoryService = new RedisEmotionalMemoryService();

export default redisEmotionalMemoryService;

