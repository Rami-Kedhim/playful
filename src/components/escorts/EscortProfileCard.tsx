import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, CheckCircle, Calendar, Clock, Languages } from 'lucide-react';
import { Escort, Availability } from '@/types/escort';

interface EscortProfileCardProps {
  escort: Escort;
  className?: string;
}

const EscortProfileCard: React.FC<EscortProfileCardProps> = ({ escort, className }) => {
  const [activeTab, setActiveTab] = useState("about");
  const { 
    name, 
    age, 
    location, 
    verified, 
    rating, 
    reviews, 
    profileImage, 
    imageUrl,
    availability,
    gallery
  } = escort;

  // Helper to safely get images
  const getImages = () => {
    if (Array.isArray(escort.images)) return escort.images;
    if (gallery && Array.isArray(gallery.imageUrls)) return gallery.imageUrls;
    return [];
  };

  const images = getImages();
  const displayImage = profileImage || imageUrl || (images.length > 0 ? images[0] : '');

  // Helper to handle availability display
  const renderAvailability = () => {
    if (!availability) return <p className="text-gray-500">No availability information provided</p>;

    if (Array.isArray(availability)) {
      // Handle array of availability objects
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {availability.map((avail, index) => (
            <div key={index} className="p-2 bg-secondary/10 rounded-md">
              <div className="font-medium">
                {avail.days.join(', ')}
              </div>
              <div className="text-sm text-muted-foreground">
                {avail.hours.join(', ')}
              </div>
              {avail.customNotes && (
                <div className="text-xs italic mt-1">{avail.customNotes}</div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      // Handle single availability object
      return (
        <div className="p-2 bg-secondary/10 rounded-md">
          <div className="font-medium">
            {availability.days.join(', ')}
          </div>
          <div className="text-sm text-muted-foreground">
            {availability.hours.join(', ')}
          </div>
          {availability.customNotes && (
            <div className="text-xs italic mt-1">{availability.customNotes}</div>
          )}
        </div>
      );
    }
  };

  // Helper to extract body stats from escort object
  const getBodyStats = () => {
    const { height, weight, measurements, hairColor, eyeColor, ethnicity } = escort;
    
    let formattedMeasurements = "Not specified";
    if (measurements) {
      if (typeof measurements === 'string') {
        formattedMeasurements = measurements;
      } else {
        formattedMeasurements = `${measurements.bust || '-'}-${measurements.waist || '-'}-${measurements.hips || '-'}`;
      }
    }
    
    return {
      height: height ? `${height} cm` : "Not specified",
      weight: weight ? `${weight} kg` : "Not specified",
      measurements: formattedMeasurements,
      hairColor: hairColor || "Not specified",
      eyeColor: eyeColor || "Not specified",
      ethnicity: ethnicity || "Not specified"
    };
  };

  const bodyStats = getBodyStats();

  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative">
        <img
          src={displayImage || "https://via.placeholder.com/400x600"}
          alt={name}
          className="aspect-square object-cover w-full h-full"
        />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <CardHeader className="space-y-0.5">
          <CardTitle className="text-lg font-semibold">{name}, {age}</CardTitle>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
        </CardHeader>
        
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{rating?.toFixed(1) || 'N/A'}</span>
          <span className="text-gray-500 text-sm ml-1">({reviews || 0} reviews)</span>
        </div>
        
        <Tabs defaultValue="about" className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="about" onClick={() => setActiveTab("about")} className="text-xs">About</TabsTrigger>
            <TabsTrigger value="details" onClick={() => setActiveTab("details")} className="text-xs">Details</TabsTrigger>
            <TabsTrigger value="availability" onClick={() => setActiveTab("availability")} className="text-xs">Availability</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="mt-4">
            <div className="text-sm text-gray-600">
              {escort.bio || "No bio available."}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Height:</span>
                <span className="ml-1 text-gray-500">{bodyStats.height}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Weight:</span>
                <span className="ml-1 text-gray-500">{bodyStats.weight}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Measurements:</span>
                <span className="ml-1 text-gray-500">{bodyStats.measurements}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Hair Color:</span>
                <span className="ml-1 text-gray-500">{bodyStats.hairColor}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Eye Color:</span>
                <span className="ml-1 text-gray-500">{bodyStats.eyeColor}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Ethnicity:</span>
                <span className="ml-1 text-gray-500">{bodyStats.ethnicity}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="font-semibold text-gray-700">Languages:</span>
              <div className="flex space-x-2 mt-1">
                {escort.languages && escort.languages.length > 0 ? (
                  escort.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{lang}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">Not specified</span>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="mt-4">
            {renderAvailability()}
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <span className="font-semibold text-gray-700">Services:</span>
          <div className="flex space-x-2 mt-1">
            {escort.services && escort.services.length > 0 ? (
              escort.services.map((service, index) => (
                <Badge key={index} variant="secondary" className="text-xs">{service}</Badge>
              ))
            ) : (
              <span className="text-gray-500 text-sm">Not specified</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortProfileCard;
