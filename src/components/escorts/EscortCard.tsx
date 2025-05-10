
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Star, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface EscortCardProps {
  id: string;
  name: string;
  age?: number;
  location: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
  gender: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  responseRate?: number;
  lastActive?: Date; 
  featured?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
}

const EscortCard: React.FC<EscortCardProps> = ({
  id,
  name,
  age,
  location,
  rating = 0,
  reviews = 0,
  tags = [],
  imageUrl,
  price,
  verified,
  gender,
  sexualOrientation,
  availableNow,
  responseRate,
  lastActive,
  featured,
  providesInPersonServices,
  providesVirtualContent,
}) => {
  return (
    <Card className="overflow-hidden transition-transform hover:-translate-y-1 h-full">
      <div className="relative">
        <img 
          src={imageUrl || '/default-escort.jpg'} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        {verified && (
          <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )}
        {availableNow && (
          <Badge className="absolute bottom-2 left-2 bg-green-600 text-white">
            Available Now
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{name}{age && <span className="text-muted-foreground ml-1">{age}</span>}</h3>
          <Badge variant="outline">{gender}</Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {location || 'Location not specified'}
        </div>
        
        {rating > 0 && (
          <div className="flex items-center text-sm mb-3">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span>
              {rating.toFixed(1)} ({reviews} {reviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        )}
        
        {lastActive && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Clock className="h-3 w-3 mr-1" />
            <span>Active {formatDistanceToNow(new Date(lastActive), { addSuffix: true })}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm font-semibold mb-3">
          ${price}{price ? '/hr' : 'Contact for rates'}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link to={`/escorts/${id}`} className="block">
          <button className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
            View Profile
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EscortCard;
