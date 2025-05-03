
import React from "react";
import { Creator } from "@/hooks/useCreators";
import { Heart, Users, Star, Zap, Bot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/contexts/FavoritesContext";

interface CreatorHeaderProps {
  creator: Creator;
  isSubscribed: boolean;
  isFavorite: boolean;
}

const CreatorHeader: React.FC<CreatorHeaderProps> = ({ 
  creator,
  isSubscribed,
  isFavorite 
}) => {
  const { toggleFavorite } = useFavorites();
  
  const handleFavoriteToggle = () => {
    toggleFavorite('creators', creator.id);
  };
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-40 md:h-64 w-full rounded-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img
          src={creator.imageUrl}
          alt={`${creator.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Section */}
      <div className="relative z-20 px-4 py-4 -mt-20 md:-mt-24">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background">
            <AvatarImage src={creator.imageUrl} alt={creator.name} />
            <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white md:text-foreground">{creator.name}</h1>
              
              {creator.isPremium && (
                <Badge className="bg-amber-500">
                  <Zap className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              
              {creator.isAI && (
                <Badge className="bg-purple-500">
                  <Bot className="h-3 w-3 mr-1" />
                  AI Generated
                </Badge>
              )}
              
              {isSubscribed && (
                <Badge className="bg-green-500">Subscribed</Badge>
              )}
            </div>
            
            <div className="flex items-center mt-1 text-white md:text-muted-foreground">
              <p className="text-sm">@{creator.username}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-2 text-white md:text-foreground">
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>{creator.subscriberCount.toLocaleString()} subscribers</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{creator.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="ghost" 
              size="sm"
              className={isFavorite ? "text-red-500" : "text-white md:text-foreground"}
              onClick={handleFavoriteToggle}
            >
              <Heart 
                className="h-5 w-5" 
                fill={isFavorite ? "currentColor" : "none"} 
              />
            </Button>
          </div>
        </div>
        
        {creator.bio && (
          <div className="mt-4 max-w-3xl text-white md:text-foreground">
            <p className="text-sm md:text-base">{creator.bio}</p>
          </div>
        )}
        
        {creator.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {creator.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorHeader;
