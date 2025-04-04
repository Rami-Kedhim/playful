
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { Escort } from "@/data/escortData";
import StarRating from "@/components/ui/StarRating";
import { useFavorites } from "@/contexts/FavoritesContext";
import VerificationBadge from "@/components/verification/VerificationBadge";

interface ProfileHeaderProps {
  escort: Escort;
  onFavoriteToggle: () => void;
}

const ProfileHeader = ({ escort, onFavoriteToggle }: ProfileHeaderProps) => {
  const { isFavorite } = useFavorites();
  
  // Convert verificationLevel to the expected type
  const verificationLevel = (escort.verificationLevel || "none") as "none" | "basic" | "enhanced" | "premium";
  
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold">{escort.name}, {escort.age}</h1>
          <div className="flex items-center text-gray-400 mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{escort.location}</span>
          </div>
          {/* Display gender and orientation */}
          <div className="flex flex-wrap gap-1 mt-2">
            {escort.gender && (
              <Badge variant="outline" className="capitalize">
                {escort.gender}
              </Badge>
            )}
            {escort.sexualOrientation && (
              <Badge variant="outline" className="capitalize">
                {escort.sexualOrientation}
              </Badge>
            )}
            <VerificationBadge level={verificationLevel} />
          </div>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className={isFavorite(escort.id) ? "text-red-500" : ""}
          onClick={onFavoriteToggle}
          aria-label={isFavorite(escort.id) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={isFavorite(escort.id) ? "currentColor" : "none"} />
        </Button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="bg-gray-800 rounded-md px-3 py-1 flex items-center gap-1">
          <StarRating rating={escort.rating} size={14} />
          <span className="ml-1">{escort.rating.toFixed(1)}</span>
          <span className="text-gray-400 ml-1">({escort.reviews})</span>
        </div>
        
        <div className="ml-auto text-xl font-bold text-lucoin">
          {escort.price} LC/hr
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
