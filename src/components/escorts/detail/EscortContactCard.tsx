
// Fix: Import Escort type and safe access to rates and reviewCount properties

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Escort } from "@/types/escort";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Calendar, MapPin, Clock, Heart, BadgeCheck, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";
import StarRating from "@/components/ui/StarRating";

interface EscortContactCardProps {
  escort: Escort;
  isBookingAvailable: boolean;
  isMessagingAvailable: boolean;
  onBookNow: () => void;
  onMessage: () => void;
}

const EscortContactCard: React.FC<EscortContactCardProps> = ({
  escort,
  isBookingAvailable,
  isMessagingAvailable,
  onBookNow,
  onMessage
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(escort.id);

  // Safe access to reviewCount, fallback to 0 if undefined
  const reviewsCount = typeof escort.reviewCount === 'number' ? escort.reviewCount : 0;

  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
  };

  return (
    <Card>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={escort.imageUrl || escort.profileImage || ''} alt={escort.name} />
            <AvatarFallback>{escort.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{escort.name}</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {escort.location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {escort.verified && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 flex items-center gap-1">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </Badge>
          )}
          <Badge variant="outline">{escort.age} years</Badge>
          <Badge variant="outline" className="capitalize">{escort.gender || "Not specified"}</Badge>
          {escort.availableNow && (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
              Available Now
            </Badge>
          )}
        </div>
        
        <div>
          <div className="flex items-center">
            <StarRating rating={escort.rating || 0} size={18} />
            <span className="ml-2 text-sm">{escort.rating ? escort.rating.toFixed(1) : '0.0'}</span>
            <span className="ml-auto text-sm text-muted-foreground">
              {reviewsCount} reviews
            </span>
          </div>
        </div>
        
        <div className="pt-1">
          <div className="text-sm text-muted-foreground mb-1">Hourly Rate</div>
          <div className="text-2xl font-semibold">${escort.rates?.hourly || escort.price || 0}</div>
        </div>
        
        <div className="flex flex-col gap-2 pt-2">
          <Button 
            onClick={onBookNow}
            disabled={!isBookingAvailable}
            className="w-full"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
          
          <Button 
            onClick={onMessage}
            variant="outline"
            disabled={!isMessagingAvailable}
            className="w-full"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          
          <Button 
            onClick={handleFavoriteToggle}
            variant="ghost"
            className={cn(
              "w-full",
              favorite && "text-red-500"
            )}
          >
            <Heart 
              className="mr-2 h-4 w-4" 
              fill={favorite ? "currentColor" : "none"} 
            />
            {favorite ? "Saved to Favorites" : "Add to Favorites"}
          </Button>
        </div>
        
        {(!isBookingAvailable || !isMessagingAvailable) && (
          <div className="text-xs text-center text-muted-foreground pt-1">
            Insufficient UBX in your wallet
          </div>
        )}
        
        <div className="pt-4 border-t text-sm">
          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium">Response Time</div>
              <div className="text-muted-foreground">Within 30 minutes</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 mt-3">
            <Shield className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <div className="font-medium">Safety Verified</div>
              <div className="text-muted-foreground">Identity and photos verified</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortContactCard;

