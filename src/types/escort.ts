
import { VerificationLevel } from './verification';

export interface Rates {
  hourly?: number;
  twoHour?: number;
  overnight?: number;
  weekend?: number;
  [key: string]: number | undefined;
}

export interface Escort {
  id: string;
  name: string;
  age?: number;
  bio?: string;
  location?: string;
  services?: string[];
  photos?: string[];
  rates?: Rates;
  price?: number; // Added for compatibility with components
  responseRate?: number; // Added for compatibility with components
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
