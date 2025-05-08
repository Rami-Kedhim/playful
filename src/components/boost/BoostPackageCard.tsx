
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { BoostPackage } from '@/types/pulse-boost';

interface BoostPackageCardProps {
  boostPackage: BoostPackage;
  selected: boolean;
  onSelect: (id: string) => void;
  isActive?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({ 
  boostPackage, 
  selected, 
  onSelect,
  isActive = false
}) => {
  return (
    <Card 
      className={`relative transition-all ${
        selected ? 'border-primary ring-2 ring-primary/20' : ''
      } ${isActive ? 'border-green-500 ring-2 ring-green-500/20' : ''}`}
    >
      {boostPackage.isMostPopular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500">
          Most Popular
        </Badge>
      )}
      
      {isActive && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600">
          Currently Active
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{boostPackage.name}</span>
          <span className="text-xl font-bold">${boostPackage.price}</span>
        </CardTitle>
        <CardDescription className="font-medium">
          {boostPackage.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Duration: <span className="text-foreground">{boostPackage.duration}</span>
        </p>
        
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Visibility: <span className={`text-foreground`}>{boostPackage.visibility}</span>
        </p>
        
        <div className="space-y-2 mt-4">
          {boostPackage.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          variant={selected ? "default" : "outline"}
          onClick={() => onSelect(boostPackage.id)}
        >
          {selected ? "Selected" : isActive ? "Current Plan" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostPackageCard;
