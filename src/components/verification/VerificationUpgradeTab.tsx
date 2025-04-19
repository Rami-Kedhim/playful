
// Fix import of VerificationLevel enum and update usage in component accordingly

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { VerificationBadge } from '@/components/verification/VerificationBadge';
import { VerificationLevel } from '@/types/verification';

export interface VerificationUpgradeTabProps {
  currentLevel: VerificationLevel;
  onUpgrade: (level: VerificationLevel) => void;
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({
  currentLevel,
  onUpgrade
}) => {

  const verificationLevels = [
    {
      id: VerificationLevel.BASIC,
      title: 'Basic Verification',
      description: 'Email and phone verification',
      price: 'Free',
      features: [
        'Email verification',
        'Phone verification',
        'Basic profile badge'
      ]
    },
    {
      id: VerificationLevel.ENHANCED,
      title: 'Enhanced Verification',
      description: 'ID verification and background check',
      price: '$29.99',
      features: [
        'All Basic features',
        'ID verification',
        'Background verification',
        'Enhanced visibility in search',
        'Enhanced profile badge'
      ]
    },
    {
      id: VerificationLevel.PREMIUM,
      title: 'Premium Verification',
      description: 'Complete verification with priority support',
      price: '$99.99',
      features: [
        'All Enhanced features',
        'In-person verification',
        'Priority customer support',
        'Featured in recommended profiles',
        'Premium profile badge',
        'Verification certificate'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground mb-6">
        Upgrade your verification level to improve trust and visibility on the platform.
        Higher verification levels result in more profile views and better conversion rates.
      </p>
      
      <div className="grid gap-6 md:grid-cols-3">
        {verificationLevels.map((level) => {
          const isCurrentLevel = currentLevel === level.id;
          const canUpgrade = 
            (currentLevel === VerificationLevel.BASIC && (level.id === VerificationLevel.ENHANCED || level.id === VerificationLevel.PREMIUM)) || 
            (currentLevel === VerificationLevel.ENHANCED && level.id === VerificationLevel.PREMIUM);
          
          return (
            <Card 
              key={level.id} 
              className={`${isCurrentLevel ? 'border-primary' : ''}`}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle>{level.title}</CardTitle>
                  <VerificationBadge level={level.id} />
                </div>
                <div className="text-2xl font-bold">{level.price}</div>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {level.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isCurrentLevel ? (
                  <Button disabled className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Current Level
                  </Button>
                ) : canUpgrade ? (
                  <Button 
                    onClick={() => onUpgrade(level.id)} 
                    className="w-full"
                  >
                    <Star className="mr-2 h-4 w-4" /> Upgrade
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="w-full">
                    Not Available
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationUpgradeTab;

