
export interface ScraperFilters {
  location?: string;
  gender?: string[];
  services?: string[];
  priceRange?: [number, number];
  dateRange?: [Date, Date];
}

export interface ScrapeResult {
  id: string;
  success: boolean;
  data: any[];
  error?: string;
  timestamp: Date;
}

export interface EscortScraper {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  lastRun?: Date;
  setFilters: (filters: ScraperFilters) => void;
  scrape: () => Promise<ScrapeResult>;
}
