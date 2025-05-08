
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
  verified?: boolean;
}

interface EscortReviewsSectionProps {
  escortId: string;
  reviews: Review[];
}

const EscortReviewsSection: React.FC<EscortReviewsSectionProps> = ({
  escortId,
  reviews = []
}) => {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Reviews ({reviews.length})
          </span>
          {reviews.length > 0 && (
            <span className="flex items-center text-sm bg-muted px-2 py-1 rounded-md">
              {avgRating}
              <Star className="ml-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{review.userName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No reviews yet</p>
            <Button size="sm" variant="outline">
              Write a Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortReviewsSection;
