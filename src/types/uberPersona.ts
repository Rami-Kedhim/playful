
export interface UberPersona {
  id: string;
  name: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai' | string;
  avatar: string;
  description?: string;
  location?: string;
  online?: boolean;
  rating?: number;
  reviews?: number;
  price?: number;
  featured?: boolean;
  tags?: string[];
  specialization?: string[];
  services?: string[];
  lastActive?: Date;
  createdAt?: Date;
  availableNow?: boolean;
  isVerified?: boolean;
  verified?: boolean;
  languages?: string[];
  popularity?: number;
  escortId?: string;
  creatorId?: string;
  aiId?: string;
  isAI?: boolean;
  initialMessage?: string;
  mainImage?: string;
  images?: string[];
}
