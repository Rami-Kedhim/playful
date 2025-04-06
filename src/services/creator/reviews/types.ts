
/**
 * Review type definition
 */
export interface CreatorReview {
  id: string;
  reviewer_id: string;
  creator_id: string;
  rating: number;
  comment?: string;
  created_at: Date | string;
  reviewer?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

/**
 * Response type for paginated reviews
 */
export interface PaginatedReviewsResponse {
  data: CreatorReview[];
  total: number;
}

/**
 * Statistics for creator reviews
 */
export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
}
