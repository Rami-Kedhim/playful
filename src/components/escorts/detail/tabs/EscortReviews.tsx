
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Rating } from "@/components/ui/rating";
import { Escort } from "@/types/escort";
import { useWallet } from '@/hooks/useWallet';

interface EscortReviewsProps {
  escort: Escort;
  reviews?: Array<{
    id: string;
    reviewerId: string;
    reviewerName: string;
    rating: number;
    comment: string;
    date: Date;
  }>;
}

const EscortReviews: React.FC<EscortReviewsProps> = ({ escort, reviews: propReviews }) => {
  const { toast } = useToast();
  const { wallet } = useWallet();
  const [newRating, setNewRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample reviews if none provided
  const reviews = propReviews || [
    {
      id: '1',
      reviewerId: 'user-1',
      reviewerName: 'John',
      rating: 5,
      comment: 'Absolutely amazing experience! Very professional and friendly. Highly recommend!',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      reviewerId: 'user-2',
      reviewerName: 'Michael',
      rating: 4,
      comment: 'Great company and conversation. Will definitely book again soon.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    }
  ];
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const handleSubmitReview = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!"
      });
      
      setComment('');
      setNewRating(5);
    }, 1000);
  };
  
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Client Reviews</h3>
            <p className="text-sm text-muted-foreground">{reviews.length} verified reviews</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{escort.rating || 5.0}</span>
            <Rating value={escort.rating || 5} readOnly />
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Write a Review</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-muted-foreground">Your rating:</span>
              <Rating value={newRating} onChange={setNewRating} />
            </div>
            
            <Textarea
              placeholder="Share your experience..."
              className="mb-4 resize-none"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Only verified clients can leave reviews
              </p>
              <Button 
                onClick={handleSubmitReview}
                disabled={isSubmitting || !comment || !wallet}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{review.reviewerName}</h4>
                      <div className="flex items-center gap-2">
                        <Rating value={review.rating} readOnly size="sm" />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No reviews yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
};

export default EscortReviews;
