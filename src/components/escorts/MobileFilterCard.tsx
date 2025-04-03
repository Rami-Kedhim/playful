
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VideoIcon, UserIcon } from "lucide-react";

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
  serviceTypeFilter: "in-person" | "virtual" | "both" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "") => void;
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
  serviceTypeFilter,
  setServiceTypeFilter
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
              <h3 className="text-sm font-medium">Service Type</h3>
              <RadioGroup 
                value={serviceTypeFilter} 
                onValueChange={(value) => setServiceTypeFilter(value as "in-person" | "virtual" | "both" | "")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="all-services-mobile" />
                  <Label htmlFor="all-services-mobile" className="flex items-center gap-2">
                    All Services
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-person" id="in-person-mobile" />
                  <Label htmlFor="in-person-mobile" className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    In-Person
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="virtual" id="virtual-mobile" />
                  <Label htmlFor="virtual-mobile" className="flex items-center gap-2">
                    <VideoIcon className="h-4 w-4" />
                    Virtual
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both-mobile" />
                  <Label htmlFor="both-mobile" className="flex items-center gap-2">
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
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
              options={genders}
              selectedOptions={selectedGenders}
              toggleOption={toggleGender}
              formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="gender-mobile"
            />
            
            <CheckboxGroup
              title="Sexual Orientation"
              options={orientations}
              selectedOptions={selectedOrientations}
              toggleOption={toggleOrientation}
              formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              idPrefix="orientation-mobile"
            />
            
            <CheckboxGroup
              title="Services"
              options={services}
              selectedOptions={selectedServices}
              toggleOption={toggleService}
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
