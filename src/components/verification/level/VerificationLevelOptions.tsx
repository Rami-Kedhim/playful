
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Shield, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import VerificationBadge from '../VerificationBadge';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

interface VerificationLevelOptionsProps {
  currentLevel: VerificationLevel;
  onSelectLevel: (level: VerificationLevel) => void;
}

const VerificationLevelOptions = ({ currentLevel, onSelectLevel }: VerificationLevelOptionsProps) => {
  const levels = [
    {
      id: 'basic',
      title: 'Basic Verification',
      description: 'ID verification only. Good for getting started.',
      icon: <Shield className="h-5 w-5 text-primary" />,
      requirements: ['Government issued ID'],
      features: [
        'Basic profile badge',
        'Improved trust with clients',
        'Higher visibility in search results'
      ],
      price: 'Free'
    },
    {
      id: 'enhanced',
      title: 'Enhanced Verification',
      description: 'ID and contact verification. Recommended for most users.',
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
      requirements: ['Government issued ID', 'Phone verification', 'Email verification'],
      features: [
        'Enhanced profile badge',
        'Priority in search results',
        '24-hour verification processing',
        'Access to exclusive features'
      ],
      price: '$9.99'
    },
    {
      id: 'premium',
      title: 'Premium Verification',
      description: 'The highest level of verification with in-person check.',
      icon: <Shield className="h-5 w-5 text-amber-500" />,
      requirements: [
        'Government issued ID', 
        'Phone & email verification', 
        'In-person verification meeting'
      ],
      features: [
        'Premium profile badge',
        'Top placement in search results',
        'Expedited verification (within 12 hours)',
        'Maximum trust indicator',
        'Full platform access'
      ],
      price: '$29.99'
    }
  ];

  const handleSelectLevel = (level: VerificationLevel) => {
    if (level === currentLevel) {
      toast({
        title: "Already at this level",
        description: `You are already verified at the ${level} level.`,
      });
      return;
    }

    // If downgrading, show a warning
    if (
      (currentLevel === 'premium' && (level === 'enhanced' || level === 'basic')) ||
      (currentLevel === 'enhanced' && level === 'basic')
    ) {
      toast({
        title: "Downgrade not recommended",
        description: "Downgrading verification level may reduce your visibility and trust.",
        variant: "destructive",
      });
      return;
    }

    onSelectLevel(level);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Verification Levels</h2>
      <p className="text-muted-foreground">
        Choose the verification level that best suits your needs. Higher levels provide increased trust and visibility.
      </p>
      
      <div className="grid gap-4 md:grid-cols-3">
        {levels.map((level) => {
          const isCurrentLevel = currentLevel === level.id;
          const isUpgrade = 
            (currentLevel === 'none') || 
            (currentLevel === 'basic' && (level.id === 'enhanced' || level.id === 'premium')) ||
            (currentLevel === 'enhanced' && level.id === 'premium');

          return (
            <Card 
              key={level.id} 
              className={`relative ${isCurrentLevel ? 'border-primary/50 bg-primary/5' : ''}`}
            >
              {isCurrentLevel && (
                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full px-2 py-1">
                  Current
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{level.title}</CardTitle>
                  {level.icon}
                </div>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <VerificationBadge level={level.id as VerificationLevel} showTooltip={false} size="md" />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                  <ul className="text-sm space-y-1">
                    {level.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <ul className="text-sm space-y-1">
                    {level.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="font-semibold text-lg">{level.price}</div>
              </CardContent>

              <CardFooter>
                {isCurrentLevel ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Level
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={isUpgrade ? "default" : "outline"}
                    onClick={() => handleSelectLevel(level.id as VerificationLevel)}
                  >
                    {isUpgrade ? (
                      <>
                        Upgrade <ChevronRight className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      "Select"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="bg-muted/50 p-4 rounded-md text-sm text-muted-foreground">
        <p className="font-medium mb-2">Note:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You can upgrade your verification level at any time</li>
          <li>Higher levels require additional verification steps</li>
          <li>Verification badges appear on your profile and in search results</li>
          <li>Payment is only required after your verification is approved</li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationLevelOptions;
