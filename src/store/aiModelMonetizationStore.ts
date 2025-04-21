import { create } from 'zustand';

interface AIModelMonetizationState {
  models: Record<string, AIModel>;
  isLoading: boolean;
  error: string | null;
  balance: number;
  
  addModel: (model: AIModel) => void;
  removeModel: (modelId: string) => void;
  boostModel: (modelId: string, ubxAmount: number, durationHours: number) => Promise<boolean>;
  getModelBoostLevel: (modelId: string) => number;
  getProfileBoostLevel: (profileId: string) => number;
  boostProfile: (profileId: string, ubxAmount: number, durationHours: number) => Promise<boolean>;
  unlockImage: (profileId: string, imageUrl: string, price: number) => Promise<boolean>;
  isImageUnlocked: (profileId: string, imageUrl: string) => boolean;
  unlockVideo: (profileId: string, videoId: string, price: number) => Promise<boolean>;
  isVideoUnlocked: (profileId: string, videoId: string) => boolean;
}

const useAIModelMonetizationStore = create<AIModelMonetizationState>((set, get) => ({
  models: {},
  isLoading: false,
  error: null,
  balance: 1000,
  
  addModel: (model) => {
    set((state) => ({
      models: {
        ...state.models,
        [model.id]: model
      }
    }));
  },
  
  removeModel: (modelId) => {
    set((state) => {
      const { [modelId]: removedModel, ...remainingModels } = state.models;
      return { models: remainingModels };
    });
  },
  
  boostModel: async (modelId, ubxAmount, durationHours) => {
    set({ isLoading: true, error: null });
    
    try {
      if (ubxAmount !== GLOBAL_UBX_RATE) {
        throw new Error("Invalid boost amount - must match global UBX rate");
      }
      
      const boostLevel = Math.ceil(ubxAmount / 10);
      
      const boostExpiry = new Date();
      boostExpiry.setHours(boostExpiry.getHours() + durationHours);
      
      set((state) => {
        const existingModel = state.models[modelId] || { id: modelId, name: `Model-${modelId}`, boostLevel: 0 };
        
        return {
          models: {
            ...state.models,
            [modelId]: {
              ...existingModel,
              boostLevel,
              boostExpiry
            }
          },
          isLoading: false
        };
      });
      
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  getModelBoostLevel: (modelId) => {
    const model = get().models[modelId];
    if (!model) return 0;
    
    if (model.boostExpiry && model.boostExpiry < new Date()) {
      set((state) => ({
        models: {
          ...state.models,
          [modelId]: {
            ...state.models[modelId],
            boostLevel: 0,
            boostExpiry: undefined
          }
        }
      }));
      return 0;
    }
    
    return model.boostLevel;
  },
  
  getProfileBoostLevel: (profileId) => {
    return Math.floor(Math.random() * 5);
  },
  
  boostProfile: async (profileId, ubxAmount, durationHours) => {
    set({ isLoading: true, error: null });
    
    try {
      const packages = await boostService.fetchBoostPackages();
      const closestPackage = packages.reduce((closest, pkg) => {
        const pkgHours = parseInt(pkg.duration.split(':')[0]);
        const currentClosestHours = closest ? parseInt(closest.duration.split(':')[0]) : 0;
        
        if (Math.abs(pkgHours - durationHours) < Math.abs(currentClosestHours - durationHours)) {
          return pkg;
        }
        return closest;
      }, null);
      
      if (!closestPackage) {
        throw new Error("No suitable boost package found");
      }
      
      const result = await boostService.purchaseBoost(profileId, closestPackage.id);
      
      if (!result.success) {
        throw new Error(result.message || "Failed to boost profile");
      }
      
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },
  
  unlockImage: async (profileId, imageUrl, price) => {
    const currentBalance = get().balance;
    if (currentBalance < price) {
      return false;
    }
    
    set(state => ({ balance: state.balance - price }));
    return true;
  },
  
  isImageUnlocked: (profileId, imageUrl) => {
    return true;
  },
  
  unlockVideo: async (profileId, videoId, price) => {
    const currentBalance = get().balance;
    if (currentBalance < price) {
      return false;
    }
    
    set(state => ({ balance: state.balance - price }));
    return true;
  },
  
  isVideoUnlocked: (profileId, videoId) => {
    return false;
  }
}));

export default useAIModelMonetizationStore;
