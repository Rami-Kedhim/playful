
import { create } from 'zustand';

interface AIModelMonetizationState {
  unlockedImages: Record<string, boolean>;
  unlockedVideos: Record<string, boolean>;
  unlockedContent: Record<string, boolean>;
  processingIds: string[];
  profileBoostLevels: Record<string, number>;
  
  unlockImage: (profileId: string, imageUrl: string, price: number) => Promise<boolean>;
  unlockVideo: (profileId: string, videoUrl: string, price: number) => Promise<boolean>;
  purchaseAIContent: (profileId: string, contentId: string, price: number) => Promise<boolean>;
  sendAIGift: (profileId: string, giftType: string, price: number) => Promise<boolean>;
  checkContentAccess: (contentId: string) => boolean;
  
  isImageUnlocked: (imageUrl: string) => boolean;
  isVideoUnlocked: (videoUrl: string) => boolean;
  isProcessing: boolean;
  
  boostProfile: (profileId: string, price: number, duration: number) => Promise<boolean>;
  getProfileBoostLevel: (profileId: string) => number;
}

const useAIModelMonetizationStore = create<AIModelMonetizationState>((set, get) => ({
  unlockedImages: {},
  unlockedVideos: {},
  unlockedContent: {},
  processingIds: [],
  profileBoostLevels: {},
  isProcessing: false,
  
  unlockImage: async (profileId, imageUrl, price) => {
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({ 
      unlockedImages: { ...state.unlockedImages, [imageUrl]: true },
      isProcessing: false 
    }));
    
    return true;
  },
  
  unlockVideo: async (profileId, videoUrl, price) => {
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({ 
      unlockedVideos: { ...state.unlockedVideos, [videoUrl]: true },
      isProcessing: false 
    }));
    
    return true;
  },
  
  purchaseAIContent: async (profileId, contentId, price) => {
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({ 
      unlockedContent: { ...state.unlockedContent, [contentId]: true },
      isProcessing: false 
    }));
    
    return true;
  },
  
  sendAIGift: async (profileId, giftType, price) => {
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ isProcessing: false });
    
    return true;
  },
  
  checkContentAccess: (contentId) => {
    return !!get().unlockedContent[contentId];
  },
  
  isImageUnlocked: (imageUrl) => {
    return !!get().unlockedImages[imageUrl];
  },
  
  isVideoUnlocked: (videoUrl) => {
    return !!get().unlockedVideos[videoUrl];
  },
  
  boostProfile: async (profileId, price, duration) => {
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set(state => ({ 
      profileBoostLevels: { 
        ...state.profileBoostLevels, 
        [profileId]: (state.profileBoostLevels[profileId] || 0) + 1 
      },
      isProcessing: false 
    }));
    
    return true;
  },
  
  getProfileBoostLevel: (profileId) => {
    return get().profileBoostLevels[profileId] || 0;
  }
}));

export default useAIModelMonetizationStore;
