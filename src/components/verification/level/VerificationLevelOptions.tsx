
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ShieldCheck, ShieldPlus } from 'lucide-react';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

interface VerificationLevelOptionsProps {
  currentLevel: VerificationLevel;
  onSelectLevel: (level: VerificationLevel) => void;
}

const LEVEL_INFO = {
  basic: {
    title: 'Basic Verification',
    description: 'Simple ID verification for basic account features',
    icon: Shield,
    benefits: ['ID verification badge', 'Access to basic features', 'Improved trust score']
  },
  enhanced: {
    title: 'Enhanced Verification',
    description: 'Additional verification for enhanced features and trust',
    icon: ShieldCheck,
    benefits: ['Enhanced verification badge', 'Priority support', 'Higher visibility in search']
  },
  premium: {
    title: 'Premium Verification',
    description: 'Comprehensive verification for maximum trust and features',
    icon: ShieldPlus,
    benefits: ['Premium verification badge', '24/7 priority support', 'Maximum visibility & trust']
  }
};

const VerificationLevelOptions = ({
  currentLevel,
  onSelectLevel
}: VerificationLevelOptionsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {(Object.keys(LEVEL_INFO) as Array<keyof typeof LEVEL_INFO>).map((level) => {
        const info = LEVEL_INFO[level];
        const isCurrentLevel = currentLevel === level;
        
        return (
          <Card
            key={level}
            className={`relative ${isCurrentLevel ? 'border-primary' : ''}`}
          >
            {isCurrentLevel && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                Current
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center space-x-2">
                <info.icon className="h-5 w-5 text-primary" />
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
                onClick={() => onSelectLevel(level)}
                variant={isCurrentLevel ? "outline" : "default"}
                className="w-full"
                disabled={isCurrentLevel}
              >
                {isCurrentLevel ? 'Current Level' : `Upgrade to ${level}`}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default VerificationLevelOptions;
