
export interface Livecam {
  id: string;
  name: string;
  username: string;
  displayName?: string;
  imageUrl: string;
  thumbnailUrl: string;
  previewImage?: string;
  profileImage?: string;
  isLive: boolean;
  isStreaming: boolean;
  viewerCount: number;
  tags?: string[];
  rating?: number;
  price?: number;
  category?: string;
  region: string;
  language: string;
  featured?: boolean;
  description?: string;
  previewVideoUrl?: string;
}

export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive: boolean;
  isStreaming: boolean;
  viewerCount: number;
  country: string;
  categories: string[];
  rating: number;
  price: number;
  language: string;
  region: string;
  tags: string[];
  previewVideoUrl?: string;
  isPopular?: boolean;
  category?: string; // Adding missing property
}

export interface LivecamSettings {
  streamQuality: 'auto' | 'low' | 'medium' | 'high' | 'hd';
  autoPlayEnabled: boolean;
  notificationsEnabled: boolean;
  chatEnabled: boolean;
  showViewerCount: boolean;
}
