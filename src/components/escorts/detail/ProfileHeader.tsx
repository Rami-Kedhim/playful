
import React from 'react';
import { ChevronLeft, Star, Shield, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Escort } from '@/types/escort';

interface ProfileHeaderProps {
  escort: Escort;
  onBookNow?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ escort, onBookNow }) => {
  return (
    <div className="w-full bg-gradient-to-b from-muted/50 to-background pt-6 pb-4">
      <div className="container">
        <div className="flex items-center gap-1 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/escorts" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to search
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[3/4] rounded-md overflow-hidden border">
              <img 
                src={escort.avatar || escort.imageUrl || escort.avatar_url || '/placeholders/escort-profile.jpg'} 
                alt={escort.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{escort.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{escort.location}</span>
                  
                  {(escort.verificationLevel || escort.verification_level) && (
                    <>
                      <span className="mx-2">•</span>
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="capitalize">
                        {escort.verificationLevel || escort.verification_level} verified
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                {escort.availableNow && (
                  <Badge variant="success" className="font-semibold">
                    Available Now
                  </Badge>
                )}
                
                <div className="flex items-center bg-muted rounded-full px-3 py-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium mr-1">{escort.rating || '4.8'}</span>
                  <span className="text-muted-foreground text-xs">({escort.reviewCount || 0} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {escort.services?.slice(0, 5).map((service, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {service}
                  </Badge>
                ))}
              </div>
              
              <p className="text-muted-foreground line-clamp-3">
                {escort.bio || escort.description || escort.about || 
                  "No description available for this profile yet."}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                <span className="text-sm">
                  Member since {escort.lastActive ? new Date(escort.lastActive).toLocaleDateString() : 'Recently joined'}
                </span>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline">Message</Button>
                <Button onClick={onBookNow}>Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
