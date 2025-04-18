
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
  profileType?: string;
  orientation?: string;
  price?: number;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  serviceTypes?: string[];
  // Add any other properties used in components
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
}
