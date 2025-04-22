
// Fix profileMapping to use correct LivecamModel property names and fix casing

import { Escort } from '@/types/Escort';
import { ContentCreator } from '@/types/creator';
import { LivecamModel } from '@/types/livecams';
import { UberPersona } from '@/types/UberPersona';

export const mapEscortToUberPersona = (escort: Escort): UberPersona => {
  return {
    id: escort.id,
    name: escort.name, // added name to fix typing error
    type: 'escort', // added type to fix typing error
    username: escort.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: escort.name,
    avatarUrl: escort.avatarUrl || escort.avatar || (escort.images && escort.images.length > 0 ? escort.images[0] : ''),
    location: escort.location || '',
    languages: (escort.languages && escort.languages.length > 0) ? escort.languages : ['English'],
    bio: escort.bio || escort.description || '',
    age: escort.age || 0,
    ethnicity: escort.ethnicity || '',
    tags: escort.tags || escort.services || [],
    createdAt: new Date(),
    updatedAt: new Date(),
    roleFlags: {
      isEscort: true,
      isCreator: false,
      isLivecam: false,
      isAI: escort.isAI || false,
      isVerified: escort.isVerified || escort.verified || false,
      isFeatured: escort.featured || false
    },
    capabilities: {
      hasPhotos: (escort.images && escort.images.length > 0) || false,
      hasVideos: false,
      hasStories: false,
      hasChat: true,
      hasBooking: escort.providesInPersonServices ?? true,
      hasLiveStream: escort.providesVirtualContent || false,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: escort.providesInPersonServices ?? true,
      hasVirtualMeets: escort.providesVirtualContent || false
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 0,
      unlockingPrice: 0,
      boostingActive: escort.boostLevel ? escort.boostLevel > 0 : false,
      meetingPrice: escort.price || 0
    },
    stats: {
      rating: escort.rating || 0,
      reviewCount: escort.reviewCount || 0,
      responseTime: escort.responseRate || 0.8,
      viewCount: 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: escort.isAI ? 'ai_generated' : (escort.isVerified ? 'manual' : 'scraped'),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: generateHilbertVector(escort.id)
    }
  };
};

export const mapCreatorToUberPersona = (creator: ContentCreator): UberPersona => {
  return {
    id: creator.id,
    name: creator.name,
    type: 'creator',
    username: creator.username || creator.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: creator.name,
    avatarUrl: creator.avatarUrl || creator.profileImage || creator.imageUrl || '',
    location: creator.location || '',
    languages: (creator.languages && creator.languages.length > 0) ? creator.languages : ['English'],
    bio: creator.bio || creator.description || '',
    age: creator.age || 0,
    ethnicity: creator.ethnicity || '',
    tags: creator.tags || [],
    createdAt: creator.createdAt ? new Date(creator.createdAt) : new Date(),
    updatedAt: creator.updatedAt ? new Date(creator.updatedAt) : new Date(),
    roleFlags: {
      isEscort: false,
      isCreator: true,
      isLivecam: creator.hasLiveStream || false,
      isAI: creator.isAI || false,
      isVerified: creator.isVerified || false,
      isFeatured: creator.isFeatured || false
    },
    capabilities: {
      hasPhotos: (creator.contentCount?.photos || 0) > 0,
      hasVideos: (creator.contentCount?.videos || 0) > 0,
      hasStories: (creator.contentCount?.stories || 0) > 0,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: creator.hasLiveStream || creator.isLive || false,
      hasExclusiveContent: creator.isPremium || false,
      hasContent: true,
      hasRealMeets: false,
      hasVirtualMeets: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: creator.subscriptionPrice || 0,
      unlockingPrice: 0,
      boostingActive: false,
      meetingPrice: 0
    },
    stats: {
      rating: creator.rating || 0,
      reviewCount: 0,
      responseTime: 0.5,
      viewCount: 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: creator.isAI ? 'ai_generated' : (creator.isScraped ? 'scraped' : 'manual'),
      lastSynced: creator.lastSynced ? new Date(creator.lastSynced) : undefined,
      tagsGeneratedByAI: false,
      hilbertSpaceVector: generateHilbertVector(creator.id)
    }
  };
};

export const mapLivecamToUberPersona = (livecam: LivecamModel): UberPersona => {
  return {
    id: livecam.id,
    name: livecam.name || livecam.username || '',
    type: 'livecam',
    username: livecam.username || (livecam.name ? livecam.name.toLowerCase().replace(/\s+/g, '_') : ''),
    displayName: livecam.displayName || livecam.name || '',
    avatarUrl: livecam.imageUrl || livecam.thumbnailUrl || '',
    location: '', // No location in LivecamModel
    languages: livecam.language ? [livecam.language] : ['English'],
    bio: livecam.description || '',
    age: livecam.age || 0,
    ethnicity: '', // No ethnicity in LivecamModel
    tags: livecam.tags || livecam.categories || [],
    createdAt: new Date(),
    updatedAt: new Date(),
    roleFlags: {
      isEscort: false,
      isCreator: false,
      isLivecam: true,
      isAI: false,
      isVerified: livecam.isVerified ?? false,
      isFeatured: livecam.isFeatured || livecam.isPopular || false
    },
    capabilities: {
      hasPhotos: false,
      hasVideos: !!livecam.previewVideoUrl,
      hasStories: false,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: livecam.isLive || livecam.isStreaming || false,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: false,
      hasVirtualMeets: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 0,
      unlockingPrice: 0,
      boostingActive: !!livecam.boosted,
      meetingPrice: livecam.price || 0
    },
    stats: {
      rating: livecam.rating || 0,
      reviewCount: 0,
      responseTime: 0.9,
      viewCount: livecam.viewerCount || 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: 'scraped',
      tagsGeneratedByAI: false,
      hilbertSpaceVector: generateHilbertVector(livecam.id),
    }
  };
};

const generateHilbertVector = (id: string, dimension: number = 4): number[] => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const vector: number[] = [];

  for (let i = 0; i < dimension; i++) {
    const value = Math.sin(seed * (i + 1) * 0.1) * 0.5 + 0.5;
    vector.push(value);
  }

  return vector;
};
