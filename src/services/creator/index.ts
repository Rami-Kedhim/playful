
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
import { creatorReviewsService } from './reviews';
import { fetchCreatorPayouts } from './creatorPayoutsService';
import requestPayout from './creatorPayoutsService';

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
  fetchCreatorPayouts,
  requestPayout,
  
  // Reviews
  fetchCreatorReviews,
  addCreatorReview
};
