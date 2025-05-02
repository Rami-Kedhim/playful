
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Star, Shield } from 'lucide-react';

export interface ContentCardProps {
  content: {
    id: string;
    name: string;
    imageUrl: string;
    location?: string;
    rating?: number;
    isPremium?: boolean;
    price?: number;
  }
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { id, name, imageUrl, location, rating, isPremium, price } = content;
  
  return (
    <Link to={`/profile/${id}`}>
      <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="h-[200px] w-full object-cover"
          />
          {isPremium && (
            <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Premium
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{name}</h3>
              {location && <p className="text-sm text-muted-foreground">{location}</p>}
            </div>
            {rating !== undefined && (
              <div className="flex items-center bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-xs">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" />
                {rating.toFixed(1)}
              </div>
            )}
          </div>
          {price !== undefined && (
            <div className="mt-2 font-medium text-sm">
              ${price} <span className="text-muted-foreground text-xs">/hour</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ContentCard;
