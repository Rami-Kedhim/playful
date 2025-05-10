
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoostPackageCardProps {
  packageData: BoostPackage;
  isSelected: boolean;
  onClick: () => void;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  packageData,
  isSelected,
  onClick,
}) => {
  const { 
    name, 
    description, 
    price_ubx, 
    duration, 
    features, 
    visibility, 
    color 
  } = packageData;
  
  const cardBorderColor = color || '#4CAF50';
  
  return (
    <div
      className={cn(
        "border rounded-lg p-4 cursor-pointer transition-all",
        isSelected 
          ? `border-2 ring-2 ring-primary/20 shadow-md` 
          : "border hover:border-primary/50"
      )}
      style={isSelected ? { borderColor: cardBorderColor } : {}}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {isSelected && (
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-baseline">
        <span className="text-2xl font-bold">{price_ubx}</span>
        <span className="ml-1 text-muted-foreground">UBX</span>
      </div>
      
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm">
          <Zap className="h-4 w-4 mr-1 text-primary" />
          <span>Boost for {duration}</span>
        </div>
        <div className="flex items-center text-sm">
          <Zap className="h-4 w-4 mr-1 text-primary" />
          <span>+{visibility} visibility</span>
        </div>
        
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm">
            <Check className="h-3 w-3 mr-1 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoostPackageCard;
