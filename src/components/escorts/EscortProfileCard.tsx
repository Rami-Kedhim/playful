import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  Phone,
  Video,
  MapPin,
  Star,
  Clock,
  Heart,
  CalendarClock,
  Languages,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Verified,
  Info,
  Check
} from 'lucide-react';
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';

interface EscortProfileCardProps {
  escort: Escort;
}

const EscortProfileCard: React.FC<EscortProfileCardProps> = ({ escort }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const gallery = escort.gallery || [];
  const allImages = [escort.imageUrl, ...gallery].filter(Boolean);
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "This escort has been removed from your favorites" : "This escort has been added to your favorites",
    });
  };

  const handleContact = (type: 'message' | 'call' | 'video') => {
    if (type === 'message') {
      toast({
        title: "Message feature",
        description: "Opening messaging with this escort...",
      });
    } else if (type === 'call') {
      toast({
        title: "Call feature",
        description: "Initiating call to this escort...",
      });
    } else if (type === 'video') {
      toast({
        title: "Video call feature",
        description: "Starting a video call with this escort...",
      });
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Gallery with navigation */}
        <div className="relative aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9]">
          <img 
            src={allImages[activeImageIndex]} 
            alt={escort.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Image counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {activeImageIndex + 1} / {allImages.length}
          </div>
          
          {/* Thumbnail strip */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-center">
            <div className="bg-black/60 rounded-full p-1 flex space-x-1">
              {allImages.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-2 h-2 rounded-full ${idx === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Image ${idx + 1}`}
                />
              ))}
              {allImages.length > 5 && (
                <button
                  onClick={() => setIsGalleryExpanded(true)}
                  className="w-2 h-2 rounded-full bg-white/50"
                  aria-label="More images"
                />
              )}
            </div>
          </div>
          
          {/* Verification badge */}
          {escort.verified && (
            <div className="absolute top-2 left-2">
              <Badge variant="default" className="bg-blue-500 flex items-center gap-1 px-2.5 py-1">
                <Verified className="h-3 w-3" />
                <span className="text-xs font-medium">Verified</span>
              </Badge>
            </div>
          )}
          
          {/* Featured badge */}
          {escort.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-yellow-500 flex items-center gap-1 px-2.5 py-1">
                <Star className="h-3 w-3" />
                <span className="text-xs font-medium">Featured</span>
              </Badge>
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        {/* Basic info */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{escort.name}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>{escort.location}</span>
              <span>•</span>
              <span>{escort.age} years</span>
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 font-medium">{escort.rating}</span>
                <span className="ml-1 text-sm text-muted-foreground">({escort.reviews || 0})</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFavorite}
            className={isFavorite ? "text-red-500 hover:text-red-600" : ""}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
          </Button>
        </div>
        
        {/* Contact options */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-1.5"
            onClick={() => handleContact('message')}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Message</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-1.5"
            onClick={() => handleContact('call')}
          >
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </Button>
          
          <Button 
            variant="default" 
            className="flex items-center justify-center gap-1.5"
            onClick={() => handleContact('video')}
          >
            <Video className="h-4 w-4" />
            <span>Video</span>
          </Button>
        </div>
        
        {/* Availability */}
        <div className="flex items-center justify-between p-2 rounded-md bg-secondary">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" /> 
            <span className="text-sm font-medium">
              {escort.availableNow ? 'Available now' : 'Not available'}
            </span>
          </div>
          
          {escort.availability?.hours && (
            <div className="text-xs text-muted-foreground">
              {typeof escort.availability === 'object' && 'hours' in escort.availability ? 
                Array.isArray(escort.availability.hours) ? 
                  escort.availability.hours.join(', ') : 
                  escort.availability.hours 
                : ''}
            </div>
          )}
        </div>
        
        {/* Tabs for different sections */}
        <Tabs defaultValue="info" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="rates">Rates</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4 pt-3">
            {/* Bio */}
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                <Info className="h-4 w-4 text-muted-foreground" />
                About
              </h3>
              <p className="text-sm">{escort.bio || 'No bio available'}</p>
            </div>
            
            {/* Physical attributes if available */}
            {(escort.height || escort.weight || escort.measurements || escort.hairColor || escort.eyeColor || escort.ethnicity) && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {escort.height && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Height</span>
                    <span>{escort.height} cm</span>
                  </div>
                )}
                
                {escort.weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Weight</span>
                    <span>{escort.weight} kg</span>
                  </div>
                )}
                
                {escort.measurements && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Measurements</span>
                    <span>
                      {typeof escort.measurements === 'object' ? 
                        `${escort.measurements.bust || '-'}-${escort.measurements.waist || '-'}-${escort.measurements.hips || '-'}` : 
                        escort.measurements}
                    </span>
                  </div>
                )}
                
                {escort.hairColor && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hair</span>
                    <span>{escort.hairColor}</span>
                  </div>
                )}
                
                {escort.eyeColor && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Eyes</span>
                    <span>{escort.eyeColor}</span>
                  </div>
                )}
                
                {escort.ethnicity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ethnicity</span>
                    <span>{escort.ethnicity}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Languages */}
            {escort.languages && escort.languages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-1">
                  {escort.languages.map((language, idx) => (
                    <Badge variant="outline" key={idx}>{language}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Availability days */}
            {escort.availability && (
              <div>
                <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  Available Days
                </h3>
                <div className="flex flex-wrap gap-1">
                  {typeof escort.availability === 'object' && 'days' in escort.availability && 
                    escort.availability.days && 
                    escort.availability.days.map((day, idx) => (
                      <Badge key={idx} variant="secondary" className="capitalize">{day}</Badge>
                    ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="services" className="pt-3">
            <div className="space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-1">
                <Check className="h-4 w-4 text-muted-foreground" />
                Services Offered
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                {escort.services?.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
                
                {(!escort.services || escort.services.length === 0) && (
                  <p className="text-sm text-muted-foreground">No services listed</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rates" className="pt-3">
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                Rates
              </h3>
              
              <div className="space-y-2 mt-2">
                {escort.rates?.hourly && (
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">1 Hour</span>
                    <span className="font-medium">${escort.rates.hourly}</span>
                  </div>
                )}
                
                {escort.rates?.twoHours && (
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">2 Hours</span>
                    <span className="font-medium">${escort.rates.twoHours}</span>
                  </div>
                )}
                
                {escort.rates?.overnight && (
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">Overnight</span>
                    <span className="font-medium">${escort.rates.overnight}</span>
                  </div>
                )}
                
                {escort.rates?.weekend && (
                  <div className="flex justify-between items-center py-1 border-b">
                    <span className="text-sm">Weekend</span>
                    <span className="font-medium">${escort.rates.weekend}</span>
                  </div>
                )}
                
                {(!escort.rates || Object.keys(escort.rates).length === 0) && (
                  <p className="text-sm text-muted-foreground">No rates listed</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gallery" className="pt-3">
            <div className="grid grid-cols-3 gap-1">
              {allImages.map((image, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square cursor-pointer"
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img 
                    src={image} 
                    alt={`${escort.name} - image ${idx+1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              ))}
              
              {allImages.length === 0 && (
                <div className="col-span-3 py-8 text-center">
                  <p className="text-sm text-muted-foreground">No gallery images available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EscortProfileCard;
