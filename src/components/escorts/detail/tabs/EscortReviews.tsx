
import React from 'react';
import { Card } from '@/components/ui/card';
import { Star, MessageCircle } from 'lucide-react';
import { Escort } from '@/types/escort';

interface EscortReviewsProps {
  escort: Escort;
}

const EscortReviews: React.FC<EscortReviewsProps> = ({ escort }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2 text-primary" />
        Client Reviews
      </h3>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(escort.rating || 0)
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-bold">{escort.rating?.toFixed(1) || 'No rating'}</span>
          <span className="text-muted-foreground">
            ({escort.reviews || 0} {escort.reviews === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      </div>
      
      {escort.reviews && escort.reviews > 0 ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">Review data will be loaded here.</p>
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-2" />
          <h4 className="text-lg font-medium">No Reviews Yet</h4>
          <p className="text-muted-foreground mt-1">
            This escort hasn't received any reviews yet.
          </p>
        </div>
      )}
    </Card>
  );
};

export default EscortReviews;
