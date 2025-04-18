
export interface Creator {
  id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
  isVerified: boolean;
  rating?: number;
  subscriberCount: number;
  contentCount: number;
  featured: boolean;
  tier: 'free' | 'standard' | 'premium';
  price: number;
  category: string;
  tags: string[];
  social?: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    website?: string;
    [key: string]: string | undefined;
  };
  reviewCount?: number;
  description?: string;
}
