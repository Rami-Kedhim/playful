
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerificationBadge } from '../verification/VerificationBadge';
import { UberPersona } from '@/types/UberPersona';
import { hasRealMeets, hasVirtualMeets, hasContent, getVerificationLevel } from '@/utils/personaHelpers';

interface UberPersonaCardProps {
  persona: UberPersona;
  onClick?: () => void;
  className?: string;
}

const UberPersonaCard: React.FC<UberPersonaCardProps> = ({ 
  persona, 
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Use displayName or name fallback for display
  const displayName = persona.displayName || persona.name || "Unnamed";

  // Use avatarUrl or imageUrl or empty string fallback
  const imageSrc = persona.avatarUrl || persona.imageUrl || '';

  // Use featured flag from persona or false fallback
  const isFeatured = persona.featured ?? false;

  // Use isVerified from persona or false fallback
  // In UberPersona types isVerified is optional boolean
  const verified = persona.isVerified ?? false;

  // Fix verification level to acceptable levels only (e.g., 'none', 'basic', 'premium')
  // Assuming getVerificationLevel is safe and returns correct enum
  const verificationLevelSafe = getVerificationLevel(persona.verificationLevel || 'none');

  // Use persona.price if defined or default 0
  const price = persona.price ?? 0;

  return (
    <Card 
      className={`overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-[3/4] relative">
        <img 
          src={imageSrc} 
          alt={displayName}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {isFeatured && (
            <Badge className="bg-ubx">Featured</Badge>
          )}
          {verified && (
            <VerificationBadge level={verificationLevelSafe} />
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{displayName}</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {persona.location || 'Location not specified'}
          </div>
          <div className="text-sm font-medium">
            ${price}/hr
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          {hasRealMeets(persona) && (
            <Badge variant="outline" className="mr-1">Real Meets</Badge>
          )}
          {hasVirtualMeets(persona) && (
            <Badge variant="outline" className="mr-1">Virtual</Badge>
          )}
          {hasContent(persona) && (
            <Badge variant="outline">Content</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UberPersonaCard;

