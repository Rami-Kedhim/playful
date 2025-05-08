
import { Escort } from '@/types/escort';

// Mock data for featured escorts
const mockEscorts = [
  {
    id: 'escort-1',
    name: 'Sophia',
    age: 25,
    gender: 'Female',
    location: 'New York, NY',
    rating: 4.9,
    reviewCount: 124,
    tags: ['GFE', 'Dinner Date', 'Travel Companion'],
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256',
    price: 300,
    isVerified: true,
    availableNow: true,
    featured: true,
    sexualOrientation: 'Straight'
  },
  {
    id: 'escort-2',
    name: 'Isabella',
    age: 23,
    gender: 'Female',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 89,
    tags: ['Massage', 'Role Play', 'Couple Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=256',
    price: 250,
    isVerified: true,
    availableNow: false,
    featured: true,
    sexualOrientation: 'Bisexual'
  },
  {
    id: 'escort-3',
    name: 'Emma',
    age: 27,
    gender: 'Female',
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviewCount: 156,
    tags: ['Fetish', 'BDSM', 'Overnight'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256',
    price: 350,
    isVerified: true,
    availableNow: true,
    featured: true,
    sexualOrientation: 'Straight'
  },
  {
    id: 'escort-4',
    name: 'Olivia',
    age: 24,
    gender: 'Female',
    location: 'Chicago, IL',
    rating: 4.6,
    reviewCount: 72,
    tags: ['Dinner Date', 'Massage', 'Travel Companion'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256',
    price: 280,
    isVerified: true,
    availableNow: false,
    featured: true,
    sexualOrientation: 'Bisexual'
  }
];

class EscortService {
  async getAllEscorts(): Promise<Escort[]> {
    return Promise.resolve(mockEscorts);
  }

  async getFeaturedEscorts(): Promise<Escort[]> {
    return Promise.resolve(mockEscorts.filter(escort => escort.featured));
  }

  async getEscortById(id: string): Promise<Escort | null> {
    const escort = mockEscorts.find(escort => escort.id === id);
    return Promise.resolve(escort || null);
  }

  async searchEscorts(query: string): Promise<Escort[]> {
    const lcQuery = query.toLowerCase();
    return Promise.resolve(
      mockEscorts.filter(escort => 
        escort.name.toLowerCase().includes(lcQuery) || 
        escort.location?.toLowerCase().includes(lcQuery) ||
        escort.tags?.some(tag => tag.toLowerCase().includes(lcQuery))
      )
    );
  }
}

// Export an instance of the service
export const escortService = new EscortService();

// Export the class for extensibility
export default EscortService;
