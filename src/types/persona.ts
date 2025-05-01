
export interface UberPersonaFeatures {
  hasPhotos: boolean;
  hasVideos: boolean;
  hasStories: boolean;
  hasChat: boolean;
  hasBooking: boolean;
  hasLiveStream: boolean;
  hasExclusiveContent: boolean;
  hasContent: boolean;
  hasRealMeets: boolean;
  hasVirtualMeets: boolean;
}

export interface UberPersonaPricing {
  acceptsLucoin: boolean;
  acceptsTips: boolean;
  subscriptionPrice: number;
  unlockingPrice: number;
  boostingActive: boolean;
  meetingPrice: number;
}

export interface UberPersona {
  id: string;
  name: string;
  description?: string;
  avatarUrl: string;
  bannerUrl?: string;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  isOnline?: boolean;
  lastActive?: Date | string;
  features: UberPersonaFeatures | string[];
  pricing: UberPersonaPricing;
  tags?: string[];
  location?: string;
  category?: string;
  popularity?: number;
  relationships?: string[];
  stats?: {
    views: number;
    likes: number;
    followers: number;
  };
}

export interface PersonaSearchParams {
  query?: string;
  types?: string[];
  tags?: string[];
  isVerified?: boolean;
  isOnline?: boolean;
  isPremium?: boolean;
  page?: number;
  limit?: number;
  location?: string;
  offset?: number;
}

export const normalizeUberPersonaFeatures = (features: UberPersonaFeatures | string[]): UberPersonaFeatures => {
  if (Array.isArray(features)) {
    return {
      hasPhotos: features.includes('photos'),
      hasVideos: features.includes('videos'),
      hasStories: features.includes('stories'),
      hasChat: features.includes('chat'),
      hasBooking: features.includes('booking'),
      hasLiveStream: features.includes('livestream'),
      hasExclusiveContent: features.includes('exclusive'),
      hasContent: features.includes('content'),
      hasRealMeets: features.includes('realmeets'),
      hasVirtualMeets: features.includes('virtualmeets')
    };
  }
  return features as UberPersonaFeatures;
};
