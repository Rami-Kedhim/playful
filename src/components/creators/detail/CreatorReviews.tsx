
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import StarRating from "@/components/ui/StarRating";
import { fetchCreatorReviews, addCreatorReview } from "@/services/creatorService";
import { Star, ThumbsUp, MessageSquare, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CreatorReviewsProps {
  creator: any;
}

const CreatorReviews = ({ creator }: CreatorReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    if (creator?.id) {
      loadReviews();
    }
  }, [creator]);
  
  const loadReviews = async () => {
    setIsLoading(true);
    const data = await fetchCreatorReviews(creator.id);
    setReviews(data);
    setIsLoading(false);
  };
  
  const handleReviewSubmit = async () => {
    if (!user || !creator) return;
    
    setSubmitting(true);
    
    const success = await addCreatorReview(
      creator.id,
      user.id,
      userRating,
      reviewComment
    );
    
    if (success) {
      setDialogOpen(false);
      setReviewComment("");
      setUserRating(5);
      loadReviews();
    }
    
    setSubmitting(false);
  };
  
  const getUserHasReviewed = () => {
    if (!user) return false;
    return reviews.some(review => review.reviewer_id === user.id);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Reviews & Ratings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="text-4xl font-bold mr-3">{creator.rating?.toFixed(1) || "0.0"}</div>
            <div>
              <StarRating rating={creator.rating || 0} size={18} />
              <div className="text-sm text-gray-400">{creator.review_count || 0} reviews</div>
            </div>
          </div>
          
          {user && !getUserHasReviewed() && (
            <Button 
              size="sm" 
              onClick={() => setDialogOpen(true)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Write a Review
            </Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full my-2" />
                <Skeleton className="h-4 w-2/3 my-2" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <h3 className="text-lg font-semibold mb-1">No reviews yet</h3>
            <p className="text-gray-400 mb-4">Be the first to review {creator.name}</p>
            
            {user && (
              <Button onClick={() => setDialogOpen(true)}>
                Write a Review
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="border-b border-gray-800 pb-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={review.reviewer?.avatar_url} />
                      <AvatarFallback>{review.reviewer?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{review.reviewer?.username || "Anonymous"}</div>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(review.created_at), "MMMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size={14} />
                </div>
                
                <p className="text-sm my-2">{review.comment || "No comment provided."}</p>
              </div>
            ))}
            
            {reviews.length > 3 && (
              <Button variant="outline" className="w-full">
                See All {reviews.length} Reviews
              </Button>
            )}
          </div>
        )}
      </CardContent>
      
      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review {creator.name}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-center mb-2">Your Rating</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setUserRating(rating)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        rating <= userRating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="reviewComment" className="block text-sm font-medium mb-2">
                Your Review (Optional)
              </label>
              <Textarea
                id="reviewComment"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell others what you think about this creator..."
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReviewSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CreatorReviews;
