
import React, { useState } from 'react';
import { Escort } from "@/types/Escort";
import { Button } from '@/components/ui/button';
import { Heart, MessageSquare, Share2, Calendar } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ProfileInfo from './ProfileInfo';
import ProfileTabs from './ProfileTabs';
import { useFavorites } from '@/contexts/FavoritesContext';
import { VerificationLevel } from '@/types/verification';

interface EscortProfileProps {
  escort: Escort;
}

const EscortProfile: React.FC<EscortProfileProps> = ({ escort }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [showingDialog, setShowingDialog] = useState<'booking' | 'message' | 'share' | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Ensure the escort has sensible defaults for missing values
  const normalizedEscort: Escort = {
    ...escort,
    name: escort.name || 'Unknown',
    age: escort.age || 25,
    location: escort.location || 'Unknown',
    rating: escort.rating || 0,
    reviewCount: escort.reviewCount || 0,
    verificationLevel: (escort.verificationLevel || 'none') as VerificationLevel,
    tags: escort.tags || [],
    price: escort.price || 0,
    services: escort.services || [],
    bio: escort.bio || 'No biography available',
    images: escort.images || [escort.imageUrl || escort.profileImage || ''],
    languages: escort.languages || ['English'],
  };

  const handleFavoriteClick = () => {
    if (isFavorite(escort.id)) {
      removeFavorite(escort.id);
    } else {
      addFavorite(escort);
    }
  };

  // Check if this escort is in favorites
  const isFav = isFavorite(escort.id);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <ProfileInfo escort={normalizedEscort} />
      </div>

      <div className="md:w-72 lg:w-80 space-y-4">
        {/* Mobile Actions */}
        {isMobile && (
          <div className="flex space-x-2 mb-4">
            <Button className="flex-1">
              <Calendar className="mr-2 h-4 w-4" />
              Book Now
            </Button>
            
            <Button variant="outline" className="flex-grow-0">
              <Heart className="h-4 w-4" fill={isFav ? "currentColor" : "none"} />
            </Button>
            
            <Button variant="outline" className="flex-grow-0">
              <MessageSquare className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="flex-grow-0">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <ProfileTabs escort={normalizedEscort} />
      </div>
    </div>
  );
};

export default EscortProfile;
