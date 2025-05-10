
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { BoostPackage } from '@/types/boost';
import { cn } from '@/lib/utils';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (id: string) => void;
  onBoost: () => void;
  formatDuration: (duration: string) => string;
  loading?: boolean;
  disabled?: boolean;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedPackage,
  onSelectPackage,
  onBoost,
  formatDuration,
  loading = false,
  disabled = false
}) => {
  // Helper function to format visibility properly
  const formatVisibility = (value?: string | number): string => {
    if (value === undefined || value === null) return '';
    
    // If it's a number, convert it to string with % sign
    if (typeof value === 'number') {
      return `${value}%`;
    }
    
    // If it's already a string, just return it
    return value;
  };
  
  const getColorClass = (isPrimary: boolean = false) => {
    return isPrimary ? 'border-primary' : '';
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!packages || packages.length === 0) {
    return <p>No boost packages available.</p>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map(pkg => {
        const isSelected = selectedPackage === pkg.id;
        const isPrimary = pkg.boost_power && pkg.boost_power >= 20;
        
        return (
          <Card 
            key={pkg.id}
            className={cn(
              'relative cursor-pointer border-2 transition-all',
              isSelected ? 'border-primary shadow-md' : getColorClass(isPrimary)
            )}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle>{pkg.name}</CardTitle>
                {pkg.boost_power && (
                  <Badge variant="outline">{pkg.boost_power}x</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <span className="text-2xl font-bold">${pkg.price}</span>
                <span className="text-sm text-muted-foreground ml-1">/ {formatDuration(pkg.duration)}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Visibility Boost:</span>
                  <span>{formatVisibility(pkg.visibility)}</span>
                </div>
                
                {pkg.features && pkg.features.length > 0 && (
                  <ul className="space-y-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              {isSelected ? (
                <Button 
                  className="w-full" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onBoost();
                  }}
                  disabled={disabled}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Boost Now
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled={disabled}>
                  Select
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default BoostPackages;
