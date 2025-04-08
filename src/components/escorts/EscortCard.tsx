
import React from 'react';
import { Link } from 'react-router-dom';
import { Escort } from '@/types/escort';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock, CheckCircle } from 'lucide-react';

interface EscortCardProps {
  escort: Escort;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort }) => {
  // Extract necessary properties
  const {
    id,
    name,
    age,
    location,
    imageUrl,
    avatar_url,
    price,
    rating,
    reviews,
    verified,
    profileType,
    availableNow,
  } = escort;

  // Default image if none provided
  const displayImage = imageUrl || avatar_url || "https://via.placeholder.com/300x400";

  // Format profile type badge
  const getBadgeVariant = () => {
    switch(profileType) {
      case 'verified': return 'default';
      case 'ai': return 'secondary';
      case 'provisional': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Link 
      to={`/escorts/${id}`} 
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
    >
      <div className="relative">
        <AspectRatio ratio={3/4} className="bg-muted">
          <img 
            src={displayImage} 
            alt={name} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </AspectRatio>
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {verified && (
            <Badge variant="default" className="bg-primary">
              <CheckCircle className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
          
          {!verified && profileType === 'ai' && (
            <Badge variant="secondary">AI Model</Badge>
          )}
          
          {availableNow && (
            <Badge variant="success" className="bg-green-500 text-white">
              <Clock className="h-3 w-3 mr-1" /> Available Now
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <span className="text-primary font-bold">${price}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <span>{age} • {location}</span>
        </div>
        
        {rating > 0 && (
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm ml-1 font-medium">{rating.toFixed(1)}</span>
            {reviews > 0 && (
              <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default EscortCard;
