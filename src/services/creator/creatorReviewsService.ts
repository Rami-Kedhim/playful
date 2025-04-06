
// This file is maintained for backward compatibility
// It re-exports everything from the new modular structure

import { creatorReviewsService, CreatorReview } from './reviews';

// Re-export the main service
export { CreatorReview };
export { creatorReviewsService };
export default creatorReviewsService;
