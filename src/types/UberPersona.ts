
export interface UberPersona {
  id: string;
  name: string;
  avatarUrl: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  tagline?: string;
  profileType?: string;
  services?: string[];
  availability?: {
    status: 'available' | 'busy' | 'offline';
    nextAvailable?: string;
  };
  features?: {
    verified: boolean;
    featured: boolean;
    premium: boolean;
  };
  stats?: {
    rating: number;
    reviewCount: number;
    responseTime?: number;
  };
  featured?: boolean;
  isAI?: boolean; // Added missing property
}
