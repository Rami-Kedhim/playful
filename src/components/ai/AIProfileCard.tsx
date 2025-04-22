
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { AIProfile } from '@/types/ai-profile';

export interface AIProfileCardProps {
  profile: AIProfile;
  onChatClick?: () => void;
  onAction?: (profile: AIProfile) => void;
  actionLabel?: string;
}

const AIProfileCard: React.FC<AIProfileCardProps> = ({
  profile,
  onChatClick,
  onAction,
  actionLabel = 'Chat Now'
}) => {
  const handleAction = () => {
    if (onAction) {
      onAction(profile);
    } else if (onChatClick) {
      onChatClick();
    }
  };

  const displayName = profile.displayName || profile.name;
  const imageUrl = profile.thumbnailUrl || profile.imageUrl || profile.avatarUrl;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={imageUrl || '/placeholder-profile.jpg'}
          alt={profile.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {profile.isPremium && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-300 text-white border-0">
            Premium
          </Badge>
        )}
      </div>
      
      <CardContent className="pt-4 pb-2 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg truncate">{displayName}</h3>
          {profile.rating && (
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-yellow-500 mr-1" />
              <span className="text-sm">{profile.rating}</span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {profile.description || profile.bio}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {profile.tags?.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Button 
          onClick={handleAction}
          className="w-full"
          variant="default"
        >
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIProfileCard;
