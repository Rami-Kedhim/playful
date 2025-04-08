
import React, { useState } from "react";
import { Creator } from "@/hooks/useCreators";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { Check, Crown, Gift, ImageIcon, Video, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CreatorSubscriptionCardProps {
  creator: Creator;
  isSubscribed: boolean;
  canSubscribe: boolean;
  onSubscribe: () => Promise<boolean>;
  onSendTip: (amount: number) => Promise<boolean>;
}

const CreatorSubscriptionCard: React.FC<CreatorSubscriptionCardProps> = ({
  creator,
  isSubscribed,
  canSubscribe,
  onSubscribe,
  onSendTip
}) => {
  const { wallet } = useWallet();
  const { toast } = useToast();
  const [tipAmount, setTipAmount] = useState(10);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isTipping, setIsTipping] = useState(false);
  
  // Define subscription plans
  const standardPlan = {
    price: creator.price,
    name: "Standard",
    features: [
      "Access to all photos",
      "Access to standard videos",
      "Post comments",
      "Monthly live streams"
    ]
  };
  
  const premiumPlan = {
    price: creator.price * 3,
    name: "Premium",
    features: [
      "Everything in Standard",
      "Premium exclusive content",
      "1-on-1 messaging",
      "Special requests",
      "Weekly live streams"
    ]
  };
  
  const handleSubscription = async () => {
    if (!canSubscribe) {
      toast({
        title: "Insufficient funds",
        description: `You need at least ${creator.price} Lucoins to subscribe`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubscribing(true);
    const success = await onSubscribe();
    setIsSubscribing(false);
    
    if (success) {
      toast({
        title: "Subscribed!",
        description: `You are now subscribed to ${creator.name}`
      });
    } else {
      toast({
        title: "Subscription failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };
  
  const handleSendTip = async () => {
    if ((wallet?.balance || 0) < tipAmount) {
      toast({
        title: "Insufficient funds",
        description: `You need at least ${tipAmount} Lucoins to send this tip`,
        variant: "destructive"
      });
      return;
    }
    
    setIsTipping(true);
    const success = await onSendTip(tipAmount);
    setIsTipping(false);
    
    if (success) {
      toast({
        title: "Tip sent!",
        description: `You sent ${tipAmount} Lucoins to ${creator.name}`
      });
      setTipAmount(10); // Reset tip amount
    } else {
      toast({
        title: "Tip failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Crown className="mr-2 h-5 w-5 text-amber-500" />
          Subscription
        </CardTitle>
      </CardHeader>
      
      {isSubscribed ? (
        <CardContent className="pt-0">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <h3 className="font-medium flex items-center text-green-600">
              <Check className="mr-2 h-4 w-4" />
              You are subscribed
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your subscription is active until {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Content Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center justify-center p-3 border rounded-lg">
                <div className="flex flex-col items-center">
                  <ImageIcon className="h-5 w-5 text-primary mb-1" />
                  <span className="text-lg font-semibold">{creator.contentCount?.photos || '50+'}</span>
                  <span className="text-xs text-muted-foreground">Photos</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-3 border rounded-lg">
                <div className="flex flex-col items-center">
                  <Video className="h-5 w-5 text-primary mb-1" />
                  <span className="text-lg font-semibold">{creator.contentCount?.videos || '10+'}</span>
                  <span className="text-xs text-muted-foreground">Videos</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Send a Tip</h3>
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  min={1} 
                  value={tipAmount}
                  onChange={(e) => setTipAmount(Number(e.target.value))}
                  className="w-20 text-right"
                />
                <Button 
                  onClick={handleSendTip}
                  disabled={isTipping || (wallet?.balance || 0) < tipAmount}
                  className="flex-1"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  {isTipping ? "Sending..." : `Send ${tipAmount} ⓛ`}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="pt-0">
          <Tabs defaultValue="standard">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{standardPlan.name}</h3>
                <span className="text-2xl font-semibold">${standardPlan.price}/mo</span>
              </div>
              
              <ul className="space-y-2">
                {standardPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleSubscription} 
                disabled={isSubscribing || !canSubscribe}
                className="w-full"
              >
                {isSubscribing ? "Processing..." : `Subscribe for ${standardPlan.price} ⓛ/mo`}
              </Button>
              
              {!canSubscribe && (
                <p className="text-xs text-center text-muted-foreground">
                  Insufficient Lucoins in your wallet
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="premium" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  {premiumPlan.name}
                  <Zap className="ml-1 h-4 w-4 text-amber-500" />
                </h3>
                <span className="text-2xl font-semibold">${premiumPlan.price}/mo</span>
              </div>
              
              <ul className="space-y-2">
                {premiumPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleSubscription} 
                disabled={true} // Premium not implemented in this demo
                className="w-full"
                variant="secondary"
              >
                Coming Soon
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Premium plan coming soon
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
        <div className="text-center">
          <p>You can cancel your subscription at any time</p>
          <p className="mt-1">Payments processed in Lucoins</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreatorSubscriptionCard;
