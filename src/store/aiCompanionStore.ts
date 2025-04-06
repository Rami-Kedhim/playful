
import { create } from 'zustand';
import { 
  AICompanion, 
  AICompanionCreateParams, 
  AICompanionUpdateParams,
  AICompanionMessage,
  AIContentGenerationParams,
  AICompanionContent
} from "@/types/ai-companion";
import { AICompanionService } from "@/services/aiCompanionService";

interface AICompanionState {
  // State
  companions: AICompanion[];
  selectedCompanion: AICompanion | null;
  messages: Record<string, AICompanionMessage[]>;
  unlockableContent: Record<string, AICompanionContent[]>;
  loading: boolean;
  error: string | null;
  
  // Preset companions for users to choose from
  presetCompanions: AICompanion[];
  
  // Actions
  fetchCompanions: (userId: string) => Promise<AICompanion[]>;
  selectCompanion: (companionId: string | null) => void;
  createCompanion: (userId: string, params: AICompanionCreateParams) => Promise<AICompanion | null>;
  updateCompanion: (userId: string, companionId: string, params: AICompanionUpdateParams) => Promise<AICompanion | null>;
  
  // Messages
  fetchMessages: (userId: string, companionId: string) => Promise<AICompanionMessage[]>;
  sendMessage: (userId: string, companionId: string, content: string) => Promise<AICompanionMessage | null>;
  
  // Content
  generateContent: (userId: string, params: AIContentGenerationParams) => Promise<string | null>;
  fetchUnlockableContent: (userId: string, companionId: string, contentType?: "image" | "voice" | "video") => Promise<AICompanionContent[]>;
  
  // Relationship levels
  updateRelationshipLevel: (userId: string, companionId: string, updates: Partial<AICompanion['relationship_level']>) => Promise<AICompanion['relationship_level'] | null>;
}

const useAICompanionStore = create<AICompanionState>((set, get) => ({
  companions: [],
  selectedCompanion: null,
  messages: {},
  unlockableContent: {},
  loading: false,
  error: null,
  
  // Some preset companions for users to start with
  presetCompanions: [
    {
      id: "preset-1",
      user_id: "system",
      name: "Sophia",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://via.placeholder.com/150",
      gallery: [],
      description: "Sophia is caring and intellectual. She loves deep conversations and providing emotional support.",
      personality_traits: ["intellectual", "caring"],
      body_type: "slim",
      voice_type: "sophisticated",
      relationship_level: {
        trust: 10,
        affection: 5,
        obedience: 5,
        intimacy: 0
      },
      engagement_stats: {
        chat_messages: 0,
        images_generated: 0,
        voice_messages: 0,
        last_interaction: null
      },
      is_preset: true
    },
    {
      id: "preset-2",
      user_id: "system",
      name: "Luna",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://via.placeholder.com/150",
      gallery: [],
      description: "Luna is playful and flirtatious. She'll always keep things fun and exciting.",
      personality_traits: ["playful", "flirtatious"],
      body_type: "curvy",
      voice_type: "sultry",
      relationship_level: {
        trust: 10,
        affection: 5,
        obedience: 5,
        intimacy: 0
      },
      engagement_stats: {
        chat_messages: 0,
        images_generated: 0,
        voice_messages: 0,
        last_interaction: null
      },
      is_preset: true
    },
    {
      id: "preset-3",
      user_id: "system",
      name: "Ethan",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      avatar_url: "https://via.placeholder.com/150",
      gallery: [],
      description: "Ethan is confident and has a cheeky sense of humor. He's always there to brighten your day.",
      personality_traits: ["dominant", "playful"],
      body_type: "athletic",
      voice_type: "deep",
      relationship_level: {
        trust: 10,
        affection: 5,
        obedience: 5,
        intimacy: 0
      },
      engagement_stats: {
        chat_messages: 0,
        images_generated: 0,
        voice_messages: 0,
        last_interaction: null
      },
      is_preset: true
    }
  ],
  
  fetchCompanions: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch from Supabase
      // For this demo, we'll use the preset companions + any created ones
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Combine preset companions with any user-created ones
      const userCompanions = get().companions.filter(c => c.user_id === userId && !c.is_preset);
      const allCompanions = [...get().presetCompanions, ...userCompanions];
      
      set({ companions: allCompanions, loading: false });
      return allCompanions;
    } catch (error: any) {
      console.error("Error fetching companions:", error);
      set({ 
        error: error.message || "Failed to fetch companions", 
        loading: false 
      });
      return [];
    }
  },
  
  selectCompanion: (companionId: string | null) => {
    if (!companionId) {
      set({ selectedCompanion: null });
      return;
    }
    
    const companion = [...get().companions, ...get().presetCompanions]
      .find(c => c.id === companionId);
      
    set({ selectedCompanion: companion || null });
  },
  
  createCompanion: async (userId: string, params: AICompanionCreateParams) => {
    try {
      set({ loading: true, error: null });
      
      const newCompanion = await AICompanionService.createCompanion(userId, params);
      
      if (newCompanion) {
        set(state => ({ 
          companions: [...state.companions, newCompanion],
          selectedCompanion: newCompanion, 
          loading: false 
        }));
      } else {
        throw new Error("Failed to create companion");
      }
      
      return newCompanion;
    } catch (error: any) {
      console.error("Error creating companion:", error);
      set({ 
        error: error.message || "Failed to create companion", 
        loading: false 
      });
      return null;
    }
  },
  
  updateCompanion: async (userId: string, companionId: string, params: AICompanionUpdateParams) => {
    try {
      set({ loading: true, error: null });
      
      const updatedCompanion = await AICompanionService.updateCompanion(userId, companionId, params);
      
      if (updatedCompanion) {
        set(state => ({
          companions: state.companions.map(c => 
            c.id === companionId ? updatedCompanion : c
          ),
          selectedCompanion: state.selectedCompanion?.id === companionId 
            ? updatedCompanion 
            : state.selectedCompanion,
          loading: false
        }));
      } else {
        throw new Error("Failed to update companion");
      }
      
      return updatedCompanion;
    } catch (error: any) {
      console.error("Error updating companion:", error);
      set({ 
        error: error.message || "Failed to update companion", 
        loading: false 
      });
      return null;
    }
  },
  
  fetchMessages: async (userId: string, companionId: string) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch messages from Supabase
      // For this demo, we'll use any existing messages or an empty array
      
      const existingMessages = get().messages[companionId] || [];
      
      // If no messages exist yet, create a welcome message
      if (existingMessages.length === 0) {
        const companion = [...get().companions, ...get().presetCompanions]
          .find(c => c.id === companionId);
          
        if (companion) {
          const welcomeMessage: AICompanionMessage = {
            id: Math.random().toString(36).substring(2, 15),
            user_id: userId,
            companion_id: companionId,
            content: `Hi there! I'm ${companion.name}. It's nice to meet you! How can I make your day better?`,
            is_from_user: false,
            created_at: new Date().toISOString()
          };
          
          set(state => ({
            messages: {
              ...state.messages,
              [companionId]: [welcomeMessage]
            }
          }));
          
          return [welcomeMessage];
        }
      }
      
      set({ loading: false });
      return existingMessages;
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      set({ 
        error: error.message || "Failed to fetch messages", 
        loading: false 
      });
      return [];
    }
  },
  
  sendMessage: async (userId: string, companionId: string, content: string) => {
    try {
      set({ loading: true, error: null });
      
      // Add user message to the state right away
      const userMessage: AICompanionMessage = {
        id: Math.random().toString(36).substring(2, 15),
        user_id: userId,
        companion_id: companionId,
        content: content,
        is_from_user: true,
        created_at: new Date().toISOString()
      };
      
      set(state => ({
        messages: {
          ...state.messages,
          [companionId]: [...(state.messages[companionId] || []), userMessage]
        }
      }));
      
      // Call the service to send the message and get an AI response
      await AICompanionService.sendMessage(userId, companionId, content);
      
      // In a real app, we would wait for the AI response
      // For this demo, we'll create a mock response
      
      const companion = [...get().companions, ...get().presetCompanions]
        .find(c => c.id === companionId);
      
      const responses = [
        "I really enjoy talking with you!",
        "That's interesting, tell me more about it.",
        "I've been thinking about you today.",
        "You always know how to make me smile.",
        "I wish we could spend more time together."
      ];
      
      const aiResponse: AICompanionMessage = {
        id: Math.random().toString(36).substring(2, 15),
        user_id: userId,
        companion_id: companionId,
        content: responses[Math.floor(Math.random() * responses.length)],
        is_from_user: false,
        created_at: new Date().toISOString()
      };
      
      // Add the AI response to the state
      set(state => ({
        messages: {
          ...state.messages,
          [companionId]: [...(state.messages[companionId] || []), aiResponse]
        },
        loading: false
      }));
      
      // Also update the engagement stats for the companion
      if (companion && !companion.is_preset) {
        const updatedCompanion = {
          ...companion,
          engagement_stats: {
            ...companion.engagement_stats,
            chat_messages: companion.engagement_stats.chat_messages + 1,
            last_interaction: new Date().toISOString()
          }
        };
        
        set(state => ({
          companions: state.companions.map(c => 
            c.id === companionId ? updatedCompanion : c
          ),
          selectedCompanion: state.selectedCompanion?.id === companionId 
            ? updatedCompanion 
            : state.selectedCompanion
        }));
      }
      
      return userMessage;
    } catch (error: any) {
      console.error("Error sending message:", error);
      set({ 
        error: error.message || "Failed to send message", 
        loading: false 
      });
      return null;
    }
  },
  
  generateContent: async (userId: string, params: AIContentGenerationParams) => {
    try {
      set({ loading: true, error: null });
      
      const contentUrl = await AICompanionService.generateContent(userId, params);
      
      set({ loading: false });
      
      if (!contentUrl) {
        throw new Error(`Failed to generate ${params.type} content`);
      }
      
      // If successful, also update the engagement stats
      const companion = get().companions.find(c => c.id === params.companion_id && !c.is_preset);
      
      if (companion) {
        const updatedCompanion = {
          ...companion,
          engagement_stats: {
            ...companion.engagement_stats,
            images_generated: params.type === 'image' 
              ? companion.engagement_stats.images_generated + 1
              : companion.engagement_stats.images_generated,
            voice_messages: params.type === 'voice' 
              ? companion.engagement_stats.voice_messages + 1
              : companion.engagement_stats.voice_messages,
            last_interaction: new Date().toISOString()
          }
        };
        
        set(state => ({
          companions: state.companions.map(c => 
            c.id === params.companion_id ? updatedCompanion : c
          ),
          selectedCompanion: state.selectedCompanion?.id === params.companion_id 
            ? updatedCompanion 
            : state.selectedCompanion
        }));
      }
      
      return contentUrl;
    } catch (error: any) {
      console.error(`Error generating ${params.type} content:`, error);
      set({ 
        error: error.message || `Failed to generate ${params.type} content`, 
        loading: false 
      });
      return null;
    }
  },
  
  fetchUnlockableContent: async (userId: string, companionId: string, contentType?: "image" | "voice" | "video") => {
    try {
      set({ loading: true, error: null });
      
      const content = await AICompanionService.getUnlockableContent(userId, companionId, contentType);
      
      set(state => ({
        unlockableContent: {
          ...state.unlockableContent,
          [companionId]: content
        },
        loading: false
      }));
      
      return content;
    } catch (error: any) {
      console.error("Error fetching unlockable content:", error);
      set({ 
        error: error.message || "Failed to fetch unlockable content", 
        loading: false 
      });
      return [];
    }
  },
  
  updateRelationshipLevel: async (userId: string, companionId: string, updates: Partial<AICompanion['relationship_level']>) => {
    try {
      set({ loading: true, error: null });
      
      const updatedLevels = await AICompanionService.updateRelationshipLevel(userId, companionId, updates);
      
      if (updatedLevels) {
        const companion = get().companions.find(c => c.id === companionId);
        
        if (companion) {
          const updatedCompanion = {
            ...companion,
            relationship_level: updatedLevels
          };
          
          set(state => ({
            companions: state.companions.map(c => 
              c.id === companionId ? updatedCompanion : c
            ),
            selectedCompanion: state.selectedCompanion?.id === companionId 
              ? updatedCompanion 
              : state.selectedCompanion,
            loading: false
          }));
        }
      }
      
      set({ loading: false });
      return updatedLevels;
    } catch (error: any) {
      console.error("Error updating relationship levels:", error);
      set({ 
        error: error.message || "Failed to update relationship levels", 
        loading: false 
      });
      return null;
    }
  }
}));

export default useAICompanionStore;
