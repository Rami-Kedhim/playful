
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai' | 'user';
  avatarUrl?: string;
  imageUrl?: string;
  location?: string;
  isVerified: boolean;
  isOnline: boolean;
  tags?: string[];
  stats?: {
    likes?: number;
    views?: number;
    viewCount?: number;
    bookings?: number;
    responseTime?: number;
    rating?: number;
    reviewCount?: number;
    bookingCount?: number;
  };
  price?: {
    hourly?: number;
    subscription?: number;
  };
  bio?: string;
  description?: string;
  services?: string[];
  languages?: string[];
  traits?: string[];
  availability?: string[] | {
    nextAvailable?: string;
    schedule?: {
      monday?: { available: boolean };
      tuesday?: { available: boolean };
      wednesday?: { available: boolean };
      thursday?: { available: boolean };
      friday?: { available: boolean };
      saturday?: { available: boolean };
      sunday?: { available: boolean };
    };
  };
  monetization?: {
    hourlyRate?: number;
    minimumBooking?: number;
    meetingPrice?: number;
    acceptsLucoin?: boolean;
    acceptsTips?: boolean;
    subscriptionPrice?: number;
    unlockingPrice?: number;
    boostingActive?: boolean;
  };
  roleFlags?: string[] | {
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isAI?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
  };
  capabilities?: string[] | {
    hasPhotos?: boolean;
    hasVideos?: boolean;
    hasStories?: boolean;
    hasChat?: boolean;
    hasBooking?: boolean;
    hasLiveStream?: boolean;
    hasExclusiveContent?: boolean;
    hasContent?: boolean;
    hasRealMeets?: boolean;
    hasVirtualMeets?: boolean;
  };
  systemMetadata?: any;
  username?: string;
  isActive?: boolean;
  rating?: number;
  profileImageUrl?: string;
  galleryImages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  age?: number;
}
