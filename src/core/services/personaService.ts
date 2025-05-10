
import { UberPersona } from '@/types/uberPersona';

class PersonaService {
  getPersonaById(id: string): Promise<UberPersona | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for demonstration
        const mockPersona: UberPersona = {
          id: '1234',
          name: 'AI Companion',
          avatarUrl: '/path/to/avatar.jpg',
          isOnline: true,
          isVerified: false,
          rating: 4.5,
          location: 'Virtual',
          bio: 'Virtual AI companion for your needs.',
          type: 'ai',
          tags: ['AI', 'Virtual', 'Companion'],
          traits: ['Friendly', 'Intelligent', 'Creative'],
          languages: ['English', 'Spanish'],
          stats: {
            views: 2450,
            likes: 380,
            rating: 4.5
          },
          monetization: {
            acceptsUbx: true,
            acceptsFiat: true,
            hourlyRate: 50,
            meetingPrice: 49.99
          }
        };
        resolve(mockPersona);
      }, 500);
    });
  }
}

export default new PersonaService();
