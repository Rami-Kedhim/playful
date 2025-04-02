
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import VerifiedFilter from "./filters/VerifiedFilter";

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
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
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
  selectedGenders,
  toggleGender,
  selectedOrientations,
  toggleOrientation,
}: MobileFilterCardProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <LocationFilter 
          location={location} 
          setLocation={setLocation} 
        />
        
        <PriceRangeFilter 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
        />
        
        <VerifiedFilter 
          verifiedOnly={verifiedOnly} 
          setVerifiedOnly={setVerifiedOnly} 
        />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>
          <div className="flex flex-wrap gap-2">
            {genders.map((gender) => (
              <Badge
                key={gender}
                variant={selectedGenders.includes(gender) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => toggleGender(gender)}
              >
                {gender}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Sexual Orientation</label>
          <div className="flex flex-wrap gap-2">
            {orientations.map((orientation) => (
              <Badge
                key={orientation}
                variant={selectedOrientations.includes(orientation) ? "default" : "outline"}
                className="cursor-pointer capitalize"
                onClick={() => toggleOrientation(orientation)}
              >
                {orientation}
              </Badge>
            ))}
          </div>
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
