// Re-export types from Escort.ts to solve import issues
export * from '../Escort';

// Make sure Video type is explicitly exported
export { Video } from '../Escort';

// Export the required types to ensure compatibility across imports
export interface Escort {
  id: string;
  name: string;
  gender: string;
  price: number;  // Required property for compatibility
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
  isAvailable?: boolean;
  gallery_images?: string[];
  videos?: import('../Escort').Video[];
  locations?: string[];
  // ... other properties can be optional
  images?: string[];
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  imageUrl?: string;
  profileImage?: string;
  verified?: boolean;
  isVerified?: boolean;
  availableNow?: boolean;
  responseRate?: number;
  location?: string;
  age?: number;
  sexualOrientation?: string;
  lastActive?: Date | string;
  featured?: boolean;
  contentStats?: any; // Added to fix escortProfiles.ts errors
}
