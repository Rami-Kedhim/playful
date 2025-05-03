
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import { ServiceTypeFilter } from "./ServiceTypeBadgeLabel";

interface FilterSidebarContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: number[]) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  selectedServices: string[];
  toggleService: (service: string) => void;
  services: string[];
  selectedGenders: string[];
  toggleGender: (gender: string) => void;
  selectedOrientations: string[];
  toggleOrientation: (orientation: string) => void;
  ageRange: [number, number];
  setAgeRange: (range: number[]) => void;
  ratingMin: number;
  setRatingMin: (rating: number) => void;
  availableNow: boolean;
  setAvailableNow: (available: boolean) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (type: ServiceTypeFilter) => void;
}

// Define gender options
const genderOptions = [
  { id: "female", label: "Female" },
  { id: "male", label: "Male" },
  { id: "non-binary", label: "Non-binary" },
  { id: "transgender", label: "Transgender" }
];

// Define orientation options
const orientationOptions = [
  { id: "straight", label: "Straight" },
  { id: "gay", label: "Gay" },
  { id: "lesbian", label: "Lesbian" },
  { id: "bisexual", label: "Bisexual" }
];

// Define service type options
const serviceTypeOptions = [
  { id: "in-person", label: "In-Person" },
  { id: "virtual", label: "Virtual" },
  { id: "both", label: "Both" }
];

const FilterSidebarContent = ({
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
  selectedGenders,
  toggleGender,
  selectedOrientations,
  toggleOrientation,
  ageRange,
  setAgeRange,
  ratingMin,
  setRatingMin,
  availableNow,
  setAvailableNow,
  serviceTypeFilter,
  setServiceTypeFilter
}: FilterSidebarContentProps) => {
  // Create form schema
  const formSchema = z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    verified: z.boolean().optional(),
    available: z.boolean().optional(),
    serviceType: z.enum(["in-person", "virtual", "both", ""]).optional(),
    rating: z.number().min(0).max(5).optional(),
    services: z.array(z.string()).optional(),
    genders: z.array(z.string()).optional(),
    orientations: z.array(z.string()).optional(),
    ageRange: z.array(z.number()).length(2).optional(),
    priceRange: z.array(z.number()).length(2).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: searchQuery,
      location: location,
      verified: verifiedOnly,
      available: availableNow,
      serviceType: serviceTypeFilter,
      rating: ratingMin,
      services: selectedServices,
      genders: selectedGenders,
      orientations: selectedOrientations,
      ageRange: ageRange,
      priceRange: priceRange,
    },
  });

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle location input changes
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search escorts..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City or area..."
            value={location}
            onChange={handleLocationChange}
          />
        </div>

        {/* Verified Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
          />
          <Label htmlFor="verified" className="cursor-pointer">
            Verified Only
          </Label>
        </div>

        {/* Available Now */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available-now"
            checked={availableNow}
            onCheckedChange={(checked) => setAvailableNow(checked === true)}
          />
          <Label htmlFor="available-now" className="cursor-pointer">
            Available Now
          </Label>
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <Label>Service Type</Label>
          <RadioGroup
            value={serviceTypeFilter}
            onValueChange={(value) => setServiceTypeFilter(value as ServiceTypeFilter)}
          >
            {serviceTypeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`service-type-${option.id}`} />
                <Label htmlFor={`service-type-${option.id}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Rating</Label>
            <span className="text-sm flex items-center">
              {ratingMin}+ <StarIcon className="h-4 w-4 ml-1 text-yellow-400 inline-block" />
            </span>
          </div>
          <Slider
            value={[ratingMin]}
            min={0}
            max={5}
            step={1}
            onValueChange={(value) => setRatingMin(value[0])}
          />
        </div>

        {/* Services */}
        {services.length > 0 && (
          <div className="space-y-2">
            <Label className="block mb-2">Services</Label>
            <div className="space-y-1">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => toggleService(service)}
                  />
                  <Label htmlFor={`service-${service}`} className="cursor-pointer">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gender */}
        <div className="space-y-2">
          <Label className="block mb-2">Gender</Label>
          <div className="space-y-1">
            {genderOptions.map((gender) => (
              <div key={gender.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender.id}`}
                  checked={selectedGenders.includes(gender.id)}
                  onCheckedChange={() => toggleGender(gender.id)}
                />
                <Label htmlFor={`gender-${gender.id}`} className="cursor-pointer">
                  {gender.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Orientation - left as a placeholder for now */}
        {selectedOrientations && (
          <div className="space-y-2">
            <Label className="block mb-2">Orientation</Label>
            <div className="space-y-1">
              {orientationOptions.map((orientation) => (
                <div key={orientation.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`orientation-${orientation.id}`}
                    checked={selectedOrientations.includes(orientation.id)}
                    onCheckedChange={() => toggleOrientation(orientation.id)}
                  />
                  <Label htmlFor={`orientation-${orientation.id}`} className="cursor-pointer">
                    {orientation.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};

export default FilterSidebarContent;
