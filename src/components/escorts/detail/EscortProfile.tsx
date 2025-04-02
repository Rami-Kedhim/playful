
import { useState } from "react";
import { Escort } from "@/data/escortData";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { format } from "date-fns";
import BookingForm, { BookingFormData } from "./BookingForm";
import MessageForm from "./MessageForm";
import ShareProfileModal from "./ShareProfileModal";
import MediaSection from "./MediaSection";
import ProfileInfo from "./ProfileInfo";

interface EscortProfileProps {
  escort: Escort;
  onBookNow: () => void;
}

const EscortProfile = ({ escort, onBookNow }: EscortProfileProps) => {
  const { toast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data);
    toast({
      title: "Booking Request Sent",
      description: `Your booking with ${escort.name} for ${format(data.date, "MMMM d, yyyy")} at ${data.time} has been sent.`,
    });
    onBookNow();
  };

  const handleMessageSubmit = (message: string) => {
    console.log("Message sent:", message);
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${escort.name}.`,
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Media */}
      <div className="lg:col-span-2">
        <MediaSection escort={escort} />
      </div>
      
      {/* Right column - Info */}
      <ProfileInfo 
        escort={escort}
        onFavoriteToggle={handleFavoriteToggle}
        onBookingOpen={() => setBookingOpen(true)}
        onMessageOpen={() => setMessageOpen(true)}
        onShareOpen={() => setShareOpen(true)}
      />

      <BookingForm
        escort={escort}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        onSubmit={handleBookingSubmit}
      />

      <MessageForm
        escort={escort}
        isOpen={messageOpen}
        onClose={() => setMessageOpen(false)}
        onSubmit={handleMessageSubmit}
      />
      
      <ShareProfileModal
        escort={escort}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
};

export default EscortProfile;
