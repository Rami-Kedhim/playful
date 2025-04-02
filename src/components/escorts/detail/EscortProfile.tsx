
import { useState } from "react";
import { Escort } from "@/data/escortData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscortGallery from "./EscortGallery";
import EscortDetails from "./EscortDetails";
import EscortReviews from "./EscortReviews";
import EscortServices from "./EscortServices";
import { Heart, Calendar, MessageSquare, Star, Share2, MapPin } from "lucide-react";

interface EscortProfileProps {
  escort: Escort;
  onBookNow: () => void;
}

const EscortProfile = ({ escort, onBookNow }: EscortProfileProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Images */}
      <div className="lg:col-span-2">
        <EscortGallery escort={escort} />
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
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className={isFavorited ? "text-red-500" : ""}
                onClick={toggleFavorite}
              >
                <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
              </Button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="bg-gray-800 rounded-md px-3 py-1 flex items-center">
                <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                <span>{escort.rating.toFixed(1)}</span>
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
              <Button onClick={onBookNow} className="w-full">
                <Calendar size={16} className="mr-2" />
                Book Now
              </Button>
              
              <Button variant="outline" className="w-full">
                <MessageSquare size={16} className="mr-2" />
                Message
              </Button>
              
              <Button variant="ghost" className="w-full col-span-2">
                <Share2 size={16} className="mr-2" />
                Share Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
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
    </div>
  );
};

export default EscortProfile;
