
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Escort } from '@/types/escort';

interface EscortRatesProps {
  escort: Escort;
}

const EscortRates: React.FC<EscortRatesProps> = ({ escort }) => {
  const rates = escort.rates || {}; // Ensure rates exists, default to empty object
  
  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return `$${price}`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Rates</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatPrice(rates.hourly)}</div>
              <div className="text-sm text-muted-foreground">1 Hour</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatPrice(rates.twoHours)}</div>
              <div className="text-sm text-muted-foreground">2 Hours</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatPrice(rates.overnight)}</div>
              <div className="text-sm text-muted-foreground">Overnight</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{formatPrice(rates.weekend)}</div>
              <div className="text-sm text-muted-foreground">Weekend</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>* Rates may vary based on specific services requested. Please confirm rates directly.</p>
      </div>
    </div>
  );
};

export default EscortRates;
