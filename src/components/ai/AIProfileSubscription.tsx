
import { AIProfile } from "@/types/ai-profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";

interface AIProfileSubscriptionProps {
  profile: AIProfile;
  onSubscribe: () => void;
}

const AIProfileSubscription: React.FC<AIProfileSubscriptionProps> = ({ 
  profile, 
  onSubscribe 
}) => {
  const subscriptionPrice = profile.subscription_price || 29;
  
  // Handle potential undefined or non-object premium_content_count
  const premiumContent = profile.premium_content_count || {};
  const photosCount = typeof premiumContent === 'object' ? (premiumContent.photos || 0) : 0;
  const videosCount = typeof premiumContent === 'object' ? (premiumContent.videos || 0) : 0;
  const messagesCount = typeof premiumContent === 'object' ? (premiumContent.messages || 0) : 0;

  return (
    <Card className="overflow-hidden border-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-lg">Premium Subscription</h3>
          <Badge variant="secondary" className="bg-white text-purple-600 border-0">
            <StarIcon className="h-3 w-3 mr-1 fill-amber-500 stroke-amber-600" />
            VIP
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{subscriptionPrice}</span>
          <span className="text-muted-foreground ml-1">LC / month</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
            <span>Unlimited messaging with {profile.name}</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
            <span>Access to {photosCount} exclusive photos</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
            <span>Access to {videosCount} premium videos</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
            <span>{messagesCount} personalized voice messages</span>
          </li>
          {profile.livecam_enabled && (
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
              <span>Priority access to livecam events</span>
            </li>
          )}
        </ul>
        
        <Button 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          onClick={onSubscribe}
        >
          Subscribe Now
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </CardContent>
    </Card>
  );
};

export default AIProfileSubscription;
