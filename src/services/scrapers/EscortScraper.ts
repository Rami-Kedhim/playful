import { BaseScraperService } from "./baseScraperService";
import { Escort, ServiceType } from "@/types/escort";
import { brainHub } from "../neural/HermesOxumBrainHub";

export class EscortScraper extends BaseScraperService {
  private static instance: EscortScraper;
  private cachedResults: Escort[] = [];
  private lastScraped: Date | null = null;
  private services = [
    "GFE",
    "Massage",
    "Overnight",
    "Dinner Date",
    "Travel Companion",
    "BDSM",
    "Role Play"
  ];
  
  private constructor() {
    super();
  }
  
  public static getInstance(): EscortScraper {
    if (!EscortScraper.instance) {
      EscortScraper.instance = new EscortScraper();
    }
    return EscortScraper.instance;
  }
  
  protected getRequestType(): 'profile_view' {
    return 'profile_view';
  }
  
  public async scrape(): Promise<Escort[]> {
    if (this.cachedResults.length > 0 && this.lastScraped) {
      const elapsedMinutes = (Date.now() - this.lastScraped.getTime()) / (1000 * 60);
      if (elapsedMinutes < 15) {
        console.log("Returning cached escort results");
        return this.cachedResults;
      }
    }
    
    this.isRunning = true;
    
    try {
      console.log(`Preparing to retrieve escort data through BrainHub instead of direct scraping`);
      
      let processedEscorts: Escort[] = [];
      
      try {
        processedEscorts = await this.processWithBrainHub('escorts') as Escort[];
        
        console.log(`Successfully retrieved ${processedEscorts.length} escorts from BrainHub`);
        
        processedEscorts = processedEscorts.map(escort => {
          let profileType: 'verified' | 'ai' | 'provisional' = 'provisional';
          
          if (escort.verified) {
            profileType = 'verified';
          } else if (escort.isAI) {
            profileType = 'ai';
          }
          
          return {
            ...escort,
            profileType,
            isScraped: !escort.verified && !escort.isAI
          };
        });
      } catch (error) {
        console.error("BrainHub query failed, falling back to mock data:", error);
        processedEscorts = this.generateMockEscortData();
      }
      
      await this.logScrapingActivity('brainHub', true, {
        count: processedEscorts.length,
        location: this.region
      });
      
      this.cachedResults = processedEscorts;
      this.lastScraped = new Date();
      
      return processedEscorts;
    } catch (error) {
      this.handleScrapingError(error, 'BrainHub');
      return this.cachedResults.length > 0 ? 
        this.cachedResults : 
        this.generateMockEscortData();
    } finally {
      this.isRunning = false;
    }
  }
  
  private processWithBrainHub(inputQuery: string): any {
    try {
      return brainHub.processQuery(inputQuery);
    } catch (error) {
      console.error("Error processing with BrainHub:", error);
      return {};
    }
  }
  
  public getCachedResults(): Escort[] {
    if (this.cachedResults.length === 0) {
      return this.generateMockEscortData();
    }
    return this.cachedResults;
  }
  
  private generateMockEscortData(): Escort[] {
    const escorts: Escort[] = [];
    
    for (let i = 0; i < this.limit; i++) {
      const id = `escort-${Date.now().toString().substring(8, 13)}-${i}`;
      const seed = `escort-${Date.now().toString().substring(8, 13)}-${i}`;
      
      const selectedServices = this.services
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 5) + 2) as unknown as ServiceType[];
        
      const randomPrices = {
        hourly: Math.floor(Math.random() * 200) + 150,
        overnight: Math.floor(Math.random() * 1000) + 500,
      };
      
      const gender = Math.random() > 0.7 ? 'male' : 'female';
      const age = Math.floor(Math.random() * 20) + 21;
      const isAI = Math.random() > 0.8;
      const verified = !isAI && Math.random() > 0.6;
      const provisional = !verified && !isAI;
      const boostLevel = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
      
      let profileType: 'verified' | 'ai' | 'provisional' = 'provisional';
      
      if (verified) {
        profileType = 'verified';
      } else if (isAI) {
        profileType = 'ai';
      }
      
      const mockImageUrl = `https://picsum.photos/seed/${seed}/800/1200`;
      
      escorts.push({
        id,
        name: `Escort ${i}`,
        age,
        gender,
        location: this.region || 'International',
        bio: `High-class ${gender === 'female' ? 'female' : 'male'} escort offering premium companionship services. Available for bookings.`,
        services: selectedServices,
        imageUrl: mockImageUrl,
        profileImage: mockImageUrl,
        gallery: [
          `https://picsum.photos/seed/${seed}-1/800/800`,
          `https://picsum.photos/seed/${seed}-2/800/800`,
          `https://picsum.photos/seed/${seed}-3/800/800`,
        ],
        rates: {
          hourly: randomPrices.hourly,
          overnight: randomPrices.overnight
        },
        availableNow: Math.random() > 0.4,
        verified,
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 50),
        tags: selectedServices.map(s => s.toString()),
        languages: ['English'],
        contactInfo: {
          email: `escort${i}@example.com`,
          phone: '+1234567890',
          website: `https://example.com/escort${i}`
        },
        availability: {
          days: ['monday', 'wednesday', 'friday', 'saturday'],
          hours: ['10:00-22:00']
        },
        featured: Math.random() > 0.7,
        price: randomPrices.hourly,
        isAI,
        isScraped: provisional,
        profileType,
        boostLevel,
        boostExpiry: boostLevel > 0 ? new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)) : undefined
      });
    }
    
    return escorts;
  }
}
