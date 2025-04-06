import { create } from 'zustand';
import { AIProfile, AIContentPurchase, AIGift, AIBoost } from "@/types/ai-profile";
import { supabase } from "@/integrations/supabase/client";

interface AIModelMonetizationState {
  unlockedContent: string[];
  activeBoosts: AIBoost[];
  sentGifts: AIGift[];
  loading: boolean;
  error: string | null;
  
  // Actions
  purchaseContent: (contentId: string, profileId: string, price: number) => Promise<boolean>;
  sendGift: (profileId: string, giftType: string, amount: number) => Promise<boolean>;
  boostProfile: (profileId: string, amount: number, durationHours: number) => Promise<boolean>;
  fetchUnlockedContent: (userId: string) => Promise<void>;
  fetchActiveBoosts: (userId?: string) => Promise<void>;
  fetchSentGifts: (userId: string) => Promise<void>;
  checkContentAccess: (contentId: string) => boolean;
}

const useAIModelMonetizationStore = create<AIModelMonetizationState>((set, get) => ({
  unlockedContent: [],
  activeBoosts: [],
  sentGifts: [],
  loading: false,
  error: null,
  
  purchaseContent: async (contentId, profileId, price) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would call a Supabase function to handle the transaction
      // For this demo, we'll simulate a successful purchase
      
      // Add to unlocked content
      set(state => ({ 
        unlockedContent: [...state.unlockedContent, contentId] 
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || "Failed to purchase content" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  sendGift: async (profileId, giftType, amount) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would call a Supabase function to handle the transaction
      // For this demo, we'll simulate a successful gift
      
      const mockGift: AIGift = {
        id: Math.random().toString(36).substring(2, 15),
        gift_type: giftType,
        name: giftType, // Added name property based on AIGift type
        description: `A ${giftType} gift`, // Added description property
        price: amount, // Using amount as price
        user_id: 'current-user',
        profile_id: profileId,
        created_at: new Date().toISOString()
      };
      
      set(state => ({ 
        sentGifts: [...state.sentGifts, mockGift] 
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || "Failed to send gift" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  boostProfile: async (profileId, amount, durationHours) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would call a Supabase function to handle the transaction
      // For this demo, we'll simulate a successful boost
      
      const now = new Date();
      const endTime = new Date();
      endTime.setHours(now.getHours() + durationHours);
      
      const mockBoost: AIBoost = {
        id: Math.random().toString(36).substring(2, 15),
        profile_id: profileId,
        user_id: 'current-user',
        boost_amount: amount,
        boost_level: Math.ceil(amount / 20), // Simple formula for boost level
        start_time: now.toISOString(),
        end_time: endTime.toISOString(),
        status: 'active'
      };
      
      set(state => ({ 
        activeBoosts: [...state.activeBoosts, mockBoost] 
      }));
      
      return true;
    } catch (error: any) {
      set({ error: error.message || "Failed to boost profile" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  fetchUnlockedContent: async (userId) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch from Supabase
      // For this demo, we'll use local storage as a mock
      
      const storedContent = localStorage.getItem('unlockedContent');
      if (storedContent) {
        set({ unlockedContent: JSON.parse(storedContent) });
      }
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch unlocked content" });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchActiveBoosts: async (userId) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch from Supabase
      // For this demo, we'll use mock data
      
      // This would normally filter by the current user
      const now = new Date();
      const mockBoosts: AIBoost[] = get().activeBoosts.filter(
        boost => new Date(boost.end_time) > now
      );
      
      set({ activeBoosts: mockBoosts });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch active boosts" });
    } finally {
      set({ loading: false });
    }
  },
  
  fetchSentGifts: async (userId) => {
    try {
      set({ loading: true, error: null });
      
      // In a real app, this would fetch from Supabase
      // For this demo, we'll use the existing state
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch sent gifts" });
    } finally {
      set({ loading: false });
    }
  },
  
  checkContentAccess: (contentId) => {
    return get().unlockedContent.includes(contentId);
  }
}));

export default useAIModelMonetizationStore;
