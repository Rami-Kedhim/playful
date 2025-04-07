
/**
 * Hook for using scrapers across the application
 * Provides access to all three scraper types
 */
import { useState, useCallback } from "react";
import { LivecamScraper } from "@/services/scrapers/LivecamScraper";
import { CreatorScraper } from "@/services/scrapers/CreatorScraper";
import { EscortScraper } from "@/services/scrapers/EscortScraper";
import { LivecamModel, LivecamsResponse } from "@/types/livecams";
import { Creator } from "@/hooks/useCreators";
import { Escort } from "@/types/escort";

export const useScrapers = () => {
  const [isScrapingLivecams, setIsScrapingLivecams] = useState(false);
  const [isScrapingCreators, setIsScrapingCreators] = useState(false);
  const [isScrapingEscorts, setIsScrapingEscorts] = useState(false);
  const [livecamError, setLivecamError] = useState<string | null>(null);
  const [creatorError, setCreatorError] = useState<string | null>(null);
  const [escortError, setEscortError] = useState<string | null>(null);

  /**
   * Scrape livecams from cam4.com
   */
  const scrapeLivecams = useCallback(async (options?: { 
    country?: string; 
    category?: string; 
    limit?: number;
  }): Promise<LivecamsResponse> => {
    setIsScrapingLivecams(true);
    setLivecamError(null);
    
    try {
      const livecamScraper = LivecamScraper.getInstance();
      
      // Apply filters if provided
      if (options) {
        livecamScraper.setFilters({
          region: options.country,
          categories: options.category ? [options.category] : [],
          limit: options.limit || 20
        });
      }
      
      // Perform scraping
      await livecamScraper.scrape();
      
      // Get response in expected format
      return livecamScraper.getResponse();
    } catch (error: any) {
      setLivecamError(error.message || "Failed to scrape livecams");
      return {
        models: [],
        totalCount: 0,
        page: 1,
        pageSize: options?.limit || 20,
        hasMore: false
      };
    } finally {
      setIsScrapingLivecams(false);
    }
  }, []);

  /**
   * Scrape creators from uviu.com
   */
  const scrapeCreators = useCallback(async (options?: {
    region?: string;
    categories?: string[];
    limit?: number;
  }): Promise<Creator[]> => {
    setIsScrapingCreators(true);
    setCreatorError(null);
    
    try {
      const creatorScraper = CreatorScraper.getInstance();
      
      // Apply filters if provided
      if (options) {
        creatorScraper.setFilters({
          region: options.region,
          categories: options.categories || [],
          limit: options.limit || 20
        });
      }
      
      // Perform scraping
      return await creatorScraper.scrape();
    } catch (error: any) {
      setCreatorError(error.message || "Failed to scrape creators");
      return [];
    } finally {
      setIsScrapingCreators(false);
    }
  }, []);

  /**
   * Scrape escorts from tryst.link
   */
  const scrapeEscorts = useCallback(async (options?: {
    location?: string;
    services?: string[];
    limit?: number;
  }): Promise<Escort[]> => {
    setIsScrapingEscorts(true);
    setEscortError(null);
    
    try {
      const escortScraper = EscortScraper.getInstance();
      
      // Apply filters if provided
      if (options) {
        escortScraper.setFilters({
          region: options.location,
          categories: options.services || [],
          limit: options.limit || 20
        });
      }
      
      // Perform scraping
      return await escortScraper.scrape();
    } catch (error: any) {
      setEscortError(error.message || "Failed to scrape escorts");
      return [];
    } finally {
      setIsScrapingEscorts(false);
    }
  }, []);

  return {
    // Livecams
    scrapeLivecams,
    isScrapingLivecams,
    livecamError,
    
    // Creators
    scrapeCreators,
    isScrapingCreators,
    creatorError,
    
    // Escorts
    scrapeEscorts,
    isScrapingEscorts,
    escortError
  };
};

export default useScrapers;
