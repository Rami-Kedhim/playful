
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, Building2, Star } from 'lucide-react';

type VerificationType = 'personal' | 'business' | 'premium';

interface VerificationLevelTypeProps {
  selectedType: VerificationType | null;
  onSelectType: (type: VerificationType) => void;
}

const VERIFICATION_TYPES = {
  personal: {
    title: 'Personal Verification',
    description: 'For individual users and content creators',
    icon: UserRound,
    benefits: ['Basic identity verification', 'Access to essential features', 'Personal verification badge']
  },
  business: {
    title: 'Business Verification',
    description: 'For agencies and professional services',
    icon: Building2,
    benefits: ['Business documentation verification', 'Agency dashboard access', 'Business verification badge']
  },
  premium: {
    title: 'Premium Verification',
    description: 'Highest level of trust and features',
    icon: Star,
    benefits: ['Priority verification processing', 'Enhanced visibility', 'Premium features access']
  }
};

const VerificationLevelType = ({
  selectedType,
  onSelectType
}: VerificationLevelTypeProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {(Object.entries(VERIFICATION_TYPES)).map(([type, info]) => {
        const isSelected = selectedType === type;
        const Icon = info.icon;
        
        return (
          <Card
            key={type}
            className={`relative cursor-pointer transition-all hover:border-primary ${
              isSelected ? 'border-primary bg-primary/5' : ''
            }`}
            onClick={() => onSelectType(type as VerificationType)}
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{info.description}</p>
              
              <ul className="space-y-2">
                {info.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="text-primary mr-2">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <Button
                variant={isSelected ? "default" : "outline"}
                className="w-full"
                onClick={() => onSelectType(type as VerificationType)}
              >
                {isSelected ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VerificationLevelType;
