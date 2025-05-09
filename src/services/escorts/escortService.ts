
import { Escort } from '@/types/Escort';
import { EscortScraper } from '@/services/scrapers/EscortScraper';

class EscortService {
  private escortScraper: EscortScraper;

  constructor() {
    this.escortScraper = new EscortScraper();
  }

  async getEscorts(): Promise<Escort[]> {
    try {
      const escorts = await this.escortScraper.getEscorts();
      return escorts as Escort[];
    } catch (error) {
      console.error('Error fetching escorts:', error);
      return [];
    }
  }

  async getEscortById(id: string): Promise<Escort | null> {
    try {
      const escort = await this.escortScraper.getEscortById(id);
      return escort as Escort | null;
    } catch (error) {
      console.error(`Error fetching escort with ID ${id}:`, error);
      return null;
    }
  }

  async searchEscorts(query: string): Promise<Escort[]> {
    try {
      const results = await this.escortScraper.searchEscorts(query);
      return results as Escort[];
    } catch (error) {
      console.error('Error searching escorts:', error);
      return [];
    }
  }
}

// Create and export a singleton instance
export const escortServiceInstance = new EscortService();

// For backwards compatibility, also export as default
export default escortServiceInstance;
export { EscortService };
