
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Image as ImageIcon, VideoIcon, MessageCircle } from "lucide-react";
import { AIProfile } from '@/types/ai-profile';

interface AIProfileSubscriptionProps {
  aiProfile: AIProfile;
  onSubscribe?: () => void;
}

const AIProfileSubscription: React.FC<AIProfileSubscriptionProps> = ({ aiProfile, onSubscribe }) => {
  const isSubscribed = false; // This would come from a subscription check
  
  const premiumContent = {
    photos: aiProfile.gallery_images?.length || 0,
    videos: aiProfile.premium_content_count || 0,
    messages: "Unlimited"
  };
  
  const price = aiProfile.subscription_price || 9.99;
  
  const features = [
    "Full chat access",
    "Exclusive photos and videos",
    "Priority responses",
    "Custom AI personality adaptation",
    "Advanced conversation memory"
  ];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Premium Subscription</CardTitle>
          {isSubscribed && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              <Crown className="h-3 w-3 mr-1 fill-primary" />
              Subscribed
            </Badge>
          )}
        </div>
        <CardDescription>
          Access exclusive content with {aiProfile.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <ImageIcon className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-lg font-bold">{premiumContent.photos}</span>
            <span className="text-xs text-muted-foreground">Photos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <VideoIcon className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-lg font-bold">{premiumContent.videos}</span>
            <span className="text-xs text-muted-foreground">Videos</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <MessageCircle className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-lg font-bold">{premiumContent.messages}</span>
            <span className="text-xs text-muted-foreground">Messages</span>
          </div>
        </div>
        
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm font-medium">{aiProfile.rating || 4.8}</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({aiProfile.reviewCount || 42} reviews)
            </span>
          </div>
          <div className="text-lg font-bold">${price.toFixed(2)}<span className="text-sm text-muted-foreground">/mo</span></div>
        </div>
        <Button 
          onClick={onSubscribe} 
          className="w-full" 
          disabled={isSubscribed}
        >
          {isSubscribed ? 'Already Subscribed' : 'Subscribe Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileSubscription;
