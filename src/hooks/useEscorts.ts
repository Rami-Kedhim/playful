
/**
 * Enhanced useEscorts hook that integrates with the EscortScraper
 */
import { useState, useEffect, useCallback } from "react";
import { Escort } from "@/types/escort";
import { EscortScraper } from "@/services/scrapers/EscortScraper";
import { useToast } from "@/components/ui/use-toast";

interface UseEscortsOptions {
  initialData?: Escort[];
  autoFetch?: boolean;
  filters?: {
    location?: string;
    services?: string[];
    gender?: string;
    ageMin?: number;
    ageMax?: number;
  };
}

export const useEscorts = (options: UseEscortsOptions = {}) => {
  const [escorts, setEscorts] = useState<Escort[]>(options.initialData || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const fetchEscorts = useCallback(async (filters?: {
    location?: string;
    services?: string[];
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the scraper instance
      const scraper = EscortScraper.getInstance();
      
      // Apply filters if provided
      if (filters) {
        scraper.setFilters({
          region: filters.location,
          categories: filters.services,
          limit: filters.limit || 20
        });
      }
      
      // Perform scraping
      const scrapedEscorts = await scraper.scrape();
      
      // Apply additional filters
      let filteredEscorts = [...scrapedEscorts];
      
      if (options.filters) {
        // Filter by gender if provided
        if (options.filters.gender) {
          filteredEscorts = filteredEscorts.filter(
            escort => escort.gender === options.filters?.gender
          );
        }
        
        // Filter by age if provided
        if (options.filters.ageMin !== undefined || options.filters.ageMax !== undefined) {
          filteredEscorts = filteredEscorts.filter(escort => {
            const age = escort.age;
            const minCondition = options.filters?.ageMin !== undefined ? 
              age >= options.filters.ageMin : true;
            const maxCondition = options.filters?.ageMax !== undefined ? 
              age <= options.filters.ageMax : true;
            
            return minCondition && maxCondition;
          });
        }
      }
      
      setEscorts(filteredEscorts);
      return filteredEscorts;
    } catch (err: any) {
      console.error("Error fetching escorts:", err);
      const errorMessage = err.message || "Failed to load escort data";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [options.filters, toast]);
  
  // Fetch data on component mount if autoFetch is true
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchEscorts({
        location: options.filters?.location,
        services: options.filters?.services
      });
    }
  }, [fetchEscorts, options.autoFetch, options.filters?.location, options.filters?.services]);
  
  return {
    escorts,
    loading,
    error,
    fetchEscorts
  };
};
