
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Check } from 'lucide-react';
import { BoostPackage } from '@/types/pulse-boost';

interface BoostPackageCardProps {
  package?: BoostPackage;
  pkg?: BoostPackage;  // Alternative name for backward compatibility
  isSelected: boolean;
  onSelect: () => void;
  formatDuration?: (duration: string | number) => string;
  isPopular?: boolean;
  compact?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({ 
  package: boostPackage,
  pkg,
  isSelected = false,
  onSelect, 
  formatDuration,
  isPopular,
  compact = false
}) => {
  // Use either package or pkg prop for compatibility
  const packageData = boostPackage || pkg;
  
  if (!packageData) {
    return <div>Invalid package data</div>;
  }
  
  const handleSelect = () => {
    if (onSelect) {
      onSelect();
    }
  };

  // Format duration if formatDuration function is provided
  const formattedDuration = formatDuration 
    ? formatDuration(packageData.duration) 
    : typeof packageData.duration === 'string' 
      ? packageData.duration 
      : `${packageData.duration}h`;

  // Format price
  const formattedPrice = `$${packageData.price.toString()}`;
  
  return (
    <Card className="border rounded-lg p-4 flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <h3 className="text-lg font-semibold mb-2">{packageData.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{packageData.description}</p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Price:</span>
          <span className="text-primary font-bold">{formattedPrice}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Duration:</span>
          <span className="text-primary">{formattedDuration}</span>
        </div>

        {packageData.visibility && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Visibility:</span>
            <span className="text-primary">{packageData.visibility}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {((packageData.isMostPopular || packageData.isPopular || isPopular) || isSelected) && (
          <Badge variant="outline" className="text-green-700">
            Most Popular
          </Badge>
        )}
        {compact ? (
          <Button variant="outline" onClick={handleSelect}>
            <ArrowUp className="mr-2" />
            Select
          </Button>
        ) : (
          <Button variant="outline" onClick={handleSelect}>
            <Check className="mr-2" />
            Select
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BoostPackageCard;
