
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceTypeBadgeLabel, { ServiceTypeFilter } from '../filters/ServiceTypeBadgeLabel';
import { ServiceType } from '../filters/ServiceTypeFilterRules';
import { getSafeServiceLabel } from '../filters/ServiceTypeBadgeLabel';

interface EscortServiceTypeInfoProps {
  serviceType: ServiceTypeFilter;
  services: string[];
  className?: string;
}

/**
 * Displays service type information for an escort profile
 * with ethical filtering and remapping applied
 */
const EscortServiceTypeInfo: React.FC<EscortServiceTypeInfoProps> = ({
  serviceType,
  services,
  className
}) => {
  // Map services to safe labels
  const safeServices = React.useMemo(() => {
    return services.map(service => ({
      original: service,
      safe: getSafeServiceLabel(service)
    }));
  }, [services]);

  // Check if any services were remapped
  const hasRemappedServices = safeServices.some(service => service.original !== service.safe);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Service Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Service Type:</h3>
            <ServiceTypeBadgeLabel type={serviceType} />
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Available Services:</h3>
            <div className="flex flex-wrap gap-2">
              {safeServices.map(({ original, safe }, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className={original !== safe ? "border-amber-500/30" : "border-border"}
                >
                  {safe}
                </Badge>
              ))}
            </div>
          </div>
          
          {hasRemappedServices && (
            <div className="text-xs text-muted-foreground mt-2 bg-amber-500/10 p-2 rounded-md">
              Some services have been remapped according to our platform guidelines.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortServiceTypeInfo;
