
export interface UberPersona {
  id: string;
  name: string;
  type?: string;
  displayName?: string;
  description?: string;
  avatarUrl?: string;
  isOnline?: boolean;
  isVerified?: boolean;
  isPremium?: boolean;
  isFeatured?: boolean;
  location?: string;
  rating?: number;
  tags?: string[];
  bio?: string;
  languages?: string[];
  traits?: string[];
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
  metadata?: Record<string, any>;
  roleFlags?: number;
  isActive?: boolean;
}
