
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Shield, Award } from 'lucide-react';

interface VerificationLevelTypeProps {
  selectedType: 'personal' | 'business' | 'premium' | null;
  onSelectType: (type: 'personal' | 'business' | 'premium') => void;
}

const VerificationLevelType: React.FC<VerificationLevelTypeProps> = ({
  selectedType,
  onSelectType
}) => {
  const levels = [
    {
      id: 'personal',
      title: 'Personal Verification',
      description: 'Basic identity verification for personal accounts',
      icon: <Shield className="h-6 w-6" />,
      features: [
        'Verified badge on profile',
        'Basic account features',
        'Ability to browse profiles',
      ]
    },
    {
      id: 'business',
      title: 'Business Verification',
      description: 'Enhanced verification for business accounts',
      icon: <CheckCircle2 className="h-6 w-6" />,
      features: [
        'Enhanced verification badge',
        'Improved visibility in search results',
        'Access to business tools',
        'Priority support',
      ]
    },
    {
      id: 'premium',
      title: 'Premium Verification',
      description: 'Highest level of verification with maximum benefits',
      icon: <Award className="h-6 w-6" />,
      features: [
        'Premium verification badge',
        'Featured in premium listings',
        'Access to all premium features',
        'Priority customer support',
        'Enhanced analytics',
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Choose Verification Level</h2>
        <p className="text-muted-foreground">Select the verification level that best suits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <Card 
            key={level.id} 
            className={`cursor-pointer hover:shadow-md transition-all ${selectedType === level.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}`}
            onClick={() => onSelectType(level.id as 'personal' | 'business' | 'premium')}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-full ${selectedType === level.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {level.icon}
                </div>
                {selectedType === level.id && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardTitle className="mt-2">{level.title}</CardTitle>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {level.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={selectedType === level.id ? "default" : "outline"}
                className="w-full mt-4"
                onClick={() => onSelectType(level.id as 'personal' | 'business' | 'premium')}
              >
                {selectedType === level.id ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationLevelType;
