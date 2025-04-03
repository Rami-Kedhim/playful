
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
import { fetchCreatorReviews, addCreatorReview } from './creatorReviewsService';

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
