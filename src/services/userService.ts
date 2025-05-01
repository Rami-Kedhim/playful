
// Implement mock user service with proper method names

import { UberPersona } from '@/types/uberPersona';

export const userService = {
  getUserProfile: async (userId: string): Promise<UberPersona> => {
    // Mock implementation
    return {
      id: userId,
      name: 'Demo User',
      displayName: 'Demo User',
      type: 'escort', // Changed from 'user' to 'escort' to match allowed types
      tags: ['new'],
      isVerified: false,
      isOnline: true,
      roleFlags: {
        isEscort: false,
        isCreator: false,
        isLivecam: false,
        isAI: false,
        isVerified: false,
        isFeatured: false,
      },
      capabilities: {
        hasPhotos: false,
        hasVideos: false,
        hasStories: false,
        hasChat: true,
        hasBooking: false,
        hasLiveStream: false,
        hasExclusiveContent: false,
        hasContent: false,
        hasRealMeets: false,
        hasVirtualMeets: false,
      },
      systemMetadata: {
        source: 'manual',
        lastSynced: new Date(),
        tagsGeneratedByAI: false,
        hilbertSpaceVector: [],
        statusFlags: {} 
      },
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
  },
  
  // Add missing methods needed by UberEcosystemContext
  updateUser: async (userId: string, userData: any): Promise<any> => {
    console.log('Updating user:', userData);
    return {
      success: true,
      message: 'User updated successfully'
    };
  }
};

export default userService;
