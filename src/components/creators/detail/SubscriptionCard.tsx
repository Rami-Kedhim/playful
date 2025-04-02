
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, MessageSquare } from "lucide-react";

interface SubscriptionCardProps {
  creator: {
    name: string;
    price: number;
    contentCount: {
      photos: number;
      videos: number;
    };
  };
  onSubscribe: () => void;
  onMessage: () => void;
}

const SubscriptionCard = ({ creator, onSubscribe, onMessage }: SubscriptionCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">Virtual Subscription</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary">{creator.price}</span>
            <span className="ml-1 text-gray-500">LC/month</span>
          </div>
          
          <Badge className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500">
            <Lock size={12} className="mr-1" /> Premium
          </Badge>
        </div>
        
        <div className="mb-6 space-y-3">
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
              </svg>
            </div>
            <span className="ml-2">Full access to {creator.contentCount.photos} photos</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
              </svg>
            </div>
            <span className="ml-2">Unlimited access to {creator.contentCount.videos} videos</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
              </svg>
            </div>
            <span className="ml-2">1-on-1 virtual dates</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
              </svg>
            </div>
            <span className="ml-2">Priority messaging</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" className="h-3 w-3">
                <path d="M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z" />
              </svg>
            </div>
            <span className="ml-2">Exclusive livestream access</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <Button 
            onClick={onSubscribe} 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Subscribe Now
          </Button>
          <Button variant="outline" className="w-full" onClick={onMessage}>
            <MessageSquare size={16} className="mr-2" />
            Message Creator
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
