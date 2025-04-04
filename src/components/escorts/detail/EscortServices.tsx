
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { serviceCategories } from "@/data/serviceCategories";
import { getServiceCategoryNames } from "@/utils/serviceUtils";
import ServiceCategoryBadge from "./ServiceCategoryBadge";
import { Sparkles } from "lucide-react";

interface EscortServicesProps {
  tags: string[];
}

const EscortServices = ({ tags }: EscortServicesProps) => {
  // Get unique category names from services
  const categoryNames = getServiceCategoryNames(tags);
  
  if (!tags.length) {
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
        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {categoryNames.slice(0, 3).map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {categoryNames.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{categoryNames.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 5).map((service) => (
              <ServiceCategoryBadge 
                key={service} 
                serviceName={service} 
                className="text-xs"
              />
            ))}
            {tags.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 5} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortServices;
