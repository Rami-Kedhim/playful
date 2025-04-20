
// Added `featured` to props type to fix TS errors on usage.

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface EscortCardProps {
  id: string;
  name: string;
  age: number;
  location: string;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
  gender: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: Date;
  responseRate?: number;
  featured?: boolean;
}

const EscortCard: React.FC<EscortCardProps> = ({
  id,
  name,
  age,
  location,
  rating,
  reviews,
  tags,
  imageUrl,
  price,
  verified,
  gender,
  sexualOrientation,
  availableNow,
  lastActive,
  responseRate,
  featured,
}) => {
  return (
    <Link to={`/escorts/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={imageUrl || "https://via.placeholder.com/300x400"} 
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          
          {verified && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
              <CheckCircle className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
          
          {availableNow && (
            <Badge className="absolute top-2 left-2 bg-blue-500 text-white border-0">
              Available Now
            </Badge>
          )}

          {featured && (
            <Badge className="absolute bottom-2 right-2 bg-yellow-400 text-black border-0">
              Featured
            </Badge>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="text-white font-medium">
              {name}, {age}
            </div>
            <div className="text-white/80 text-sm flex items-center">
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({reviews})</span>
            </div>
            <span className="font-bold text-green-600">${price}/hr</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          {lastActive && (
            <div className="text-gray-500 text-xs flex items-center mt-2">
              <Clock className="h-3 w-3 mr-1" />
              {availableNow 
                ? 'Online now'
                : `Active ${formatDistanceToNow(lastActive, { addSuffix: true })}`
              }
            </div>
          )}
          
          {responseRate !== undefined && (
            <div className="text-gray-500 text-xs mt-1">
              Response rate: {responseRate}%
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default EscortCard;
