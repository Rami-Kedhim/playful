
export interface Livecam {
  id: string;
  name: string;
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
