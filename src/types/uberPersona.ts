
export interface UberPersona {
  id: string;
  name: string;
  type: string;
  avatarUrl?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  rating?: number;
  reviewCount?: number;
  location?: string;
  features?: {
    hasChat?: boolean;
    hasPhotos?: boolean;
    hasVideos?: boolean;
    hasBooking?: boolean;
    hasLiveStream?: boolean;
    hasExclusiveContent?: boolean;
    hasContent?: boolean;
    hasRealMeets?: boolean;
    hasStories?: boolean;
    hasVirtualMeets?: boolean;
  };
  pricing?: {
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
    meetingPrice?: number;
  };
  bio?: string; // Add missing bio property
}
