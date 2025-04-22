import { Livecam } from '@/types/livecams';

/**
 * Calculates a boost score for a livecam based on various factors.
 *
 * @param livecam The livecam object to calculate the boost score for.
 * @returns A numerical boost score. Higher is better.
 */
export const calculateLivecamBoostScore = (livecam: Livecam): number => {
  let score = 0;

  // Basic factors
  score += livecam.isStreaming ? 50 : 0; // Give a base score if streaming
  score += livecam.viewerCount; // More viewers, higher score

  // Consider adding more sophisticated logic based on:
  // - Average stream duration
  // - Historical viewer counts
  // - Engagement metrics (chat activity, tips, etc.)

  // Example: Region boost (if region is a property of Livecam)
  // if (livecam.region === "US") { //This line produces an error
  //   score += 10;
  // }

  return score;
};
