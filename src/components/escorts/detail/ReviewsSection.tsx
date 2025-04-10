
import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Review type definition
interface Review {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  rating: number;
  content: string;
  date: Date | string;
  helpful: number;
  userHasMarkedHelpful?: boolean;
}

interface ReviewsSectionProps {
  escortId: string;
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  className?: string;
}

const ReviewStar: React.FC<{ filled: boolean; onClick?: () => void }> = ({ filled, onClick }) => {
  return (
    <Star 
      className={cn(
        "h-5 w-5", 
        filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
        onClick && "cursor-pointer"
      )} 
      onClick={onClick}
    />
  );
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  escortId, 
  averageRating, 
  reviewCount, 
  reviews,
  className
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReviewDialogOpen, setNewReviewDialogOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewContent, setNewReviewContent] = useState('');
  
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  
  const handleSubmitReview = () => {
    // Here we would actually submit the review to the backend
    console.log({
      escortId,
      rating: newReviewRating,
      content: newReviewContent
    });
    
    // Close dialog and reset form
    setNewReviewDialogOpen(false);
    setNewReviewRating(0);
    setNewReviewContent('');
  };
  
  const handleHelpfulClick = (reviewId: string) => {
    // Here we would toggle the helpful status for this review
    console.log(`Marked review ${reviewId} as helpful`);
  };
  
  const handleReportClick = (reviewId: string) => {
    // Here we would open a report dialog
    console.log(`Report review ${reviewId}`);
  };
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="flex items-center mt-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <ReviewStar key={i} filled={i < Math.round(averageRating)} />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {averageRating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
        
        <Dialog open={newReviewDialogOpen} onOpenChange={setNewReviewDialogOpen}>
          <DialogTrigger asChild>
            <Button>Write a Review</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your experience to help others make informed decisions.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <ReviewStar 
                      key={i} 
                      filled={i < newReviewRating} 
                      onClick={() => setNewReviewRating(i + 1)} 
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="review-content" className="text-sm font-medium mb-2 block">
                  Your Review
                </label>
                <Textarea
                  id="review-content"
                  placeholder="Write your review here..."
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewReviewDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitReview} 
                disabled={newReviewRating === 0 || !newReviewContent.trim()}
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
          <Button className="mt-4" onClick={() => setNewReviewDialogOpen(true)}>
            Write a Review
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {visibleReviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                    {review.avatarUrl ? (
                      <img 
                        src={review.avatarUrl} 
                        alt={review.username}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        {review.username[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{review.username}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i}
                            className={cn(
                              "h-3 w-3",
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            )}
                          />
                        ))}
                      </div>
                      <span>
                        {typeof review.date === 'string' 
                          ? review.date 
                          : formatDistanceToNow(review.date, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm">{review.content}</p>
              
              <div className="flex items-center gap-4 pt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "flex items-center text-xs gap-1 h-7",
                    review.userHasMarkedHelpful && "text-primary"
                  )}
                  onClick={() => handleHelpfulClick(review.id)}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful {review.helpful > 0 && `(${review.helpful})`}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center text-xs gap-1 h-7"
                  onClick={() => handleReportClick(review.id)}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span>Report</span>
                </Button>
              </div>
              
              <Separator />
            </div>
          ))}
          
          {reviews.length > 3 && (
            <div className="flex justify-center">
              <Button 
                variant="ghost" 
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="flex items-center gap-1"
              >
                {showAllReviews ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Show All Reviews ({reviews.length})</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
