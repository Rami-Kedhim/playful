
import React from 'react';
import { Card } from '@/components/ui/card';
import { Escort } from '@/types/escort';
import { Star, MessageSquare, User } from 'lucide-react';

interface EscortReviewsProps {
  escort: Escort;
}

const EscortReviews: React.FC<EscortReviewsProps> = ({ escort }) => {
  const { rating, reviews } = escort;
  
  // Generate mock reviews based on the review count
  const generateMockReviews = (count: number) => {
    const mockReviews = [];
    const reviewTexts = [
      "Amazing experience! Would definitely recommend.",
      "Great service, very professional and friendly.",
      "Exceeded my expectations in every way.",
      "Wonderful time, will book again soon.",
      "Exactly as described in the profile. Perfect evening."
    ];
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      mockReviews.push({
        id: `review-${i}`,
        author: `Client ${String.fromCharCode(65 + i)}`,
        date: new Date(Date.now() - i * 86400000 * 7),
        rating: Math.floor(Math.random() * 2) + 4,
        text: reviewTexts[i % reviewTexts.length]
      });
    }
    
    return mockReviews;
  };
  
  const mockReviews = generateMockReviews(reviews);
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };
  
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Client Reviews</h3>
        <div className="flex items-center">
          <div className="flex">{renderStars(Math.round(rating))}</div>
          <span className="ml-2 text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
      </div>
      
      {mockReviews.length > 0 ? (
        <div className="space-y-6">
          {mockReviews.map(review => (
            <div key={review.id} className="pb-6 border-b last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground/60 mb-3" />
          <h4 className="text-lg font-medium">No Reviews Yet</h4>
          <p className="text-sm text-muted-foreground mt-1">This escort hasn't received any reviews yet.</p>
        </div>
      )}
    </Card>
  );
};

export default EscortReviews;
