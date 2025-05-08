
import React from 'react';
import { Escort } from '@/types/escort';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Phone, Mail, Globe, Heart } from 'lucide-react';

interface EscortDetailProps {
  escort: Escort;
  onBookNow: () => void;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

const EscortDetail: React.FC<EscortDetailProps> = ({
  escort,
  onBookNow,
  onToggleFavorite,
  isFavorite = false
}) => {
  const { toast } = useToast();
  
  const handleContactClick = () => {
    toast({
      title: "Contact Information",
      description: "Contact details have been copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Image */}
      <div className="md:col-span-2">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={escort.images?.[0] || '/placeholder-large.jpg'} 
            alt={escort.name}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Additional images grid */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {escort.images?.slice(1, 5).map((img, index) => (
            <div key={index} className="aspect-square rounded overflow-hidden">
              <img src={img} alt={`${escort.name} ${index + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Details Panel */}
      <div>
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{escort.name}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className="hover:bg-muted"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-muted-foreground'}`} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={escort.verified ? "success" : "outline"}>
            {escort.verified ? "Verified" : "Unverified"}
          </Badge>
          
          <div className="text-amber-500 flex items-center">
            <Star size={16} className="fill-amber-500" />
            <span className="ml-1 font-medium">{escort.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">({escort.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>{escort.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span>${escort.rates?.hourly} per hour</span>
          </div>
        </div>
        
        <div className="my-4">
          <h3 className="font-semibold mb-1">Bio</h3>
          <p className="text-sm text-muted-foreground">{escort.bio}</p>
        </div>
        
        <div className="my-4">
          <h3 className="font-semibold mb-2">Services</h3>
          <div className="flex flex-wrap gap-2">
            {escort.services?.map((service, index) => (
              <Badge key={index} variant="outline">{service}</Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-3 mt-6">
          <Button className="w-full" onClick={onBookNow}>
            Book Now
          </Button>
          
          <Button variant="outline" className="w-full" onClick={handleContactClick}>
            Contact
          </Button>
        </div>
        
        {escort.contactInfo && (
          <div className="mt-6 p-3 bg-muted/30 rounded-md space-y-2 text-sm">
            <h3 className="font-semibold">Contact Information</h3>
            
            {escort.contactInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-muted-foreground" />
                <span>{escort.contactInfo.phone}</span>
              </div>
            )}
            
            {escort.contactInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-muted-foreground" />
                <span>{escort.contactInfo.email}</span>
              </div>
            )}
            
            {escort.contactInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-muted-foreground" />
                <span>{escort.contactInfo.website}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EscortDetail;
