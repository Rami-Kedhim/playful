
import { UberPersona } from '@/types/uberPersona';

export const userService = {
  getUserProfile: async (userId: string): Promise<UberPersona> => {
    // Mock implementation
    return {
      id: userId,
      name: 'Demo User',
      displayName: 'Demo User',
      type: 'regular',
      tags: ['new'],
      isVerified: false,
      isOnline: true,
      monetization: {
        meetingPrice: 50
      }
    };
  },
  
  updateUserProfile: async (userId: string, data: Partial<UberPersona>): Promise<boolean> => {
    console.log('Updating user profile:', data);
    return true;
  },
  
  getUserPreferences: async (userId: string): Promise<Record<string, any>> => {
    return {
      theme: 'dark',
      notifications: true
    };
  }
};

export default userService;
