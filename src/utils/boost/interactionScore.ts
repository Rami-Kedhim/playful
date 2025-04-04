
/**
 * Utilities for calculating interaction and engagement scores
 */

/**
 * Calculates interaction score based on views, messages, bookings
 */
export function calculateInteractionScore(
  views: number, 
  messages: number, 
  bookings: number
): number {
  // Define the max values for normalization
  const maxViews = 1000;
  const maxMessages = 200;
  const maxBookings = 50;
  
  // Calculate normalized scores (0-100 for each)
  const viewsScore = Math.min(100, (views / maxViews) * 100);
  const messagesScore = Math.min(100, (messages / maxMessages) * 100);
  const bookingsScore = Math.min(100, (bookings / maxBookings) * 100);
  
  // Apply weights (bookings are most valuable)
  return Math.round(
    (viewsScore * 0.2) + (messagesScore * 0.3) + (bookingsScore * 0.5)
  );
}

/**
 * Calculates content score based on profile media
 */
export function calculateContentScore(
  galleryCount: number,
  videosCount: number,
  hasDescription: boolean
): number {
  // Max values for normalization
  const maxGalleryImages = 20;
  const maxVideos = 5;
  
  // Calculate normalized scores
  const galleryScore = Math.min(100, (galleryCount / maxGalleryImages) * 100);
  const videosScore = Math.min(100, (videosCount / maxVideos) * 100);
  const descriptionScore = hasDescription ? 100 : 0;
  
  // Apply weights (videos are more valuable than images)
  return Math.round(
    (galleryScore * 0.4) + (videosScore * 0.4) + (descriptionScore * 0.2)
  );
}

/**
 * Get the hours since last active
 */
export function getHoursSinceLastActive(lastActiveTimestamp: string | null | undefined): number {
  if (!lastActiveTimestamp) {
    return 72; // Default to max value if no timestamp
  }
  
  const lastActive = new Date(lastActiveTimestamp);
  const now = new Date();
  const diffMs = now.getTime() - lastActive.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  return Math.min(72, Math.max(0, diffHours)); // Cap between 0-72 hours
}
