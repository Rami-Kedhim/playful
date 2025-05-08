
import React from 'react';
import { Escort } from '@/types/Escort';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RatesTabProps {
  escort: Escort;
}

const RatesTab: React.FC<RatesTabProps> = ({ escort }) => {
  const rates = escort.rates || {};
  
  // Check if rates has incall and outcall properties
  const incallRates = rates.incall || {};
  const outcallRates = rates.outcall || {};
  
  const hasIncall = Object.keys(rates.incall || {}).length > 0;
  const hasOutcall = Object.keys(rates.outcall || {}).length > 0;
  
  return (
    <div className="space-y-6">
      {(!hasIncall && !hasOutcall) ? (
        <p className="text-muted-foreground">No rates information available.</p>
      ) : (
        <>
          {hasIncall && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Incall Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(incallRates).map(([duration, price]) => (
                    <div key={duration} className="flex justify-between">
                      <span className="font-medium">{duration}</span>
                      <span className="text-muted-foreground">{String(price)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {hasOutcall && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Outcall Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(outcallRates).map(([duration, price]) => (
                    <div key={duration} className="flex justify-between">
                      <span className="font-medium">{duration}</span>
                      <span className="text-muted-foreground">{String(price)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
      
      {escort.payment_methods && escort.payment_methods.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
          <p className="text-muted-foreground">
            {escort.payment_methods.join(', ')}
          </p>
        </div>
      )}
      
      {escort.deposit_required && (
        <div>
          <h3 className="text-lg font-medium mb-2">Deposit</h3>
          <p className="text-muted-foreground">
            A deposit is required to secure your booking.
          </p>
        </div>
      )}
    </div>
  );
};

export default RatesTab;
