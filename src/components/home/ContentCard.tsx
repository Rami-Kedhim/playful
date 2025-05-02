
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Star, Shield, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ContentCardProps {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
  rating?: number;
  isPremium?: boolean;
  price?: number;
  content?: any; // For compatibility with ContentGallery
  onEnhance?: () => void;
  isEnhancing?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  id, 
  name, 
  imageUrl, 
  location, 
  rating, 
  isPremium, 
  price,
  content,
  onEnhance,
  isEnhancing
}) => {
  // If we receive a content object, extract properties from it
  const contentData = content || {};
  const displayId = content?.id || id;
  const displayName = content?.title || name;
  const displayImageUrl = content?.image || imageUrl;

  return (
    <Card className="overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={displayImageUrl}
          alt={displayName}
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
            <h3 className="font-medium text-lg">{displayName}</h3>
            {location && <p className="text-sm text-muted-foreground">{location}</p>}
            {contentData.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {contentData.description}
              </p>
            )}
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
        
        {onEnhance && (
          <Button 
            onClick={onEnhance} 
            className="w-full mt-3 flex items-center justify-center"
            variant="secondary"
            disabled={isEnhancing}
          >
            {isEnhancing ? (
              <span className="flex items-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                Enhancing...
              </span>
            ) : (
              <span className="flex items-center">
                <Wand2 className="mr-2 h-4 w-4" />
                Enhance Content
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentCard;
