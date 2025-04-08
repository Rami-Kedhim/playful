
import React from 'react';
import { Escort } from "@/types/escort";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Calendar, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";

interface EscortQuickActionsProps {
  escort: Escort;
  isFavorite: boolean;
  onBookNow: () => void;
  onMessage: () => void;
}

const EscortQuickActions: React.FC<EscortQuickActionsProps> = ({
  escort,
  isFavorite,
  onBookNow,
  onMessage
}) => {
  const { toggleFavorite } = useFavorites();
  
  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
  };
  
  return (
    <div className="flex flex-wrap gap-2 mt-4 md:hidden">
      <Button 
        onClick={onBookNow}
        className="flex-1"
      >
        <Calendar className="mr-2 h-4 w-4" />
        Book Now
      </Button>
      
      <Button 
        onClick={onMessage}
        variant="outline"
        className="flex-1"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Message
      </Button>
      
      <Button 
        onClick={handleFavoriteToggle}
        variant="ghost"
        className={cn(
          "flex items-center gap-2",
          isFavorite && "text-red-500"
        )}
      >
        <Heart 
          className="h-4 w-4" 
          fill={isFavorite ? "currentColor" : "none"} 
        />
      </Button>
    </div>
  );
};

export default EscortQuickActions;
