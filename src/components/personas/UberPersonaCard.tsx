
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerificationBadge } from '../verification/VerificationBadge';
// Import enum VerificationLevel from verification types as regular import (not type-only)
import { VerificationLevel } from '@/types/verification';

import { hasRealMeets, hasVirtualMeets, hasContent } from '@/utils/personaHelpers';

interface UberPersonaCardProps {
  persona: any;
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

  const displayName = persona.displayName || persona.name || "Unnamed";

  const imageSrc = persona.avatarUrl || persona.imageUrl || '';

  const isFeatured = persona.roleFlags?.isFeatured ?? false;

  const verified = persona.roleFlags?.isVerified ?? false;

  // Normalize verification level to enum type, default to NONE value
  let verificationLevelSafe: VerificationLevel = VerificationLevel.NONE;
  const verificationLevelRaw = persona.verificationLevel || VerificationLevel.NONE;

  // Validate enum membership by checking values (enum has string values)
  if (
    verificationLevelRaw === VerificationLevel.NONE ||
    verificationLevelRaw === VerificationLevel.BASIC ||
    verificationLevelRaw === VerificationLevel.ENHANCED ||
    verificationLevelRaw === VerificationLevel.PREMIUM
  ) {
    verificationLevelSafe = verificationLevelRaw as VerificationLevel;
  }

  const price = persona.monetization?.meetingPrice ?? 0;

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

