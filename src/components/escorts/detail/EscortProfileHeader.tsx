
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { Escort } from '@/types/escort';
import ServiceTypeBadgeLabel from '../filters/ServiceTypeBadgeLabel';
import { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';

interface EscortProfileHeaderProps {
  escort: Escort;
  onContactClick?: () => void;
}

const EscortProfileHeader = ({ escort, onContactClick }: EscortProfileHeaderProps) => {
  // Determine service type based on escort properties
  const getServiceType = (): ServiceTypeFilter => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return "both";
    } else if (escort.providesInPersonServices) {
      return "in-person";
    } else if (escort.providesVirtualContent) {
      return "virtual";
    }
    return "";
  };

  const serviceType = getServiceType();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{escort.name}</h1>
          {escort.verified && (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          )}
          {serviceType && (
            <ServiceTypeBadgeLabel type={serviceType} />
          )}
        </div>
        
        <div className="flex items-center flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{escort.location || 'Location not specified'}</span>
          </div>
          
          {escort.rating !== undefined && (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500" />
              <span>
                {escort.rating.toFixed(1)} 
                {escort.reviewCount && (
                  <span className="text-muted-foreground">
                    {` (${escort.reviewCount})`}
                  </span>
                )}
              </span>
            </div>
          )}
          
          {escort.availableNow && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Clock className="h-3 w-3 mr-1" />
              Available Now
            </Badge>
          )}
        </div>
      </div>
      
      {onContactClick && (
        <Button onClick={onContactClick}>
          Contact
        </Button>
      )}
    </div>
  );
};

export default EscortProfileHeader;
