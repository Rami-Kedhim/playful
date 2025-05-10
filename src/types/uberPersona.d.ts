
export interface UberPersona {
  id: string;
  name: string;
  type: string;
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
  stats?: {
    popularity?: number;
    intelligence?: number;
    charm?: number;
    energy?: number;
    views?: number;
    likes?: number;
    responseRate?: number;
    responseTime?: number | string;
  };
  monetization?: {
    hourlyRate?: number;
    packages?: {
      id?: string;
      name: string;
      price: number;
      duration: string;
      description: string;
    }[];
    acceptsUbx?: boolean;
    acceptsFiat?: boolean;
  };
}
