
import { useState } from "react";
import { Escort } from "@/types/escort";
import { useFavorites } from "@/contexts/FavoritesContext";
import MediaSection from "./MediaSection";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./profile/ProfileTabs";
import DialogManager from "./profile/DialogManager";
import { EliminixBadge } from "@/components/eliminix";
import { mapEscortToUberPersona } from "@/utils/profileMapping";
import { verifyEliminixCompliance } from "@/services/eliminix/eliminixService";

interface EscortProfileProps {
  escort: Escort;
  onBookNow: () => void;
}

const EscortProfile = ({ escort, onBookNow }: EscortProfileProps) => {
  const { toggleFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
  };
  
  // Check Eliminix compliance
  const personaProfile = mapEscortToUberPersona(escort);
  const isEliminixCompliant = verifyEliminixCompliance(personaProfile);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Media */}
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{escort.name}</h1>
          <EliminixBadge 
            size="md" 
            isCompliant={isEliminixCompliant}
            showTooltip={true}
          />
        </div>
        
        <MediaSection escort={escort} />

        {/* Mobile view of profile info - only visible on small screens */}
        <div className="block lg:hidden mt-6">
          <ProfileInfo 
            escort={escort}
            onFavoriteToggle={handleFavoriteToggle}
            onBookingOpen={() => setBookingOpen(true)}
            onMessageOpen={() => setMessageOpen(true)}
            onShareOpen={() => setShareOpen(true)}
          />
        </div>

        <ProfileTabs escort={escort} />
      </div>
      
      {/* Right column - Info */}
      <div className="hidden lg:block">
        <ProfileInfo 
          escort={escort}
          onFavoriteToggle={handleFavoriteToggle}
          onBookingOpen={() => setBookingOpen(true)}
          onMessageOpen={() => setMessageOpen(true)}
          onShareOpen={() => setShareOpen(true)}
        />
      </div>

      {/* Dialog manager - handles all dialogs */}
      <DialogManager 
        escort={escort} 
        onBookNow={onBookNow}
        bookingOpen={bookingOpen}
        messageOpen={messageOpen}
        shareOpen={shareOpen}
        onBookingClose={() => setBookingOpen(false)}
        onMessageClose={() => setMessageOpen(false)}
        onShareClose={() => setShareOpen(false)}
      />
    </div>
  );
};

export default EscortProfile;
