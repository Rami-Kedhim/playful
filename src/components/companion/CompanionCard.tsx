import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Star } from 'lucide-react';
import { lucieAI } from '@/core/Lucie';

interface CompanionCardProps {
  id: string;
  name: string;
  description?: string;
  avatarUrl: string;
  tags?: string[];
  personality?: string;
  rating?: number;
  interactionCount?: number;
  isPremium?: boolean;
  onChat?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

/**
 * CompanionCard component for AI companions in the UberEscorts ecosystem
 * Connected to Lucie for AI orchestration
 */
const CompanionCard: React.FC<CompanionCardProps> = ({
  id,
  name,
  description,
  avatarUrl,
  tags = [],
  personality = 'Friendly',
  rating = 0,
  interactionCount = 0,
  isPremium = false,
  onChat,
  onFavorite
}) => {
  const handleChat = () => {
    // Log the interaction with Lucie
    console.log(`Starting chat with companion ${id}`);
    if (onChat) onChat(id);
  };
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite) onFavorite(id);
  };
  
  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md">
      <div className="relative">
        <div className="aspect-[2/3] overflow-hidden bg-gradient-to-b from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 border-0">
            Premium
          </Badge>
        )}
        
        <button
          onClick={handleFavorite}
          className="absolute top-2 left-2 p-1 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black/80"
        >
          <Heart className="h-5 w-5 text-pink-500" />
        </button>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          <span className="font-medium">Personality:</span> {personality}
        </div>
        
        <div className="text-xs text-gray-500">
          <MessageSquare className="h-3 w-3 inline mr-1" />
          {interactionCount.toLocaleString()} interactions
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleChat} className="w-full" variant="default">
          Chat Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanionCard;
