
export interface Livecam {
  id: string;
  title?: string;
  description?: string;
  isLive?: boolean;
  viewerCount?: number;
  streamUrl?: string;
  thumbnailUrl?: string;
  category?: string;
  categories?: string[];
  model?: LivecamModel;
  startTime?: Date | string;
  quality?: string;
  tags?: string[];
  price?: number;
  language?: string;
  rating?: number;
}

export interface LivecamModel {
  id: string;
  name: string;
  username: string;
  displayName: string;
  imageUrl: string;
  thumbnailUrl: string;
  isLive?: boolean;
  viewerCount?: number;
  country?: string;
  categories?: string[];
  age?: number;
  description?: string;
  streamUrl?: string;
  isStreaming?: boolean;
  rating?: number;
  price?: number;
  language?: string;
  isBoosted?: boolean;
}

export interface LivecamContextType {
  livecams: Livecam[];
  loadingLivecams: boolean;
  error: string | null;
  fetchLivecams: () => Promise<void>;
  getLivecamById?: (id: string) => Livecam | undefined;
}

export type ServiceTypeFilter = "in-person" | "virtual" | "both" | "massage" | "dinner" | "";
