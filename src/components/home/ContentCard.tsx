
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export interface ProfileProps {
  id: string;
  name: string;
  imageUrl?: string;      // added optional to fix TS errors related to missing imageUrl
  location?: string;
  rating?: number;
  isPremium?: boolean;    // added optional to fix TS errors related to missing isPremium
  price?: number;
}

const ContentCard: React.FC<ProfileProps> = ({
  id,
  name,
  imageUrl,
  location,
  rating,
  isPremium,
  price
}) => {
  return (
    <Card className="w-64 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-40 object-cover"
        />
        {isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-300 text-black">
            Premium
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            {rating && (
              <div className="flex items-center mr-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm ml-1">{rating}</span>
              </div>
            )}
            {location && (
              <span className="text-xs text-muted-foreground">{location}</span>
            )}
          </div>
          {price !== undefined && (
            <span className="font-medium">${price}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;

