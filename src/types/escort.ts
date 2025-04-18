
export interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
}

export interface Rates {
  hourly?: number;
  halfHour?: number;
  overnight?: number;
  weekend?: number;
}

export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  rating: number;
  price: number;
  images: string[];
  services: string[];
  isVerified: boolean;
  featured: boolean;
  contactInfo: ContactInfo;
  // Properties required by components
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  sexualOrientation?: string;
  lastActive?: Date | string;
  responseRate?: number;
  avatar?: string;
  avatarUrl?: string;
  avatar_url?: string;
  gallery_images?: string[];
  videos?: string[];
  verificationLevel?: 'none' | 'basic' | 'enhanced' | 'premium';
  // Optional properties
  availableNow?: boolean;
  imageUrl?: string;
  profileImage?: string;
  gallery?: string[];
  rates?: Rates;
  reviewCount?: number;
  reviews?: number;
  description?: string;
  languages?: string[];
  ethnicity?: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  bodyType?: string;
  verified?: boolean;
  tags?: string[];
  boostLevel?: number;
  isActive?: boolean;
  isAI?: boolean;
  availability?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
    hours?: string;
  };
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
  };
}

export interface EscortFilterOptions {
  location?: string;
  minAge?: number;
  maxAge?: number;
  gender?: string;
  serviceType?: string;
  priceMin?: number;
  priceMax?: number;
  verified?: boolean;
  sortBy?: 'rating' | 'price' | 'age' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

// Additional types needed for booking functionality
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface Booking {
  id: string;
  escortId: string;
  userId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  serviceType: 'in-person' | 'virtual';
  createdAt: string;
  updatedAt: string;
}
