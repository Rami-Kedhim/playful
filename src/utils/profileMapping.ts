
// Fix import for Creator type by removing unused import to avoid errors

import { LivecamModel } from '@/types/livecams';
import { UberPersona } from '@/types/uberPersona'; // fixed import casing
import { AIProfile } from '@/types/ai-profile';
import { Escort } from '@/types/Escort';

export function mapLivecamToUberPersona(livecam: LivecamModel): UberPersona {
  return {
    id: livecam.id,
    name: livecam.name || livecam.username,
    displayName: livecam.displayName || livecam.name || livecam.username,
    type: 'livecam',
    avatarUrl: livecam.thumbnailUrl || livecam.imageUrl,
    imageUrl: livecam.imageUrl,
    location: livecam.country || 'Unknown',
    isOnline: livecam.isLive || false,
    tags: livecam.tags || [],
    isActive: true,
    roleFlags: {
      isLivecam: true
    },
    capabilities: {
      hasLiveStream: true,
      hasChat: true
    },
    systemMetadata: {
      source: 'scraped',
      lastSynced: new Date(),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: []
    }
  };
}

export function mapAIProfileToUberPersona(aiProfile: AIProfile): UberPersona {
  return {
    id: aiProfile.id,
    name: aiProfile.name,
    displayName: aiProfile.name,
    type: 'ai',
    avatarUrl: aiProfile.avatar_url,
    imageUrl: aiProfile.avatar_url,
    bio: aiProfile.bio,
    location: aiProfile.location || 'Virtual',
    isVerified: aiProfile.isVerified,
    isPremium: aiProfile.isPremium || false,
    isActive: true,
    isAI: true,
    tags: aiProfile.interests || [],
    roleFlags: {
      isAI: true,
      isVerified: aiProfile.isVerified
    },
    capabilities: {
      hasChat: true,
      hasPhotos: true
    },
    systemMetadata: {
      source: 'ai_generated',
      lastSynced: new Date(),
      tagsGeneratedByAI: true,
      hilbertSpaceVector: []
    }
  };
}

export function mapEscortToUberPersona(escort: Escort): UberPersona {
  return {
    id: escort.id,
    name: escort.name,
    displayName: escort.displayName || escort.name,
    type: 'escort',
    avatarUrl: escort.avatarUrl || escort.profileImage,
    imageUrl: escort.profileImage || escort.avatarUrl,
    bio: escort.bio,
    description: escort.description,
    location: escort.location,
    isVerified: escort.isVerified,
    isPremium: escort.isPremium || false,
    isActive: true,
    tags: escort.tags || [],
    roleFlags: {
      isEscort: true,
      isVerified: escort.isVerified
    },
    capabilities: {
      hasPhotos: true,
      hasBooking: true,
      hasRealMeets: true
    },
    monetization: {
      meetingPrice: escort.rates?.hourly
    },
    systemMetadata: {
      source: 'manual',
      lastSynced: new Date(),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: []
    }
  };
}

// Note: Removed mapCreatorToUberPersona because import error existed and not used currently

export function mapGenericToUberPersona(data: any): UberPersona {
  let type = 'unknown';

  if (data.isAI || data.personality) {
    type = 'ai';
  } else if (data.isEscort || data.rates) {
    type = 'escort';
  } else if (data.isCreator || data.subscriptionPrice) {
    type = 'creator';
  } else if (data.isLive || data.viewerCount) {
    type = 'livecam';
  }

  return {
    id: data.id || `generic-${Date.now()}`,
    name: data.name || data.displayName || 'Unknown',
    displayName: data.displayName || data.name || 'Unknown',
    type,
    avatarUrl: data.avatarUrl || data.profileImage || data.imageUrl,
    imageUrl: data.imageUrl || data.profileImage || data.avatarUrl,
    bio: data.bio || data.description,
    description: data.description || data.bio,
    location: data.location || 'Unknown',
    isVerified: !!data.isVerified,
    isPremium: !!data.isPremium,
    isActive: data.isActive !== false,
    tags: data.tags || data.interests || [],
    roleFlags: {
      isAI: type === 'ai',
      isEscort: type === 'escort',
      isCreator: type === 'creator',
      isLivecam: type === 'livecam',
      isVerified: !!data.isVerified
    },
    capabilities: {
      hasPhotos: true,
      hasChat: type === 'ai' || type === 'livecam'
    },
    systemMetadata: {
      source: 'manual',
      lastSynced: new Date(),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: []
    }
  };
}
