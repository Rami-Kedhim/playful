
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import useServices from "@/hooks/useServices";
import ServiceCategoryList from "./ServiceCategoryList";
import ServiceBadgeList from "./ServiceBadgeList";

interface EscortServicesProps {
  tags: string[];
}

const EscortServices = ({ tags }: EscortServicesProps) => {
  const { categoryNames, hasServices } = useServices(tags);
  
  if (!hasServices) {
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
          <ServiceCategoryList 
            categoryNames={categoryNames} 
            className="mb-2" 
          />
          
          <ServiceBadgeList 
            services={tags} 
            limit={5} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortServices;
