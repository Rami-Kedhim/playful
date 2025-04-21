
import { create } from 'zustand';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { boostService } from '@/services/boostService';

interface AIModel {
  id: string;
  name: string;
  boostLevel: number;
  boostExpiry?: Date;
}

interface AIModelMonetizationState {
  models: Record<string, AIModel>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addModel: (model: AIModel) => void;
  removeModel: (modelId: string) => void;
  boostModel: (modelId: string, ubxAmount: number, durationHours: number) => Promise<boolean>;
  getModelBoostLevel: (modelId: string) => number;
  getProfileBoostLevel: (profileId: string) => number;
  boostProfile: (profileId: string, ubxAmount: number, durationHours: number) => Promise<boolean>;
}

const useAIModelMonetizationStore = create<AIModelMonetizationState>((set, get) => ({
  models: {},
  isLoading: false,
  error: null,
  
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
      // Validate the amount matches the global UBX rate
      if (ubxAmount !== GLOBAL_UBX_RATE) {
        throw new Error("Invalid boost amount - must match global UBX rate");
      }
      
      // Calculate boost level based on UBX amount
      const boostLevel = Math.ceil(ubxAmount / 10);
      
      // Set expiry time
      const boostExpiry = new Date();
      boostExpiry.setHours(boostExpiry.getHours() + durationHours);
      
      // Update the model
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
    
    // Check if boost has expired
    if (model.boostExpiry && model.boostExpiry < new Date()) {
      // Reset boost if expired
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
    // Similar to getModelBoostLevel but for profiles
    // For simplicity, we'll just return a mock value
    return Math.floor(Math.random() * 5);
  },
  
  // New method for boosting profiles
  boostProfile: async (profileId, ubxAmount, durationHours) => {
    set({ isLoading: true, error: null });
    
    try {
      // Find the right package based on duration
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
      
      // Purchase the boost
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
  }
}));

export default useAIModelMonetizationStore;
