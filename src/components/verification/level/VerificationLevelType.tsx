
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface VerificationLevelTypeProps {
  selectedType: 'personal' | 'business' | 'premium' | null;
  onSelectType: (type: 'personal' | 'business' | 'premium') => void;
}

const VerificationLevelType: React.FC<VerificationLevelTypeProps> = ({
  selectedType,
  onSelectType
}) => {
  const verificationTypes = [
    {
      id: 'personal',
      title: 'Personal Verification',
      description: 'For individual users',
      features: [
        'Basic account verification',
        'Access to standard features',
        'Increased trust score'
      ]
    },
    {
      id: 'business',
      title: 'Business Verification',
      description: 'For businesses and organizations',
      features: [
        'All personal verification features',
        'Business profile badge',
        'Access to specialized tools'
      ]
    },
    {
      id: 'premium',
      title: 'Premium Verification',
      description: 'For advanced users and celebrities',
      features: [
        'All business verification features',
        'Priority customer support',
        'Enhanced privacy options',
        'Premium profile badge'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Verification Type</h3>
        <p className="text-muted-foreground">
          Choose the verification type that best fits your needs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {verificationTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`cursor-pointer transition-all ${
              selectedType === type.id ? 'border-primary' : ''
            }`}
            onClick={() => onSelectType(type.id as 'personal' | 'business' | 'premium')}
          >
            <CardHeader>
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {type.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={selectedType === type.id ? "default" : "outline"}
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectType(type.id as 'personal' | 'business' | 'premium');
                }}
              >
                {selectedType === type.id ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationLevelType;
