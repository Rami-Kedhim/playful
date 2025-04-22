export interface LivecamModel {
  id: string;
  displayName?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  category?: string;
  viewerCount?: number;
  isLive?: boolean;
  streamUrl?: string;
  price?: number;
  
  // Adding the missing properties
  name: string;
  previewVideoUrl?: string;
  isPopular?: boolean;
  rating?: number;
  tags?: string[];
  profileImage?: string;
  previewImage?: string;
}
