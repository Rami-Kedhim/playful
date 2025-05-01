
export interface UberPersona {
  id: string;
  name: string;
  displayName?: string;
  type: 'escort' | 'creator' | 'livecam' | 'ai';
  avatarUrl?: string;
  imageUrl?: string;
  location?: string;
  isVerified: boolean;
  isOnline: boolean;
  tags?: string[];
  stats?: {
    likes?: number;
    views?: number;
    bookings?: number;
    responseTime?: number;
    rating?: number;
    reviewCount?: number;
    bookingCount?: number;
  };
  price?: {
    hourly?: number;
    subscription?: number;
  };
  bio?: string;
  description?: string;
  services?: string[];
  languages?: string[];
  traits?: string[];
  availability?: string[];
  monetization?: {
    hourlyRate?: number;
    minimumBooking?: number;
  };
  roleFlags?: string[];
  capabilities?: string[];
  systemMetadata?: any;
}
