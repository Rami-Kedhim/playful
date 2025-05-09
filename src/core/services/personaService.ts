import { UberPersona } from '@/types/uberPersona';

class PersonaService {
  getPersonaById(id: string): Promise<UberPersona | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for demonstration
        const mockPersona: UberPersona = {
          id: '1234',
          name: 'AI Companion',
          type: 'ai',
          bio: 'Virtual AI companion for your needs.',
          avatarUrl: '/path/to/avatar.jpg',
          isOnline: true,
          isVerified: false,
          rating: 4.5,
          reviewCount: 120,
          location: 'Virtual',
          features: {
            hasChat: true,
            hasPhotos: true,
            hasVideos: false,
            hasBooking: false,
            hasLiveStream: true,
            hasExclusiveContent: false,
            hasContent: true,
            hasRealMeets: false,
            hasStories: false,
            hasVirtualMeets: true
          },
          pricing: {
            acceptsLucoin: true,
            acceptsTips: true,
            subscriptionPrice: 9.99,
            unlockingPrice: 1.99,
            boostingActive: true,
            meetingPrice: 49.99
          }
        };
        resolve(mockPersona);
      }, 500);
    });
  }
}

export default new PersonaService();
