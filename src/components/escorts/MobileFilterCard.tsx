
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MapPin } from "lucide-react";

interface MobileFilterCardProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  clearFilters: () => void;
  setShowFilters: (value: boolean) => void;
}

const MobileFilterCard = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  verifiedOnly,
  setVerifiedOnly,
  selectedServices,
  toggleService,
  services,
  clearFilters,
  setShowFilters,
}: MobileFilterCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/50"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="City or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range (LC)</label>
          <div className="pt-2">
            <Slider
              value={priceRange}
              min={0}
              max={500}
              step={10}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>{priceRange[0]} LC</span>
              <span>{priceRange[1]} LC</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={verifiedOnly}
            onCheckedChange={setVerifiedOnly}
          />
          <label className="text-sm font-medium">Verified only</label>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Services</label>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <Badge
                key={service}
                variant={selectedServices.includes(service) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleService(service)}
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
          <Button 
            onClick={() => setShowFilters(false)}
            className="w-full"
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileFilterCard;
