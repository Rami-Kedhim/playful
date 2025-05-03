
import React, { useCallback, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { BadgeCheck, Clock, Map, Star, Tags } from 'lucide-react';

interface QuickFilterBarProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  verifiedOnly?: boolean;
  setVerifiedOnly?: (verified: boolean) => void;
  availableNow?: boolean; 
  setAvailableNow?: (available: boolean) => void;
  location?: string;
  onLocationClick?: () => void;
  onShowMoreFilters?: () => void;
  className?: string;
  ratingMin?: number;
  setRatingMin?: (rating: number) => void;
}

/**
 * Horizontal scrollable bar with quick filters
 */
const QuickFilterBar: React.FC<QuickFilterBarProps> = ({ 
  serviceTypeFilter,
  setServiceTypeFilter,
  verifiedOnly = false,
  setVerifiedOnly,
  availableNow = false,
  setAvailableNow,
  location,
  onLocationClick,
  onShowMoreFilters,
  className,
  ratingMin = 0,
  setRatingMin
}) => {
  // Use memoized callback functions for all handlers to prevent re-renders
  const handleTypeClick = useCallback((type: ServiceTypeFilter) => {
    if (setServiceTypeFilter) {
      setServiceTypeFilter(serviceTypeFilter === type ? '' : type);
    }
  }, [serviceTypeFilter, setServiceTypeFilter]);

  // Use memoized callback for handling rating click
  const handleRatingClick = useCallback(() => {
    if (setRatingMin) {
      setRatingMin(ratingMin > 0 ? 0 : 4);
    }
  }, [ratingMin, setRatingMin]);
  
  // Use memoized callback for handling verified toggle
  const handleVerifiedClick = useCallback(() => {
    if (setVerifiedOnly) {
      setVerifiedOnly(!verifiedOnly);
    }
  }, [verifiedOnly, setVerifiedOnly]);
  
  // Use memoized callback for handling available toggle
  const handleAvailableClick = useCallback(() => {
    if (setAvailableNow) {
      setAvailableNow(!availableNow);
    }
  }, [availableNow, setAvailableNow]);

  // Handle location click with proper memoization
  const handleLocationClick = useCallback(() => {
    if (onLocationClick) {
      onLocationClick();
    }
  }, [onLocationClick]);
  
  // Handle more filters click with proper memoization
  const handleShowMoreFilters = useCallback(() => {
    if (onShowMoreFilters) {
      onShowMoreFilters();
    }
  }, [onShowMoreFilters]);

  return (
    <Card className={className}>
      <CardContent className="p-3">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex items-center gap-3">
            {/* Service type filters */}
            <div className="flex gap-1">
              <Button 
                variant={serviceTypeFilter === 'in-person' ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeClick('in-person')}
                className="flex items-center gap-1"
              >
                <Map className="h-4 w-4" />
                <span>In Person</span>
              </Button>
              
              <Button 
                variant={serviceTypeFilter === 'virtual' ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeClick('virtual')}
                className="flex items-center gap-1"
              >
                <Map className="h-4 w-4" />
                <span>Virtual</span>
              </Button>
              
              <Button 
                variant={serviceTypeFilter === 'both' ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeClick('both')}
                className="flex items-center gap-1"
              >
                <Map className="h-4 w-4" />
                <span>Both</span>
              </Button>
            </div>
            
            {setVerifiedOnly && (
              <Button 
                variant={verifiedOnly ? "default" : "outline"}
                size="sm"
                onClick={handleVerifiedClick}
                className="flex items-center gap-1"
              >
                <BadgeCheck className="h-4 w-4" />
                <span>Verified</span>
              </Button>
            )}
            
            {setAvailableNow && (
              <Button
                variant={availableNow ? "default" : "outline"}
                size="sm"
                onClick={handleAvailableClick}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                <span>Available Now</span>
              </Button>
            )}
            
            {setRatingMin && ratingMin !== undefined && (
              <Button
                variant={ratingMin > 0 ? "default" : "outline"}
                size="sm"
                onClick={handleRatingClick}
                className="flex items-center gap-1"
              >
                <Star className="h-4 w-4" />
                <span>{ratingMin > 0 ? `${ratingMin}+ Stars` : "Any Rating"}</span>
              </Button>
            )}
            
            {location && onLocationClick && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLocationClick}
                className="flex items-center gap-1"
              >
                <Map className="h-4 w-4" />
                <span>{location}</span>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleShowMoreFilters}
            >
              <Tags className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(QuickFilterBar);
