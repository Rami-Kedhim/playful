
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock } from 'lucide-react';
import { VerificationBadge } from '@/components/verification/VerificationBadge';

interface EscortCardProps {
  escort: any;
  featured?: boolean;
  onClick?: () => void;
  className?: string;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort, featured = false, onClick, className = "" }) => {
  // Safe access to potentially undefined properties
  const name = escort.name || 'Anonymous';
  const location = escort.location || 'Unknown Location';
  const rating = escort.rating || 0;
  const services = Array.isArray(escort.services) ? escort.services : [];
  const imageUrl = escort.imageUrl || escort.avatarUrl || 'https://via.placeholder.com/300x400';
  
  // Default to 'basic' if verificationLevel is not one of the allowed values
  const verificationLevel: 'basic' | 'advanced' | 'premium' = 
    escort.verificationLevel === 'advanced' || escort.verificationLevel === 'premium' 
      ? escort.verificationLevel 
      : 'basic';

  return (
    <Card 
      className={`overflow-hidden h-full transition-all duration-200 hover:shadow-md cursor-pointer ${featured ? 'border-primary' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {featured && (
          <Badge className="absolute top-2 right-2" variant="default">
            Featured
          </Badge>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium truncate">{name}</h3>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
              <span className="text-white text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center text-sm mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span className="text-muted-foreground truncate">{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <VerificationBadge level={verificationLevel} size="sm" />
          
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Quick Reply</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {services.slice(0, 3).map((service, index) => (
            <Badge key={index} variant="outline" className="text-xs">{service}</Badge>
          ))}
          {services.length > 3 && (
            <Badge variant="outline" className="text-xs">+{services.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="text-sm">
          <span className="font-medium">From $</span>
          <span className="text-muted-foreground">{escort.priceFrom || '150'}/hr</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EscortCard;
