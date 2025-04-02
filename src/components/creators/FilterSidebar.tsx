
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <Input
          placeholder="Search by name or username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-background/50"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Price Range</label>
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
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Content Types</label>
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
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={liveOnly}
          onCheckedChange={setLiveOnly}
        />
        <label className="text-sm font-medium">Live streaming now</label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={hideAI}
          onCheckedChange={setHideAI}
        />
        <label className="text-sm font-medium">Hide AI profiles</label>
      </div>
      
      {isMobile ? (
        <div className="flex gap-2">
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
          className="w-full"
        >
          Clear Filters
        </Button>
      )}
    </CardContent>
  );

  return isMobile ? (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <FilterContent />
    </Card>
  ) : (
    <Card className="h-fit sticky top-20">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <FilterContent />
    </Card>
  );
};

export default FilterSidebar;
