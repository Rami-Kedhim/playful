
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationLevelsProps {
  currentLevel: VerificationLevel;
}

const VerificationLevels: React.FC<VerificationLevelsProps> = ({ currentLevel }) => {
  // Remove STANDARD, it's not defined in the enum VerificationLevel
  const levels = [
    {
      id: VerificationLevel.BASIC,
      name: 'Basic Verification',
      description: 'Email and phone number verification',
      requirements: ['Valid email address', 'Phone number verification']
    },
    {
      id: VerificationLevel.ENHANCED,
      name: 'Enhanced Verification',
      description: 'Additional verification for premium features',
      requirements: ['Address verification', 'Background check consent']
    },
    {
      id: VerificationLevel.PREMIUM,
      name: 'Premium Verification',
      description: 'Highest level of verification for all platform features',
      requirements: ['In-person verification', 'Professional references']
    }
  ];

  const getVerificationStatus = (level: VerificationLevel) => {
    const levelOrder = [
      VerificationLevel.NONE,
      VerificationLevel.BASIC,
      VerificationLevel.ENHANCED,
      VerificationLevel.PREMIUM
    ];
    
    const currentIndex = levelOrder.indexOf(currentLevel);
    const levelIndex = levelOrder.indexOf(level);
    
    if (levelIndex === currentIndex) return 'current';
    if (levelIndex < currentIndex) return 'completed';
    return 'locked';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Verification Levels</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {levels.map((level) => {
          const status = getVerificationStatus(level.id);
          
          return (
            <Card 
              key={level.id} 
              className={`border ${
                status === 'current' 
                  ? 'border-primary' 
                  : status === 'completed' 
                    ? 'border-green-500/30' 
                    : ''
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {level.name}
                  </CardTitle>
                  {status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {status === 'current' && (
                    <Circle className="h-5 w-5 text-primary" />
                  )}
                  {status === 'locked' && (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {level.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationLevels;

