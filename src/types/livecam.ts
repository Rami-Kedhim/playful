
export interface Livecam {
  id: string;
  name?: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount: number;
  tags?: string[];
  price?: number;
  rating?: number;
  username?: string;
  profileImageUrl?: string;
  age?: number;
  location?: string;
  description?: string;
  languages?: string[];
  categories?: string[];
  lastActive?: string;
  nextScheduled?: string;
}

// Adding interfaces to make LivecamCard work correctly
export interface LivecamModel {
  id: string;
  displayName: string;
  username?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  isLive: boolean;
  viewerCount?: number;
  country?: string;
  language?: string;
  categories?: string[];
}
