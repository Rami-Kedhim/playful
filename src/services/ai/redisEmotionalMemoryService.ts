import { EmotionalMemory, EmotionalState, PersonalityType } from '@/types/ai-personality';
import { supabase } from '@/integrations/supabase/client';

/**
 * Redis Emotional Memory Service - Simulated
 * In a production environment, this would use Redis instead of Supabase
 * This implementation uses Supabase as a stand-in for Redis while maintaining Redis-like operations
 */
export class RedisEmotionalMemoryService {
  private readonly MEMORY_TTL = 60 * 30; // 30 minutes in seconds
  private readonly TABLE_NAME = 'ai_emotional_memories';
  
  /**
   * Get memory key for Redis
   */
  private getMemoryKey(companionId: string, userId: string): string {
    return `ai:memory:${companionId}:${userId}`;
  }
  
  /**
   * Set emotional memory
   */
  public async setEmotionalMemory(
    companionId: string,
    userId: string,
    memory: EmotionalMemory
  ): Promise<boolean> {
    try {
      const key = this.getMemoryKey(companionId, userId);
      
      const { error } = await supabase
        .from(this.TABLE_NAME)
        .upsert({
          companion_id: companionId,
          user_id: userId,
          memory_data: memory,
          last_updated: new Date().toISOString()
        }, { onConflict: 'companion_id,user_id' });
      
      if (error) {
        console.error('Redis set error:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error setting emotional memory:', error);
      return false;
    }
  }
  
  /**
   * Get emotional memory
   */
  public async getEmotionalMemory(
    companionId: string,
    userId: string
  ): Promise<EmotionalMemory | null> {
    try {
      const key = this.getMemoryKey(companionId, userId);
      
      const { data, error } = await supabase
        .from(this.TABLE_NAME)
        .select('memory_data')
        .eq('companion_id', companionId)
        .eq('user_id', userId)
        .single();
      
      if (error || !data) {
        return null;
      }
      
      return data.memory_data as EmotionalMemory;
    } catch (error) {
      console.error('Error getting emotional memory:', error);
      return null;
    }
  }
  
  /**
   * Update specific emotion values
   */
  public async updateEmotions(
    companionId: string,
    userId: string,
    emotionUpdates: Partial<EmotionalState>
  ): Promise<boolean> {
    try {
      // Get existing memory
      const memory = await this.getEmotionalMemory(companionId, userId);
      
      if (!memory) {
        return false;
      }
      
      // Update emotional state
      memory.state = {
        ...memory.state,
        ...emotionUpdates
      };
      
      // Calculate dominant emotion
      memory.state.dominantEmotion = this.calculateDominantEmotion(memory.state);
      
      // Save updated memory
      return this.setEmotionalMemory(companionId, userId, memory);
    } catch (error) {
      console.error('Error updating emotions:', error);
      return false;
    }
  }
  
  /**
   * Calculate dominant emotion based on state
   */
  private calculateDominantEmotion(state: EmotionalState): string {
    const emotions: [string, number][] = [
      ['joy', state.joy],
      ['interest', state.interest],
      ['surprise', state.surprise],
      ['sadness', state.sadness],
      ['anger', state.anger],
      ['fear', state.fear],
      ['trust', state.trust],
      ['anticipation', state.anticipation]
    ];
    
    // Sort emotions by intensity (descending)
    emotions.sort((a, b) => b[1] - a[1]);
    
    // Return the highest-intensity emotion
    return emotions[0][0];
  }
  
  /**
   * Add a key memory
   */
  public async addKeyMemory(
    companionId: string,
    userId: string,
    topic: string,
    sentiment: number,
    importance: number
  ): Promise<boolean> {
    try {
      // Get existing memory
      const memory = await this.getEmotionalMemory(companionId, userId);
      
      if (!memory) {
        return false;
      }
      
      // Create new key memory
      const newMemory = {
        topic,
        sentiment,
        importance,
        created: new Date().toISOString(),
        lastRecalled: new Date().toISOString()
      };
      
      // Add to key memories
      memory.keyMemories = [...memory.keyMemories, newMemory];
      
      // Keep only top 20 most important memories
      memory.keyMemories.sort((a, b) => b.importance - a.importance);
      if (memory.keyMemories.length > 20) {
        memory.keyMemories = memory.keyMemories.slice(0, 20);
      }
      
      // Save updated memory
      return this.setEmotionalMemory(companionId, userId, memory);
    } catch (error) {
      console.error('Error adding key memory:', error);
      return false;
    }
  }
}

export const redisEmotionalMemoryService = new RedisEmotionalMemoryService();
export default redisEmotionalMemoryService;
