
import { useState } from "react";
import { Escort } from "@/types/escort"; // Use strict Escort interface here
import { VerificationLevel } from "@/types/verification";
import { useFavorites } from "@/contexts/FavoritesContext";
import MediaSection from "./MediaSection";
import ProfileInfo from "./ProfileInfo";
import ProfileTabs from "./profile/ProfileTabs";
import DialogManager from "./profile/DialogManager";

interface EscortProfileProps {
  escort: Escort;
  onBookNow: () => void;
}

const EscortProfile = ({ escort, onBookNow }: EscortProfileProps) => {
  const { toggleFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // Normalize verificationLevel with VerificationLevel enum and fallback to 'none'
  const normalizedVerificationLevel: VerificationLevel =
    escort.verificationLevel &&
    typeof escort.verificationLevel === "string" &&
    Object.values(VerificationLevel).includes(escort.verificationLevel as VerificationLevel)
      ? (escort.verificationLevel as VerificationLevel)
      : VerificationLevel.NONE;

  // Create normalized escort with correct verificationLevel type
  const normalizedEscort: Escort = {
    ...escort,
    verificationLevel: normalizedVerificationLevel,
  };

  const handleFavoriteToggle = () => {
    toggleFavorite('escorts', escort.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MediaSection escort={normalizedEscort} />

        <div className="block lg:hidden mt-6">
          <ProfileInfo
            escort={normalizedEscort}
            onFavoriteToggle={handleFavoriteToggle}
            onBookingOpen={() => setBookingOpen(true)}
            onMessageOpen={() => setMessageOpen(true)}
            onShareOpen={() => setShareOpen(true)}
          />
        </div>

        <ProfileTabs escort={normalizedEscort} />
      </div>

      <div className="hidden lg:block">
        <ProfileInfo
          escort={normalizedEscort}
          onFavoriteToggle={handleFavoriteToggle}
          onBookingOpen={() => setBookingOpen(true)}
          onMessageOpen={() => setMessageOpen(true)}
          onShareOpen={() => setShareOpen(true)}
        />
      </div>

      <DialogManager
        escort={normalizedEscort}
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
