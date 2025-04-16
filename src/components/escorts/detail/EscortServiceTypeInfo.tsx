
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceTypeBadgeLabel from '../filters/ServiceTypeBadgeLabel';
import { ServiceType } from '../filters/ServiceTypeFilterRules';
import { ServiceTypeFilter } from '@/types/auth';
import { getSafeServiceLabel } from '../filters/ServiceTypeBadgeLabel';

interface EscortServiceTypeInfoProps {
  serviceType: string;
  services: string[];
  className?: string;
  themeName?: string; // Optional theme name based on Egyptian archetypes
}

/**
 * Displays service type information for an escort profile
 * with ethical filtering and remapping applied.
 * 
 * Can be themed according to the Sacred Engine concept with
 * archetype associations.
 */
const EscortServiceTypeInfo: React.FC<EscortServiceTypeInfoProps> = ({
  serviceType,
  services,
  className,
  themeName
}) => {
  // Map services to safe labels
  const safeServices = React.useMemo(() => {
    return services.map(service => ({
      original: service,
      safe: getSafeServiceLabel(service)
    }));
  }, [services]);

  // Convert serviceType string to ServiceTypeFilter
  const convertedServiceType = React.useMemo(() => {
    if (serviceType === "virtual") return "virtual" as ServiceTypeFilter;
    if (serviceType === "in-person") return "in-person" as ServiceTypeFilter;
    if (serviceType === "both") return "both" as ServiceTypeFilter;
    return "" as ServiceTypeFilter;
  }, [serviceType]);

  // Check if any services were remapped
  const hasRemappedServices = safeServices.some(service => service.original !== service.safe);
  
  // Determine if this escort offers virtual/metaverse services
  const hasVirtualServices = convertedServiceType === 'virtual' || convertedServiceType === 'both';
  
  // Determine theme class based on themeName (for future Sacred Engine integration)
  const themeClass = themeName ? `theme-${themeName.toLowerCase()}` : '';
  
  return (
    <Card className={`${className} ${themeClass}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Service Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Service Type:</h3>
            <ServiceTypeBadgeLabel type={convertedServiceType} />
            
            {hasVirtualServices && (
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="inline-block mr-1">✧</span>
                Virtual services available in our digital spaces
              </div>
            )}
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
