
// Fix AICompanionStore to only expose methods that exist and types matching AICompanionMessage from types directory

import { AICompanion, AICompanionMessage } from '@/types/ai-companion';
import { create } from 'zustand';

interface AICompanionState {
  companions: AICompanion[];
  activeCompanion: AICompanion | null;
  messages: AICompanionMessage[];
  isLoading: boolean;
  error: string | null;
  fetchCompanions: () => Promise<void>;
  setActiveCompanion: (companion: AICompanion | null) => void;
  fetchMessages: (companionId: string) => Promise<void>;
  sendMessage: (userId: string, companionId: string, content: string) => Promise<AICompanionMessage | null>;
}

const useAICompanionStore = create<AICompanionState>((set, get) => ({
  companions: [],
  activeCompanion: null,
  messages: [],
  isLoading: false,
  error: null,
  fetchCompanions: async () => {
    set({ isLoading: true, error: null });
    try {
      // Mock fetching companions (empty list)
      set({ companions: [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  setActiveCompanion: (companion) => {
    set({ activeCompanion: companion, messages: [] });
  },
  fetchMessages: async (companionId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Mock fetch messages - empty list for now
      set({ messages: [], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  sendMessage: async (userId: string, companionId: string, content: string) => {
    try {
      // Mock sending a message, return null
      return null;
    } catch (error) {
      return null;
    }
  }
}));

export default useAICompanionStore;
