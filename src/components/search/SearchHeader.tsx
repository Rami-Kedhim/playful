
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { Search, SlidersHorizontal } from 'lucide-react';
import ServiceTypeQuickFilter from '@/components/escorts/filters/ServiceTypeQuickFilter';
import { ServiceTypeFilter as ServiceTypeFilterType } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import { useEscortServiceTypeFilter } from '@/hooks/useEscortServiceTypeFilter';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  showAdvancedFilters?: boolean;
  setShowAdvancedFilters?: (show: boolean) => void;
  onSearch: () => void;
}

const SearchHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  searchType, 
  setSearchType,
  showAdvancedFilters = false,
  setShowAdvancedFilters = () => {},
  onSearch 
}: SearchHeaderProps) => {
  const [serviceType, setServiceType] = useState<ServiceTypeFilterType>("");
  const { setServiceType: updateServiceType } = useEscortServiceTypeFilter();

  // Handle service type changes
  const handleServiceTypeChange = (type: ServiceTypeFilterType) => {
    setServiceType(type);
    updateServiceType(type);
  };
  
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, location, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          />
        </div>
        
        <Button onClick={onSearch}>
          Search
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <ToggleGroup type="single" value={searchType} onValueChange={(value) => value && setSearchType(value)}>
          <ToggleGroupItem value="escorts" aria-label="Search escorts">
            Escorts
          </ToggleGroupItem>
          <ToggleGroupItem value="creators" aria-label="Search content creators">
            Content Creators
          </ToggleGroupItem>
        </ToggleGroup>
        
        <div className="flex flex-1 gap-4 justify-end">
          {searchType === "escorts" && (
            <ServiceTypeQuickFilter 
              serviceTypeFilter={serviceType}
              setServiceTypeFilter={handleServiceTypeChange}
              showLabel={false}
              className="border-none shadow-none bg-transparent"
            />
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
