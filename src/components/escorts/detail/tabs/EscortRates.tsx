
import React from 'react';
import { Card } from '@/components/ui/card';
import { Escort } from '@/types/Escort'; // Changed casing to capital E
import { Calendar } from 'lucide-react';

interface EscortRatesProps {
  escort: Escort;
}

const EscortRates: React.FC<EscortRatesProps> = ({ escort }) => {
  const { rates } = escort;
  
  if (!rates) {
    return (
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Rates Information</h3>
        <p className="text-gray-600">No rate information available.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Rates Information</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {'hourly' in rates && rates.hourly && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <h4 className="font-medium">1 Hour</h4>
              </div>
              <p className="text-2xl font-bold">${rates.hourly}</p>
            </div>
          )}
          
          {'twoHours' in rates && rates.twoHours && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <h4 className="font-medium">2 Hours</h4>
              </div>
              <p className="text-2xl font-bold">${rates.twoHours}</p>
            </div>
          )}
          
          {'overnight' in rates && rates.overnight && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <h4 className="font-medium">Overnight</h4>
              </div>
              <p className="text-2xl font-bold">${rates.overnight}</p>
            </div>
          )}
          
          {'weekend' in rates && rates.weekend && (
            <div className="bg-muted/30 p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <h4 className="font-medium">Weekend</h4>
              </div>
              <p className="text-2xl font-bold">${rates.weekend}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p>* Rates may be subject to change. Please confirm during booking.</p>
          <p>* Additional services may have different rates.</p>
        </div>
      </div>
    </Card>
  );
};

export default EscortRates;
