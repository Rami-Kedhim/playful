import { Livecam } from '@/types/livecams';

export const adaptLivecamVisibility = (livecam: any): Livecam => {
  // Adapt the livecam object to the Livecam type
  return {
    id: livecam.id,
    username: livecam.username,
    displayName: livecam.username, // Use username as a fallback
    imageUrl: livecam.imageUrl,
    thumbnailUrl: livecam.imageUrl, // Use imageUrl as a fallback
    isStreaming: livecam.isStreaming,
    viewerCount: livecam.viewerCount,
    category: livecam.category,
    tags: livecam.tags,
    // Add other properties as needed, using defaults or transformations
  } as Livecam;
};
