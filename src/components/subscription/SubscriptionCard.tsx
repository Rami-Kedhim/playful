
import React from "react";
import { format } from "date-fns";
import { Subscription } from "@/hooks/useSubscription";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, CreditCard, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface SubscriptionCardProps {
  subscription: Subscription;
  onRenewToggle: (id: string, autoRenew: boolean) => void;
  onCancel: (id: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onRenewToggle,
  onCancel
}) => {
  const formattedStartDate = format(new Date(subscription.startDate), "MMM d, yyyy");
  const formattedEndDate = format(new Date(subscription.endDate), "MMM d, yyyy");
  
  const daysRemaining = Math.ceil(
    (new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const getPlanColor = () => {
    switch (subscription.plan) {
      case "vip": return "bg-gradient-to-r from-amber-500 to-yellow-300 text-black";
      case "premium": return "bg-gradient-to-r from-violet-500 to-purple-300";
      default: return "bg-gray-600";
    }
  };
  
  return (
    <Card className="overflow-hidden border-gray-700">
      <div className={`h-2 ${getPlanColor()}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/6.x/bottts/svg?seed=${subscription.creatorUsername}`} />
              <AvatarFallback>
                {subscription.creatorName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold truncate">{subscription.creatorName}</h3>
              <p className="text-sm text-muted-foreground">@{subscription.creatorUsername}</p>
            </div>
          </div>
          <Badge className={`uppercase ${subscription.plan === "vip" ? "bg-amber-500 text-black" : subscription.plan === "premium" ? "bg-purple-500" : ""}`}>
            {subscription.plan}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Started</p>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm">{formattedStartDate}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Renews</p>
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm">{formattedEndDate}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Plan Price</p>
            <div className="flex items-center">
              <CreditCard className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-sm">${subscription.price}/month</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="flex items-center">
              {subscription.isActive ? (
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Active • {daysRemaining} days left
                </Badge>
              ) : (
                <Badge variant="outline" className="border-red-500 text-red-500">
                  Canceled
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-900/50 px-6 py-4 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`autorenew-${subscription.id}`}
            checked={subscription.autoRenew}
            onCheckedChange={(checked) => onRenewToggle(subscription.id, checked)}
            disabled={!subscription.isActive}
          />
          <label 
            htmlFor={`autorenew-${subscription.id}`}
            className="text-sm cursor-pointer"
          >
            Auto-renew
          </label>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
          >
            <Link to={`/creators/${subscription.creatorUsername}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Creator
            </Link>
          </Button>
          
          {subscription.isActive && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCancel(subscription.id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
