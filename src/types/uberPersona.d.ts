
export interface UberPersona {
  id: string;
  name: string;
  type?: string;
  avatarUrl?: string;
  personality?: string;
  traits?: string[];
  interests?: string[];
  rating?: number;
  mood?: string;
  energyLevel?: number;
  lastModified?: Date | string;
  createdAt?: Date | string;
  location?: string;
  services?: string[];
  languages?: string[];
  isVerified?: boolean;
  reviews?: any[];
  isOnline?: boolean;
  isPremium?: boolean;
  isFeatured?: boolean;
  isAI?: boolean;
  description?: string;
  displayName?: string;
  tags?: string[];
  bio?: string;
  roleFlags?: number;
  isActive?: boolean;
  gender?: string;
  metadata?: Record<string, any>;
  stats?: {
    popularity?: number;
    intelligence?: number;
    charm?: number;
    energy?: number;
    views?: number;
    likes?: number;
    responseRate?: number;
    responseTime?: number | string;
    rating?: number;
  };
  monetization?: {
    hourlyRate?: number;
    minRate?: number;
    maxRate?: number;
    packages?: {
      id?: string;
      name: string;
      price: number;
      duration: string;
      description: string;
    }[];
    acceptsUbx?: boolean;
    acceptsFiat?: boolean;
    meetingPrice?: number;
  };
  availability?: Array<{
    start: Date | string;
    end: Date | string;
  }> | {
    nextAvailable?: Date | string;
    schedule?: Record<string, any>;
  };
  imageUrl?: string;
  profileImage?: string;
  profileImageUrl?: string;
}
