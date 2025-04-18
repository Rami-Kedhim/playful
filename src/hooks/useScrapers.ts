
interface EscortScraper {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive' | 'error';
  lastRun?: Date;
  count: number;
  setFilters: (filters: any) => void;
  scrape: () => Promise<any>;
}

interface ScraperFilters {
  location?: string;
  minAge?: number;
  maxAge?: number;
  services?: string[];
  verifiedOnly?: boolean;
}

export const useScrapers = () => {
  const scrapers: EscortScraper[] = [
    {
      id: 'scraper1',
      name: 'Tryst.link',
      url: 'https://tryst.link',
      status: 'active',
      lastRun: new Date('2023-09-15'),
      count: 1250,
      setFilters: (filters: ScraperFilters) => {
        console.log('Setting filters for Tryst.link:', filters);
      },
      scrape: async () => {
        console.log('Scraping Tryst.link...');
        return { success: true, count: 125 };
      }
    },
    {
      id: 'scraper2',
      name: 'Eros.com',
      url: 'https://eros.com',
      status: 'active',
      lastRun: new Date('2023-09-10'),
      count: 840,
      setFilters: (filters: ScraperFilters) => {
        console.log('Setting filters for Eros.com:', filters);
      },
      scrape: async () => {
        console.log('Scraping Eros.com...');
        return { success: true, count: 84 };
      }
    },
    {
      id: 'scraper3',
      name: 'Slixa.com',
      url: 'https://slixa.com',
      status: 'inactive',
      lastRun: new Date('2023-08-05'),
      count: 620,
      setFilters: (filters: ScraperFilters) => {
        console.log('Setting filters for Slixa.com:', filters);
      },
      scrape: async () => {
        console.log('Scraping Slixa.com...');
        return { success: false, error: 'API rate limit exceeded' };
      }
    }
  ];

  const runScraper = async (id: string, filters?: ScraperFilters) => {
    const scraper = scrapers.find(s => s.id === id);
    
    if (!scraper) {
      return { success: false, error: 'Scraper not found' };
    }
    
    if (scraper.status !== 'active') {
      return { success: false, error: `Scraper is ${scraper.status}` };
    }
    
    if (filters) {
      scraper.setFilters(filters);
    }
    
    try {
      return await scraper.scrape();
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  const getActiveScrapers = () => {
    return scrapers.filter(s => s.status === 'active');
  };

  const getTotalScraped = () => {
    return scrapers.reduce((total, s) => total + s.count, 0);
  };

  const getLastRunTimestamp = () => {
    return new Date(Math.max(...scrapers.map(s => s.lastRun?.getTime() || 0)));
  };

  return {
    scrapers,
    runScraper,
    getActiveScrapers,
    getTotalScraped,
    getLastRunTimestamp
  };
};

export default useScrapers;
