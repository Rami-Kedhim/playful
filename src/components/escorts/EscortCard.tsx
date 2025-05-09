import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageCircle, Star, Clock, Check, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export interface EscortCardProps {
  id: string;
  name: string;
  age?: number;
  location?: string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  imageUrl: string;
  price: number;
  verified?: boolean;
  gender: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  responseRate?: number;
  featured?: boolean;
  providesInPersonServices?: boolean;
  providesVirtualContent?: boolean;
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
  responseRate,
  featured,
  providesInPersonServices,
  providesVirtualContent
}) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? 'border-primary' : ''}`}>
      <div className="relative">
        <Link to={`/escorts/${id}`}>
          <img
            src={imageUrl || '/placeholder-escort.jpg'}
            alt={name}
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        {verified && (
          <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
            <Check className="mr-1 h-3 w-3" /> Verified
          </Badge>
        )}
        
        {availableNow && (
          <Badge className="absolute bottom-2 left-2 bg-green-600 text-white">
            Available Now
          </Badge>
        )}
        
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{rating || 0}</span>
            <span className="text-xs text-muted-foreground">({reviews || 0})</span>
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/escorts/${id}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{name}</h3>
          </Link>
          <Badge variant="outline">{gender}</Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location || 'Location not specified'}</span>
        </div>
        
        {sexualOrientation && (
          <div className="text-sm text-muted-foreground mb-2">
            {sexualOrientation}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags && tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-medium">
            ${price}/hr
          </div>
          
          <div className="flex items-center gap-1">
            {providesInPersonServices && (
              <Badge variant="outline" className="text-xs">In-Person</Badge>
            )}
            {providesVirtualContent && (
              <Badge variant="outline" className="text-xs">Virtual</Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{responseRate ? `${responseRate}% response` : 'New'}</span>
        </div>
        
        <div className="flex gap-2">
          <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Add to favorites">
            <Heart className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-primary transition-colors" aria-label="Send message">
            <MessageCircle className="h-5 w-5" />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EscortCard;
