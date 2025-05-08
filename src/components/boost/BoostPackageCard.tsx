
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { BoostPackage } from '@/types/boost';

interface BoostPackageCardProps {
  boostPackage: BoostPackage;
  onSelect: (packageId: string) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  boostPackage,
  onSelect,
  isSelected = false,
  isDisabled = false,
  loading = false,
}) => {
  const {
    id,
    name,
    description,
    duration,
    price,
    features,
    boost_power
  } = boostPackage;

  // Add a default value for isMostPopular if it doesn't exist
  const isMostPopular = boostPackage.isMostPopular || false;

  return (
    <Card className={`relative ${isSelected ? 'border-primary' : ''}`}>
      {isMostPopular && (
        <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full p-1">
          <Star className="h-4 w-4" />
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">${price}</p>
          <p className="text-sm text-muted-foreground">Duration: {duration}</p>
        </div>
        
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onSelect(id)}
          disabled={isDisabled || loading}
        >
          {loading ? "Processing..." : isSelected ? "Selected" : "Choose Plan"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostPackageCard;
