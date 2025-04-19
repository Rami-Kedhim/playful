
import React from 'react';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Settings, Sparkles, Zap, Clock } from 'lucide-react';

interface HermesBoostOfferProps {
  userId?: string;
  onAcceptOffer?: () => void;
}

const HermesBoostOffer: React.FC<HermesBoostOfferProps> = ({ userId, onAcceptOffer }) => {
  const { insights } = useHermesInsights();
  const { toast } = useToast();

  // insights is an array, so find the boostOffer insight
  const boostOffer = insights.find((insight) => insight.type === 'boostOffer');

  const handleAcceptOffer = () => {
    toast({
      title: "Boost Activated!",
      description: "Your special offer has been applied to your account.",
      variant: "success",
    });

    if (onAcceptOffer) {
      onAcceptOffer();
    }
  };

  if (!boostOffer) {
    return null;
  }

  const offerCategory = boostOffer.category || "visibility";

  return (
    <Card className="border-2 border-purple-400 dark:border-purple-600">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Special Boost Offer</CardTitle>
            <CardDescription>Exclusive, limited-time promotion</CardDescription>
          </div>
          <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
            {offerCategory === "visibility" ? (
              <Sparkles className="h-3 w-3 mr-1" />
            ) : (
              <Zap className="h-3 w-3 mr-1" />
            )}
            {offerCategory.charAt(0).toUpperCase() + offerCategory.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {boostOffer.value}
          </h3>
        </div>

        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>Expires: {new Date(boostOffer.expires).toLocaleDateString()}</span>
        </div>

        <Button 
          onClick={handleAcceptOffer}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Activate Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default HermesBoostOffer;

