
export interface LivecamModel {
  id: string;
  name: string;
  isOnline: boolean;
  viewerCount?: number;
  thumbnailUrl?: string;
  categories?: string[];
}

export interface Livecam {
  id: string;
  modelId: string;
  title: string;
  isLive: boolean;
  startTime?: Date;
  viewerCount: number;
  thumbnailUrl?: string;
  streamUrl?: string;
  model?: LivecamModel;
  tags?: string[];
}
