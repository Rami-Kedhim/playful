
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/utils/navigation';
import { VerificationBadge } from '../verification/VerificationBadge';
import { getVerificationLevel } from '@/utils/personaHelpers';

// Import from the uppercase version to avoid casing issues
import { Escort } from '@/types/Escort';

interface EscortCardProps {
  escort: Escort;
  featured?: boolean;
  onClick?: () => void;
  className?: string;
}

const EscortCard: React.FC<EscortCardProps> = ({ 
  escort, 
  featured = false,
  onClick,
  className = ''
}) => {
  // Fallback image in case none are provided
  const imageSrc = escort.images && escort.images[0] 
    ? escort.images[0] 
    : 'https://via.placeholder.com/300x400';
  
  // Handle card click
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <Card 
      className={`overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer ${featured ? 'border-primary/50 shadow-md' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-[3/4] relative">
        <img 
          src={imageSrc} 
          alt={escort.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {featured && (
            <Badge className="bg-primary">Featured</Badge>
          )}
          {(escort.isVerified || escort.is_verified) && (
            <VerificationBadge level={getVerificationLevel(escort.verificationLevel)} />
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{escort.name}</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {escort.location || 'Location not specified'}
          </div>
          <div className="text-sm font-medium">
            ${escort.price}/hr
          </div>
        </div>
        {escort.tags && escort.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {escort.tags.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {escort.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{escort.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortCard;
