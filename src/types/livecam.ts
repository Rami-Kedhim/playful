
export interface Livecam {
  id: string;
  name: string;
  username: string;
  isLive: boolean;
  viewerCount: number;
  tags: string[];
  profileImage: string;
  previewImage: string;
  isVerified: boolean;
  rating: number;
  price: number;
  roomType: 'public' | 'private' | 'premium';
  languages: string[];
  category: string;
  featured: boolean;
  nextStreamTime?: string;
  description?: string;
}
