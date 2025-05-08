
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { BoostPackage } from "@/types/boost";

interface BoostPackageCardProps {
  package: BoostPackage;
  selected?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
  disabled?: boolean;
  isPopular?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  package: pkg,
  selected = false,
  onClick,
  onSelect,
  disabled = false,
  isPopular = false
}) => {
  const isPackagePopular = isPopular || pkg.isPopular || pkg.isMostPopular;
  
  return (
    <Card 
      className={`relative ${selected ? 'border-primary' : ''} ${disabled ? 'opacity-60' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {isPackagePopular && (
        <div className="absolute -top-3 left-0 right-0 flex justify-center">
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className={isPackagePopular ? 'pt-6' : ''}>
        <CardTitle className="flex items-center justify-between">
          <span>{pkg.name}</span>
          <Badge variant="outline">{pkg.price_ubx} UBX</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{pkg.description}</p>
        
        <div>
          <p className="text-sm font-medium mb-2">Features:</p>
          <ul className="space-y-1">
            {pkg.features?.map((feature, index) => (
              <li key={index} className="text-sm flex items-start">
                <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div className="border rounded-md p-2">
            <p className="font-medium">{pkg.visibility || '50%'}</p>
            <p className="text-xs text-muted-foreground">Visibility</p>
          </div>
          <div className="border rounded-md p-2">
            <p className="font-medium">{pkg.duration}</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          onClick={onSelect}
          disabled={disabled}
          variant={selected ? "default" : "outline"}
        >
          {selected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Selected
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Select
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostPackageCard;
