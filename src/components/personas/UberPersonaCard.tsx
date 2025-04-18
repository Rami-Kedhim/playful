import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/utils/navigation';
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
  
  return (
    <Card 
      className={`overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-[3/4] relative">
        <img 
          src={persona.avatarUrl} 
          alt={persona.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {persona.featured && (
            <Badge className="bg-primary">Featured</Badge>
          )}
          {persona.isVerified && (
            <VerificationBadge level={getVerificationLevel(persona.verificationLevel)} />
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{persona.name}</h3>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {persona.location || 'Location not specified'}
          </div>
          <div className="text-sm font-medium">
            ${persona.price}/hr
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
