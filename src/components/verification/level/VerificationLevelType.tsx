
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BadgeCheck, Shield, User } from 'lucide-react';

interface VerificationLevelTypeProps {
  selectedType: 'personal' | 'business' | 'premium' | null;
  onSelectType: (type: 'personal' | 'business' | 'premium') => void;
}

const VerificationLevelType: React.FC<VerificationLevelTypeProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Verification Level</h3>
      <p className="text-sm text-muted-foreground">
        Choose the verification level that best suits your needs
      </p>

      <RadioGroup
        value={selectedType || undefined}
        onValueChange={(value) => onSelectType(value as any)}
        className="grid gap-4"
      >
        <Card className={`cursor-pointer border-2 ${selectedType === 'personal' ? 'border-primary' : 'border-transparent'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="text-base font-medium cursor-pointer">
                    Personal Verification
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Basic identity verification for individual users
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                  <li>ID verification</li>
                  <li>Basic trust badge</li>
                  <li>Free of charge</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer border-2 ${selectedType === 'business' ? 'border-primary' : 'border-transparent'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="business" id="business" />
                  <Label htmlFor="business" className="text-base font-medium cursor-pointer">
                    Enhanced Verification
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  More thorough verification for enhanced trust
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                  <li>ID verification</li>
                  <li>Address verification</li>
                  <li>Enhanced trust badge</li>
                  <li>Priority support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`cursor-pointer border-2 ${selectedType === 'premium' ? 'border-primary' : 'border-transparent'}`}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <BadgeCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="text-base font-medium cursor-pointer">
                    Premium Verification
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete verification for maximum trust and features
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-2 list-disc list-inside">
                  <li>ID verification</li>
                  <li>Address verification</li>
                  <li>Video call verification</li>
                  <li>Premium trust badge</li>
                  <li>Priority support and features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>
    </div>
  );
};

export default VerificationLevelType;
