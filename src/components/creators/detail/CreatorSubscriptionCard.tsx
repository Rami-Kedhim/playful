
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/components/ui/use-toast';

interface CreatorSubscriptionCardProps {
  creatorId: string;
  name: string;
  price: number;
  benefits: string[];
  isSubscribed?: boolean;
}

const CreatorSubscriptionCard: React.FC<CreatorSubscriptionCardProps> = ({
  creatorId,
  name,
  price,
  benefits,
  isSubscribed = false,
}) => {
  const { toast } = useToast();
  const { balance, spend } = useWallet();
  
  const handleSubscribe = async () => {
    if (balance < price) {
      toast({
        title: "Insufficient balance",
        description: "Please add more UBX tokens to subscribe",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const success = await spend(price, `Subscription to ${name}`);
      
      if (success) {
        toast({
          title: "Subscription successful",
          description: `You have subscribed to ${name}`,
        });
      } else {
        toast({
          title: "Subscription failed",
          description: "Failed to process subscription",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "An error occurred while processing your subscription",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-2 border-muted">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-amber-500" />
          <CardTitle>Premium Subscription</CardTitle>
        </div>
        <CardDescription>Exclusive content and perks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline mb-6">
          <span className="text-3xl font-bold">{price} UBX</span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-1 text-green-500" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        <Button 
          className="w-full"
          variant={isSubscribed ? "outline" : "default"}
          onClick={handleSubscribe}
          disabled={isSubscribed}
        >
          {isSubscribed ? "Already Subscribed" : "Subscribe Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatorSubscriptionCard;
