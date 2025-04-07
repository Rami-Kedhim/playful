
/**
 * Base Scraper Service - Abstract class for all scrapers
 * Implements common scraping functionality and error handling
 */
import { brainHub } from "@/services/neural/HermesOxumBrainHub";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export abstract class BaseScraperService {
  protected region: string;
  protected categories: string[] = [];
  protected limit: number = 20;
  protected isRunning: boolean = false;
  
  constructor(region: string = 'global') {
    this.region = region;
  }
  
  /**
   * Main scraping method to be implemented by child classes
   */
  public abstract scrape(): Promise<any[]>;
  
  /**
   * Process scraped data through Brain Hub
   */
  protected async processThroughBrainHub(data: any[]): Promise<any[]> {
    console.log(`Processing ${data.length} items through Brain Hub`);
    
    const processedData = [];
    
    for (const item of data) {
      try {
        // Process through brain hub to apply enhancements, filtering, and compliance
        const response = await brainHub.processRequest({
          requestType: this.getRequestType(),
          content: JSON.stringify(item),
          region: this.region
        });
        
        if (response.isRegionAllowed) {
          processedData.push({
            ...item,
            aiEnhancements: response.aiGeneratedContent || null,
            emotion: response.emotion || 'neutral',
            suggestedActions: response.suggestedActions || []
          });
        } else {
          console.log(`Content filtered out for region: ${this.region}`);
        }
      } catch (err) {
        console.error(`Error processing item through Brain Hub:`, err);
      }
    }
    
    return processedData;
  }
  
  /**
   * Log scraping activities to Supabase
   */
  protected async logScrapingActivity(platform: string, success: boolean, details: any = {}) {
    try {
      const { error } = await supabase
        .from('scraping_logs')
        .insert({
          platform,
          success,
          details,
          region_id: this.region,
        });
        
      if (error) {
        console.error(`Error logging scraping activity:`, error);
      }
    } catch (err) {
      console.error(`Error logging to database:`, err);
    }
  }
  
  /**
   * Handle scraping errors consistently
   */
  protected handleScrapingError(error: any, platform: string): void {
    console.error(`Error scraping from ${platform}:`, error);
    
    // Log error to Supabase
    this.logScrapingActivity(platform, false, { 
      errorMessage: error.message,
      stack: error.stack
    });
    
    toast({
      title: `Scraping Error`,
      description: `Failed to fetch data from ${platform}. Using cached data instead.`,
      variant: "destructive",
    });
  }
  
  /**
   * Get the appropriate Brain Hub request type based on scraper
   */
  protected abstract getRequestType(): 'profile_view' | 'chat' | 'content' | 'livecam' | 'economic';
  
  /**
   * Set filters for scraping
   */
  public setFilters(filters: { 
    categories?: string[], 
    limit?: number,
    region?: string
  }): void {
    if (filters.categories) this.categories = filters.categories;
    if (filters.limit) this.limit = filters.limit;
    if (filters.region) this.region = filters.region;
  }
  
  /**
   * Check if scraper is currently running
   */
  public isActive(): boolean {
    return this.isRunning;
  }
}
