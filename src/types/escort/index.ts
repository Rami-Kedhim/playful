
// This is a unified export file to resolve casing issues
// We will re-export from the uppercase Escort.ts file to maintain 
// backward compatibility

export * from '../Escort';

// Define additional types if needed for compatibility and unification
export type ServiceType = "in-call" | "out-call" | "virtual" | "massage" | "dinner";

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

export interface Availability {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
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
