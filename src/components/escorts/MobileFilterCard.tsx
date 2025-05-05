
import { Card, CardContent } from "@/components/ui/card";
import MobileFilterHeader from "./filters/MobileFilterHeader";
import MobileFilterContent from "./filters/MobileFilterContent";

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
  serviceTypeFilter: "in-person" | "virtual" | "both" | "any" | "";
  setServiceTypeFilter: (type: "in-person" | "virtual" | "both" | "any" | "") => void;
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
  serviceTypeFilter = "any",
  setServiceTypeFilter
}: MobileFilterCardProps) => {
  // Ensure ageRange is a tuple of [number, number]
  const typedAgeRange: [number, number] = [
    ageRange[0] ?? 18, 
    ageRange[1] ?? 50
  ];
  
  return (
    <Card className="mb-6">
      <MobileFilterHeader setShowFilters={setShowFilters} />
      <CardContent>
        <MobileFilterContent 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          priceRange={priceRange as [number, number]}
          setPriceRange={setPriceRange}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
          selectedServices={selectedServices}
          toggleService={toggleService}
          services={services}
          clearFilters={clearFilters}
          setShowFilters={setShowFilters}
          selectedGenders={selectedGenders}
          toggleGender={toggleGender}
          selectedOrientations={selectedOrientations}
          toggleOrientation={toggleOrientation}
          ageRange={typedAgeRange}
          setAgeRange={setAgeRange}
          ratingMin={ratingMin}
          setRatingMin={setRatingMin}
          availableNow={availableNow}
          setAvailableNow={setAvailableNow}
          serviceTypeFilter={serviceTypeFilter}
          setServiceTypeFilter={setServiceTypeFilter}
        />
      </CardContent>
    </Card>
  );
};

export default MobileFilterCard;
