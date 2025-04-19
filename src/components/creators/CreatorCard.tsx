
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export interface CreatorProfileProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  premium?: boolean;
  price?: number;
}

const CreatorCard: React.FC<CreatorProfileProps> = ({
  id,
  name,
  image,
  location,
  rating,
  premium,
  price
}) => {
  return (
    <Link to={`/creators/${id}`}>
      <Card className="w-64 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className="w-full h-40 object-cover"
          />
          {premium && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500">
              Premium
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">{location}</span>
            {price !== undefined && (
              <span className="font-medium">${price}/mo</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CreatorCard;
