
import { brainHub } from "../neural/HermesOxumBrainHub";

/**
 * Base abstract class for all scraper services
 */
export abstract class BaseScraperService {
  protected region: string | null = null;
  protected limit: number = 10;
  protected categories: string[] | null = null;
  protected isRunning: boolean = false;
  
  /**
   * Set filters for scraping operation
   */
  public setFilters(filters: {
    region?: string | null;
    limit?: number;
    categories?: string[] | null;
  }): void {
    if (filters.region !== undefined) this.region = filters.region;
    if (filters.limit !== undefined) this.limit = filters.limit;
    if (filters.categories !== undefined) this.categories = filters.categories;
  }
  
  /**
   * Process scraped data through Brain Hub for filtering, enhancement
   */
  protected async processThroughBrainHub(data: any[]): Promise<any[]> {
    try {
      const requestType = this.getRequestType();
      const response = await brainHub.processRequest({
        type: requestType,
        data: data,
        filters: {
          region: this.region,
          geoRestrictions: true
        }
      });
      
      return response.data || data;
    } catch (error) {
      console.error("Error processing data through Brain Hub:", error);
      return data;
    }
  }
  
  /**
   * Get request type for Brain Hub processing
   */
  protected abstract getRequestType(): string;
  
  /**
   * Log scraping activity
   */
  protected async logScrapingActivity(source: string, success: boolean, details?: any): Promise<void> {
    console.log(`Scraping log: ${source} - ${success ? 'Success' : 'Failed'}`, details || {});
  }
  
  /**
   * Handle scraping error
   */
  protected handleScrapingError(error: any, source: string): void {
    console.error(`Error scraping ${source}:`, error);
    this.logScrapingActivity(source, false, { error: error?.message || 'Unknown error' });
  }
}
