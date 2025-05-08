
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { BoostPackage } from "@/types/boost";

interface BoostPackageCardProps {
  boostPackage: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration: (duration: string) => string;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  boostPackage,
  isSelected,
  onSelect,
  formatDuration
}) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-0 text-center">
        <div className="flex items-center justify-center mb-2">
          <Zap className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <h3 className="font-medium text-lg">{boostPackage.name}</h3>
        <div className="text-sm text-muted-foreground my-2">
          {formatDuration(boostPackage.duration)}
        </div>
        <div className="mt-2 font-bold text-lg">
          {boostPackage.price_ubx || boostPackage.price} UBX
        </div>
        {boostPackage.features && boostPackage.features.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-muted-foreground">
            <ul className="space-y-1">
              {boostPackage.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-primary text-xs mr-1">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostPackageCard;
