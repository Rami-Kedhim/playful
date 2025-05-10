import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, Check } from 'lucide-react';
import { BoostPackage } from '@/types/pulse-boost';

interface BoostPackageCardProps {
  boostPackage: BoostPackage;
  onSelect?: (packageId: string) => void;
  selected?: boolean;
  compact?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({ 
  boostPackage, 
  onSelect, 
  selected = false,
  compact = false
}) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(boostPackage.id);
    }
  };

  // Fix the formatting by ensuring we convert number to string explicitly
  const formattedPrice = `$${boostPackage.price.toString()}`;
  
  return (
    <Card className="border rounded-lg p-4 flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader>
        <h3 className="text-lg font-semibold mb-2">{boostPackage.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{boostPackage.description}</p>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Price:</span>
          <span className="text-primary font-bold">{formattedPrice}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Duration:</span>
          <span className="text-primary">{boostPackage.duration?.toString() || ''}</span>
        </div>

        {boostPackage.visibility && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Visibility:</span>
            <span className="text-primary">{boostPackage.visibility}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {(boostPackage.isMostPopular || selected) && (
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
