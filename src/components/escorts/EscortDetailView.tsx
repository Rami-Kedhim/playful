
import React from 'react';
import { Escort } from '@/types/escort';
import { formatCurrency } from '@/utils/formatters';

interface EscortDetailViewProps {
  escort: Escort;
}

const EscortDetailView: React.FC<EscortDetailViewProps> = ({ escort }) => {
  // This function safely accesses rates or returns null if not available
  const getRateOrDefault = (rateType?: string, subType?: string): number | null => {
    if (!escort.rates) return null;
    
    if (subType && rateType) {
      const subRates = escort.rates[rateType] as Record<string, number> | undefined;
      return subRates?.[subType] || null;
    }
    
    return rateType ? (escort.rates[rateType] as number | undefined) || null : null;
  };

  const formatRateDisplay = (rate: number | null): string => {
    if (rate === null) return 'Not available';
    return formatCurrency(rate);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Incall Rates</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">1 Hour</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('incall', '1 hour'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">2 Hours</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('incall', '2 hours'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">Overnight</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('incall', 'overnight'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">Weekend</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('incall', 'weekend'))}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Outcall Rates</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">1 Hour</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('outcall', '1 hour'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">2 Hours</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('outcall', '2 hours'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">Overnight</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('outcall', 'overnight'))}</p>
            </div>
            
            <div className="p-3 bg-background rounded-md">
              <p className="text-sm text-muted-foreground">Weekend</p>
              <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('outcall', 'weekend'))}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background p-4 rounded-md">
        <h3 className="text-xl font-bold mb-2">Standard Rates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Hourly</p>
            <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('hourly'))}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Two Hours</p>
            <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('twoHours'))}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Overnight</p>
            <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('overnight'))}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Weekend</p>
            <p className="text-lg font-bold">{formatRateDisplay(getRateOrDefault('weekend'))}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortDetailView;
