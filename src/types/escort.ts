
export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  gallery?: string[];
  videos?: string[];
  rating: number;
  reviews: number;
  tags: string[];
  description?: string;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  languages?: string[];
  height?: string;
  weight?: string;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  availability?: {
    days: string[];
    hours: string;
  };
  services?: string[];
  rates?: {
    hourly: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  verificationLevel?: "basic" | "enhanced" | "premium";
  verificationDate?: string;
  isContentCreator?: boolean;
  creatorUsername?: string;
}
