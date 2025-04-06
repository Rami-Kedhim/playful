
import { create } from 'zustand';
import { supabase } from "@/integrations/supabase/client";
import { AIAnalyticsService } from "@/services/analyticsService";

// Types for AI Companion system
export interface AICompanionPersonality {
  type: 'flirty' | 'shy' | 'dominant' | 'sweet' | 'playful' | 'intellectual';
  traits: string[];
  interests: string[];
  backstory: string;
  temperament: number; // 0-100 scale (0: cold, 100: warm)
  dominance: number;   // 0-100 scale (0: submissive, 100: dominant)
  openness: number;    // 0-100 scale (0: reserved, 100: expressive)
}

export interface AIRelationshipLevel {
  trust: number;       // 0-100
  affection: number;   // 0-100
  intimacy: number;    // 0-100
  obedience: number;   // 0-100 (how likely to follow user requests)
  understanding: number; // 0-100 (how well AI understands user preferences)
}

export interface AICompanion {
  id: string;
  name: string;
  avatar_url: string;
  gallery_images: string[];
  personality: AICompanionPersonality;
  relationship_level: AIRelationshipLevel;
  voice_id?: string; // For ElevenLabs integration
  language: string;
  created_at: string;
  last_interaction: string;
  user_id: string; // Owner of this companion
  is_premium: boolean;
  unlocked_content_count: number;
  memory: string[]; // Key memories about interactions with user
  status: 'online' | 'offline' | 'busy';
}

export interface AICompanionMessage {
  id: string;
  companion_id: string;
  content: string;
  type: 'text' | 'image' | 'audio';
  media_url?: string;
  created_at: string;
  is_user: boolean;
}

interface AICompanionState {
  companions: AICompanion[];
  currentCompanion: AICompanion | null;
  messages: AICompanionMessage[];
  loading: boolean;
  error: string | null;
  
  // Actions
  createCompanion: (companionData: Partial<AICompanion>) => Promise<AICompanion | null>;
  selectCompanion: (companionId: string) => void;
  sendMessage: (content: string) => Promise<AICompanionMessage | null>;
  generateImage: (prompt: string) => Promise<string | null>;
  generateVoice: (text: string) => Promise<string | null>;
  loadMessages: (companionId: string) => Promise<void>;
  loadCompanions: () => Promise<void>;
  updateRelationship: (updates: Partial<AIRelationshipLevel>) => Promise<void>;
  requestContent: (type: 'image' | 'audio' | 'video', prompt: string) => Promise<string | null>;
}

const useAICompanionStore = create<AICompanionState>((set, get) => ({
  companions: [],
  currentCompanion: null,
  messages: [],
  loading: false,
  error: null,
  
  // Create a new AI companion
  createCompanion: async (companionData) => {
    try {
      set({ loading: true, error: null });
      console.log("[AI Companion] Creating new companion", companionData);
      
      // Generate default values for any missing fields
      const defaultPersonality: AICompanionPersonality = {
        type: 'flirty',
        traits: ['friendly', 'caring', 'attentive'],
        interests: ['conversation', 'getting to know you', 'sharing experiences'],
        backstory: 'I was created to be your perfect companion.',
        temperament: 70,
        dominance: 40,
        openness: 80
      };
      
      const defaultRelationship: AIRelationshipLevel = {
        trust: 50,
        affection: 50,
        intimacy: 30,
        obedience: 70,
        understanding: 50
      };
      
      // Create a new companion with defaults and user-provided data
      const newCompanion: AICompanion = {
        id: Math.random().toString(36).substring(2, 15),
        name: companionData.name || 'Your Companion',
        avatar_url: companionData.avatar_url || 'https://source.unsplash.com/random/300x300/?portrait',
        gallery_images: companionData.gallery_images || [],
        personality: companionData.personality || defaultPersonality,
        relationship_level: defaultRelationship,
        voice_id: companionData.voice_id,
        language: companionData.language || 'en',
        created_at: new Date().toISOString(),
        last_interaction: new Date().toISOString(),
        user_id: 'current-user', // This would be the actual user ID
        is_premium: false,
        unlocked_content_count: 0,
        memory: [],
        status: 'online'
      };
      
      // In a real app, save to Supabase here
      
      // Update local state
      set(state => ({
        companions: [...state.companions, newCompanion],
        currentCompanion: newCompanion
      }));
      
      return newCompanion;
    } catch (error: any) {
      set({ error: error.message || "Failed to create companion" });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  
  // Select an existing companion
  selectCompanion: (companionId) => {
    const { companions } = get();
    const companion = companions.find(c => c.id === companionId) || null;
    set({ currentCompanion: companion });
    
    // Load messages if we have a selected companion
    if (companion) {
      get().loadMessages(companionId);
    }
  },
  
  // Send message to current companion
  sendMessage: async (content) => {
    try {
      const { currentCompanion } = get();
      if (!currentCompanion) {
        throw new Error("No companion selected");
      }
      
      set({ loading: true, error: null });
      
      // Create user message
      const userMessage: AICompanionMessage = {
        id: Math.random().toString(36).substring(2, 15),
        companion_id: currentCompanion.id,
        content,
        type: 'text',
        created_at: new Date().toISOString(),
        is_user: true
      };
      
      // Add user message to state
      set(state => ({
        messages: [...state.messages, userMessage]
      }));
      
      // In a real app, this would call an AI service to generate a response
      // Mock AI response for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate simple response based on personality
      const aiResponse = `[This is where the AI response would be. The ${currentCompanion.personality.type} companion would reply to: "${content}"]`;
      
      const aiMessage: AICompanionMessage = {
        id: Math.random().toString(36).substring(2, 15),
        companion_id: currentCompanion.id,
        content: aiResponse,
        type: 'text',
        created_at: new Date().toISOString(),
        is_user: false
      };
      
      // Add AI response to state
      set(state => ({
        messages: [...state.messages, aiMessage],
        currentCompanion: {
          ...state.currentCompanion!,
          last_interaction: new Date().toISOString()
        }
      }));
      
      // In a real app, save messages to Supabase
      
      return aiMessage;
    } catch (error: any) {
      set({ error: error.message || "Failed to send message" });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  
  // Generate image based on prompt
  generateImage: async (prompt) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would call an image generation service
      console.log("[AI Companion] Generating image for prompt:", prompt);
      
      // Mock image generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock image URL
      const mockImageUrl = `https://source.unsplash.com/random/512x512/?${encodeURIComponent(prompt)}`;
      
      return mockImageUrl;
    } catch (error: any) {
      set({ error: error.message || "Failed to generate image" });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  
  // Generate voice based on text
  generateVoice: async (text) => {
    try {
      set({ loading: true, error: null });
      
      const { currentCompanion } = get();
      if (!currentCompanion) {
        throw new Error("No companion selected");
      }
      
      // In a real app, this would call ElevenLabs or similar
      console.log("[AI Companion] Generating voice for text:", text);
      
      // Mock voice generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock audio URL (would be a real audio URL in production)
      return "https://example.com/mock-audio.mp3";
    } catch (error: any) {
      set({ error: error.message || "Failed to generate voice" });
      return null;
    } finally {
      set({ loading: false });
    }
  },
  
  // Load chat history for a companion
  loadMessages: async (companionId) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch messages from Supabase
      console.log("[AI Companion] Loading messages for companion:", companionId);
      
      // Mock message history
      const mockMessages: AICompanionMessage[] = [
        {
          id: "mock-1",
          companion_id: companionId,
          content: "Hello! I'm so happy to see you again!",
          type: 'text',
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          is_user: false
        },
        {
          id: "mock-2",
          companion_id: companionId,
          content: "Hey there! How are you doing today?",
          type: 'text',
          created_at: new Date(Date.now() - 86340000).toISOString(), 
          is_user: true
        }
      ];
      
      set({ messages: mockMessages });
    } catch (error: any) {
      set({ error: error.message || "Failed to load messages" });
    } finally {
      set({ loading: false });
    }
  },
  
  // Load all companions for current user
  loadCompanions: async () => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch from Supabase
      console.log("[AI Companion] Loading companions for user");
      
      // Mock companions
      const mockCompanions: AICompanion[] = [
        {
          id: "mock-companion-1",
          name: "Sophia",
          avatar_url: "https://source.unsplash.com/random/300x300/?portrait,woman",
          gallery_images: [],
          personality: {
            type: 'flirty',
            traits: ['playful', 'adventurous', 'passionate'],
            interests: ['travel', 'music', 'deep conversation'],
            backstory: 'I love meeting new people and having exciting experiences.',
            temperament: 85,
            dominance: 60,
            openness: 90
          },
          relationship_level: {
            trust: 70,
            affection: 75,
            intimacy: 60,
            obedience: 80,
            understanding: 65
          },
          language: 'en',
          created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
          last_interaction: new Date(Date.now() - 86400000).toISOString(),
          user_id: 'current-user',
          is_premium: false,
          unlocked_content_count: 3,
          memory: ['Likes to be called darling', 'Mentioned traveling to Paris'],
          status: 'online'
        }
      ];
      
      set({ companions: mockCompanions });
    } catch (error: any) {
      set({ error: error.message || "Failed to load companions" });
    } finally {
      set({ loading: false });
    }
  },
  
  // Update relationship values based on interactions
  updateRelationship: async (updates) => {
    try {
      const { currentCompanion } = get();
      if (!currentCompanion) {
        throw new Error("No companion selected");
      }
      
      // Calculate new relationship values
      const updatedRelationship = {
        ...currentCompanion.relationship_level,
        ...updates
      };
      
      // Ensure values stay within 0-100 range
      Object.keys(updatedRelationship).forEach(key => {
        const value = updatedRelationship[key as keyof AIRelationshipLevel];
        updatedRelationship[key as keyof AIRelationshipLevel] = Math.max(0, Math.min(100, value));
      });
      
      // Update companion with new relationship values
      set(state => ({
        currentCompanion: {
          ...state.currentCompanion!,
          relationship_level: updatedRelationship
        },
        companions: state.companions.map(c => 
          c.id === currentCompanion.id 
            ? { ...c, relationship_level: updatedRelationship }
            : c
        )
      }));
      
      // In a real app, save to Supabase here
      
    } catch (error: any) {
      set({ error: error.message || "Failed to update relationship" });
    }
  },
  
  // Request premium content generation (monetization feature)
  requestContent: async (type, prompt) => {
    try {
      set({ loading: true, error: null });
      
      const { currentCompanion } = get();
      if (!currentCompanion) {
        throw new Error("No companion selected");
      }
      
      console.log(`[AI Companion] Generating ${type} content: ${prompt}`);
      
      // In a real app, this would:
      // 1. Check if user has sufficient Lucoins
      // 2. Process the payment
      // 3. Generate the content via AI services
      
      // Mock the generation process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      let contentUrl = '';
      
      switch (type) {
        case 'image':
          contentUrl = `https://source.unsplash.com/random/512x512/?${encodeURIComponent(prompt)}`;
          break;
        case 'audio':
          contentUrl = "https://example.com/mock-audio.mp3";
          break;
        case 'video':
          contentUrl = "https://example.com/mock-video.mp4";
          break;
      }
      
      // Update unlocked content count
      set(state => ({
        currentCompanion: {
          ...state.currentCompanion!,
          unlocked_content_count: state.currentCompanion!.unlocked_content_count + 1
        }
      }));
      
      return contentUrl;
    } catch (error: any) {
      set({ error: error.message || "Failed to generate content" });
      return null;
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAICompanionStore;
