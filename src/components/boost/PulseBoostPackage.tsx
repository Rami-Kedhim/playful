
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { BoostPackage } from '@/types/shared';

interface PulseBoostPackageProps {
  package: BoostPackage;
  onSelect: (packageId: string) => void;
  isSelected?: boolean;
  isRecommended?: boolean;
  disabled?: boolean;
}

/**
 * PulseBoostPackage component for displaying and selecting boost packages
 * Integrates with Oxum for boost calculations
 */
const PulseBoostPackage: React.FC<PulseBoostPackageProps> = ({
  package: boostPackage,
  onSelect,
  isSelected = false,
  isRecommended = false,
  disabled = false
}) => {
  const handleSelect = () => {
    if (!disabled) {
      onSelect(boostPackage.id);
    }
  };
  
  // Use package color or fallback to default
  const bgColor = boostPackage.color || '#4f46e5';
  const textColor = boostPackage.badgeColor || '#3730a3';
  
  return (
    <Card 
      className={`border-2 transition-all ${
        isSelected 
          ? 'border-primary shadow-lg' 
          : 'border-transparent hover:border-gray-300'
      }`}
    >
      {isRecommended && (
        <div className="bg-amber-500 text-amber-950 text-center text-sm font-medium py-1">
          Most Popular
        </div>
      )}
      
      <CardHeader className={`pb-2`} style={{ backgroundColor: bgColor + '20' }}>
        <CardTitle className="flex justify-between items-center">
          <span className="text-xl">{boostPackage.name}</span>
          {boostPackage.boost_power && (
            <span className="text-sm font-normal px-2 py-1 rounded-full" style={{ backgroundColor: textColor + '40', color: textColor }}>
              {boostPackage.boost_power}x Boost
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="text-2xl font-bold mb-4">
          ${boostPackage.price}
          <span className="text-sm font-normal text-gray-500"> / {boostPackage.duration.replace(/:\d\d:\d\d$/, 'h')}</span>
        </div>
        
        <div className="text-sm mb-2">
          Visibility increase: {boostPackage.visibility_increase || 0}%
        </div>
        
        <div className="space-y-2 my-4">
          {boostPackage.features?.map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSelect}
          disabled={disabled}
          className="w-full"
          variant={isSelected ? "default" : "outline"}
        >
          {isSelected ? "Selected" : "Select Package"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PulseBoostPackage;
