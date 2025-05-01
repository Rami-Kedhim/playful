
import { UberPersona } from '@/types/uberPersona';

class FeaturedService {
  public async loadFeaturedPersonas(count: number = 4): Promise<UberPersona[]> {
    // In a real implementation, this would load from API or database
    const mockPersonas: UberPersona[] = [
      {
        id: 'persona1',
        name: 'Sophie',
        displayName: 'Sophie Dreams',
        type: 'escort' as const,
        avatarUrl: 'https://picsum.photos/seed/sophie/400/600',
        location: 'New York',
        isVerified: true,
        isOnline: true,
        tags: ['luxury', 'gfe', 'travel']
      },
      {
        id: 'persona2',
        name: 'Luna',
        displayName: 'Luna Eclipse',
        type: 'creator' as const,
        avatarUrl: 'https://picsum.photos/seed/luna/400/600',
        location: 'Miami',
        isVerified: true,
        isOnline: false,
        tags: ['photos', 'videos', 'exclusive']
      },
      {
        id: 'persona3',
        name: 'TiffanyLive',
        displayName: 'Tiffany Stars',
        type: 'livecam' as const,
        avatarUrl: 'https://picsum.photos/seed/tiffany/400/600',
        location: 'Los Angeles',
        isVerified: true,
        isOnline: true,
        tags: ['interactive', 'shows', 'private']
      },
      {
        id: 'persona4',
        name: 'Aria',
        displayName: 'Aria Intelligence',
        type: 'ai' as const,
        avatarUrl: 'https://picsum.photos/seed/aria/400/600',
        location: 'Metaverse',
        isVerified: true,
        isOnline: true,
        tags: ['adaptive', 'personalized', 'learning']
      }
    ];
    
    return mockPersonas.slice(0, count);
  }
}

export const featuredService = new FeaturedService();
