
export interface AIProfile {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  age?: number;
  gender?: string;
  location?: string;
  tags?: string[];
  services?: string[];
  languages?: string[];
  height?: string;
  weight?: string;
  bodyType?: string;
  ethnicity?: string;
  hairColor?: string;
  eyeColor?: string;
  personalityTraits?: string[];
  interests?: string[];
  availability?: {
    days?: string[];
    hours?: string[];
  };
  rates?: {
    hourly?: number;
    overnight?: number;
    weekend?: number;
  };
  verificationStatus?: 'verified' | 'pending' | 'unverified';
  reviews?: AIReview[];
  gallery?: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface AIReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}
