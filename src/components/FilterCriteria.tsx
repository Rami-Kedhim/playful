
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { serviceCategories } from "@/data/serviceCategories";
import { getServiceById } from "@/data/serviceCategories";
import { ScrollArea } from "./ui/scroll-area";
import { Info } from "lucide-react";

const FilterCriteria = () => {
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
                <Badge key={gender} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {gender}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Sexual Orientation</h3>
            <div className="flex flex-wrap gap-2">
              {orientationOptions.map((orientation) => (
                <Badge key={orientation} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {orientation}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Service Type</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypeOptions.map((type) => (
                <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Age Range</h3>
            <div className="flex flex-wrap gap-2">
              {ageRangeOptions.map((range) => (
                <Badge key={range} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {range}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Rating</h3>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((rating) => (
                <Badge key={rating} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {rating}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Availability</h3>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((availability) => (
                <Badge key={availability} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {availability}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Verification Level</h3>
            <div className="flex flex-wrap gap-2">
              {verificationOptions.map((verification) => (
                <Badge key={verification} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
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
                      <div className="group relative">
                        <Info size={16} className="text-muted-foreground cursor-help" />
                        <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg z-50">
                          {category.description}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.services.map((serviceId) => {
                      const service = getServiceById(serviceId);
                      return service ? (
                        <Badge 
                          key={serviceId} 
                          variant="secondary"
                          className="cursor-pointer hover:bg-accent" 
                          title={service.description || ""}
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
                <Badge key={height} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {height}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Body Type</h3>
            <div className="flex flex-wrap gap-2">
              {["Slim", "Athletic", "Average", "Curvy", "Plus Size"].map((bodyType) => (
                <Badge key={bodyType} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {bodyType}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Hair Color</h3>
            <div className="flex flex-wrap gap-2">
              {["Blonde", "Brunette", "Red", "Black", "Other"].map((hairColor) => (
                <Badge key={hairColor} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {hairColor}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Ethnicity</h3>
            <div className="flex flex-wrap gap-2">
              {["Asian", "Black", "Caucasian", "Hispanic", "Middle Eastern", "Mixed", "Other"].map((ethnicity) => (
                <Badge key={ethnicity} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
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
                <Badge key={price} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {price}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Popular Cities</h3>
            <div className="flex flex-wrap gap-2">
              {["New York", "Los Angeles", "Miami", "Las Vegas", "Chicago", "Houston", "San Francisco", "Atlanta"].map((city) => (
                <Badge key={city} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {city}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Distance</h3>
            <div className="flex flex-wrap gap-2">
              {["Within 5 miles", "Within 10 miles", "Within 25 miles", "Within 50 miles", "Any distance"].map((distance) => (
                <Badge key={distance} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
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
