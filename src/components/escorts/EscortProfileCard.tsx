
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, Clock, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Escort } from '@/types/escort';

interface EscortProfileCardProps {
  escort: Escort;
  className?: string;
  showActions?: boolean;
}

const EscortProfileCard: React.FC<EscortProfileCardProps> = ({
  escort,
  className,
  showActions = true
}) => {
  // Default availability object with empty arrays
  const defaultAvailability = {
    days: [],
    hours: [],
    customNotes: ''
  };
  
  // Get the availability from the escort, or use defaults
  const availability = typeof escort.availability === 'string' 
    ? defaultAvailability 
    : (Array.isArray(escort.availability) && escort.availability.length > 0 
        ? { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], hours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], customNotes: '' } 
        : defaultAvailability);
  
  // Generate display name
  const displayName = escort.name || 'Anonymous';
  
  // Format price
  const formattedPrice = escort.price 
    ? `$${escort.price}` 
    : escort.rates?.hourly 
      ? `$${escort.rates.hourly}/hr` 
      : 'Price on request';
  
  // Get image from various possible properties
  const displayImage = escort.imageUrl || escort.avatarUrl || escort.avatar || escort.avatar_url || '/placeholders/escort-profile.jpg';
  
  return (
    <Card className={cn("h-full flex flex-col overflow-hidden", className)}>
      <div className="relative aspect-[3/4] overflow-hidden group">
        <img
          src={displayImage}
          alt={displayName}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {escort.verified && (
          <Badge className="absolute top-3 right-3 bg-primary text-white">
            Verified
          </Badge>
        )}
        {escort.availableNow && (
          <Badge variant="success" className="absolute top-3 left-3">
            Available Now
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{displayName}</h3>
            <div className="text-sm text-muted-foreground flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {escort.location || 'Location not specified'}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{escort.rating || '4.8'}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 pb-2 flex-grow">
        <div className="flex flex-wrap gap-1 mb-2">
          {escort.tags && escort.tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{availability.days?.length || 0} days available</span>
          </div>
          <div className="flex items-center text-muted-foreground mt-1">
            <Clock className="w-3 h-3 mr-1" />
            <span>{availability.hours?.length || 0} hours available</span>
          </div>
          {availability.customNotes && (
            <div className="mt-1 text-xs text-muted-foreground">
              Note: {availability.customNotes}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="font-semibold">{formattedPrice}</div>
        
        {showActions && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="w-4 h-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button asChild>
              <Link to={`/escorts/${escort.id}`}>View Profile</Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EscortProfileCard;
