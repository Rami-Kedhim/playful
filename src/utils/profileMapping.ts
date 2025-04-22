import { UberPersona } from '@/types/UberPersona';

export function mapLivecamToUberPersona(livecam: any): UberPersona {
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
      isEscort: false,
      isCreator: false,
      isLivecam: true,
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
      hasLiveStream: true,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: false,
      hasVirtualMeets: false,
    },
    systemMetadata: {
      source: 'scraped',
      lastSynced: new Date(),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: []
    }
  };
}

export function mapAIProfileToUberPersona(aiProfile: any): UberPersona {
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
      isEscort: false,
      isCreator: false,
      isLivecam: false,
      isAI: true,
      isVerified: aiProfile.isVerified ?? false,
      isFeatured: false,
    },
    capabilities: {
      hasPhotos: true,
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
      source: 'ai_generated',
      lastSynced: new Date(),
      tagsGeneratedByAI: true,
      hilbertSpaceVector: []
    }
  };
}

export function mapEscortToUberPersona(escort: any): UberPersona {
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
    services: escort.services || [],
    roleFlags: {
      isEscort: true,
      isCreator: false,
      isLivecam: false,
      isAI: false,
      isVerified: escort.isVerified || false,
      isFeatured: false,
    },
    capabilities: {
      hasPhotos: true,
      hasVideos: false,
      hasStories: false,
      hasChat: false,
      hasBooking: true,
      hasLiveStream: false,
      hasExclusiveContent: false,
      hasContent: true,
      hasRealMeets: true,
      hasVirtualMeets: false,
    },
    monetization: {
      acceptsLucoin: false,
      acceptsTips: false,
      subscriptionPrice: 0,
      unlockingPrice: 0,
      boostingActive: false,
      meetingPrice: escort.rates?.hourly || 0,
    },
    systemMetadata: {
      source: 'manual',
      lastSynced: new Date(),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: []
    }
  };
}

export function mapGenericToUberPersona(data: any): UberPersona {
  let type: 'escort' | 'creator' | 'livecam' | 'ai' = 'escort';

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
    type: type,
    avatarUrl: data.avatarUrl || data.profileImage || data.imageUrl,
    imageUrl: data.imageUrl || data.profileImage || data.avatarUrl,
    bio: data.bio || data.description,
    description: data.description || data.bio,
    location: data.location || 'Unknown',
    isVerified: !!data.isVerified,
    isPremium: !!data.isPremium,
    isActive: data.isActive !== false,
    tags: data.tags || data.interests || [],
    services: data.services || [],
    roleFlags: {
      isEscort: type === 'escort',
      isCreator: type === 'creator',
      isLivecam: type === 'livecam',
      isAI: type === 'ai',
      isVerified: !!data.isVerified,
      isFeatured: false,
    },
    capabilities: {
      hasPhotos: true,
      hasVideos: false,
      hasStories: false,
      hasChat: type === 'ai' || type === 'livecam',
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
      hilbertSpaceVector: []
    }
  };
}
