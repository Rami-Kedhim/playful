
export interface UberPersona {
  id: string;
  username?: string;
  displayName?: string;
  name: string;
  avatarUrl: string;
  imageUrl?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  tagline?: string;
  profileType?: string;
  services?: string[];
  availability?: {
    status: 'available' | 'busy' | 'offline';
    nextAvailable?: string;
  };
  features?: {
    verified: boolean;
    featured: boolean;
    premium: boolean;
  };
  stats?: {
    rating: number;
    reviewCount: number;
    responseTime?: number;
  };
  featured?: boolean;
  isAI?: boolean;
  updatedAt?: Date;
  bio?: string;
  tags?: string[];
  location?: string;
  age?: number;
  price?: number;
  roleFlags?: {
    isEscort: boolean;
    isCreator: boolean;
    isLivecam: boolean;
    isAI: boolean;
    isVerified: boolean;
    isFeatured: boolean;
  };
  capabilities?: string[] | {
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
  };
  monetization?: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  isOnline?: boolean;
  rating?: number;
}
