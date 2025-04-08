
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface EscortRatesProps {
  rates: {
    hourly?: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  currency?: string;
}

const EscortRates: React.FC<EscortRatesProps> = ({ 
  rates = {}, 
  currency = '$' 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">My Rates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rates.hourly !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">1 Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{currency}{rates.hourly}</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Standard experience</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Perfect introduction</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.twoHours !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">2 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{currency}{rates.twoHours}</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Extended experience</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>More time to connect</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.overnight !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overnight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{currency}{rates.overnight}</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Full night experience</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Breakfast included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {rates.weekend !== undefined && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{currency}{rates.weekend}</p>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Full weekend getaway</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Premium experience</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">
        * All rates are subject to change depending on specific requests and duration. 
        Please contact me to discuss your specific requirements.
      </p>
    </div>
  );
};

export default EscortRates;
