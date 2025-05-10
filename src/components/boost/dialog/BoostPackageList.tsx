
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Alert } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoostPackageListProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (id: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice?: () => number;
  onPurchase?: () => void;
}

const BoostPackageList = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  onPurchase
}: BoostPackageListProps) => {
  if (!packages || packages.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <p>No boost packages are currently available.</p>
      </Alert>
    );
  }

  // Helper function to format visibility properly (handling string or number types)
  const formatVisibility = (value?: string | number): string => {
    if (value === undefined || value === null) return '';
    
    // Convert to string with % if it's a number
    if (typeof value === 'number') {
      return `${value}%`;
    }
    
    return value;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`border rounded-lg p-4 cursor-pointer hover:border-primary ${
              selectedPackage === pkg.id ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </div>
              <div className="text-right">
                <span className="font-bold">${pkg.price}</span>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 text-sm gap-y-1">
              <div>Duration:</div>
              <div className="text-right">{formatBoostDuration(pkg.duration)}</div>
              
              {pkg.visibility && (
                <>
                  <div>Visibility:</div>
                  <div className="text-right">{formatVisibility(pkg.visibility)}</div>
                </>
              )}
            </div>
            
            {pkg.features && pkg.features.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Features:</p>
                <ul className="text-xs text-muted-foreground">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-1">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedPackage && onPurchase && (
        <Button 
          className="w-full" 
          onClick={onPurchase}
        >
          Boost Now ({getBoostPrice ? getBoostPrice() : '$0'})
        </Button>
      )}
    </div>
  );
};

export default BoostPackageList;
