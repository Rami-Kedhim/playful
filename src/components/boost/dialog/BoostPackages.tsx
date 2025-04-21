
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Zap } from "lucide-react";
import { BoostPackage } from "@/types/boost";

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  disabled?: boolean;
}

const BoostPackages = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  dailyBoostUsage = 0,
  dailyBoostLimit = 3,
  disabled = false
}: BoostPackagesProps) => {
  const remainingBoosts = dailyBoostLimit - dailyBoostUsage;
  
  return (
    <div className="space-y-4">
      {remainingBoosts <= 0 && (
        <div className="bg-destructive/10 p-3 rounded text-sm mb-4">
          You've reached your daily boost limit. Try again tomorrow.
        </div>
      )}
      
      <div className="text-sm text-muted-foreground mb-2">
        {remainingBoosts > 0 ? (
          <span>You have <b>{remainingBoosts}</b> boost{remainingBoosts !== 1 ? 's' : ''} remaining today</span>
        ) : (
          <span>Daily boost limit reached</span>
        )}
      </div>
      
      <RadioGroup 
        value={selectedPackage || ""} 
        onValueChange={onSelectPackage}
        disabled={disabled || remainingBoosts <= 0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative cursor-pointer ${
                selectedPackage === pkg.id ? 'border-primary' : ''
              }`}
              onClick={() => !disabled && onSelectPackage(pkg.id)}
            >
              {selectedPackage === pkg.id && (
                <div className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3" />
                </div>
              )}
              
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                  <div className="flex-1">
                    <Label 
                      htmlFor={pkg.id}
                      className="text-base font-medium flex items-center cursor-pointer"
                    >
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      {pkg.name}
                    </Label>
                    
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">
                        Duration: {formatBoostDuration(pkg.duration)}
                      </span>
                      <span className="font-medium">
                        {pkg.price_ubx} UBX
                      </span>
                    </div>
                    
                    {pkg.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {pkg.description}
                      </p>
                    )}
                    
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="text-xs flex items-start">
                            <span className="text-primary mr-1 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
