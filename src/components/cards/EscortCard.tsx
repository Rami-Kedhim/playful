import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageSquare, Calendar, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

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
  sexualOrientation
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
          
          {verified && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Verified
            </Badge>
          )}
          
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
              <Star size={14} className="text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-sm">
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
          
          <div className="flex space-x-2 mt-auto">
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
