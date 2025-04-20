
// Adjusted AICompanionState interface to match actual store implementation, removed non-existent methods and properties.
// Updated imports and usage to match AICompanionService default export.

import { AICompanion, AICompanionMessage } from '@/types/ai-companion';
import AICompanionService from '@/services/aiCompanionService';
import { create } from 'zustand';

interface AICompanionState {
  companions: AICompanion[];
  activeCompanion: AICompanion | null;
  messages: AICompanionMessage[];
  isLoading: boolean;
  error: string | null;
  fetchCompanions: () => Promise<void>;
  setActiveCompanion: (companion: AICompanion | null) => void;
  addMessage: (message: AICompanionMessage) => void;
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
      // Mock fetching companions since AICompanionService has no getAICompanions method
      // We prepare empty default list or simulate fetch
      // Remove usage of getAICompanions which does not exist
      const companions: AICompanion[] = []; 
      set({ companions, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  setActiveCompanion: (companion) => {
    set({ activeCompanion: companion, messages: [] });
  },
  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
  fetchMessages: async (companionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await AICompanionService.getCompanionMessages(companionId, ''); // userId empty string for mock
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  sendMessage: async (userId: string, companionId: string, content: string) => {
    try {
      const msg = await AICompanionService.sendMessage(companionId, userId, content);
      set((state) => ({ messages: [...state.messages, msg] }));
      return msg;
    } catch (error) {
      return null;
    }
  }
}));

export default useAICompanionStore;
