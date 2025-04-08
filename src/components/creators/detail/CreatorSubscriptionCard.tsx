
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Heart, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Creator } from '@/hooks/useCreators';
import { useWallet } from '@/hooks/useWallet';

interface CreatorSubscriptionCardProps {
  creator: Creator;
  isSubscribed: boolean;
  canSubscribe: boolean;
  onSubscribe: () => void;
  onSendTip: (amount: number) => void;
}

const CreatorSubscriptionCard: React.FC<CreatorSubscriptionCardProps> = ({
  creator,
  isSubscribed,
  canSubscribe,
  onSubscribe,
  onSendTip
}) => {
  const { toast } = useToast();
  const { wallet } = useWallet();
  const [tipAmount, setTipAmount] = useState<number>(10);
  
  const handleSubscribe = () => {
    if (!wallet || wallet.balance < (creator.price || 0)) {
      toast({
        title: "Insufficient balance",
        description: "Please add more funds to your wallet",
        variant: "destructive",
      });
      return;
    }
    
    onSubscribe();
  };
  
  const handleSendTip = () => {
    if (!wallet || wallet.balance < tipAmount) {
      toast({
        title: "Insufficient balance",
        description: "Please add more funds to your wallet",
        variant: "destructive",
      });
      return;
    }
    
    onSendTip(tipAmount);
    toast({
      title: "Tip sent!",
      description: `You sent a ${tipAmount} LUC tip to ${creator.name}`,
    });
  };
  
  const tipOptions = [5, 10, 20, 50, 100];

  return (
    <Card className="border-border sticky top-6">
      <CardContent className="p-6">
        {isSubscribed ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg">Subscribed</h3>
                <p className="text-sm text-muted-foreground">Full content access</p>
              </div>
              <div className="bg-primary/10 text-primary rounded-full p-2">
                <Check className="h-6 w-6" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Send a tip</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tipOptions.map(amount => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        tipAmount === amount
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {amount} LUC
                    </button>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleSendTip}
                  disabled={!wallet || wallet.balance < tipAmount}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send {tipAmount} LUC Tip
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Subscription details</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>${creator.price}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next payment</span>
                    <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto-renew</span>
                    <span>Yes</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Subscribe</h3>
              <p className="text-sm text-muted-foreground">Get full access to {creator.name}'s content</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-muted-foreground">Price</span>
                <div className="text-right">
                  <span className="text-2xl font-bold">${creator.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleSubscribe}
                disabled={!canSubscribe || !wallet || wallet.balance < (creator.price || 0)}
              >
                Subscribe Now
              </Button>
              
              {(!wallet || wallet.balance < (creator.price || 0)) && (
                <p className="text-xs text-center mt-2 text-amber-500">
                  Insufficient wallet balance
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Subscription includes:</h4>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                  <span className="text-sm">Full access to all photos and videos</span>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                  <span className="text-sm">Exclusive livestreams and events</span>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                  <span className="text-sm">Direct messaging with {creator.name}</span>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-primary mt-0.5" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorSubscriptionCard;
