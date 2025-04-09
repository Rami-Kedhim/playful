
import React from 'react';
import { Link } from 'react-router-dom';
import { Escort } from '@/types/escort';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Star, Clock, CheckCircle, MapPin, Heart } from 'lucide-react';

interface EscortCardProps {
  escort: Escort;
  featured?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

const EscortCard: React.FC<EscortCardProps> = ({ 
  escort, 
  featured = false,
  onFavoriteToggle
}) => {
  const {
    id,
    name,
    age,
    location,
    imageUrl,
    avatar_url,
    gallery,
    gallery_images,
    price,
    rating,
    reviews,
    verified,
    profileType,
    availableNow,
    boostLevel
  } = escort;

  // Default image if none provided
  const displayImage = imageUrl || avatar_url || 
    (gallery?.length ? gallery[0] : 
    (gallery_images?.length ? gallery_images[0] : 
    "https://via.placeholder.com/300x400"));

  // Format profile type badge
  const getBadgeVariant = () => {
    switch(profileType) {
      case 'verified': return 'default';
      case 'ai': return 'secondary';
      case 'provisional': return 'outline';
      default: return 'outline';
    }
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    if (onFavoriteToggle) {
      onFavoriteToggle(id);
    }
  };

  const cardContent = (
    <>
      <div className="relative">
        <AspectRatio ratio={3/4} className="bg-muted overflow-hidden">
          <img 
            src={displayImage} 
            alt={name} 
            className={`object-cover w-full h-full transition-transform duration-300 ${featured ? 'group-hover:scale-110' : 'group-hover:scale-105'}`}
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
          
          {boostLevel && boostLevel > 0 && (
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500 text-yellow-500">
              Featured
            </Badge>
          )}
        </div>
        
        {featured && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-bold text-lg text-white">{name}, {age}</h3>
            <div className="flex items-center text-white/80 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>
        )}
      </div>
      
      {!featured && (
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-lg truncate">{name}, {age}</h3>
            <span className="text-primary font-bold">${price}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{location}</span>
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
          
          {/* Action buttons */}
          <div className="mt-3 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleFavoriteToggle}
              className="p-0 hover:bg-transparent hover:text-primary"
            >
              <Heart className="h-4 w-4" />
            </Button>
            
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </div>
        </div>
      )}
    </>
  );

  if (featured) {
    return (
      <Link to={`/escorts/${id}`}>
        <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all h-full">
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/escorts/${id}`} className="block h-full">
      <Card className="group overflow-hidden hover:shadow-md transition-all h-full">
        {cardContent}
      </Card>
    </Link>
  );
};

export default EscortCard;
