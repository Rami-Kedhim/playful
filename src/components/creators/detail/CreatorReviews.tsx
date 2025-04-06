
import { useState, useEffect } from "react";
import { creatorReviewsService } from "@/services/creator/reviews";
import { CreatorReview } from "@/services/creator/reviews";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface CreatorReviewsProps {
  creatorId: string;
}

const CreatorReviews = ({ creatorId }: CreatorReviewsProps) => {
  const [reviews, setReviews] = useState<CreatorReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const result = await creatorReviewsService.fetchCreatorReviews(creatorId);
        setReviews(result.data);
      } catch (err: any) {
        setError(err.message || "Failed to load reviews");
        console.error("Error loading creator reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (creatorId) {
      loadReviews();
    }
  }, [creatorId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-16 w-full" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-lg text-red-700">
        Error loading reviews: {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="p-4 border rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.map((review) => (
        <Card key={review.id} className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">{review.reviewer.username}</span>
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? "★" : "☆"}
                  </span>
                ))}
                <span className="ml-1 text-sm text-gray-600">({review.rating})</span>
              </div>
            </div>
            {review.comment && (
              <p className="mt-2 text-gray-700">{review.comment}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CreatorReviews;
