
export interface Escort {
  id: string;
  name: string;
  age?: number;
  location?: string;
  description?: string;
  services?: string[];
  isVerified?: boolean;
  rating?: number;
  price?: number;
  profileImage?: string;
  images?: string[];
  featured?: boolean;
  serviceType?: 'in-person' | 'virtual' | 'both';
  languages?: string[];
  reviewCount?: number;
  ethnicity?: string;
  height?: string;
  weight?: string;
  hairColor?: string;
  eyeColor?: string;
  bodyType?: string;
  availability?: Record<string, any>;
  nextAvailable?: string;
}
