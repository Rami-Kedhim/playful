
import { Escort, ContactInfo } from '@/types/escort';
import { mockEscortProfiles } from '@/data/mockData'; 

// Mock implementation of escort service
const escortService = {
  getEscorts: async (filters: any = {}) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredEscorts = [...mockEscortProfiles];
    
    // Apply filters
    if (filters.gender) {
      filteredEscorts = filteredEscorts.filter(escort => 
        escort.gender === filters.gender
      );
    }
    
    if (filters.minPrice) {
      filteredEscorts = filteredEscorts.filter(escort => 
        (escort.price || 0) >= filters.minPrice
      );
    }
    
    if (filters.maxPrice) {
      filteredEscorts = filteredEscorts.filter(escort => 
        (escort.price || 0) <= filters.maxPrice
      );
    }
    
    if (filters.location) {
      filteredEscorts = filteredEscorts.filter(escort => 
        escort.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.verifiedOnly) {
      filteredEscorts = filteredEscorts.filter(escort => 
        escort.isVerified
      );
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEscorts = filteredEscorts.slice(startIndex, endIndex);
    
    return {
      escorts: paginatedEscorts,
      totalPages: Math.ceil(filteredEscorts.length / limit),
      currentPage: page,
      total: filteredEscorts.length
    };
  },
  
  getEscortById: async (id: string): Promise<Escort | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const escort = mockEscortProfiles.find(escort => escort.id === id);
    return escort || null;
  },
  
  updateEscortProfile: async (id: string, updates: Partial<Escort>): Promise<Escort | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find the escort by ID
    const escortIndex = mockEscortProfiles.findIndex(escort => escort.id === id);
    
    if (escortIndex === -1) {
      throw new Error('Escort not found');
    }
    
    // Update the escort
    const updatedEscort = {
      ...mockEscortProfiles[escortIndex],
      ...updates
    };
    
    // Update in the mock array
    mockEscortProfiles[escortIndex] = updatedEscort;
    
    return updatedEscort;
  }
};

export default escortService;
