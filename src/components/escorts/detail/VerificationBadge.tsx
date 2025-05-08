
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface VerificationBadgeProps {
  level: 'none' | 'basic' | 'enhanced' | 'premium';
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ level }) => {
  const getLevelDetails = () => {
    switch (level) {
      case 'premium':
        return {
          title: 'Premium Verification',
          description: 'ID, Background & Reference Checks',
          icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
          color: 'bg-green-100 border-green-200 text-green-800',
          badgeColor: 'success'
        };
      case 'enhanced':
        return {
          title: 'Enhanced Verification',
          description: 'ID & Reference Checks',
          icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
          color: 'bg-blue-100 border-blue-200 text-blue-800',
          badgeColor: 'default'
        };
      case 'basic':
        return {
          title: 'Basic Verification',
          description: 'Phone & Email Verified',
          icon: <Shield className="h-5 w-5 text-amber-500" />,
          color: 'bg-amber-100 border-amber-200 text-amber-800',
          badgeColor: 'warning'
        };
      case 'none':
      default:
        return {
          title: 'Not Verified',
          description: 'No verification completed',
          icon: <ShieldAlert className="h-5 w-5 text-gray-400" />,
          color: 'bg-gray-100 border-gray-200 text-gray-600',
          badgeColor: 'secondary'
        };
    }
  };
  
  const details = getLevelDetails();
  
  return (
    <Card className={`border ${details.color}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">{details.title}</CardTitle>
          <CardDescription>{details.description}</CardDescription>
        </div>
        <Badge variant={details.badgeColor as any}>
          {level !== 'none' ? 'Verified' : 'Unverified'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          {details.icon}
          <p className="ml-2 text-sm">
            {level === 'none' 
              ? 'This profile has not completed our verification process.' 
              : 'This profile has passed our verification checks.'}
          </p>
        </div>
        
        <div className="mt-4 text-sm">
          {level !== 'none' && (
            <ul className="list-disc list-inside space-y-1">
              {level === 'basic' && (
                <>
                  <li>Phone number verified</li>
                  <li>Email address confirmed</li>
                </>
              )}
              {(level === 'enhanced' || level === 'premium') && (
                <>
                  <li>Phone and email verified</li>
                  <li>ID documentation verified</li>
                  <li>Professional references checked</li>
                </>
              )}
              {level === 'premium' && (
                <>
                  <li>Background check completed</li>
                  <li>In-person interview conducted</li>
                </>
              )}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationBadge;
