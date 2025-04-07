
export interface Escort {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  bio: string;
  services: string[];
  imageUrl: string;
  gallery: string[];
  rates: {
    hourly: number;
    overnight: number;
  };
  availableNow: boolean;
  verified: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  languages: string[];
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
  availability: {
    days: string[];
    hours: string;
  };
  featured: boolean;
  price: number;
}
