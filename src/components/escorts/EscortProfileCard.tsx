
// Fix the getServiceType function to never return empty string to avoid TS error

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarIcon, MapPin, Clock, DollarSign, Check } from 'lucide-react';
import { Escort } from '@/types/escort';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ServiceTypeBadge from './ServiceTypeBadge';

interface EscortProfileCardProps {
  escort: Escort & {
    providesVirtualContent?: boolean;
    providesInPersonServices?: boolean;
  };
  onClick?: () => void;
  onBookNow?: () => void;
}

const EscortProfileCard: React.FC<EscortProfileCardProps> = ({
  escort,
  onClick,
  onBookNow,
}) => {
  const getHourlyRate = () => {
    if (escort.price) return escort.price;
    if (escort.rates?.hourly) return escort.rates.hourly;
    return null;
  };

  const getServiceType = () => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return 'both';
    } else if (escort.providesInPersonServices) {
      return 'in-person';
    } else if (escort.providesVirtualContent) {
      return 'virtual';
    }
    // Fallback to default 'in-person' instead of empty string
    return 'in-person';
  };

  const getAvatarImage = () => {
    return (
      escort.profileImage ||
      escort.imageUrl ||
      escort.avatarUrl ||
      escort.avatar ||
      escort.avatar_url ||
      '/placeholder-avatar.png'
    );
  };

  const getDisplayName = () => {
    return escort.name || 'Anonymous';
  };

  const isVerified = () => {
    return escort.isVerified || escort.verified || false;
  };

  const isAvailable = () => {
    return escort.availableNow || false;
  };

  return (
    <Card
      className="overflow-hidden h-full transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="w-full h-48 rounded-none">
          <AvatarImage src={getAvatarImage()} className="object-cover" />
          <AvatarFallback className="rounded-none">
            {getDisplayName().substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <ServiceTypeBadge serviceType={getServiceType()} />

          {isAvailable() && (
            <Badge variant="default" className="bg-green-500 text-white">
              Available Now
            </Badge>
          )}
        </div>

        {escort.tags && escort.tags.length > 0 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/70 text-white text-xs">
              {escort.tags[0]}
              {escort.tags.length > 1 ? ` +${escort.tags.length - 1}` : ''}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{getDisplayName()}</h3>

          {escort.rating && (
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm">{escort.rating}</span>
            </div>
          )}
        </div>

        <div className="space-y-1 mb-3">
          {escort.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>{escort.location}</span>
            </div>
          )}

          {isVerified() && (
            <div className="flex items-center text-sm text-green-600">
              <Check className="w-3.5 h-3.5 mr-1" />
              <span>Verified</span>
            </div>
          )}

          {getHourlyRate() && (
            <div className="flex items-center text-sm">
              <DollarSign className="w-3.5 h-3.5 mr-1" />
              <span>${getHourlyRate()}/hr</span>
            </div>
          )}
        </div>

        {onBookNow && (
          <Button
            size="sm"
            className="w-full mt-2"
            onClick={(e) => {
              e.stopPropagation();
              onBookNow();
            }}
          >
            <Clock className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortProfileCard;

