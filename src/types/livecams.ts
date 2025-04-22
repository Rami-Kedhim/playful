export interface LivecamModel {
  id: string;
  displayName: string;
  username?: string;
  name?: string;
  imageUrl?: string;
  thumbnailUrl: string;
  isLive?: boolean;
  isStreaming?: boolean;
  viewerCount: number;
  price?: number;
  rating?: number;
  language?: string;
  country?: string;
  category?: string; // Add this missing property
  categories?: string[];
  tags?: string[];
  age?: number;
  description?: string;
  streamUrl?: string;
}

export interface LivecamCardProps {
  model: LivecamModel;
  key?: string;
  isBoosted?: boolean;
  onBoost?: () => boolean;
  onCancelBoost?: () => boolean;
  showBoostControls?: boolean;
}

export interface Livecam extends LivecamModel {
  // Add any specific properties for Livecam type
}
