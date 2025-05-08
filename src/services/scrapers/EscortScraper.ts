
// Fix properties to match Escort type and fix array includes call with safeguards

import { Escort, Rates } from '@/types/escort';

interface EscortRates {
  hourly: number;
  halfHour: number;
  overnight: number;
}

export class EscortScraper {
  private baseUrl: string;
  private apiKey: string | null;
  private isInitialized: boolean = false;

  constructor(baseUrl: string = '', apiKey: string | null = null) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public async initialize(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.isInitialized = true;
    return true;
  }

  public async getEscorts(): Promise<Escort[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    return this.generateMockEscorts(10);
  }

  public async getEscortById(id: string): Promise<Escort | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    const mockEscort = this.generateMockEscorts(1, id)[0];
    return mockEscort || null;
  }

  public async searchEscorts(query: string): Promise<Escort[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    const mockEscorts = this.generateMockEscorts(5);
    return mockEscorts.filter(escort =>
      escort.name.toLowerCase().includes(query.toLowerCase()) ||
      escort.location?.toLowerCase().includes(query.toLowerCase() ?? "") ||
      (escort.services?.some(s => s.toLowerCase().includes(query.toLowerCase())) ?? false)
    );
  }

  private generateMockEscorts(count: number, specificId?: string): Escort[] {
    const escorts: Escort[] = [];

    for (let i = 0; i < count; i++) {
      const id = specificId || `scraped-escort-${i}`;

      const gender = Math.random() > 0.7 ? 'male' : 'female';
      const age = Math.floor(Math.random() * 15) + 21;

      const rates: Rates = {
        hourly: Math.floor(Math.random() * 300) + 200,
        halfHour: Math.floor(Math.random() * 150) + 150,
        overnight: Math.floor(Math.random() * 1000) + 1000
      };

      const mockEscort: Escort = {
        id,
        name: `Scraped ${gender === 'male' ? 'John' : 'Jane'} ${id.slice(-3)}`,
        age,
        gender: gender,
        location: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Las Vegas'][i % 5],
        bio: `Scraped profile with high-quality service. Available for bookings and special occasions.`,
        services: [
          'Dinner Date',
          'Event Companion',
          'Travel Companion',
          'Massage'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        price: rates.hourly || 300,
        imageUrl: `https://picsum.photos/seed/${id}/800/1200`,
        profileImage: `https://picsum.photos/seed/${id}-profile/400/400`,
        images: [
          `https://picsum.photos/seed/${id}-1/800/1200`,
          `https://picsum.photos/seed/${id}-2/800/1200`,
          `https://picsum.photos/seed/${id}-3/800/1200`
        ],
        rates,
        rating: Math.random() * 2 + 3,
        reviewCount: Math.floor(Math.random() * 50) + 5,
        verified: Math.random() > 0.5,
        isVerified: Math.random() > 0.5,
        featured: Math.random() > 0.8
      };

      escorts.push(mockEscort);
    }

    return escorts;
  }

  public static getInstance(): EscortScraper {
    return new EscortScraper();
  }
}

export default EscortScraper;
