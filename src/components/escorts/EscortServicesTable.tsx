
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Rate {
  hourly?: number;
  halfHour?: number;
  overnight?: number;
  [key: string]: number | undefined;
}

interface EscortServicesTableProps {
  services: string[];
  rates: Rate;
}

const EscortServicesTable: React.FC<EscortServicesTableProps> = ({ services = [], rates = {} }) => {
  const formattedRates: { name: string; price: number }[] = Object.entries(rates)
    .filter(([_, value]) => value !== undefined && value > 0)
    .map(([key, value]) => ({
      name: formatRateName(key),
      price: value as number,
    }));

  function formatRateName(key: string): string {
    // Convert camelCase to sentence case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  return (
    <div className="space-y-6">
      {/* Services Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-primary" />
            Available Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          {services && services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <Badge key={index} variant="outline" className="bg-background text-foreground">
                  {service}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No services specified.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Rates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formattedRates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formattedRates.map((rate, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span className="font-medium">{rate.name}</span>
                  <span className="text-primary-foreground bg-primary px-2 py-1 rounded-md">
                    ${rate.price}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No rates specified.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EscortServicesTable;
