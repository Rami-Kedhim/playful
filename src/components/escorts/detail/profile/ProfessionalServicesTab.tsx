
import React from "react";
import { Escort } from "@/types/escort";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories, mapLegacyServiceToId } from "@/data/serviceCategories";
import { Badge } from "@/components/ui/badge";

interface ProfessionalServicesTabProps {
  escort: Escort;
}

const ProfessionalServicesTab = ({ escort }: ProfessionalServicesTabProps) => {
  // Use services if available, otherwise fall back to tags
  const servicesToShow = escort.services || escort.tags || [];
  
  // Group services by category
  const servicesByCategory = React.useMemo(() => {
    const result: Record<string, string[]> = {};
    
    // Initialize categories
    serviceCategories.forEach(category => {
      result[category.id] = [];
    });
    
    // Map services to categories
    servicesToShow.forEach(service => {
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
  }, [servicesToShow]);
  
  // Filter out empty categories
  const categoriesToShow = serviceCategories.filter(
    category => servicesByCategory[category.id]?.length > 0
  );
  
  if (servicesToShow.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Services Offered</h3>
        <p className="text-muted-foreground italic">No services listed</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Services Offered</h3>
      
      {categoriesToShow.length === 0 ? (
        <p className="text-muted-foreground italic">No services listed</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {categoriesToShow.map(category => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-primary/10 py-3">
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {servicesByCategory[category.id].map(serviceId => {
                    // Find the service object
                    const serviceObj = category.services.find(s => s.id === serviceId);
                    
                    return (
                      <Badge
                        key={serviceId}
                        variant="secondary"
                        className="py-1.5 px-3 bg-secondary/20 hover:bg-secondary/30"
                        title={serviceObj?.description || ""}
                      >
                        {serviceObj?.name || serviceId}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalServicesTab;
