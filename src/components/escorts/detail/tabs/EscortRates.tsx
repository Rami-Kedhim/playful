
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Escort } from "@/types/escort";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EscortRatesProps {
  escort: Escort;
}

const EscortRates: React.FC<EscortRatesProps> = ({ escort }) => {
  const rates = escort.rates || {};
  
  // Only show rates that exist in the escort data
  const availableRates = [
    { name: "1 Hour", value: rates.hourly },
    { name: "2 Hours", value: rates.twoHours },
    { name: "Overnight", value: rates.overnight },
    { name: "Weekend", value: rates.weekend }
  ].filter(rate => rate.value !== undefined);
  
  if (availableRates.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No rate information available</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-6">Standard Rates</h3>
            
            <div className="space-y-4">
              {availableRates.map((rate, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{rate.name}</span>
                  <span className="text-xl font-semibold">${rate.value}</span>
                </div>
              ))}
            </div>
            
            {escort.rates && (
              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">
                  Rates are subject to change for outcall services or special requests. 
                  Please inquire directly for specific pricing information.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Payment Methods</h3>
            <ul className="list-disc list-inside space-y-2">
              <li className="text-muted-foreground">Cash (preferred)</li>
              <li className="text-muted-foreground">Bank transfer (for regular clients)</li>
              <li className="text-muted-foreground">Cryptocurrency (BTC, ETH, LUCOINS)</li>
            </ul>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">
                All payments must be received at the beginning of our appointment.
                Deposits may be required for new clients or extended bookings.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Cancellation Policy</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                • 24+ hours: Full refund of any deposit
              </p>
              <p className="text-sm text-muted-foreground">
                • 12-24 hours: 50% of deposit retained
              </p>
              <p className="text-sm text-muted-foreground">
                • Less than 12 hours: No refund of deposit
              </p>
              <p className="text-sm text-muted-foreground">
                • No-show: Blacklisted for future bookings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default EscortRates;
