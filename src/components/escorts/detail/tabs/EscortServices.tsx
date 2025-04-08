
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Escort } from "@/types/escort";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface EscortServicesProps {
  escort: Escort;
}

// Service categories for organization
const serviceCategories = [
  {
    name: "Standard",
    services: ["GFE", "Massage", "Dinner Date", "Travel Companion"]
  },
  {
    name: "Special",
    services: ["Overnight", "Role Play", "Couple Friendly", "Fantasy"]
  },
  {
    name: "Extras",
    services: ["BDSM", "Fetish", "Tantric", "Domination"]
  }
];

const EscortServices: React.FC<EscortServicesProps> = ({ escort }) => {
  // Helper function to determine if a service is offered
  const hasService = (service: string) => {
    return escort.services?.includes(service) || escort.tags?.includes(service);
  };
  
  // Count how many services from each category are offered
  const categoryCounts = serviceCategories.map(category => {
    const offered = category.services.filter(service => hasService(service));
    return { name: category.name, count: offered.length };
  });
  
  // Get a flat list of all services for display
  const allServices = serviceCategories.flatMap(cat => cat.services);
  const offeredServices = allServices.filter(service => hasService(service));
  
  // If escort has no defined services, show placeholder
  if (!escort.services?.length && !escort.tags?.length) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex flex-col items-center py-3">
            <Sparkles className="text-primary h-5 w-5 mb-2" />
            <p className="text-sm text-muted-foreground">Service details coming soon</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {categoryCounts.map((cat) => (
            cat.count > 0 && (
              <Badge key={cat.name} variant="outline">
                {cat.name} ({cat.count})
              </Badge>
            )
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceCategories.map((category) => {
            const categoryServices = category.services.filter(service => hasService(service));
            if (categoryServices.length === 0) return null;
            
            return (
              <div key={category.name}>
                <h3 className="text-sm font-medium mb-2">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {categoryServices.map((service) => (
                    <TooltipProvider key={service}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="bg-secondary hover:bg-primary">
                            {service}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{service}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {offeredServices.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Contact for more details about specific services and any additional options.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortServices;
