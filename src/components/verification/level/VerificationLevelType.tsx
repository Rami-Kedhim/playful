
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Wallet, UserCheck } from 'lucide-react';

interface VerificationLevelTypeProps {
  selectedType: 'personal' | 'business' | 'premium' | null;
  onSelectType: (type: 'personal' | 'business' | 'premium') => void;
}

const VerificationLevelType: React.FC<VerificationLevelTypeProps> = ({
  selectedType,
  onSelectType
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Verification Types</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`cursor-pointer ${selectedType === 'personal' ? 'border-primary' : ''}`} 
          onClick={() => onSelectType('personal')}>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-blue-500" />
            <CardTitle>Personal</CardTitle>
            <CardDescription>Basic identity verification</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Identity document verification</li>
              <li>• Basic profile verification</li>
              <li>• Standard user features</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedType === 'personal' ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => onSelectType('personal')}
            >
              {selectedType === 'personal' ? 'Selected' : 'Select'}
            </Button>
          </CardFooter>
        </Card>

        <Card className={`cursor-pointer ${selectedType === 'business' ? 'border-primary' : ''}`}
          onClick={() => onSelectType('business')}>
          <CardHeader>
            <Wallet className="h-8 w-8 mb-2 text-green-500" />
            <CardTitle>Business</CardTitle>
            <CardDescription>For professional service providers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Enhanced identity verification</li>
              <li>• Business information verification</li>
              <li>• Access to business features</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedType === 'business' ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => onSelectType('business')}
            >
              {selectedType === 'business' ? 'Selected' : 'Select'}
            </Button>
          </CardFooter>
        </Card>

        <Card className={`cursor-pointer ${selectedType === 'premium' ? 'border-primary' : ''}`}
          onClick={() => onSelectType('premium')}>
          <CardHeader>
            <UserCheck className="h-8 w-8 mb-2 text-purple-500" />
            <CardTitle>Premium</CardTitle>
            <CardDescription>Advanced verification for VIP users</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Comprehensive identity verification</li>
              <li>• Background verification</li>
              <li>• Premium features access</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedType === 'premium' ? 'default' : 'outline'} 
              className="w-full"
              onClick={() => onSelectType('premium')}
            >
              {selectedType === 'premium' ? 'Selected' : 'Select'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerificationLevelType;
