
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FilterBlock, FilterSection } from "@/components/ui/filter-block";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Sparkles } from "lucide-react";
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
    <div className="space-y-5 animate-fade-in">
      <FilterSection title="Search" icon={<Search size={16} className="text-primary" />}>
        <div className="relative">
          <Input
            placeholder="Search by name or username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50 pl-9 hover:border-primary/30 focus:border-primary/50 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </FilterSection>
      
      <FilterSection title="Price Range" icon={<Filter size={16} className="text-primary" />}>
        <Select 
          value={priceMax || "all"} 
          onValueChange={(value) => setPriceMax(value === "all" ? "" : value)}
        >
          <SelectTrigger className="hover:border-primary/30 focus:border-primary/50 transition-all">
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-sm border-primary/10">
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="5">Up to 5 LC</SelectItem>
            <SelectItem value="10">Up to 10 LC</SelectItem>
            <SelectItem value="15">Up to 15 LC</SelectItem>
            <SelectItem value="20">Up to 20 LC</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>
      
      <FilterSection title="Content Types" icon={<Sparkles size={16} className="text-primary" />}>
        <div className="flex flex-wrap gap-2">
          {contentTypes.map((type) => (
            <Badge
              key={type}
              variant={selectedContentTypes.includes(type) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:shadow-sm",
                selectedContentTypes.includes(type) 
                ? "bg-primary/90 hover:bg-primary" 
                : "hover:border-primary/40"
              )}
              onClick={() => toggleContentType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </FilterSection>
      
      <div className="space-y-4 pt-3 border-t border-border/40">
        <div className="flex items-center space-x-2">
          <Switch
            id="live-only"
            checked={liveOnly}
            onCheckedChange={setLiveOnly}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="live-only" className="cursor-pointer">Live streaming now</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="hide-ai"
            checked={hideAI}
            onCheckedChange={setHideAI}
            className="data-[state=checked]:bg-primary"
          />
          <Label htmlFor="hide-ai" className="cursor-pointer">Hide AI profiles</Label>
        </div>
      </div>
      
      {isMobile ? (
        <div className="flex gap-2 pt-4 mt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full hover:bg-background/80"
          >
            Clear Filters
          </Button>
          <Button 
            onClick={() => setShowFilters && setShowFilters(false)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Apply
          </Button>
        </div>
      ) : (
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full mt-4 border-primary/20 hover:border-primary/40 transition-all"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );

  // Import needed for cn() utility
  const { cn } = require("@/lib/utils");

  return isMobile ? (
    <FilterBlock title="Filters" description="Refine your search" className="animate-fade-in">
      <FilterContent />
    </FilterBlock>
  ) : (
    <FilterBlock title="Filters" description="Refine your search" className="h-fit sticky top-20 animate-fade-in">
      <FilterContent />
    </FilterBlock>
  );
};

export default FilterSidebar;
