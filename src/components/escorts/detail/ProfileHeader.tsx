
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import { Escort } from "@/types/escort";
import StarRating from "@/components/ui/StarRating";
import { useFavorites } from "@/contexts/FavoritesContext";
import VerificationBadge from "@/components/verification/VerificationBadge";

interface ProfileHeaderProps {
  escort: Escort;
  onFavoriteToggle: () => void;
}

const ProfileHeader = ({ escort, onFavoriteToggle }: ProfileHeaderProps) => {
  const { isFavorite } = useFavorites();
  
  // Use verification_level property and convert to expected type
  const verificationLevel = (escort.verification_level || escort.verificationLevel || "none") as any;
  
  // Ensure reviews is a number
  const reviewCount = typeof escort.reviews === 'number' ? escort.reviews : (escort.reviewCount || 0);
  
  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{escort.name}, {escort.age}</h1>
            <VerificationBadge level={verificationLevel} />
          </div>
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
          <span className="text-gray-400 ml-1">({reviewCount})</span>
        </div>
        
        {escort.price && (
          <div className="ml-auto text-xl font-bold text-ubx">
            {escort.price} UBX/hr
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
