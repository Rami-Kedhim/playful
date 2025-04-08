
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Moon, Calendar2 } from "lucide-react";

export interface EscortRatesProps {
  rates: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
}

const EscortRates = ({ rates }: EscortRatesProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {rates.hourly !== undefined && (
          <Card>
            <CardContent className="p-6 flex items-center">
              <Clock className="h-10 w-10 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">1 Hour</p>
                <p className="text-2xl font-bold">${rates.hourly}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.twoHours !== undefined && (
          <Card>
            <CardContent className="p-6 flex items-center">
              <Clock className="h-10 w-10 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">2 Hours</p>
                <p className="text-2xl font-bold">${rates.twoHours}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.overnight !== undefined && (
          <Card>
            <CardContent className="p-6 flex items-center">
              <Moon className="h-10 w-10 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overnight</p>
                <p className="text-2xl font-bold">${rates.overnight}</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.weekend !== undefined && (
          <Card>
            <CardContent className="p-6 flex items-center">
              <Calendar className="h-10 w-10 text-primary mr-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekend</p>
                <p className="text-2xl font-bold">${rates.weekend}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">All rates include:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Private time to get to know each other</li>
          <li>Discreet and clean environment</li>
          <li>Professional and respectful service</li>
        </ul>
      </div>
    </div>
  );
};

export default EscortRates;
