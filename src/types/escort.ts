
// Define the Escort type
export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  services: string[];
  images: string[];
  imageUrl?: string;
  profileImage?: string;
  gallery?: string[];
  isVerified: boolean;
  verified?: boolean;
  featured?: boolean;
  contactInfo: ContactInfo;
  availability?: Availability;
  rates?: Rates;
  tags?: string[];
  languages?: string[];
  isOnline?: boolean;
  availableNow?: boolean;
  hasRealMeets?: boolean;
  lastActive?: string;
  isScraped?: boolean;
  verificationLevel?: VerificationLevel;
  hasContent?: boolean;
  hasLiveStream?: boolean;
  profileType?: 'verified' | 'ai' | 'provisional';
  orientation?: string;
  bodyType?: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  isAI?: boolean;
  boostLevel?: number;
  subscriptionPrice?: number;
  contentStats?: ContentStats;
  avatar?: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface Availability {
  days: string[];
  hours: string[];
  nextAvailable?: string;
}

export interface Rates {
  hourly?: number;
  twoHours?: number;
  dinner?: number;
  overnight?: number;
  weekend?: number;
}

export interface ContentStats {
  photos: number;
  videos: number;
  totalViews: number;
  averageRating: number;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: number;
  viewCount: number;
  rating?: number;
  createdAt: string;
  isPremium?: boolean;
  price?: number;
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  serviceType: string;
  location?: string;
  price: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}

export enum VerificationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  PLATINUM = 'platinum'
}
