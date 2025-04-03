
import { useState } from "react";
import { Escort } from "@/data/escortData";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { format } from "date-fns";
import { BookingForm, BookingFormData } from "./booking";
import MessageForm from "./MessageForm";
import { ShareProfileModal } from "./share";
import MediaSection from "./MediaSection";
import ProfileInfo from "./ProfileInfo";
import SafetyTips from "./SafetyTips";
import VerificationBadge from "./VerificationBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <Card className="mt-6">
          <CardContent className="p-6">
            <Tabs defaultValue="about">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="rates">Rates</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">About {escort.name}</h3>
                <p className="text-gray-300 mb-4">
                  I'm a fun-loving, adventurous companion looking for genuine connections. 
                  I enjoy both quiet evenings and exciting adventures. Let's create unforgettable 
                  memories together in {escort.location}. I provide high-class companionship services 
                  and prioritize discretion and comfort.
                </p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-6">
                  <div className="text-gray-400">Age</div>
                  <div>{escort.age} years</div>
                  
                  <div className="text-gray-400">Gender</div>
                  <div className="capitalize">{escort.gender || "Not specified"}</div>
                  
                  <div className="text-gray-400">Sexual Orientation</div>
                  <div className="capitalize">{escort.sexualOrientation || "Not specified"}</div>
                  
                  <div className="text-gray-400">Height</div>
                  <div>{escort.height || "Not specified"}</div>
                  
                  <div className="text-gray-400">Weight</div>
                  <div>{escort.weight || "Not specified"}</div>
                  
                  <div className="text-gray-400">Measurements</div>
                  <div>{escort.measurements || "Not specified"}</div>
                  
                  <div className="text-gray-400">Hair Color</div>
                  <div>{escort.hairColor || "Not specified"}</div>
                  
                  <div className="text-gray-400">Eye Color</div>
                  <div>{escort.eyeColor || "Not specified"}</div>
                  
                  <div className="text-gray-400">Ethnicity</div>
                  <div>{escort.ethnicity || "Not specified"}</div>
                  
                  <div className="text-gray-400">Languages</div>
                  <div>{escort.languages?.join(", ") || "Not specified"}</div>
                  
                  <div className="text-gray-400">Availability</div>
                  <div>{escort.availability?.days.join(", ") || "Contact for availability"}</div>
                  
                  <div className="text-gray-400">Hours</div>
                  <div>{escort.availability?.hours || "Flexible"}</div>
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {(escort.services || escort.tags).map((service, index) => (
                    <div key={index} className="bg-secondary/20 p-2 rounded-md text-center text-sm">
                      {service}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="rates">
                <h3 className="text-xl font-semibold mb-4">Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-secondary/20 p-4 rounded-md">
                    <h4 className="font-medium mb-2">1 Hour</h4>
                    <p className="text-2xl font-bold text-lucoin">{escort.rates?.hourly || escort.price} LC</p>
                  </div>
                  
                  {escort.rates?.twoHours && (
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-2">2 Hours</h4>
                      <p className="text-2xl font-bold text-lucoin">{escort.rates.twoHours} LC</p>
                    </div>
                  )}
                  
                  {escort.rates?.overnight && (
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Overnight</h4>
                      <p className="text-2xl font-bold text-lucoin">{escort.rates.overnight} LC</p>
                    </div>
                  )}
                  
                  {escort.rates?.weekend && (
                    <div className="bg-secondary/20 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Weekend</h4>
                      <p className="text-2xl font-bold text-lucoin">{escort.rates.weekend} LC</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-4 border border-dashed border-gray-600 rounded-md">
                  <h4 className="font-semibold mb-2">Payment Methods</h4>
                  <p className="text-sm text-gray-300">Cash, LuCoin, and major credit cards accepted. Payment must be made at the beginning of our meeting.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="safety">
                <SafetyTips />
                
                <div className="mt-6">
                  <VerificationBadge level={escort.verificationLevel || "basic"} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
