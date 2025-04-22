
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIProfile } from '@/types/ai-profile';

interface AIProfileCardProps {
  profile: AIProfile;
  onAction?: (profile: AIProfile) => void;
  actionLabel?: string;
  showBadges?: boolean;
}

const AIProfileCard: React.FC<AIProfileCardProps> = ({
  profile,
  onAction,
  actionLabel = 'Chat Now',
  showBadges = true
}) => {
  const {
    id,
    name,
    displayName,
    imageUrl,
    thumbnailUrl,
    description,
    type,
    tags = []
  } = profile;

  // Display profile type with proper formatting
  const profileType = type || 'companion';
  const formattedType = profileType.charAt(0).toUpperCase() + profileType.slice(1);

  // Handle action button click
  const handleAction = () => {
    if (onAction) {
      onAction(profile);
    }
  };

  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-all border border-white/5">
      <div className="relative">
        <Link to={`/ai-profile/${id}`}>
          <img
            src={thumbnailUrl || imageUrl}
            alt={name || displayName}
            className="w-full aspect-[4/5] object-cover"
            loading="lazy"
          />
        </Link>
        
        {showBadges && (
          <div className="absolute top-2 right-2">
            <Badge variant="default" className="bg-primary/80 backdrop-blur-sm">
              {formattedType}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <Link to={`/ai-profile/${id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg mb-1">{displayName || name}</h3>
        </Link>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {onAction && (
          <Button 
            onClick={handleAction} 
            className="w-full"
            variant="default"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProfileCard;
