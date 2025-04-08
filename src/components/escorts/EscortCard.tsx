
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileTypeBadge from './profile/ProfileTypeBadge';

export interface EscortCardProps {
  name: string;
  age: number;
  location: string;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
  escortId: string;
  profileType: "verified" | "ai" | "provisional";
  availableNow: boolean;
}

const EscortCard: React.FC<EscortCardProps> = ({
  name,
  age,
  location,
  rating,
  reviews,
  tags,
  imageUrl,
  price,
  verified,
  escortId,
  profileType,
  availableNow
}) => {
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <Link to={`/escorts/${escortId}`} className="flex flex-col h-full">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover"
          />
          
          {availableNow && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Available Now
            </Badge>
          )}
          
          <div className="absolute bottom-2 right-2">
            <ProfileTypeBadge type={profileType} />
          </div>
          
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            ${price}/hr
          </div>
        </div>
        
        <CardContent className="pt-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold truncate">{name}, {age}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{location}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
            </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
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
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 border-t mt-auto">
          <div className="text-sm text-muted-foreground flex items-center">
            <span>View Profile</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default EscortCard;
