
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Check, Star } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationLevelOptionsProps {
  currentLevel: VerificationLevel;
  onSelectLevel: (level: VerificationLevel) => void;
}

const VerificationLevelOptions: React.FC<VerificationLevelOptionsProps> = ({ 
  currentLevel,
  onSelectLevel 
}) => {
  
  const levels = [
    {
      level: VerificationLevel.BASIC,
      title: 'Basic Verification',
      description: 'Identity verification with government-issued ID',
      features: ['Identity confirmation', 'Basic profile badge', 'Access to standard features'],
      icon: <Shield className="h-6 w-6" />,
      disabled: currentLevel !== VerificationLevel.NONE
    },
    {
      level: VerificationLevel.ENHANCED,
      title: 'Enhanced Verification',
      description: 'Additional verification steps for premium features',
      features: ['All Basic features', 'Premium profile badge', 'Access to premium features', 'Higher visibility'],
      icon: <Check className="h-6 w-6" />,
      disabled: ![VerificationLevel.NONE, VerificationLevel.BASIC].includes(currentLevel)
    },
    {
      level: VerificationLevel.PREMIUM,
      title: 'Premium Verification',
      description: 'Complete verification for all platform features',
      features: ['All Enhanced features', 'Priority support', 'Exclusive features', 'Maximum visibility'],
      icon: <Star className="h-6 w-6" />,
      disabled: ![VerificationLevel.NONE, VerificationLevel.BASIC, VerificationLevel.ENHANCED].includes(currentLevel)
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Verification Levels</h2>
      <p className="text-muted-foreground">
        Choose a verification level to upgrade to. Each level provides additional benefits and features.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <Card key={level.level} className={`overflow-hidden ${level.disabled ? 'opacity-70' : ''}`}>
            <CardHeader className="bg-muted/50">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <span className="mr-2">{level.icon}</span>
                  {level.title}
                </CardTitle>
                
                {currentLevel === level.level && (
                  <Badge variant="outline" className="ml-2">Current</Badge>
                )}
              </div>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2 mb-6">
                {level.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => onSelectLevel(level.level as VerificationLevel)}
                disabled={level.disabled}
                variant={currentLevel === level.level ? "outline" : "default"}
                className="w-full"
              >
                {currentLevel === level.level 
                  ? 'Current Level' 
                  : level.disabled 
                    ? 'Not Available' 
                    : 'Select Level'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationLevelOptions;
