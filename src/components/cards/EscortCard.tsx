
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, CheckCircle, Clock } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import { formatDistanceToNow } from "date-fns";

interface EscortCardProps {
  id: string;
  name: string;
  location: string;
  age?: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  imageUrl: string;
  price: number;
  verified?: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: Date;
  responseRate?: number;
}

const EscortCard: React.FC<EscortCardProps> = ({
  id,
  name,
  location,
  age,
  rating,
  reviews,
  tags = [],
  imageUrl,
  price,
  verified = false,
  gender,
  sexualOrientation,
  availableNow = false,
  lastActive,
  responseRate,
}) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showInfo } = useNotifications();
  
  const handleCardClick = () => {
    navigate(`/escorts/${id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const wasAlreadyFavorite = isFavorite(id);
    toggleFavorite(id);
    
    if (!wasAlreadyFavorite) {
      showInfo && showInfo("Profile details", "You can see all your favorites in the Favorites tab.");
    }
  };
  
  const getLastActiveText = () => {
    if (availableNow) return "Available now";
    if (!lastActive) return "Recently active";
    
    try {
      return `Active ${formatDistanceToNow(lastActive, { addSuffix: true })}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Recently active";
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback image if the primary image fails to load
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x400";
          }}
        />
        
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
          <Badge variant={availableNow ? "default" : "secondary"} className="flex gap-1 items-center">
            {availableNow ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Available
              </>
            ) : (
              <>
                <Clock className="h-3 w-3" />
                {getLastActiveText()}
              </>
            )}
          </Badge>
          
          <Button 
            variant="ghost" 
            size="icon"
            className={`bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white rounded-full ${
              isFavorite(id) ? "text-red-500" : ""
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isFavorite(id) ? "fill-current" : ""}`} />
          </Button>
        </div>
        
        {verified && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-3 left-3 gap-1 items-center bg-primary/70 text-primary-foreground"
          >
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {rating && rating > 0 ? (
              <>
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>
                  {rating.toFixed(1)}{" "}
                  {reviews && reviews > 0 ? (
                    <span className="text-xs text-muted-foreground">({reviews})</span>
                  ) : null}
                </span>
              </>
            ) : null}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          {age && <Badge variant="outline">{age} y.o.</Badge>}
          {gender && <Badge variant="outline" className="capitalize">{gender}</Badge>}
          {sexualOrientation && (
            <Badge variant="outline" className="capitalize">
              {sexualOrientation}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center p-4 pt-0 border-t border-border mt-2">
        <div>
          <div className="text-sm font-medium">From ${price}/hour</div>
        </div>
        
        <Button size="sm">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default EscortCard;
