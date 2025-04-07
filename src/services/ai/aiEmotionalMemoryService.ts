import { EmotionalMemory, EmotionalState, PersonalityType } from '@/types/ai-personality';
import { aiPersonalityService } from './aiPersonalityService';
import { supabase } from '@/integrations/supabase/client';

/**
 * AI Emotional Memory Service
 * Handles emotional state tracking and memory for AI companions
 */
export class AIEmotionalMemoryService {
  private memoryCache: Map<string, EmotionalMemory> = new Map();
  
  /**
   * Get a unique key for the companion-user relationship
   */
  private getMemoryKey(companionId: string, userId: string): string {
    return `${companionId}:${userId}`;
  }
  
  /**
   * Initialize emotional memory for a companion-user pair
   */
  public async initializeEmotionalMemory(
    companionId: string, 
    userId: string, 
    personalityType: PersonalityType
  ): Promise<EmotionalMemory> {
    const memoryKey = this.getMemoryKey(companionId, userId);
    
    // Check if memory is already initialized
    const existingMemory = this.memoryCache.get(memoryKey);
    if (existingMemory) {
      return existingMemory;
    }
    
    try {
      // Try to get from database first
      const { data, error } = await supabase
        .from('ai_emotional_memories')
        .select('*')
        .eq('companion_id', companionId)
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching emotional memory:', error);
      }
      
      if (data) {
        // Use database memory
        const memory = data as unknown as EmotionalMemory;
        this.memoryCache.set(memoryKey, memory);
        return memory;
      } else {
        // Create new memory
        const defaultState = aiPersonalityService.createDefaultEmotionalState();
        
        // Adjust default state based on personality
        if (personalityType === 'flirty') {
          defaultState.joy += 10;
          defaultState.interest += 15;
        } else if (personalityType === 'shy') {
          defaultState.trust -= 10;
          defaultState.fear += 15;
        }
        
        const newMemory: EmotionalMemory = {
          userId,
          companionId,
          emotions: {
            currentState: defaultState,
            history: []
          },
          lastUpdated: new Date().toISOString(),
          // Backward compatibility
          state: defaultState,
          emotionalHistory: [],
          keyMemories: [],
          recentInteractions: []
        };
        
        // Store in cache
        this.memoryCache.set(memoryKey, newMemory);
        
        // Save to database
        try {
          await supabase.from('ai_emotional_memories').insert({
            companion_id: companionId,
            user_id: userId,
            memory_data: newMemory
          });
        } catch (dbError) {
          console.error('Error saving emotional memory to database:', dbError);
        }
        
        return newMemory;
      }
    } catch (error) {
      console.error('Error in initializeEmotionalMemory:', error);
      
      // Fallback to in-memory only
      const defaultState = aiPersonalityService.createDefaultEmotionalState();
      const fallbackMemory: EmotionalMemory = {
        userId,
        companionId,
        emotions: {
          currentState: defaultState,
          history: []
        },
        lastUpdated: new Date().toISOString(),
        // Backward compatibility
        state: defaultState,
        emotionalHistory: [],
        keyMemories: [],
        recentInteractions: []
      };
      
      this.memoryCache.set(memoryKey, fallbackMemory);
      return fallbackMemory;
    }
  }
  
  /**
   * Process a user message and update emotional state
   */
  public async processUserMessage(
    companionId: string, 
    userId: string,
    personalityType: PersonalityType,
    message: string
  ): Promise<EmotionalState> {
    const memoryKey = this.getMemoryKey(companionId, userId);
    
    // Get or initialize emotional memory
    let memory = this.memoryCache.get(memoryKey);
    if (!memory) {
      memory = await this.initializeEmotionalMemory(companionId, userId, personalityType);
    }
    
    // Update emotional state based on message
    const updatedState = await aiPersonalityService.updateEmotionalState(
      memory.state,
      message,
      personalityType
    );
    
    // Update memory cache
    memory.state = updatedState;
    
    if (!memory.emotionalHistory) {
      memory.emotionalHistory = [];
    }
    
    // Update emotional history entry with proper format
    const updatedEmotionalHistoryEntry: EmotionalState = {
      joy: updatedState.joy,
      interest: updatedState.interest,
      surprise: updatedState.surprise,
      sadness: updatedState.sadness,
      anger: updatedState.anger,
      fear: updatedState.fear,
      trust: updatedState.trust,
      anticipation: updatedState.anticipation,
      dominantEmotion: updatedState.dominantEmotion,
      intensityLevel: updatedState.intensityLevel,
      lastUpdated: new Date().toISOString(),
      emotion: updatedState.dominantEmotion || 'neutral',
      trigger: message.substring(0, 50) + (message.length > 50 ? '...' : '')
    };
    
    memory.emotionalHistory.push(updatedEmotionalHistoryEntry);
    
    // Keep history limited to most recent 20 entries
    if (memory.emotionalHistory.length > 20) {
      memory.emotionalHistory = memory.emotionalHistory.slice(-20);
    }
    
    this.memoryCache.set(memoryKey, memory);
    
    // Save to database (async, don't await)
    this.saveMemoryToDatabase(companionId, userId, memory)
      .catch(error => console.error('Error saving memory to database:', error));
    
    return updatedState;
  }
  
  /**
   * Save memory to database
   */
  private async saveMemoryToDatabase(
    companionId: string, 
    userId: string, 
    memory: EmotionalMemory
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('ai_emotional_memories')
        .upsert({
          companion_id: companionId,
          user_id: userId,
          memory_data: memory,
          last_updated: new Date().toISOString()
        }, { onConflict: 'companion_id,user_id' });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error in saveMemoryToDatabase:', error);
      throw error;
    }
  }
  
  /**
   * Get current emotional memory
   */
  public async getEmotionalMemory(
    companionId: string, 
    userId: string, 
    personalityType: PersonalityType
  ): Promise<EmotionalMemory> {
    const memoryKey = this.getMemoryKey(companionId, userId);
    
    // Check cache first
    let memory = this.memoryCache.get(memoryKey);
    if (memory) {
      return memory;
    }
    
    // Initialize if not found
    return this.initializeEmotionalMemory(companionId, userId, personalityType);
  }
  
  /**
   * Store a key memory about the user
   */
  public async storeKeyMemory(
    companionId: string,
    userId: string,
    topic: string,
    sentiment: number,
    importance: number
  ): Promise<void> {
    const memoryKey = this.getMemoryKey(companionId, userId);
    
    // Get memory
    let memory = this.memoryCache.get(memoryKey);
    if (!memory) {
      throw new Error('Memory not initialized');
    }
    
    // Add key memory
    const newKeyMemory = {
      topic,
      sentiment,
      importance,
      created: new Date().toISOString(),
      lastRecalled: new Date().toISOString()
    };
    
    // Check if a similar memory already exists
    const existingIndex = memory.keyMemories.findIndex(m => m.topic === topic);
    
    if (existingIndex >= 0) {
      // Update existing memory
      memory.keyMemories[existingIndex] = {
        ...memory.keyMemories[existingIndex],
        sentiment: (memory.keyMemories[existingIndex].sentiment + sentiment) / 2,
        importance: Math.max(memory.keyMemories[existingIndex].importance, importance),
        lastRecalled: new Date().toISOString()
      };
    } else {
      // Add new memory
      memory.keyMemories.push(newKeyMemory);
    }
    
    // Keep key memories sorted by importance
    memory.keyMemories.sort((a, b) => b.importance - a.importance);
    
    // Limit to 50 key memories
    if (memory.keyMemories.length > 50) {
      memory.keyMemories = memory.keyMemories.slice(0, 50);
    }
    
    this.memoryCache.set(memoryKey, memory);
    
    // Save to database (async)
    this.saveMemoryToDatabase(companionId, userId, memory)
      .catch(error => console.error('Error saving key memory to database:', error));
  }
}

export const aiEmotionalMemoryService = new AIEmotionalMemoryService();
export default aiEmotionalMemoryService;
