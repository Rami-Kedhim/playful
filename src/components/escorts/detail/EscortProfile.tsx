
import { useState } from "react";
import { format } from "date-fns";
import { Escort } from "@/data/escortData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscortGallery from "./EscortGallery";
import EscortDetails from "./EscortDetails";
import EscortReviews from "./EscortReviews";
import EscortServices from "./EscortServices";
import BookingForm, { BookingFormData } from "./BookingForm";
import MessageForm from "./MessageForm";
import ShareProfileModal from "./ShareProfileModal";
import CreatorProfileLink from "./CreatorProfileLink";
import { Heart, Calendar, MessageSquare, Star, Share2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import EscortVideoGallery from "./EscortVideoGallery";
import StarRating from "@/components/ui/StarRating";

interface EscortProfileProps {
  escort: Escort;
  onBookNow: () => void;
}

const EscortProfile = ({ escort, onBookNow }: EscortProfileProps) => {
  const { toast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const handleFavoriteToggle = () => {
    toggleFavorite(escort.id);
    toast({
      title: isFavorite(escort.id) ? "Removed from favorites" : "Added to favorites",
      description: isFavorite(escort.id) 
        ? `${escort.name} has been removed from your favorites.` 
        : `${escort.name} has been added to your favorites.`,
    });
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

  const handleShareProfile = () => {
    setShareOpen(true);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Media */}
      <div className="lg:col-span-2">
        <EscortGallery escort={escort} />
        
        {/* Add Video Gallery below the image gallery */}
        {escort.videos && escort.videos.length > 0 && (
          <EscortVideoGallery videos={escort.videos} />
        )}
      </div>
      
      {/* Right column - Info */}
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{escort.name}, {escort.age}</h1>
                <div className="flex items-center text-gray-400 mt-1">
                  <MapPin size={16} className="mr-1" />
                  <span>{escort.location}</span>
                </div>
                {/* Display gender and orientation */}
                {(escort.gender || escort.sexualOrientation) && (
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
                )}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className={isFavorite(escort.id) ? "text-red-500" : ""}
                onClick={handleFavoriteToggle}
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
              
              {escort.verified && (
                <Badge className="ml-2 bg-primary text-primary-foreground">
                  Verified
                </Badge>
              )}
              
              <div className="ml-auto text-xl font-bold text-lucoin">
                {escort.price} LC/hr
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button onClick={() => setBookingOpen(true)} className="w-full">
                <Calendar size={16} className="mr-2" />
                Book Now
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setMessageOpen(true)}
              >
                <MessageSquare size={16} className="mr-2" />
                Message
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full col-span-2"
                onClick={handleShareProfile}
              >
                <Share2 size={16} className="mr-2" />
                Share Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Display virtual creator card if escort is also a content creator */}
        {escort.isContentCreator && escort.creatorUsername && (
          <CreatorProfileLink 
            escortName={escort.name}
            creatorUsername={escort.creatorUsername}
          />
        )}
        
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="mt-4">
            <EscortServices tags={escort.tags} />
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <EscortDetails escort={escort} />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <EscortReviews escort={escort} />
          </TabsContent>
        </Tabs>
      </div>

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
