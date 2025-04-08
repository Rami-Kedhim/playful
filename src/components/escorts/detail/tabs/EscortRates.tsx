
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CalendarDays, CalendarClock, CalendarIcon, PlaneTakeoff } from "lucide-react";
import { Escort } from "@/types/escort";

interface EscortRatesProps {
  escort: Escort;
}

const EscortRates: React.FC<EscortRatesProps> = ({ escort }) => {
  // Default rates if not provided
  const defaultHourly = escort.rates?.hourly || escort.price || 200;
  
  const rates = {
    hourly: defaultHourly,
    twoHours: escort.rates?.twoHours || defaultHourly * 1.8,
    threeHours: escort.rates?.threeHours || defaultHourly * 2.5,
    dinner: escort.rates?.dinner || defaultHourly * 3,
    overnight: escort.rates?.overnight || defaultHourly * 5,
    weekend: escort.rates?.weekend || defaultHourly * 10,
    travel: escort.rates?.travel || defaultHourly * 2 + " per day"
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          The following rates are for companionship time only. Any additional services should be discussed in person.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">1 Hour</h3>
                <p className="text-sm text-muted-foreground">Standard visit</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.hourly}</div>
          </div>
          
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">2 Hours</h3>
                <p className="text-sm text-muted-foreground">Extended visit</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.twoHours}</div>
          </div>
          
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">3 Hours</h3>
                <p className="text-sm text-muted-foreground">Longer session</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.threeHours}</div>
          </div>
          
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <CalendarClock className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">Dinner Date</h3>
                <p className="text-sm text-muted-foreground">4-5 hours with dinner</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.dinner}</div>
          </div>
          
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">Overnight</h3>
                <p className="text-sm text-muted-foreground">10-12 hours, until morning</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.overnight}</div>
          </div>
          
          <div className="flex items-start justify-between border-b pb-3">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">Weekend</h3>
                <p className="text-sm text-muted-foreground">Friday to Sunday</p>
              </div>
            </div>
            <div className="text-xl font-semibold">${rates.weekend}</div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <PlaneTakeoff className="h-5 w-5 mr-3 text-primary" />
              <div>
                <h3 className="font-medium">Travel Companion</h3>
                <p className="text-sm text-muted-foreground">Plus expenses</p>
              </div>
            </div>
            <div className="text-xl font-semibold">{rates.travel}</div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-muted rounded-md">
          <h3 className="font-medium mb-1">Payment Methods</h3>
          <p className="text-sm text-muted-foreground">
            Cash, crypto, and Lucoins accepted. Other payment methods may be available upon request.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortRates;
