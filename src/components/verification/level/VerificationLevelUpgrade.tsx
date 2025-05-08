
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface LevelOption {
  id: VerificationLevel;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: number;
  popular?: boolean;
}

const VerificationLevelUpgrade = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<VerificationLevel | null>(null);
  const currentLevel: VerificationLevel = VerificationLevel.BASIC; // This would come from user context in real app

  const levels: LevelOption[] = [
    {
      id: VerificationLevel.BASIC,
      title: "Basic Verification",
      description: "Simple ID verification",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      features: [
        "Identity verification",
        "Basic trust badge",
        "Higher visibility than unverified profiles"
      ],
      price: 0
    },
    {
      id: VerificationLevel.ENHANCED,
      title: "Enhanced Verification",
      description: "Complete verification with additional checks",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      features: [
        "All Basic verification features",
        "Address verification",
        "Phone number verification",
        "Priority in search results"
      ],
      price: 19.99,
      popular: true
    },
    {
      id: VerificationLevel.PREMIUM,
      title: "Premium Verification",
      description: "Our highest level of verification",
      icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
      features: [
        "All Enhanced verification features",
        "Video interview verification",
        "Background check",
        "Featured profile placement",
        "Premium trust badge"
      ],
      price: 49.99
    }
  ];

  // Check if current level is higher than option level
  const isAlreadyVerified = (level: VerificationLevel) => {
    const levelValues = {
      [VerificationLevel.NONE]: 0,
      [VerificationLevel.BASIC]: 1,
      [VerificationLevel.VERIFIED]: 2,
      [VerificationLevel.ENHANCED]: 3,
      [VerificationLevel.PREMIUM]: 4,
    };
    return levelValues[currentLevel] >= levelValues[level];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Upgrade Your Verification Level</h3>
        <p className="text-muted-foreground">
          Higher verification levels increase trust and visibility on the platform
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Your current verification level: <strong>{currentLevel}</strong>
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-3">
        {levels.map((level) => {
          const alreadyVerified = isAlreadyVerified(level.id);
          
          return (
            <Card 
              key={level.id}
              className={`
                cursor-pointer border-2 transition-all
                ${selectedLevel === level.id ? 'border-primary' : 'border-transparent'}
                ${alreadyVerified ? 'opacity-50' : ''}
                ${level.popular ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
              onClick={() => !alreadyVerified && setSelectedLevel(level.id)}
            >
              {level.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center justify-between">
                  {level.icon}
                  <div className="text-right">
                    {level.price === 0 ? (
                      <span className="text-lg font-bold">Free</span>
                    ) : (
                      <span className="text-lg font-bold">${level.price}</span>
                    )}
                  </div>
                </div>
                <CardTitle className="text-md">{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {level.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <ShieldCheck className="h-3.5 w-3.5 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {alreadyVerified ? (
                  <div className="mt-4 text-sm text-muted-foreground">
                    You already have this level
                  </div>
                ) : (
                  <Button 
                    className="w-full mt-4" 
                    variant={selectedLevel === level.id ? "default" : "outline"}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    {selectedLevel === level.id ? "Selected" : "Select"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedLevel && (
        <div className="flex justify-end">
          <Button size="lg">
            Continue to Verification
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationLevelUpgrade;
