
export interface Escort {
  id: string;
  userId?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  age?: number;
  gender?: string;
  imageUrls?: string[];
  mainImageUrl?: string;
  services?: string[];
  rates?: Record<string, number>;
  availability?: {
    weekday?: string[];
    weekend?: string[];
  };
  isVerified?: boolean;
  isOnline?: boolean;
  rating?: number;
  reviewCount?: number;
  languages?: string[];
  height?: number;
  weight?: number;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  
  // Additional properties used in components
  profileType?: string;
  orientation?: string;
  reviews?: number | any[];
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  verified?: boolean;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: Date | string;
  responseRate?: number;
  gallery?: string[];
  gallery_images?: string[];
  images?: string[];
  videos?: any[];
  verificationLevel?: string;
  featured?: boolean;
  price?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  boostLevel?: number;
  contactInfo?: {
    email: string;
    phone: string;
    website?: string;
  };
  isFavorited?: boolean;
  isPremium?: boolean;
}

// Export Availability interface since it's used in useEscortAvailability.ts
export interface Availability {
  weekday?: string[];
  weekend?: string[];
  customDays?: Record<string, string[]>;
}

// Export Video interface for useVideoManagement.ts
export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  createdAt: Date;
  isPublished: boolean;
  escortId: string;
  viewCount?: number;
  isPremium?: boolean;
}

// Add Booking and BookingStatus for Booking-related components
export interface Booking {
  id: string;
  escortId: string;
  clientId: string;
  date: string;
  time: string;
  duration: number;
  service?: string;
  serviceType?: string;
  price?: number;
  status: BookingStatus;
  notes?: string;
  createdAt: Date;
  totalPrice: number;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  DECLINED = 'declined',
  CANCELED = 'canceled',
  COMPLETED = 'completed'
}
