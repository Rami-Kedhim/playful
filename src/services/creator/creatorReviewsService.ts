
// This file is maintained for backward compatibility
// It re-exports everything from the new modular structure

import { creatorReviewsService } from './reviews';
import type { CreatorReview } from './reviews';

// Re-export the main service
export type { CreatorReview };
export { creatorReviewsService };
export default creatorReviewsService;
