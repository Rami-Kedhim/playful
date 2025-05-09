
import { VerificationLevel } from './verification';

export interface Creator {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  rating?: number;
  services?: string[];
  verificationLevel?: VerificationLevel;
  isVerified?: boolean;
  tags?: string[];
  rates?: Record<string, number>;
  price?: number;
  responseRate?: number;
  
  // Additional fields for compatibility with Escort type
  age?: number;
  photos?: string[];
  languages?: string[];
  availability?: string[];
  reviewScore?: number;
  reviewCount?: number;
  boosted?: boolean;
  boostLevel?: number;
  boostExpiration?: string;
}
