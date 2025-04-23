
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import VerificationBadge from '@/components/verification/VerificationBadge';
import { VerificationLevel } from '@/types/verification';

interface VerificationStatusTabProps {
  userId: string;
  currentLevel: VerificationLevel;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
}

const VerificationStatusTab: React.FC<VerificationStatusTabProps> = ({
  currentLevel,
  verificationStatus
}) => {
  // Level progression mapping
  const levelMap = {
    [VerificationLevel.BASIC]: 1,
    [VerificationLevel.ENHANCED]: 2,
    [VerificationLevel.PREMIUM]: 3
  };

  // Status indicator
  const renderStatusIndicator = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <div className="flex items-center text-green-500">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            <span>Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-yellow-500">
            <Clock className="mr-2 h-5 w-5" />
            <span>Pending Review</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" />
            <span>Verification Failed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-muted-foreground">
            <ShieldCheck className="mr-2 h-5 w-5" />
            <span>Not Verified</span>
          </div>
        );
    }
  };

  // Level benefits
  const renderLevelBenefits = (level: VerificationLevel) => {
    switch (level) {
      case VerificationLevel.BASIC:
        return (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Basic account features</li>
            <li>Browse profiles</li>
            <li>Limited messaging</li>
          </ul>
        );
      case VerificationLevel.ENHANCED:
        return (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>All basic features</li>
            <li>Verified badge on profile</li>
            <li>Enhanced visibility in search</li>
            <li>Unlimited messaging</li>
          </ul>
        );
      case VerificationLevel.PREMIUM:
        return (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>All enhanced features</li>
            <li>Premium badge on profile</li>
            <li>Featured in premium listings</li>
            <li>Priority support</li>
            <li>Enhanced analytics</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>
            Your current verification level and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium">Current Level</h3>
              <VerificationBadge level={currentLevel} />
            </div>
            <div>{renderStatusIndicator()}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{VerificationLevel.BASIC}</span>
              <span>{VerificationLevel.ENHANCED}</span>
              <span>{VerificationLevel.PREMIUM}</span>
            </div>
            <Progress value={levelMap[currentLevel] * 33.33} className="h-2" />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={currentLevel === VerificationLevel.BASIC ? 'border-primary' : ''}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Basic</CardTitle>
              {currentLevel === VerificationLevel.BASIC && <Badge variant="outline">Current</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {renderLevelBenefits(VerificationLevel.BASIC)}
          </CardContent>
        </Card>
        
        <Card className={currentLevel === VerificationLevel.ENHANCED ? 'border-primary' : ''}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Enhanced</CardTitle>
              {currentLevel === VerificationLevel.ENHANCED && <Badge variant="outline">Current</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {renderLevelBenefits(VerificationLevel.ENHANCED)}
          </CardContent>
        </Card>
        
        <Card className={currentLevel === VerificationLevel.PREMIUM ? 'border-primary' : ''}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Premium</CardTitle>
              {currentLevel === VerificationLevel.PREMIUM && <Badge variant="outline">Current</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {renderLevelBenefits(VerificationLevel.PREMIUM)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationStatusTab;
