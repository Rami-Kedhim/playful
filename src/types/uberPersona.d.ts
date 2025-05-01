
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
}
