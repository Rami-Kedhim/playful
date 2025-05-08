
import { VerificationLevel } from './verification';

export interface Escort {
  id: string;
  name: string;
  age?: number;
  bio?: string;
  location?: string;
  services?: string[];
  photos?: string[];
  rates?: Record<string, number>;
  languages?: string[];
  availability?: string[];
  contactInfo?: ContactInfo;
  verificationLevel: VerificationLevel;
  tags?: string[];
  reviewScore?: number;
  reviewCount?: number;
  boosted?: boolean;
  boostLevel?: number;
  boostExpiration?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: Record<string, string>;
}

export interface EscortFilters {
  services?: string[];
  location?: string;
  priceRange?: [number, number];
  age?: [number, number];
  languages?: string[];
  availability?: string[];
  verificationLevel?: VerificationLevel | string;
  sortBy?: string;
  tags?: string[];
}
