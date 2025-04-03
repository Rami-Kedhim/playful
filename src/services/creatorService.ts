
// Re-export functions from creator services
import { 
  fetchCreatorAnalytics 
} from './creator/creatorAnalyticsService';

import { 
  fetchCreatorContent, 
  uploadCreatorContent, 
  saveContent, 
  updateContent 
} from './creator/creatorContentService';

import { 
  getCreatorPayouts, 
  fetchCreatorPayouts, 
  requestPayout 
} from './creator/creatorPayoutsService';

import { 
  fetchCreatorReviews, 
  addCreatorReview 
} from './creator/creatorReviewsService';

export {
  // Analytics
  fetchCreatorAnalytics,
  
  // Content
  fetchCreatorContent,
  uploadCreatorContent,
  saveContent,
  updateContent,
  
  // Payouts
  getCreatorPayouts,
  fetchCreatorPayouts,
  requestPayout,
  
  // Reviews
  fetchCreatorReviews,
  addCreatorReview
};
