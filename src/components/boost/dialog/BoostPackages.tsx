
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { BoostPackage, BoostPackagesProps } from '../types';

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  boostPackages,
  selectedPackage,
  onSelectPackage,
  setSelectedPackage,
  formatDuration,
  formatBoostDuration,
  getBoostPrice,
  dailyBoostUsage = 0,
  dailyBoostLimit = 4,
  disabled = false
}) => {
  // Use the appropriate props based on what's provided
  const packagesData = packages || boostPackages || [];
  const handleSelectPackage = onSelectPackage || setSelectedPackage || (() => {});
  const formatPackageDuration = formatDuration || formatBoostDuration || ((d: string) => d);
  
  const reachedDailyLimit = dailyBoostUsage >= dailyBoostLimit;
  
  if (reachedDailyLimit) {
    return (
      <div className="mt-4">
        <Card className="border-yellow-500/50">
          <CardContent className="p-4">
            <div className="flex items-center text-yellow-500 mb-2">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Daily Boost Limit Reached</h3>
            </div>
            <CardDescription>
              You have reached your daily limit of {dailyBoostLimit} boosts. 
              Please try again tomorrow or upgrade your account for additional boosts.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (packagesData.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No boost packages available at this time.
      </div>
    );
  }
  
  return (
    <RadioGroup
      value={selectedPackage}
      onValueChange={handleSelectPackage}
      className="space-y-2 mt-2"
      disabled={disabled}
    >
      {packagesData.map((pkg: BoostPackage) => (
        <div
          key={pkg.id}
          className={`relative border rounded-lg cursor-pointer transition-all ${
            selectedPackage === pkg.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <RadioGroupItem
            value={pkg.id}
            id={`package-${pkg.id}`}
            className="sr-only"
          />
          <label
            htmlFor={`package-${pkg.id}`}
            className="block p-4 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Zap className={`h-4 w-4 mr-2 ${selectedPackage === pkg.id ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-medium">{pkg.name}</span>
              </div>
              <Badge variant="outline" className="ml-auto">
                {pkg.price_ubx} UBX
              </Badge>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {pkg.description}
            </div>
            
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              Duration: {formatPackageDuration(pkg.duration)}
            </div>
            
            {pkg.features && pkg.features.length > 0 && (
              <div className="mt-3 space-y-1">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-start text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </label>
          
          {selectedPackage === pkg.id && (
            <div className="absolute top-2 right-2 h-3 w-3 rounded-full bg-primary" />
          )}
        </div>
      ))}
    </RadioGroup>
  );
};

export default BoostPackages;
