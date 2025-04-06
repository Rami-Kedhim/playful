
// Re-export functions from creator services
import { fetchCreatorAnalytics } from './creatorAnalyticsService';
import { 
  fetchCreatorContent, 
  uploadCreatorContent, 
  saveContent, 
  updateContent,
  deleteContent,
  getContentDetail
} from './creatorContentService';
import { getCreatorPayouts, fetchCreatorPayouts, requestPayout } from './creatorPayoutsService';
import { creatorReviewsService } from './reviews';

// Export individual functions from creatorReviewsService for backward compatibility
const { fetchCreatorReviews, addReview: addCreatorReview } = creatorReviewsService;

export {
  // Analytics
  fetchCreatorAnalytics,
  
  // Content
  fetchCreatorContent,
  uploadCreatorContent,
  saveContent,
  updateContent,
  deleteContent,
  getContentDetail,
  
  // Payouts
  getCreatorPayouts,
  fetchCreatorPayouts,
  requestPayout,
  
  // Reviews
  fetchCreatorReviews,
  addCreatorReview
};
