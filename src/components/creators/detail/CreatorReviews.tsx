
import { useState, useEffect } from "react";
import { fetchCreatorReviews } from "@/services/creatorService";
import { CreatorReview } from "@/types/creator";

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
        const result = await fetchCreatorReviews(creatorId);
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
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>Error loading reviews: {error}</div>;
  }

  if (reviews.length === 0) {
    return <div>No reviews yet.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="p-4 border rounded-lg">
          <div className="flex items-center gap-2">
            <span className="font-medium">{review.reviewer.username}</span>
            <span className="text-yellow-500">★ {review.rating}</span>
          </div>
          {review.comment && (
            <p className="mt-2 text-gray-700">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreatorReviews;
