
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MessageSquare, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Escort } from "@/data/escortData";

interface ProfileActionsProps {
  escort: Escort;
  onBookingOpen: () => void;
  onMessageOpen: () => void;
  onShareOpen: () => void;
}

const ProfileActions = ({ 
  escort, 
  onBookingOpen, 
  onMessageOpen, 
  onShareOpen 
}: ProfileActionsProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
    toast({
      title: isFavorite(escort.id) ? "Removed from favorites" : "Added to favorites",
      description: isFavorite(escort.id) 
        ? `${escort.name} has been removed from your favorites.` 
        : `${escort.name} has been added to your favorites.`,
    });
  };
  
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <Button onClick={onBookingOpen} className="w-full">
        <Calendar size={16} className="mr-2" />
        Book Now
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full"
        onClick={onMessageOpen}
      >
        <MessageSquare size={16} className="mr-2" />
        Message
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full col-span-2"
        onClick={onShareOpen}
      >
        <Share2 size={16} className="mr-2" />
        Share Profile
      </Button>
    </div>
  );
};

export default ProfileActions;
