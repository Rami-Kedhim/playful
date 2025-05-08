
import { useState } from "react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Heart, Calendar, MessageSquare, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Escort } from "@/types/escort";

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
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  
  const handleFavoriteToggle = async () => {
    setIsLoadingFavorite(true);
    
    if (isFavorite('escorts', escort.id)) {
      removeFavorite('escorts', escort.id);
      toast({
        title: "Removed from favorites",
        description: `${escort.name} has been removed from your favorites.`,
      });
    } else {
      addFavorite('escorts', escort);
      toast({
        title: "Added to favorites",
        description: `${escort.name} has been added to your favorites.`,
      });
    }
    
    setIsLoadingFavorite(false);
  };
  
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      <EnhancedButton onClick={onBookingOpen} className="w-full">
        <Calendar size={16} className="mr-2" />
        Book Now
      </EnhancedButton>
      
      <EnhancedButton 
        variant="outline" 
        className="w-full"
        onClick={onMessageOpen}
      >
        <MessageSquare size={16} className="mr-2" />
        Message
      </EnhancedButton>
      
      <EnhancedButton 
        variant="outline" 
        className="w-full" 
        onClick={handleFavoriteToggle}
        isLoading={isLoadingFavorite}
      >
        <Heart 
          size={16} 
          className={`mr-2 ${isFavorite('escorts', escort.id) ? "fill-red-500 text-red-500" : ""}`} 
        />
        {isFavorite('escorts', escort.id) ? "Favorited" : "Favorite"}
      </EnhancedButton>
      
      <EnhancedButton 
        variant="ghost" 
        className="w-full"
        onClick={onShareOpen}
      >
        <Share2 size={16} className="mr-2" />
        Share Profile
      </EnhancedButton>
    </div>
  );
};

export default ProfileActions;
