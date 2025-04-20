// Adjust imports to use existing AICompanion types only, remove non-existent imports
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
  setActiveCompanion: (companion: AICompanion) => void;
  addMessage: (message: AICompanionMessage) => void;
  fetchMessages: (companionId: string) => Promise<void>;
}

const useAICompanionStore = create<AICompanionState>((set) => ({
  companions: [],
  activeCompanion: null,
  messages: [],
  isLoading: false,
  error: null,
  fetchCompanions: async () => {
    set({ isLoading: true, error: null });
    try {
      // Assuming AICompanionService.getAICompanions() exists and returns AICompanion[]
      const companions = await AICompanionService.getAICompanions();
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
  fetchMessages: async (companionId) => {
    set({ isLoading: true, error: null });
    try {
      // Assuming AICompanionService.getMessages(companionId) exists and returns AICompanionMessage[]
      const messages = await AICompanionService.getMessages(companionId);
      set({ messages, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useAICompanionStore;
