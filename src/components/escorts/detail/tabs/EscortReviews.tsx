
import React, { useState } from "react";
import { Escort } from "@/types/escort";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";
import { useAuth } from "@/hooks/auth/useAuth";
import { useWallet } from "@/hooks/useWallet";

interface EscortReviewsProps {
  escort: Escort;
}

interface Review {
  id: string;
  username: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
  userLiked: boolean;
}

const EscortReviews: React.FC<EscortReviewsProps> = ({ escort }) => {
  const { user } = useAuth();
  const { wallet } = useWallet();
  
  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: "1",
      username: "JohnD",
      rating: 5,
      date: "2023-10-15",
      text: "Amazing experience! She was punctual, charming, and absolutely beautiful. Can't wait to see her again!",
      likes: 12,
      userLiked: false,
    },
    {
      id: "2",
      username: "Michael87",
      rating: 4,
      date: "2023-09-22",
      text: "Great companion for my business dinner. Very intelligent and engaging conversation. Highly recommended.",
      likes: 8,
      userLiked: false,
    },
    {
      id: "3",
      username: "Robert_K",
      rating: 5,
      date: "2023-08-30",
      text: "Exceeded all expectations. She's truly one of a kind and made our date night unforgettable.",
      likes: 15,
      userLiked: false,
    },
  ];
  
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showWriteReview, setShowWriteReview] = useState(false);
  
  const canWriteReview = !!user?.id && (wallet?.balance || 0) >= 5;
  
  const toggleLike = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: review.userLiked ? review.likes - 1 : review.likes + 1,
            userLiked: !review.userLiked
          };
        }
        return review;
      })
    );
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-4xl font-bold mr-3">{escort.rating.toFixed(1)}</div>
            <div>
              <StarRating rating={escort.rating} size={18} />
              <div className="text-sm text-muted-foreground">{escort.reviews || reviews.length} reviews</div>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowWriteReview(!showWriteReview)}
            disabled={!canWriteReview}
          >
            Write a Review
          </Button>
        </div>
        
        {!canWriteReview && (
          <div className="mb-4 p-3 bg-muted rounded-md text-sm text-muted-foreground">
            You need at least 5 Lucoins in your wallet to write a review.
          </div>
        )}
        
        {showWriteReview && canWriteReview && (
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="font-medium mb-2">Write a Review</h3>
            <p className="text-xs text-muted-foreground mb-3">
              This will cost 5 Lucoins from your wallet
            </p>
            {/* Review form would be here */}
            <div className="flex justify-end gap-2 mt-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowWriteReview(false)}
              >
                Cancel
              </Button>
              <Button size="sm">
                Submit (5 ⓛ)
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-4 mt-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-border pb-4">
              <div className="flex justify-between">
                <div className="font-semibold">{review.username}</div>
                <div className="text-sm text-muted-foreground">{review.date}</div>
              </div>
              
              <div className="flex my-1">
                <StarRating rating={review.rating} size={14} />
              </div>
              
              <p className="text-sm my-2">{review.text}</p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${review.userLiked ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => toggleLike(review.id)}
              >
                <ThumbsUp size={14} className="mr-1" fill={review.userLiked ? "currentColor" : "none"} />
                Helpful ({review.likes})
              </Button>
            </div>
          ))}
        </div>
        
        {(escort.reviews || reviews.length) > 3 && (
          <Button variant="ghost" className="w-full mt-4">
            See All {escort.reviews || reviews.length} Reviews
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortReviews;
