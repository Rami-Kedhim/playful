import { RedisClientType } from 'redis';
import { EmotionalState } from '@/types/ai-personality';

class RedisEmotionalMemoryService {
  private redisClient: RedisClientType;
  private keyPrefix: string;

  constructor(redisClient: RedisClientType, keyPrefix: string = 'emotionalMemory') {
    this.redisClient = redisClient;
    this.keyPrefix = keyPrefix;
  }

  private generateKey(entityId: string): string {
    return `${this.keyPrefix}:${entityId}`;
  }

  async initializeEmotionalState(entityId: string): Promise<EmotionalState> {
    const initialState: EmotionalState = {
      primary: 'neutral',
      intensity: 0,
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
      primary: data.primary as string,
      intensity: parseFloat(data.intensity as string),
    };

    return emotionalState;
  }

  async setEmotionalState(entityId: string, emotionalState: EmotionalState): Promise<void> {
    const key = this.generateKey(entityId);
    await this.redisClient.hSet(key, {
      primary: emotionalState.primary,
      intensity: emotionalState.intensity.toString(),
    });
  }

  async updateEmotionalState(entityId: string, updates: Partial<EmotionalState>): Promise<EmotionalState | null> {
    const key = this.generateKey(entityId);
    const currentEmotionalState = await this.getEmotionalState(entityId);

    if (!currentEmotionalState) {
      return null;
    }

    const updatedEmotionalState: EmotionalState = {
      ...currentEmotionalState,
      ...updates,
    };

    await this.setEmotionalState(entityId, updatedEmotionalState);
    return updatedEmotionalState;
  }

  async clearEmotionalState(entityId: string): Promise<void> {
    const key = this.generateKey(entityId);
    await this.redisClient.del(key);
  }
}

export default RedisEmotionalMemoryService;
