
import { UberPersona } from '@/types/uberPersona';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  ubxBalance: number;
}

export class UserService {
  async getUserProfile(userId: string): Promise<User> {
    // Mock implementation
    return {
      id: userId,
      username: 'exampleUser',
      email: 'user@example.com',
      avatarUrl: '/assets/users/default-avatar.jpg',
      ubxBalance: 1500
    };
  }
  
  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    // Mock implementation
    return {
      id: userId,
      username: data.username || 'exampleUser',
      email: data.email || 'user@example.com',
      avatarUrl: data.avatarUrl || '/assets/users/default-avatar.jpg',
      ubxBalance: data.ubxBalance || 1500
    };
  }
  
  async getUserPersonas(userId: string): Promise<UberPersona[]> {
    // Mock implementation
    return [
      {
        id: 'persona-1',
        name: 'Escort Persona',
        type: 'escort',
        avatarUrl: '/assets/personas/escort.jpg',
        location: 'New York, US',
        isVerified: true,
        services: ['Companion', 'Event Escort'],
        monetization: {
          hourlyRate: 300,
          minRate: 250,
          maxRate: 500,
          acceptsUbx: true
        }
      },
      {
        id: 'persona-2',
        name: 'Creator Persona',
        type: 'creator',
        avatarUrl: '/assets/personas/creator.jpg',
        location: 'Los Angeles, US',
        isVerified: true,
        isPremium: true
      }
    ];
  }
}

export const userService = new UserService();
