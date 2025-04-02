
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface AppliedFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  liveOnly: boolean;
  setLiveOnly: (value: boolean) => void;
  hideAI: boolean;
  setHideAI: (value: boolean) => void;
  selectedContentTypes: string[];
  toggleContentType: (type: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  clearFilters: () => void;
}

const AppliedFilters = ({
  searchQuery,
  setSearchQuery,
  liveOnly,
  setLiveOnly,
  hideAI,
  setHideAI,
  selectedContentTypes,
  toggleContentType,
  priceMax,
  setPriceMax,
  clearFilters
}: AppliedFiltersProps) => {
  
  // Only render if there are filters applied
  if (!(searchQuery || liveOnly || hideAI || selectedContentTypes.length > 0 || priceMax !== "all")) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {searchQuery && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Search: {searchQuery}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setSearchQuery("")}
          />
        </Badge>
      )}
      
      {priceMax !== "all" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Up to {priceMax} LC
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setPriceMax("all")}
          />
        </Badge>
      )}
      
      {selectedContentTypes.map(type => (
        <Badge key={type} variant="secondary" className="flex items-center gap-1">
          {type}
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => toggleContentType(type)}
          />
        </Badge>
      ))}
      
      {liveOnly && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Live only
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setLiveOnly(false)}
          />
        </Badge>
      )}
      
      {hideAI && (
        <Badge variant="secondary" className="flex items-center gap-1">
          No AI profiles
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => setHideAI(false)}
          />
        </Badge>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={clearFilters}
        className="h-full ml-auto"
      >
        Clear all
      </Button>
    </div>
  );
};

export default AppliedFilters;
