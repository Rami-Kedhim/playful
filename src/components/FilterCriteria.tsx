
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { availableServices } from "@/data/availableServices";
import { serviceCategories } from "@/data/serviceCategories";

const FilterCriteria = () => {
  const genderOptions = [
    { id: "female", label: "Female" },
    { id: "male", label: "Male" },
    { id: "transgender", label: "Transgender" },
    { id: "non-binary", label: "Non-Binary" }
  ];
  
  const orientationOptions = [
    { id: "straight", label: "Straight" },
    { id: "gay", label: "Gay" },
    { id: "lesbian", label: "Lesbian" },
    { id: "bisexual", label: "Bisexual" },
    { id: "pansexual", label: "Pansexual" }
  ];
  
  const serviceTypeOptions = [
    { id: "in-person", label: "In-Person" },
    { id: "virtual", label: "Virtual" },
    { id: "both", label: "Both" }
  ];
  
  const sortOptions = [
    { id: "featured", label: "Featured" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating", label: "Highest Rated" },
    { id: "name", label: "Name A-Z" }
  ];
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Available Filter Criteria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Basic Filters</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Search query (searches name, bio, location)</li>
              <li>Location</li>
              <li>Price range: $0-$500</li>
              <li>Verification status</li>
              <li>Available now</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Gender Options</h3>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map(option => (
                <Badge key={option.id} variant="outline">{option.label}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Sexual Orientation Options</h3>
            <div className="flex flex-wrap gap-2">
              {orientationOptions.map(option => (
                <Badge key={option.id} variant="outline">{option.label}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Service Type Options</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypeOptions.map(option => (
                <Badge key={option.id} variant="outline">{option.label}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Age Range</h3>
            <p>Filter escorts by age between 21-50 years old</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Rating</h3>
            <p>Filter by minimum rating (1-5 stars)</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Sort Options</h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(option => (
                <Badge key={option.id} variant="outline">{option.label}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Service Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {serviceCategories.map(category => (
            <div key={category.id}>
              <h3 className="font-medium mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.services.map(service => (
                  <Badge key={service.id} variant="secondary" title={service.description}>
                    {service.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Legacy Service Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            These are the legacy service tags that are being mapped to the new service categories:
          </p>
          <div className="flex flex-wrap gap-2">
            {availableServices.map((service, index) => (
              <Badge key={index} variant="outline">{service}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterCriteria;
