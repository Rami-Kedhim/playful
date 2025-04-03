
import { Escort } from "@/data/escortData";
import { Badge } from "@/components/ui/badge";

interface ServicesTabProps {
  escort: Escort;
}

const ServicesTab = ({ escort }: ServicesTabProps) => {
  // Use services if available, otherwise fall back to tags
  const servicesToShow = escort.services || escort.tags || [];
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Services Offered</h3>
      
      {servicesToShow.length === 0 ? (
        <p className="text-muted-foreground italic">No services listed</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {servicesToShow.map((service, index) => (
            <Badge 
              key={`${service}-${index}`} 
              variant="secondary"
              className="justify-center py-2 px-3 bg-secondary/20 hover:bg-secondary/30"
            >
              {service}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
