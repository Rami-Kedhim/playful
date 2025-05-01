
import { create } from 'zustand';
import { AIProfile } from '@/types/ai-profile';
import { getAIProfiles } from '@/services/ai/aiProfilesService';

interface AIProfileStore {
  profiles: AIProfile[];
  featuredProfiles: AIProfile[];
  selectedProfile: AIProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfiles: () => Promise<void>;
  fetchFeaturedProfiles: () => Promise<void>;
  selectProfile: (id: string) => void;
  getProfileById: (id: string) => AIProfile | undefined;
  filterProfiles: (filters: { 
    gender?: string, 
    minAge?: number, 
    maxAge?: number, 
    tags?: string[] 
  }) => AIProfile[];
}

export const useAIProfileStore = create<AIProfileStore>((set, get) => ({
  profiles: [],
  featuredProfiles: [],
  selectedProfile: null,
  loading: false,
  error: null,
  
  fetchProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const profiles = await getAIProfiles(20);
      set({ profiles, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load profiles', 
        loading: false 
      });
    }
  },
  
  fetchFeaturedProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const allProfiles = await getAIProfiles();
      // Select random profiles to feature
      const featured = allProfiles
        .slice(0, Math.min(6, allProfiles.length))
        .sort(() => Math.random() - 0.5);
      
      set({ featuredProfiles: featured, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load featured profiles', 
        loading: false 
      });
    }
  },
  
  selectProfile: (id: string) => {
    const { profiles } = get();
    const profile = profiles.find(p => p.id === id) || null;
    set({ selectedProfile: profile });
  },
  
  getProfileById: (id: string) => {
    return get().profiles.find(profile => profile.id === id);
  },
  
  filterProfiles: (filters) => {
    const { profiles } = get();
    return profiles.filter(profile => {
      if (filters.gender && profile.gender !== filters.gender) return false;
      if (filters.minAge && (!profile.age || profile.age < filters.minAge)) return false;
      if (filters.maxAge && (!profile.age || profile.age > filters.maxAge)) return false;
      if (filters.tags && filters.tags.length > 0) {
        if (!profile.tags || !filters.tags.some(tag => profile.tags?.includes(tag))) {
          return false;
        }
      }
      return true;
    });
  }
}));
