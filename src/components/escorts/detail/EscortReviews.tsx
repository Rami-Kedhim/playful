
import { useState } from "react";
import { Escort } from "@/types/escort";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";

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

const EscortReviews = ({ escort }: EscortReviewsProps) => {
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
              <div className="text-sm text-gray-400">{escort.reviews} reviews</div>
            </div>
          </div>
          
          <Button size="sm" variant="outline">
            Write a Review
          </Button>
        </div>
        
        <div className="space-y-4 mt-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-800 pb-4">
              <div className="flex justify-between">
                <div className="font-semibold">{review.username}</div>
                <div className="text-sm text-gray-400">{review.date}</div>
              </div>
              
              <div className="flex my-1">
                <StarRating rating={review.rating} size={14} />
              </div>
              
              <p className="text-sm my-2">{review.text}</p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-xs ${review.userLiked ? 'text-primary' : 'text-gray-400'}`}
                onClick={() => toggleLike(review.id)}
              >
                <ThumbsUp size={14} className="mr-1" fill={review.userLiked ? "currentColor" : "none"} />
                Helpful ({review.likes})
              </Button>
            </div>
          ))}
        </div>
        
        {escort.reviews > 3 && (
          <Button variant="ghost" className="w-full mt-4">
            See All {escort.reviews} Reviews
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortReviews;
