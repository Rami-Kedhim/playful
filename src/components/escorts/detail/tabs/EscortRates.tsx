
import React from 'react';
import { Card } from '@/components/ui/card';
import { Escort } from '@/types/escort';
import { Banknote, Clock, Calendar } from 'lucide-react';

interface EscortRatesProps {
  escort: Escort;
}

const EscortRates: React.FC<EscortRatesProps> = ({ escort }) => {
  const { rates } = escort;
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Rate Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-secondary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Hourly</h4>
          </div>
          <div className="text-2xl font-semibold">${rates.hourly}</div>
        </div>

        {rates.twoHours && (
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Two Hours</h4>
            </div>
            <div className="text-2xl font-semibold">${rates.twoHours}</div>
          </div>
        )}
        
        <div className="bg-secondary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-primary" />
            <h4 className="font-medium">Overnight</h4>
          </div>
          <div className="text-2xl font-semibold">${rates.overnight}</div>
        </div>
        
        {rates.weekend && (
          <div className="bg-secondary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Weekend</h4>
            </div>
            <div className="text-2xl font-semibold">${rates.weekend}</div>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-sm text-muted-foreground">
        <p>* All rates are subject to availability and may change without notice.</p>
        <p>* Deposits may be required for bookings.</p>
      </div>
    </Card>
  );
};

export default EscortRates;
