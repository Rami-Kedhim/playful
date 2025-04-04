
export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  gallery: string[];
  videos?: {
    id: string;
    url: string;
    thumbnail?: string;
    title?: string;
  }[];
  rating: number;
  reviews: number;
  tags: string[];
  description: string;
  verified: boolean;
  gender: string;
  sexualOrientation?: string;
  availability: {
    days: string[];
    hours: string;
  };
  services: string[];
  languages: string[];
  height?: number;
  weight?: number;
  measurements?: {
    bust?: number;
    waist?: number;
    hips?: number;
  };
  rates: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  social?: {
    twitter?: string;
    instagram?: string;
    onlyfans?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  profileCompletion?: number;
  contentStats?: {
    photos: number;
    videos: number;
    live: boolean;
    streams?: number;
  };
  providesVirtualContent: boolean;
  providesInPersonServices?: boolean;
  availableNow?: boolean;
  subscriptionPrice?: number;
  virtualAvailability?: {
    days: string[];
    hours: string;
  };
  isLive?: boolean;
  lastSeen?: string;
  lastAvailable?: string;
  isFavorite?: boolean;
  featured?: boolean;
  boosted?: boolean;
  verificationBadges?: string[];
  serviceType?: 'in-person' | 'virtual' | 'both';
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  verificationLevel?: string;
}

export type ServiceType = 
  | 'in-person'
  | 'virtual'
  | 'both';

export interface EscortAvailability {
  days: string[];
  hours: string;
  id?: string;
}

export type VerificationStatus = 'pending' | 'approved' | 'rejected';

export interface VerificationRequest {
  id: string;
  escortId: string;
  status: VerificationStatus;
  documents: string[];
  submittedAt: Date;
  reviewedAt?: Date;
  notes?: string;
  documentType?: string;
  userId?: string;
}
