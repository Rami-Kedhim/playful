
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Escort } from "@/types/escort";
import { serviceCategories } from "@/data/serviceCategories";
import ServiceCategoryBadge from "../ServiceCategoryBadge";
import { groupServicesByCategory } from "@/utils/serviceUtils";
import { Sparkles } from "lucide-react";

interface ServicesTabProps {
  escort: Escort;
}

const ServicesTab = ({ escort }: ServicesTabProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(serviceCategories[0]?.id || "companionship");
  
  // Group the escort's services by category
  const servicesByCategory = groupServicesByCategory(escort.services || []);
  
  // Get categories that have services
  const categoriesWithServices = serviceCategories.filter(
    category => servicesByCategory[category.id]?.length > 0
  );
  
  if (categoriesWithServices.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center py-10">
            <Sparkles className="text-primary h-10 w-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Services Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              {escort.name} is currently updating their service offerings. 
              Check back soon for a complete list of available experiences.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Professional Services</h3>
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 w-full flex overflow-x-auto pb-1">
            {categoriesWithServices.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categoriesWithServices.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {servicesByCategory[category.id]?.map(serviceId => (
                    <ServiceCategoryBadge 
                      key={serviceId} 
                      serviceName={serviceId} 
                      className="mb-2 animate-fade-in"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 pt-4 border-t text-sm text-muted-foreground">
          <p>
            For detailed information about services and rates, please contact {escort.name} directly.
            All services provided are legal and professional in nature.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesTab;
