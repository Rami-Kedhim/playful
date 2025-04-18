
import { useState, useCallback } from 'react';
import { EscortScraper, ScraperFilters, ScrapeResult } from '@/types/scraper';

export const useScrapers = () => {
  const [scrapers, setScrapers] = useState<EscortScraper[]>([
    {
      id: 'scraper1',
      name: 'MainSiteScraper',
      status: 'idle',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      setFilters: async (filters: ScraperFilters) => {
        console.log('MainSiteScraper filters set:', filters);
      },
      scrape: async (): Promise<ScrapeResult> => {
        return {
          id: `scrape-${Date.now()}`,
          success: true,
          data: [
            { id: 'profile1', name: 'Profile 1' },
            { id: 'profile2', name: 'Profile 2' },
            { id: 'profile3', name: 'Profile 3' }
          ],
          timestamp: new Date()
        };
      }
    },
    {
      id: 'scraper2',
      name: 'SecondarySourceScraper',
      status: 'idle',
      lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      setFilters: async (filters: ScraperFilters) => {
        console.log('SecondarySourceScraper filters set:', filters);
      },
      scrape: async (): Promise<ScrapeResult> => {
        return {
          id: `scrape-${Date.now()}`,
          success: true,
          data: [
            { id: 'alt-profile1', name: 'Alt Profile 1' },
            { id: 'alt-profile2', name: 'Alt Profile 2' }
          ],
          timestamp: new Date()
        };
      }
    }
  ]);

  const [results, setResults] = useState<Record<string, ScrapeResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const setScraperFilters = useCallback(async (scraperId: string, filters: ScraperFilters) => {
    setLoading(prev => ({ ...prev, [scraperId]: true }));
    setErrors(prev => ({ ...prev, [scraperId]: '' }));
    
    try {
      const scraper = scrapers.find(s => s.id === scraperId);
      
      if (!scraper) {
        throw new Error(`Scraper with ID ${scraperId} not found`);
      }
      
      await scraper.setFilters(filters);
      
      // Update the scraper in state
      setScrapers(prev => prev.map(s => 
        s.id === scraperId ? { ...s, lastFiltersSet: new Date() } : s
      ));
      
      return true;
    } catch (error) {
      console.error(`Error setting filters for scraper ${scraperId}:`, error);
      setErrors(prev => ({ ...prev, [scraperId]: `Failed to set filters: ${error}` }));
      return false;
    } finally {
      setLoading(prev => ({ ...prev, [scraperId]: false }));
    }
  }, [scrapers]);
  
  const runScraper = useCallback(async (scraperId: string) => {
    setLoading(prev => ({ ...prev, [scraperId]: true }));
    setErrors(prev => ({ ...prev, [scraperId]: '' }));
    
    try {
      const scraper = scrapers.find(s => s.id === scraperId);
      
      if (!scraper) {
        throw new Error(`Scraper with ID ${scraperId} not found`);
      }
      
      // Update scraper status
      setScrapers(prev => prev.map(s => 
        s.id === scraperId ? { ...s, status: 'running' } : s
      ));
      
      const result = await scraper.scrape();
      
      // Store the results
      setResults(prev => ({ ...prev, [scraperId]: result }));
      
      // Update the scraper status to 'completed'
      setScrapers(prev => prev.map(s => 
        s.id === scraperId ? { ...s, status: 'completed', lastRun: new Date() } : s
      ));
      
      return result;
    } catch (error) {
      console.error(`Error running scraper ${scraperId}:`, error);
      
      // Update the scraper status to 'error'
      setScrapers(prev => prev.map(s => 
        s.id === scraperId ? { ...s, status: 'error' } : s
      ));
      
      setErrors(prev => ({ ...prev, [scraperId]: `Scraping failed: ${error}` }));
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [scraperId]: false }));
    }
  }, [scrapers]);
  
  return {
    scrapers,
    results,
    loading,
    errors,
    setScraperFilters,
    runScraper
  };
};
