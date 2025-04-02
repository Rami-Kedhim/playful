
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageSquare, Calendar, Heart, Users } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import StarRating from "@/components/ui/StarRating";

interface EscortCardProps {
  id: string;
  name: string;
  location: string;
  age: number;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  isContentCreator?: boolean;
  creatorUsername?: string;
}

const EscortCard = ({
  id,
  name,
  location,
  age,
  rating,
  reviews,
  tags,
  imageUrl,
  price,
  verified,
  gender,
  sexualOrientation,
  isContentCreator,
  creatorUsername
}: EscortCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const favorited = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
    
    toast({
      title: favorited ? "Removed from favorites" : "Added to favorites",
      description: favorited 
        ? `${name} has been removed from your favorites` 
        : `${name} has been added to your favorites`,
    });
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (creatorUsername) {
      window.location.href = `/creators/${creatorUsername}`;
    }
  };

  return (
    <Link to={`/escorts/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full bg-card border-border">
        <div className="relative">
          <AspectRatio ratio={2/3}>
            <img 
              src={imageUrl} 
              alt={name} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm ${
              favorited ? "text-red-500" : "text-white"
            }`}
            onClick={handleFavoriteClick}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={18} fill={favorited ? "currentColor" : "none"} />
          </Button>
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {verified && (
              <Badge className="bg-primary text-primary-foreground">
                Verified
              </Badge>
            )}
            <Badge className="bg-amber-600">In Person</Badge>
            {isContentCreator && (
              <Badge 
                className="bg-purple-600 cursor-pointer"
                onClick={handleCreatorClick}
              >
                <Users size={12} className="mr-1" />
                Creator
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-lucoin text-white">
              {price} LC/hr
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{name}, {age}</h3>
            <div className="flex items-center">
              <StarRating rating={rating} size={14} />
              <span className="text-sm ml-1">
                {rating} <span className="text-gray-400">({reviews})</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
          
          {(gender || sexualOrientation) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {gender && (
                <Badge variant="secondary" className="text-xs capitalize">
                  {gender}
                </Badge>
              )}
              {sexualOrientation && (
                <Badge variant="secondary" className="text-xs capitalize">
                  {sexualOrientation}
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/80">
              <MessageSquare size={14} className="mr-2" />
              Chat
            </Button>
            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/80">
              <Calendar size={14} className="mr-2" />
              Book
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default EscortCard;
