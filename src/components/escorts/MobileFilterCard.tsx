
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchFilter from "./filters/SearchFilter";
import LocationFilter from "./filters/LocationFilter";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import VerifiedFilter from "./filters/VerifiedFilter";
import CheckboxGroup from "./filters/CheckboxGroup";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";

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
  ageRange?: number[];
  setAgeRange?: (value: number[]) => void;
  ratingMin?: number;
  setRatingMin?: (value: number) => void;
  availableNow?: boolean;
  setAvailableNow?: (value: boolean) => void;
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
  ageRange = [18, 50],
  setAgeRange = () => {},
  ratingMin = 0,
  setRatingMin = () => {},
  availableNow = false,
  setAvailableNow = () => {},
}: MobileFilterCardProps) => {
  const genders = ["male", "female", "non-binary", "transgender"];
  const orientations = ["straight", "gay", "lesbian", "bisexual", "pansexual"];

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Filters</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowFilters(false)}
        >
          <X size={18} />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
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
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Age Range</h3>
              <div className="pt-2">
                <Slider
                  value={ageRange}
                  min={18}
                  max={60}
                  step={1}
                  onValueChange={setAgeRange}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{ageRange[0]} years</span>
                  <span>{ageRange[1]} years</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Rating</h3>
              <div className="flex items-center gap-2">
                <Slider
                  value={[ratingMin]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={(value) => setRatingMin(value[0])}
                />
                <div className="flex items-center gap-1 min-w-[40px]">
                  <span className="text-amber-500"><StarIcon size={14} /></span>
                  <span className="text-sm">{ratingMin}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-1">
              <Switch 
                id="availableNowMobile" 
                checked={availableNow} 
                onCheckedChange={setAvailableNow}
              />
              <Label htmlFor="availableNowMobile">Available now</Label>
            </div>
            
            <VerifiedFilter 
              verifiedOnly={verifiedOnly} 
              setVerifiedOnly={setVerifiedOnly} 
            />
            
            <CheckboxGroup
              title="Gender"
              items={genders}
              selectedItems={selectedGenders}
              toggleItem={toggleGender}
              idPrefix="gender-mobile"
            />
            
            <CheckboxGroup
              title="Sexual Orientation"
              items={orientations}
              selectedItems={selectedOrientations}
              toggleItem={toggleOrientation}
              idPrefix="orientation-mobile"
            />
            
            <CheckboxGroup
              title="Services"
              items={services}
              selectedItems={selectedServices}
              toggleItem={toggleService}
              idPrefix="service-mobile"
            />
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button 
            className="flex-1"
            onClick={() => setShowFilters(false)}
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileFilterCard;
