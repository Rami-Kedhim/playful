
export interface UberPersona {
  id: string;
  name: string;
  type: string;
  description: string;
  avatar: string;
  personality: string[];
  interests: string[];
  bio: string;
  age: number;
  ethnicity: string;
  language: string[];
  capabilities: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasStories: boolean;
    hasChat: boolean;
    hasBooking: boolean;
    hasLiveStream: boolean;
    hasExclusiveContent: boolean;
    hasContent: boolean;
    hasRealMeets: boolean;
    hasVirtualMeets: boolean;
  };
  mediaCount?: {
    photos: number;
    videos: number;
    stories: number;
  } | {
    photos: string;
    videos: string;
    streams: string;
  };
  created: string;
  lastActive: string;
  tier: string;
  rating: number;
  location: string;
  isPremium: boolean;
  isActive: boolean;
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'deprecated';
  performance: {
    accuracy: number;
    latency: number;
    throughput: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SuperlativeBrainHubProps {
  models: NeuralModel[];
}
