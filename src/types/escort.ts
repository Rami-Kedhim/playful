
export interface Escort {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  location?: string;
  bio?: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  isVerified?: boolean;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
  tags?: string[];
  images?: string[];
  imageUrl?: string;
  profileImage?: string;
  services?: string[];
  languages?: string[];
  height?: string;
  weight?: string;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  availability?: Availability;
  availableNow?: boolean;
  lastActive?: string | Date;
  responseRate?: number;
  featured?: boolean;
  bookedTimes?: number;
  contactInfo?: ContactInfo;
}

export type VerificationLevel = "none" | "basic" | "verified" | "premium";

export interface Availability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface EscortFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minAge?: number;
  maxAge?: number;
  gender?: string[];
  serviceType?: string;
  verifiedOnly?: boolean;
  rating?: number;
  availability?: string;
  services?: string[];
  bodyType?: string[];
  ethnicity?: string[];
  hairColor?: string[];
}
