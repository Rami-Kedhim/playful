
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Check, Shield } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationLevelOptionsProps {
  currentLevel: VerificationLevel;
  onSelectLevel: (level: VerificationLevel) => void;
}

const VerificationLevelOptions: React.FC<VerificationLevelOptionsProps> = ({
  currentLevel,
  onSelectLevel
}) => {
  // Helper to check if level is already acquired or can be upgraded to
  const canUpgradeTo = (level: VerificationLevel): boolean => {
    const levelOrder = [
      VerificationLevel.NONE,
      VerificationLevel.BASIC,
      VerificationLevel.ENHANCED,
      VerificationLevel.PREMIUM
    ];
    
    const currentIndex = levelOrder.indexOf(currentLevel);
    const targetIndex = levelOrder.indexOf(level);
    
    return targetIndex > currentIndex;
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Verification Levels</h3>
        <p className="text-sm text-muted-foreground">
          Choose a verification level to enhance your account's trust and access more features
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className={`border ${currentLevel === VerificationLevel.BASIC ? 'border-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Basic
              <Shield className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Essential verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg mb-4">Free</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Identity verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Basic trust badge
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Standard features
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {currentLevel === VerificationLevel.BASIC ? (
              <Button className="w-full" disabled>
                Current Level
              </Button>
            ) : canUpgradeTo(VerificationLevel.BASIC) ? (
              <Button 
                className="w-full" 
                onClick={() => onSelectLevel(VerificationLevel.BASIC)}
              >
                Select
              </Button>
            ) : (
              <Button className="w-full" disabled variant="outline">
                <BadgeCheck className="h-4 w-4 mr-2" />
                Acquired
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card className={`border ${currentLevel === VerificationLevel.ENHANCED ? 'border-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Enhanced
              <Shield className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Advanced verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg mb-4">$5.00</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Identity verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Address verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Enhanced trust badge
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Priority support
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {currentLevel === VerificationLevel.ENHANCED ? (
              <Button className="w-full" disabled>
                Current Level
              </Button>
            ) : canUpgradeTo(VerificationLevel.ENHANCED) ? (
              <Button 
                className="w-full" 
                onClick={() => onSelectLevel(VerificationLevel.ENHANCED)}
              >
                Upgrade
              </Button>
            ) : (
              <Button className="w-full" disabled variant="outline">
                <BadgeCheck className="h-4 w-4 mr-2" />
                Acquired
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <Card className={`border ${currentLevel === VerificationLevel.PREMIUM ? 'border-primary' : ''}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Premium
              <Shield className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>Highest verification level</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-lg mb-4">$15.00</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Identity verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Address verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Video call verification
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Premium trust badge
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Priority support & features
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {currentLevel === VerificationLevel.PREMIUM ? (
              <Button className="w-full" disabled>
                Current Level
              </Button>
            ) : canUpgradeTo(VerificationLevel.PREMIUM) ? (
              <Button 
                className="w-full" 
                onClick={() => onSelectLevel(VerificationLevel.PREMIUM)}
              >
                Upgrade
              </Button>
            ) : (
              <Button className="w-full" disabled variant="outline">
                <BadgeCheck className="h-4 w-4 mr-2" />
                Acquired
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerificationLevelOptions;
