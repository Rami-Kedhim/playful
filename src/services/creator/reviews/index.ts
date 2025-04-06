
import { CreatorReview, PaginatedReviewsResponse, ReviewStats } from './types';
import { reviewFetchService } from './fetchService';
import { reviewMutationService } from './mutationService';
import { reviewStatsService } from './statsService';

/**
 * Consolidated service for managing creator reviews
 */
export const creatorReviewsService = {
  // Fetch methods
  getCreatorReviews: reviewFetchService.getCreatorReviews,
  fetchCreatorReviews: reviewFetchService.fetchCreatorReviews,
  
  // Mutation methods
  addReview: reviewMutationService.addReview,
  updateReview: reviewMutationService.updateReview,
  deleteReview: reviewMutationService.deleteReview,
  
  // Stats methods
  getAverageRating: reviewStatsService.getAverageRating
};

// Export types
export type { CreatorReview, PaginatedReviewsResponse, ReviewStats };

export default creatorReviewsService;
