
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
  displayName?: string; // Add displayName
  description?: string;
  bio?: string;
  languages?: string[];
  traits?: string[];
  tags?: string[];
  isPremium?: boolean;
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
  stats?: {
    views?: number;
    likes?: number;
    bookings?: number;
    completion?: number;
    responseRate?: number;
    responseTime?: number | string;
    rating?: number;
  };
  monetization?: {
    hourlyRate?: number;
    minRate?: number;
    maxRate?: number;
    acceptsUbx?: boolean;
    meetingPrice?: number;
    packages?: Array<{
      id: string;
      name: string;
      price: number;
      duration: string;
      description?: string;
    }>;
  };
}
