
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories, mapLegacyServiceToId } from "@/data/serviceCategories";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface ProfessionalEscortServicesProps {
  tags: string[];
}

const ProfessionalEscortServices = ({ tags }: ProfessionalEscortServicesProps) => {
  // Group services by category
  const servicesByCategory = React.useMemo(() => {
    const result: Record<string, string[]> = {};
    
    // Initialize categories
    serviceCategories.forEach(category => {
      result[category.id] = [];
    });
    
    // Map services to categories
    tags.forEach(service => {
      const serviceId = mapLegacyServiceToId(service);
      
      // Find which category this service belongs to
      for (const category of serviceCategories) {
        if (category.services.some(s => s.id === serviceId)) {
          result[category.id].push(serviceId);
          return;
        }
      }
      
      // If no category found, add to "specialty"
      result["specialty"].push(serviceId);
    });
    
    return result;
  }, [tags]);
  
  // Filter out empty categories
  const categoriesToShow = serviceCategories.filter(
    category => servicesByCategory[category.id]?.length > 0
  );
  
  // Add some default categories if they don't exist
  if (!servicesByCategory["companionship"]?.length) {
    servicesByCategory["companionship"] = ["dinner-date", "travel-companion"];
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Services Offered</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categoriesToShow.map(category => (
          <div key={category.id} className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">{category.name}</h4>
            <div className="grid grid-cols-2 gap-2">
              {servicesByCategory[category.id].map(serviceId => {
                // Find the service object
                const serviceObj = category.services.find(s => s.id === serviceId);
                
                return (
                  <div 
                    key={serviceId}
                    className="flex items-center text-sm p-2 rounded-md bg-secondary/40"
                    title={serviceObj?.description || ""}
                  >
                    <Check size={16} className="mr-2 text-green-500" />
                    {serviceObj?.name || serviceId}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        <h3 className="font-semibold mt-6 mb-3">Rates</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 rounded-md bg-secondary/40">
            <span className="text-sm">1 hour</span>
            <Badge variant="secondary" className="font-semibold">
              {tags.includes("GFE") ? "250" : "200"} LC
            </Badge>
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-md bg-secondary/40">
            <span className="text-sm">2 hours</span>
            <Badge variant="secondary" className="font-semibold">
              {tags.includes("GFE") ? "450" : "380"} LC
            </Badge>
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-md bg-secondary/40">
            <span className="text-sm">Overnight (8 hours)</span>
            <Badge variant="secondary" className="font-semibold">
              {tags.includes("GFE") ? "1200" : "1000"} LC
            </Badge>
          </div>
          
          <div className="flex justify-between items-center p-2 rounded-md bg-secondary/40">
            <span className="text-sm">Weekend (48 hours)</span>
            <Badge variant="secondary" className="font-semibold">
              {tags.includes("GFE") ? "5000" : "4000"} LC
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalEscortServices;
