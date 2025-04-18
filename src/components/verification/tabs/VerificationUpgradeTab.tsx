
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface VerificationUpgradeTabProps {
  currentLevel: 'basic' | 'advanced' | 'premium';
  onUpgrade?: (level: 'basic' | 'advanced' | 'premium') => void;
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({ currentLevel, onUpgrade }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Upgrade Verification Level</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VerificationLevelCard 
          title="Basic" 
          description="Email and phone verification" 
          features={['Email verification', 'Phone verification']}
          icon={<Shield className="h-8 w-8 text-blue-500" />}
          isActive={currentLevel === 'basic'} 
          onUpgrade={() => onUpgrade && onUpgrade('basic')}
          disabled={currentLevel === 'basic' || currentLevel === 'advanced' || currentLevel === 'premium'}
        />
        
        <VerificationLevelCard 
          title="Advanced" 
          description="ID verification and basic checks" 
          features={['Email verification', 'Phone verification', 'ID verification', 'Address verification']}
          icon={<ShieldCheck className="h-8 w-8 text-green-500" />}
          isActive={currentLevel === 'advanced'} 
          onUpgrade={() => onUpgrade && onUpgrade('advanced')}
          disabled={currentLevel === 'advanced' || currentLevel === 'premium'}
        />
        
        <VerificationLevelCard 
          title="Premium" 
          description="Complete verification with background check" 
          features={['Email verification', 'Phone verification', 'ID verification', 'Address verification', 'Background check']}
          icon={<ShieldAlert className="h-8 w-8 text-purple-500" />}
          isActive={currentLevel === 'premium'} 
          onUpgrade={() => onUpgrade && onUpgrade('premium')}
          disabled={currentLevel === 'premium'}
        />
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm">
        <p className="font-medium text-blue-700 dark:text-blue-300 mb-1">Why verify?</p>
        <p className="text-blue-600 dark:text-blue-400">
          Verification increases trust and visibility. Verified profiles receive higher priority in search results
          and gain access to additional features.
        </p>
      </div>
    </div>
  );
};

interface VerificationLevelCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  isActive: boolean;
  onUpgrade: () => void;
  disabled?: boolean;
}

const VerificationLevelCard: React.FC<VerificationLevelCardProps> = ({ 
  title, 
  description, 
  features, 
  icon, 
  isActive, 
  onUpgrade, 
  disabled = false 
}) => {
  return (
    <Card className={isActive ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button className="w-full" disabled variant="outline">
            Current Level
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={onUpgrade} 
            disabled={disabled}
            variant={disabled ? "outline" : "default"}
          >
            {disabled ? "Already Upgraded" : "Upgrade"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default VerificationUpgradeTab;
