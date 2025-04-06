
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { serviceCategories } from "@/data/serviceCategories";
import { getServiceById } from "@/data/serviceCategories";
import { ScrollArea } from "./ui/scroll-area";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const FilterCriteria = () => {
  // State for selected filters
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedOrientations, setSelectedOrientations] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPhysicalAttributes, setSelectedPhysicalAttributes] = useState<{
    height: string[];
    bodyType: string[];
    hairColor: string[];
    ethnicity: string[];
  }>({
    height: [],
    bodyType: [],
    hairColor: [],
    ethnicity: [],
  });
  const [selectedPricing, setSelectedPricing] = useState<{
    price: string[];
    city: string[];
    distance: string[];
  }>({
    price: [],
    city: [],
    distance: [],
  });

  // Toggle selection functions
  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const toggleOrientation = (orientation: string) => {
    setSelectedOrientations(prev => 
      prev.includes(orientation) ? prev.filter(o => o !== orientation) : [...prev, orientation]
    );
  };

  const toggleServiceType = (type: string) => {
    setSelectedServiceTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleAgeRange = (range: string) => {
    setSelectedAgeRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const toggleRating = (rating: string) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const toggleAvailability = (availability: string) => {
    setSelectedAvailability(prev => 
      prev.includes(availability) ? prev.filter(a => a !== availability) : [...prev, availability]
    );
  };

  const toggleVerification = (verification: string) => {
    setSelectedVerification(prev => 
      prev.includes(verification) ? prev.filter(v => v !== verification) : [...prev, verification]
    );
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) ? prev.filter(s => s !== serviceId) : [...prev, serviceId]
    );
  };

  const togglePhysicalAttribute = (category: keyof typeof selectedPhysicalAttributes, value: string) => {
    setSelectedPhysicalAttributes(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(v => v !== value) 
        : [...prev[category], value]
    }));
  };

  const togglePricing = (category: keyof typeof selectedPricing, value: string) => {
    setSelectedPricing(prev => ({
      ...prev,
      [category]: prev[category].includes(value) 
        ? prev[category].filter(v => v !== value) 
        : [...prev[category], value]
    }));
  };

  // Static sample data for demonstration
  const genderOptions = ["Female", "Male", "Non-binary", "Transgender"];
  const orientationOptions = ["Straight", "Gay", "Lesbian", "Bisexual", "Pansexual"];
  const serviceTypeOptions = ["In-person", "Virtual", "Both"];
  const ageRangeOptions = ["18-25", "26-35", "36-45", "46+"];
  const ratingOptions = ["5 stars", "4+ stars", "3+ stars", "Any rating"];
  const availabilityOptions = ["Available now", "Available today", "Available this week"];
  const verificationOptions = ["Basic", "Enhanced", "Premium"];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Filters Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Filters</CardTitle>
          <CardDescription>Primary filter criteria for finding escorts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((gender) => (
                <Badge 
                  key={gender} 
                  variant={selectedGenders.includes(gender) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleGender(gender)}
                >
                  {gender}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Sexual Orientation</h3>
            <div className="flex flex-wrap gap-2">
              {orientationOptions.map((orientation) => (
                <Badge 
                  key={orientation} 
                  variant={selectedOrientations.includes(orientation) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleOrientation(orientation)}
                >
                  {orientation}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Service Type</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypeOptions.map((type) => (
                <Badge 
                  key={type} 
                  variant={selectedServiceTypes.includes(type) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleServiceType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Age Range</h3>
            <div className="flex flex-wrap gap-2">
              {ageRangeOptions.map((range) => (
                <Badge 
                  key={range} 
                  variant={selectedAgeRanges.includes(range) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleAgeRange(range)}
                >
                  {range}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Rating</h3>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((rating) => (
                <Badge 
                  key={rating} 
                  variant={selectedRatings.includes(rating) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleRating(rating)}
                >
                  {rating}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Availability</h3>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((availability) => (
                <Badge 
                  key={availability} 
                  variant={selectedAvailability.includes(availability) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleAvailability(availability)}
                >
                  {availability}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Verification Level</h3>
            <div className="flex flex-wrap gap-2">
              {verificationOptions.map((verification) => (
                <Badge 
                  key={verification} 
                  variant={selectedVerification.includes(verification) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleVerification(verification)}
                >
                  {verification}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Services By Category Card */}
      <Card>
        <CardHeader>
          <CardTitle>Services by Category</CardTitle>
          <CardDescription>Browse available services organized by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              {serviceCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{category.name}</h3>
                    {category.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info size={16} className="text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-xs">{category.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.services.map((serviceItem) => {
                      const service = getServiceById(serviceItem.id);
                      return service ? (
                        <Badge 
                          key={service.id} 
                          variant={selectedServices.includes(service.id) ? "default" : "secondary"}
                          className="cursor-pointer hover:bg-accent" 
                          title={service.description || ""}
                          onClick={() => toggleService(service.id)}
                        >
                          {service.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Physical Attributes Card */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Attributes</CardTitle>
          <CardDescription>Filter by physical characteristics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Height</h3>
            <div className="flex flex-wrap gap-2">
              {["Under 5'2\"", "5'2\" - 5'6\"", "5'7\" - 5'10\"", "Over 5'10\""].map((height) => (
                <Badge 
                  key={height} 
                  variant={selectedPhysicalAttributes.height.includes(height) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePhysicalAttribute('height', height)}
                >
                  {height}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Body Type</h3>
            <div className="flex flex-wrap gap-2">
              {["Slim", "Athletic", "Average", "Curvy", "Plus Size"].map((bodyType) => (
                <Badge 
                  key={bodyType} 
                  variant={selectedPhysicalAttributes.bodyType.includes(bodyType) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePhysicalAttribute('bodyType', bodyType)}
                >
                  {bodyType}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Hair Color</h3>
            <div className="flex flex-wrap gap-2">
              {["Blonde", "Brunette", "Red", "Black", "Other"].map((hairColor) => (
                <Badge 
                  key={hairColor} 
                  variant={selectedPhysicalAttributes.hairColor.includes(hairColor) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePhysicalAttribute('hairColor', hairColor)}
                >
                  {hairColor}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Ethnicity</h3>
            <div className="flex flex-wrap gap-2">
              {["Asian", "Black", "Caucasian", "Hispanic", "Middle Eastern", "Mixed", "Other"].map((ethnicity) => (
                <Badge 
                  key={ethnicity} 
                  variant={selectedPhysicalAttributes.ethnicity.includes(ethnicity) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePhysicalAttribute('ethnicity', ethnicity)}
                >
                  {ethnicity}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Pricing & Location Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Location</CardTitle>
          <CardDescription>Filter by pricing options and locations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Price Range</h3>
            <div className="flex flex-wrap gap-2">
              {["Under 100 LC", "100-200 LC", "200-300 LC", "300-500 LC", "500+ LC"].map((price) => (
                <Badge 
                  key={price} 
                  variant={selectedPricing.price.includes(price) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePricing('price', price)}
                >
                  {price}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Popular Cities</h3>
            <div className="flex flex-wrap gap-2">
              {["New York", "Los Angeles", "Miami", "Las Vegas", "Chicago", "Houston", "San Francisco", "Atlanta"].map((city) => (
                <Badge 
                  key={city} 
                  variant={selectedPricing.city.includes(city) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePricing('city', city)}
                >
                  {city}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Distance</h3>
            <div className="flex flex-wrap gap-2">
              {["Within 5 miles", "Within 10 miles", "Within 25 miles", "Within 50 miles", "Any distance"].map((distance) => (
                <Badge 
                  key={distance} 
                  variant={selectedPricing.distance.includes(distance) ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => togglePricing('distance', distance)}
                >
                  {distance}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterCriteria;
