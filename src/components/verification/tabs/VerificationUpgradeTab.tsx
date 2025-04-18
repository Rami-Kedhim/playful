import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerificationBadge } from '../VerificationBadge';
import { getVerificationLevel } from '@/utils/personaHelpers';
import { Shield, Check, BadgeCheck } from 'lucide-react';

interface VerificationUpgradeTabProps {
  currentLevel: string;
  onUpgrade: (level: "basic" | "advanced" | "premium") => void;
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({ currentLevel, onUpgrade }) => {
  const upgradeTo = (level: "basic" | "advanced" | "premium") => {
    onUpgrade(level);
  };
  
  const currentVerificationLevel = getVerificationLevel(currentLevel);

  return (
    <Card>
      <CardContent className="space-y-4">
        {currentVerificationLevel !== "advanced" && (
          <div className="border rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Upgrade to Advanced</h3>
              </div>
              <VerificationBadge level="advanced" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enhanced verification with ID and background check.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Increased profile visibility</li>
              <li>Higher trust rating</li>
              <li>Access to premium features</li>
            </ul>
            <Button onClick={() => upgradeTo("advanced")} className="w-full">
              Upgrade to Advanced
            </Button>
          </div>
        )}

        {currentVerificationLevel !== "premium" && (
          <div className="border rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Become Premium Verified</h3>
              </div>
              <VerificationBadge level="premium" />
            </div>
            <p className="text-sm text-muted-foreground">
              Highest level of verification with in-person interview and security audit.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>Exclusive badge and benefits</li>
              <li>Top placement in search results</li>
              <li>Dedicated support and resources</li>
            </ul>
            <Button onClick={() => upgradeTo("premium")} className="w-full">
              Upgrade to Premium
            </Button>
          </div>
        )}

        {currentVerificationLevel === "premium" && (
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <p className="text-sm text-muted-foreground">
              You have the highest verification level.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationUpgradeTab;
