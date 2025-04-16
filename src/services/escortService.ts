
import { Escort } from '@/types/escort';
import { escortProfiles } from '@/data/escortData';
import { moreEscortProfiles } from '@/data/moreEscortProfiles';

class EscortService {
  private escortProfiles: Escort[] = [];
  private initialized = false;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    if (this.initialized) return;
    
    // Combine escort profiles from different sources
    try {
      const initialProfiles = await escortProfiles();
      this.escortProfiles = [
        ...initialProfiles,
        ...moreEscortProfiles
      ];
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize escort profiles:', error);
      this.escortProfiles = [...moreEscortProfiles]; // Fallback
      this.initialized = true;
    }
  }

  public async getAllProfiles(): Promise<Escort[]> {
    await this.initializeData();
    return this.escortProfiles;
  }

  public async getProfileById(id: string): Promise<Escort | null> {
    await this.initializeData();
    return this.escortProfiles.find(profile => profile.id === id) || null;
  }

  public async getFilteredProfiles(filters: Record<string, any>): Promise<Escort[]> {
    await this.initializeData();
    
    return this.escortProfiles.filter(profile => {
      // Example filter logic - extend as needed
      if (filters.gender && filters.gender.length > 0 && !filters.gender.includes(profile.gender)) {
        return false;
      }
      
      if (filters.minPrice && profile.price < filters.minPrice) {
        return false;
      }
      
      if (filters.maxPrice && profile.price > filters.maxPrice) {
        return false;
      }
      
      if (filters.location && profile.location !== filters.location) {
        return false;
      }
      
      // Add more filter conditions as needed
      
      return true;
    });
  }

  public async updateProfile(id: string, updates: Partial<Escort>): Promise<Escort | null> {
    await this.initializeData();
    
    const index = this.escortProfiles.findIndex(profile => profile.id === id);
    if (index === -1) return null;
    
    // Update the profile
    const updatedProfile = {
      ...this.escortProfiles[index],
      ...updates
    };
    
    // Update in the array
    this.escortProfiles[index] = updatedProfile;
    
    return updatedProfile;
  }
}

const escortService = new EscortService();
export default escortService;
