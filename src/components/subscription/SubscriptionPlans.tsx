
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Loader2 } from "lucide-react";
import { logContentAction } from "@/utils/debugUtils";

interface SubscriptionPlansProps {
  creatorId: string;
  creatorName: string;
}

interface PlanFeature {
  title: string;
  basic: boolean;
  premium: boolean;
  vip: boolean;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  creatorId,
  creatorName
}) => {
  const { user, isAuthenticated } = useAuth();
  const { subscribe, isSubscribed, getSubscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const currentSubscription = getSubscription(creatorId);
  
  // Sample features for each plan
  const planFeatures: PlanFeature[] = [
    { title: "Basic photo content", basic: true, premium: true, vip: true },
    { title: "Public feed access", basic: true, premium: true, vip: true },
    { title: "Direct messaging", basic: false, premium: true, vip: true },
    { title: "Premium photos", basic: false, premium: true, vip: true },
    { title: "Premium videos", basic: false, premium: true, vip: true },
    { title: "Priority support", basic: false, premium: false, vip: true },
    { title: "Exclusive video calls", basic: false, premium: false, vip: true },
    { title: "Custom content requests", basic: false, premium: false, vip: true },
  ];
  
  const handleSubscribe = async (plan: "basic" | "premium" | "vip") => {
    logContentAction('Subscription attempt', { creatorId, plan });
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe",
      });
      navigate("/auth", { state: { from: { pathname: window.location.pathname } } });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const success = await subscribe(creatorId, plan);
      
      if (success) {
        logContentAction('Subscription successful', { creatorId, plan });
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const isCurrentPlan = (plan: string): boolean => {
    return currentSubscription?.plan === plan && currentSubscription?.isActive;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Basic Plan */}
      <Card className={isCurrentPlan("basic") ? "border-primary" : ""}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Basic
            {isCurrentPlan("basic") && (
              <Badge variant="default">Current Plan</Badge>
            )}
          </CardTitle>
          <CardDescription>Essential access</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">$9.99</span>
            <span className="text-muted-foreground"> / month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {planFeatures.map((feature, index) => (
              <li 
                key={index} 
                className={`flex items-center ${!feature.basic ? "text-muted-foreground" : ""}`}
              >
                {feature.basic ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                )}
                {feature.title}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant={isCurrentPlan("basic") ? "outline" : "default"}
            disabled={isProcessing || isCurrentPlan("basic")}
            onClick={() => handleSubscribe("basic")}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isCurrentPlan("basic") ? (
              "Current Plan"
            ) : (
              "Subscribe"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Premium Plan */}
      <Card className={`${isCurrentPlan("premium") ? "border-primary" : ""} relative overflow-hidden`}>
        {!isCurrentPlan("premium") && (
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-purple-300" />
        )}
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Premium
            {isCurrentPlan("premium") ? (
              <Badge variant="default">Current Plan</Badge>
            ) : (
              <Badge variant="secondary" className="bg-gradient-to-r from-violet-500 to-purple-300 text-white">
                Popular
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Full content access</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">$19.99</span>
            <span className="text-muted-foreground"> / month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {planFeatures.map((feature, index) => (
              <li 
                key={index} 
                className={`flex items-center ${!feature.premium ? "text-muted-foreground" : ""}`}
              >
                {feature.premium ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                )}
                {feature.title}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant={isCurrentPlan("premium") ? "outline" : "default"}
            disabled={isProcessing || isCurrentPlan("premium")}
            onClick={() => handleSubscribe("premium")}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isCurrentPlan("premium") ? (
              "Current Plan"
            ) : (
              "Subscribe"
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* VIP Plan */}
      <Card className={`${isCurrentPlan("vip") ? "border-primary" : ""} relative overflow-hidden`}>
        {!isCurrentPlan("vip") && (
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-300" />
        )}
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            VIP
            {isCurrentPlan("vip") ? (
              <Badge variant="default">Current Plan</Badge>
            ) : (
              <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-yellow-300 text-black">
                Exclusive
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Premium with personalized content</CardDescription>
          <div className="mt-2">
            <span className="text-3xl font-bold">$49.99</span>
            <span className="text-muted-foreground"> / month</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {planFeatures.map((feature, index) => (
              <li 
                key={index} 
                className={`flex items-center ${!feature.vip ? "text-muted-foreground" : ""}`}
              >
                {feature.vip ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                )}
                {feature.title}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            variant={isCurrentPlan("vip") ? "outline" : "default"}
            disabled={isProcessing || isCurrentPlan("vip")}
            onClick={() => handleSubscribe("vip")}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isCurrentPlan("vip") ? (
              "Current Plan"
            ) : (
              "Subscribe"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
