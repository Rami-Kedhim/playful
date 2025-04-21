
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Clock, Zap, AlertTriangle } from "lucide-react";

interface BoostPackagesProps {
  packages: any[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  disabled?: boolean;
}

const BoostPackages = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  dailyBoostUsage,
  dailyBoostLimit,
  disabled = false
}: BoostPackagesProps) => {
  if (packages.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">No boost packages available</p>
      </div>
    );
  }

  // Limit warning
  const isNearingLimit = dailyBoostUsage > dailyBoostLimit * 0.7;
  const isAtLimit = dailyBoostUsage >= dailyBoostLimit;
  
  return (
    <div className="space-y-4">
      {(isNearingLimit || isAtLimit) && (
        <div className={`p-2 rounded-md flex items-center space-x-2 text-sm ${
          isAtLimit ? 'bg-destructive/10 text-destructive' : 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
        }`}>
          <AlertTriangle className="h-4 w-4" />
          <span>
            {isAtLimit 
              ? `Daily boost limit reached (${dailyBoostUsage}/${dailyBoostLimit}). Try again tomorrow.` 
              : `Nearing daily boost limit (${dailyBoostUsage}/${dailyBoostLimit}).`
            }
          </span>
        </div>
      )}
      
      <RadioGroup 
        value={selectedPackage || undefined} 
        onValueChange={onSelectPackage}
        className="space-y-3"
        disabled={disabled || isAtLimit}
      >
        {packages.map((pkg) => (
          <Label
            key={pkg.id}
            htmlFor={pkg.id}
            className={`flex items-center p-3 rounded-md border ${
              selectedPackage === pkg.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-secondary/20"
            } cursor-pointer transition-all ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <RadioGroupItem value={pkg.id} id={pkg.id} className="sr-only" />
            
            <div className="flex-1">
              <div className="flex items-center">
                <CardTitle className="text-base font-medium">
                  {pkg.name}
                </CardTitle>
                {pkg.id === 'premium' && (
                  <Badge className="ml-2 bg-amber-500 text-white">Best Value</Badge>
                )}
              </div>
              
              <CardDescription className="text-sm mt-1">
                {pkg.description || "Increase your profile visibility"}
              </CardDescription>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {formatBoostDuration(pkg.duration)}
                </div>
                {pkg.features && pkg.features.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    • {pkg.features[0]}
                  </div>
                )}
              </div>
            </div>
            
            <div className="ml-4 flex items-center justify-center bg-primary/10 px-3 py-1 rounded-full">
              <Zap className="h-3.5 w-3.5 mr-1 text-primary" />
              <span className="font-medium">{pkg.price_ubx} UBX</span>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
