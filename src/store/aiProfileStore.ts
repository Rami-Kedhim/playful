
import { create } from 'zustand';
import { AIProfile } from '@/types/ai-profile';
import { generateMultipleProfiles } from '@/services/aiProfileGenerator';

interface AIConversation {
  id: string;
  profileId: string;
  userId: string;
  messages: {
    id: string;
    profileId: string;
    content: string;
    timestamp: Date;
    type: 'text' | 'audio';
    audioUrl?: string;
    isUserMessage: boolean;
  }[];
  lastMessageAt: Date;
  createdAt: Date;
}

interface AIProfileStore {
  profiles: AIProfile[];
  featuredProfiles: AIProfile[];
  activeConversations: AIConversation[];
  selectedProfile: AIProfile | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  initialize: () => Promise<void>;
  loadProfiles: () => Promise<void>;
  selectProfile: (profileId: string) => void;
  sendMessage: (profileId: string, content: string) => Promise<void>;
  generateResponse: (profileId: string) => Promise<void>;
}

// In a real app, you'd fetch these from a backend
const INITIAL_PROFILE_COUNT = 12;

const useAIProfileStore = create<AIProfileStore>((set, get) => ({
  profiles: [],
  featuredProfiles: [],
  activeConversations: [],
  selectedProfile: null,
  loading: false,
  error: null,
  
  initialize: async () => {
    try {
      set({ loading: true, error: null });
      await get().loadProfiles();
      set({ loading: false });
    } catch (error) {
      console.error('Failed to initialize AI profiles:', error);
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to load AI profiles' 
      });
    }
  },
  
  loadProfiles: async () => {
    // In a real app, this would be an API call
    const generatedProfiles = generateMultipleProfiles(INITIAL_PROFILE_COUNT);
    
    set({ 
      profiles: generatedProfiles,
      featuredProfiles: generatedProfiles.filter(profile => Math.random() > 0.7)
    });
  },
  
  selectProfile: (profileId: string) => {
    const { profiles } = get();
    const selectedProfile = profiles.find(profile => profile.id === profileId) || null;
    set({ selectedProfile });
  },
  
  sendMessage: async (profileId: string, content: string) => {
    // In a real app, you'd send this to the backend
    const { activeConversations } = get();
    const now = new Date();
    
    let conversation = activeConversations.find(conv => conv.profileId === profileId);
    
    const newMessage = {
      id: Math.random().toString(36).substring(2, 15),
      profileId,
      content,
      timestamp: now,
      type: 'text' as const,
      isUserMessage: true
    };
    
    if (conversation) {
      // Update existing conversation
      const updatedConversations = activeConversations.map(conv => 
        conv.id === conversation!.id 
          ? { 
              ...conv, 
              messages: [...conv.messages, newMessage],
              lastMessageAt: now 
            }
          : conv
      );
      set({ activeConversations: updatedConversations });
    } else {
      // Create new conversation
      const newConversation: AIConversation = {
        id: Math.random().toString(36).substring(2, 15),
        profileId,
        userId: 'current-user', // In a real app, this would be the actual user ID
        messages: [newMessage],
        lastMessageAt: now,
        createdAt: now
      };
      set({ activeConversations: [...activeConversations, newConversation] });
    }
    
    // Generate AI response
    await get().generateResponse(profileId);
  },
  
  generateResponse: async (profileId: string) => {
    // In a real app, you'd call an AI backend here
    const { activeConversations, profiles } = get();
    const profile = profiles.find(p => p.id === profileId);
    
    if (!profile) return;
    
    const conversation = activeConversations.find(conv => conv.profileId === profileId);
    if (!conversation) return;
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responseOptions = [
      `Hi there! I'm ${profile.name}. How are you doing today?`,
      `It's nice to meet you! I love talking about ${profile.interests[0]}.`,
      `Hello! I've been enjoying ${profile.interests[1]} lately. Do you have any hobbies?`,
      `Hey! Thanks for reaching out. What brings you here today?`,
      `I'm glad you messaged me! Would you like to know more about me?`
    ];
    
    const responseContent = responseOptions[Math.floor(Math.random() * responseOptions.length)];
    
    const aiResponse = {
      id: Math.random().toString(36).substring(2, 15),
      profileId,
      content: responseContent,
      timestamp: new Date(),
      type: 'text' as const,
      isUserMessage: false
    };
    
    const updatedConversations = activeConversations.map(conv => 
      conv.id === conversation.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, aiResponse],
            lastMessageAt: new Date() 
          }
        : conv
    );
    
    set({ activeConversations: updatedConversations });
  }
}));

export default useAIProfileStore;
