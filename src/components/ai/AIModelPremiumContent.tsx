
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideCheck, LucideInfo, LucideLock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIModelPremiumContentProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  onPurchase?: () => void;
  locked?: boolean;
}

const AIModelPremiumContent: React.FC<AIModelPremiumContentProps> = ({
  title,
  description,
  price,
  features,
  onPurchase,
  locked = true
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Get user from session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to purchase premium content",
          variant: "destructive",
        });
        return;
      }

      // Create a new order record
      const { data, error } = await supabase
        .from('content_purchases')
        .insert({
          user_id: session.user.id,
          content_id: title, // Using title as a placeholder for content_id
          amount: price,
          payment_method: 'ubx',
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Purchase successful!",
        description: "You now have access to premium content",
        variant: "success",
      });

      if (onPurchase) onPurchase();
    } catch (error: any) {
      toast({
        title: "Purchase failed",
        description: error.message || "An error occurred during purchase",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center justify-between">
          {title}
          {locked && <LucideLock size={18} className="text-muted-foreground" />}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">UBX</span>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <LucideCheck size={16} className="text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={handlePurchase} 
          disabled={isLoading || !locked} 
          className="w-full"
        >
          {locked ? (isLoading ? "Processing..." : "Purchase Access") : "Already Owned"}
        </Button>
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <LucideInfo size={12} className="mr-1" />
          Instant access after purchase
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIModelPremiumContent;
