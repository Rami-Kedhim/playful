
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  CheckCircle, 
  Clock, 
  SlidersHorizontal, 
  Star
} from 'lucide-react';
import { Rating } from '@/components/ui/rating';
import { ServiceTypeFilter } from './filters/ServiceTypeBadgeLabel';
import ServiceTypeSelect from './filters/ServiceTypeSelect';

interface QuickFilterBarProps {
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  location: string;
  onLocationClick: () => void;
  onShowMoreFilters: () => void;
  className?: string;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
}

const QuickFilterBar: React.FC<QuickFilterBarProps> = ({
  serviceTypeFilter,
  setServiceTypeFilter,
  verifiedOnly,
  setVerifiedOnly,
  availableNow,
  setAvailableNow,
  location,
  onLocationClick,
  onShowMoreFilters,
  className = '',
  ratingMin,
  setRatingMin
}) => {
  return (
    <div className={`bg-background border border-border rounded-lg p-2 ${className}`}>
      <div className="flex flex-nowrap overflow-x-auto gap-2 items-center">
        <div className="flex-shrink-0 min-w-[180px]">
          <ServiceTypeSelect 
            value={serviceTypeFilter} 
            onChange={setServiceTypeFilter} 
            label="" 
            className="w-full"
          />
        </div>
        
        <Button 
          variant={verifiedOnly ? "default" : "outline"} 
          size="sm"
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className="flex-shrink-0"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Verified
        </Button>
        
        <Button 
          variant={availableNow ? "default" : "outline"} 
          size="sm"
          onClick={() => setAvailableNow(!availableNow)}
          className="flex-shrink-0"
        >
          <Clock className="h-4 w-4 mr-2" />
          Available Now
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onLocationClick}
          className="flex-shrink-0"
        >
          <Map className="h-4 w-4 mr-2" />
          {location || "Any Location"}
        </Button>
        
        <div className="flex items-center gap-1 p-1.5 border border-border rounded-md">
          <Star className="h-4 w-4 text-yellow-400" />
          <Rating 
            value={ratingMin} 
            onChange={setRatingMin} 
            max={5} 
            className="flex-shrink-0" 
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onShowMoreFilters}
          className="flex-shrink-0 ml-auto"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default QuickFilterBar;
