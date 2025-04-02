
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface EscortServicesProps {
  tags: string[];
}

const EscortServices = ({ tags }: EscortServicesProps) => {
  // Extended services for display
  const allServices = [
    ...tags,
    "Massage",
    "Dinner Date",
    "Overnight",
    "Travel Companion",
    "Events",
  ];
  
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">Services Offered</h3>
        
        <div className="grid grid-cols-2 gap-2">
          {allServices.map((service, index) => (
            <div 
              key={index}
              className="flex items-center text-sm p-2 rounded-md bg-secondary/40"
            >
              <Check size={16} className="mr-2 text-green-500" />
              {service}
            </div>
          ))}
        </div>
        
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

export default EscortServices;
