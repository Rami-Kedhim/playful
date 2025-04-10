
export interface Escort {
  id: string;
  name: string;
  location: string;
  age: number;
  profileImage: string;
  gender?: string;
  orientation?: string;
  description?: string;
  services?: ServiceType[];
  gallery?: string[];
  videos?: string[];
  price?: number;
  ratings?: number;
  reviewCount?: number;
  verificationLevel?: string;
  availability?: string[] | string;
  responseTime?: string;
  height?: string;
  weight?: string;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export type ServiceType = 
  | "massage" 
  | "companionship" 
  | "date" 
  | "overnight" 
  | "travel" 
  | "dinner" 
  | "events"
  | "fetish"
  | "roleplay"
  | "bdsm"
  | "gfe";

export interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceType[];
}
