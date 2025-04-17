
import { Escort } from './escort';
import { ContentCreator } from './creator';

export interface UberPersona {
  id: string;
  name: string;
  image?: string;
  avatarUrl?: string;
  imageUrl?: string;
  profileType: 'escort' | 'creator' | 'user' | 'livecam' | 'ai';
  description?: string;
  rating?: number;
  price?: number;
  location?: string;
  tags?: string[];
  isVerified?: boolean;
  isActive?: boolean;
  isOnline?: boolean;
  lastActive?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
    socials?: {
      twitter?: string;
      instagram?: string;
      tiktok?: string;
      onlyfans?: string;
    }
  };
  personaFlags?: {
    isUser?: boolean;
    isEscort?: boolean;
    isCreator?: boolean;
    isLivecam?: boolean;
    isVerified?: boolean;
    isFeatured?: boolean;
    isAI?: boolean;
  };
  escort?: Escort;
  creator?: ContentCreator;
  capabilities?: Capabilities;
  ethnicity?: string;
  language?: string | string[];
}

export interface Capabilities {
  hasPhotos?: boolean;
  hasVideos?: boolean;
  hasLivestream?: boolean;
  hasVirtual?: boolean;
  hasBooking?: boolean;
  hasChat?: boolean;
  hasStories?: boolean;
  hasSubscription?: boolean;
}

export interface UberPersonaResponse {
  personas: UberPersona[];
  total: number;
  page: number;
  totalPages: number;
}
