
import { Escort, ServiceTypeFilter } from '@/types/escort';
import { supabase } from '@/integrations/supabase/client';
// Import mock data for fallback
import { featuredEscorts, popularEscorts, newEscorts } from '@/data/mockData';

const escortService = {
  async getEscorts(
    filter: ServiceTypeFilter = '',
    page = 1,
    limit = 10,
    sortBy = 'featured'
  ): Promise<Escort[]> {
    try {
      // In a real app, this would fetch from an API or database
      // For now, return mock data
      let escorts: Escort[] = [];
      
      switch (sortBy) {
        case 'featured':
          escorts = featuredEscorts;
          break;
        case 'popular':
          escorts = popularEscorts;
          break;
        case 'new':
          escorts = newEscorts;
          break;
        default:
          escorts = [...featuredEscorts, ...popularEscorts, ...newEscorts]
            .filter((escort, index, self) => 
              index === self.findIndex((e) => e.id === escort.id)
            );
      }
      
      // Apply service type filtering if needed
      if (filter) {
        escorts = escorts.filter(escort => {
          if (filter === 'in-person') {
            return escort.providesInPersonServices || 
                   escort.serviceTypes?.includes('incall') || 
                   escort.serviceTypes?.includes('outcall') || 
                   escort.serviceTypes?.includes('both');
          }
          if (filter === 'virtual') {
            return escort.providesVirtualContent || 
                   escort.serviceTypes?.includes('virtual');
          }
          if (filter === 'both') {
            return (escort.providesInPersonServices || 
                  escort.serviceTypes?.includes('incall') || 
                  escort.serviceTypes?.includes('outcall') || 
                  escort.serviceTypes?.includes('both')) && 
                  (escort.providesVirtualContent || 
                  escort.serviceTypes?.includes('virtual'));
          }
          return true;
        });
      }
      
      // Calculate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEscorts = escorts.slice(startIndex, endIndex);
      
      return paginatedEscorts;
    } catch (error) {
      console.error('Error fetching escorts:', error);
      return [];
    }
  },

  async getEscortById(id: string): Promise<Escort | null> {
    try {
      // In a real app, fetch from API or database
      // For now, search through mock data
      const allEscorts = [
        ...featuredEscorts,
        ...popularEscorts,
        ...newEscorts
      ];
      
      const escort = allEscorts.find(escort => escort.id === id);
      return escort || null;
    } catch (error) {
      console.error(`Error fetching escort with id ${id}:`, error);
      return null;
    }
  },

  async updateEscortProfile(id: string, updates: Partial<Escort>): Promise<Escort | null> {
    try {
      // In a real app, send update to API or database
      // For now, just simulate an update and return the updated object
      const escort = await this.getEscortById(id);
      if (!escort) {
        console.error(`Escort with id ${id} not found`);
        return null;
      }
      
      // Simulate updated object
      const updatedEscort: Escort = { ...escort, ...updates };
      console.log(`Simulated update of escort with id ${id}:`, updatedEscort);
      
      return updatedEscort;
    } catch (error) {
      console.error(`Error updating escort with id ${id}:`, error);
      return null;
    }
  }
};

export default escortService;
