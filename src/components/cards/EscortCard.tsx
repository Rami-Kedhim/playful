
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Escort } from '@/types/escort';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star } from 'lucide-react';
import ProfileTypeBadge from '../escorts/profile/ProfileTypeBadge';

interface EscortCardProps {
  escort: Escort;
  featured?: boolean;
  className?: string;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort, featured = false, className = '' }) => {
  return (
    <Card 
      className={`overflow-hidden h-full transition-all hover:shadow-md ${featured ? 'border-primary/30' : ''} ${className}`}
    >
      <Link to={`/escort/${escort.id}`} className="block h-full">
        <div className="relative">
          <img 
            src={escort.imageUrl || escort.avatar_url} 
            alt={escort.name}
            className="w-full aspect-[3/4] object-cover"
          />
          
          <div className="absolute top-2 right-2 flex flex-col gap-1.5">
            {/* Profile type badge - addressing profile type differentiation issue */}
            <ProfileTypeBadge type={escort.profileType || 'provisional'} />

            {/* Show available now badge if escort is available */}
            {escort.availableNow && (
              <Badge className="bg-green-500">
                Available Now
              </Badge>
            )}
            
            {/* Show boosted badge if escort has boost level */}
            {(escort.boostLevel && escort.boostLevel > 0) && (
              <Badge className="bg-yellow-500/90">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Boosted
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3 text-white">
            <h3 className="font-semibold text-lg mb-0.5">
              {escort.name}, {escort.age}
            </h3>
            
            <div className="flex items-center text-sm text-white/90">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{escort.location}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Rating 
                value={escort.rating} 
                readOnly 
                size="sm" 
              />
              <span className="ml-1 text-sm text-muted-foreground">
                ({escort.reviews})
              </span>
            </div>
            
            <div className="text-sm text-secondary-foreground font-semibold">
              {escort.rates.hourly} LC/hr
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-2">
            {escort.services.slice(0, 3).map((service, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-normal">
                {service}
              </Badge>
            ))}
            {escort.services.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{escort.services.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {escort.availability.days.length === 7 
              ? "Available every day" 
              : `Available ${escort.availability.days.length} days/week`}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default EscortCard;
