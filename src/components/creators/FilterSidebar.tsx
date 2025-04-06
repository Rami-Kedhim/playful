
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FilterBlock, FilterSection } from "@/components/ui/filter-block";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSidebarProps {
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
  contentTypes: string[];
  isMobile?: boolean;
  showFilters?: boolean;
  setShowFilters?: (value: boolean) => void;
}

const FilterSidebar = ({
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
  clearFilters,
  contentTypes,
  isMobile = false,
  showFilters,
  setShowFilters
}: FilterSidebarProps) => {
  
  const FilterContent = () => (
    <>
      <div className="space-y-4">
        <FilterSection title="Search">
          <Input
            placeholder="Search by name or username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </FilterSection>
        
        <FilterSection title="Price Range">
          <Select 
            value={priceMax} 
            onValueChange={setPriceMax}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="5">Up to 5 LC</SelectItem>
              <SelectItem value="10">Up to 10 LC</SelectItem>
              <SelectItem value="15">Up to 15 LC</SelectItem>
              <SelectItem value="20">Up to 20 LC</SelectItem>
            </SelectContent>
          </Select>
        </FilterSection>
        
        <FilterSection title="Content Types">
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <Badge
                key={type}
                variant={selectedContentTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleContentType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </FilterSection>
        
        <div className="space-y-3 pt-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="live-only"
              checked={liveOnly}
              onCheckedChange={setLiveOnly}
            />
            <Label htmlFor="live-only">Live streaming now</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="hide-ai"
              checked={hideAI}
              onCheckedChange={setHideAI}
            />
            <Label htmlFor="hide-ai">Hide AI profiles</Label>
          </div>
        </div>
        
        {isMobile ? (
          <div className="flex gap-2 pt-4 mt-4 border-t border-border">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full"
            >
              Clear Filters
            </Button>
            <Button 
              onClick={() => setShowFilters && setShowFilters(false)}
              className="w-full"
            >
              Apply
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full mt-4"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </>
  );

  return isMobile ? (
    <FilterBlock title="Filters" description="Refine your search">
      <FilterContent />
    </FilterBlock>
  ) : (
    <FilterBlock title="Filters" description="Refine your search" className="h-fit sticky top-20">
      <FilterContent />
    </FilterBlock>
  );
};

export default FilterSidebar;
