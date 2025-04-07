/**
 * Enhanced useCreators hook that integrates with the CreatorScraper
 */
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ContentCreator } from "@/types/creator";
import { fetchScrapedCreators, getScrapedCreatorByUsername } from "@/services/scrapedCreatorService";
import { CreatorScraper } from "@/services/scrapers/CreatorScraper";

export type Creator = ContentCreator;

export const useCreators = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = async (filters?: Record<string, any>): Promise<Creator[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // Get creators from multiple sources
      const results = await Promise.all([
        // Get from our mock data
        fetchScrapedCreators(),
        
        // Get from our scraper (uviu.com)
        (async () => {
          try {
            const scraper = CreatorScraper.getInstance();
            
            if (filters) {
              scraper.setFilters({
                region: filters.region,
                categories: filters.tags,
                limit: filters.limit || 20
              });
            }
            
            return await scraper.scrape();
          } catch (e) {
            console.error("Error using creator scraper:", e);
            return [];
          }
        })()
      ]);
      
      // Flatten and combine results
      const allCreators = results.flat();
      
      // Apply filters if provided
      if (filters) {
        return allCreators.filter(creator => {
          let passesFilter = true;
          
          if (filters.isPremium !== undefined) {
            passesFilter = passesFilter && creator.isPremium === filters.isPremium;
          }
          
          if (filters.isAI !== undefined) {
            passesFilter = passesFilter && creator.isAI === filters.isAI;
          }
          
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            const matchesName = creator.name.toLowerCase().includes(query);
            const matchesUsername = creator.username.toLowerCase().includes(query);
            const matchesTags = creator.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
            
            passesFilter = passesFilter && (matchesName || matchesUsername || matchesTags);
          }
          
          return passesFilter;
        });
      }
      
      return allCreators;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creators";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreatorById = async (id: string): Promise<Creator | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if this is a scraped creator (IDs start with "scraped-")
      if (id.startsWith("scraped-")) {
        const username = id.replace("scraped-", "");
        const scrapedCreator = await getScrapedCreatorByUsername(username);
        return scrapedCreator;
      }
      
      // Otherwise, check in our mock data
      const mockCreator = mockCreators.find(c => c.id === id);
      
      if (mockCreator) return mockCreator;
      
      // As a last resort, try to find via the scraper by username part of the ID
      try {
        const scraper = CreatorScraper.getInstance();
        const creators = await scraper.scrape();
        return creators.find(c => c.id === id) || null;
      } catch (e) {
        console.error("Error using creator scraper:", e);
        return null;
      }
      
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creator";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreatorByUsername = async (username: string): Promise<Creator | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check in regular mock creators
      const regularCreator = mockCreators.find(c => c.username === username);
      if (regularCreator) return regularCreator;
      
      // Check in scraped creators
      const scrapedCreator = await getScrapedCreatorByUsername(username);
      if (scrapedCreator) return scrapedCreator;
      
      // Try to find via the scraper
      try {
        const scraper = CreatorScraper.getInstance();
        const creators = await scraper.scrape();
        return creators.find(c => c.username === username) || null;
      } catch (e) {
        console.error("Error using creator scraper:", e);
        return null;
      }
      
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creator";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchCreators,
    fetchCreatorById,
    fetchCreatorByUsername,
    isLoading,
    error
  };
};

// Mock data for development - kept the same as the original hook
const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Crystal",
    username: "crystal_dreams",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    bio: "Hi there! I'm Crystal, and I love creating exclusive content just for you. Join my premium channel for daily updates and personal interactions!",
    isLive: true,
    isPremium: true,
    subscriberCount: 12500,
    contentCount: {
      photos: 287,
      videos: 42
    },
    price: 9.99,
    isAI: false,
    rating: 4.8,
    tags: ["glamour", "lifestyle", "travel"],
    region: "US",
    language: "en"
  },
  {
    id: "2",
    name: "Luna",
    username: "luna_fantasy",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    bio: "Fantasy and reality blend in my content. Premium subscribers get access to my exclusive virtual reality experiences.",
    isLive: false,
    isPremium: true,
    subscriberCount: 8700,
    contentCount: {
      photos: 195,
      videos: 28
    },
    price: 12.99,
    isAI: true,
    rating: 4.7,
    tags: ["cosplay", "fantasy", "gaming"],
    region: "EU",
    language: "en"
  }
];

export default useCreators;
