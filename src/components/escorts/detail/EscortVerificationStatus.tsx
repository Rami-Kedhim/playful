
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Upload, 
  Award, 
  Clock
} from "lucide-react";
import { 
  verificationService, 
  VerificationLevel, 
  VerificationType 
} from '@/services/escorts/verificationService';
import { format } from 'date-fns';

interface EscortVerificationStatusProps {
  userId: string;
  isOwnProfile?: boolean;
  showUpgradeButton?: boolean;
}

const EscortVerificationStatus: React.FC<EscortVerificationStatusProps> = ({ 
  userId,
  isOwnProfile = false,
  showUpgradeButton = true 
}) => {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      setLoading(true);
      try {
        const verificationStatus = await verificationService.getVerificationStatus(userId);
        setStatus(verificationStatus);
      } catch (error) {
        console.error('Error fetching verification status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerificationStatus();
  }, [userId]);
  
  const handleRequestVerification = async () => {
    if (!status?.nextLevel) return;
    
    await verificationService.requestVerification(
      userId,
      VerificationType.ID,
      status.nextLevel
    );
    
    // Refresh the verification status
    const updatedStatus = await verificationService.getVerificationStatus(userId);
    setStatus(updatedStatus);
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-4">
            <ShieldAlert className="h-8 w-8 text-muted-foreground mr-2" />
            <div className="text-muted-foreground">Verification status unavailable</div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const levelInfo = verificationService.getVerificationLevelInfo(status.currentLevel);
  const nextLevelInfo = status.nextLevel 
    ? verificationService.getVerificationLevelInfo(status.nextLevel)
    : null;
    
  // Calculate verification progress percentage
  const levels = Object.values(VerificationLevel);
  const currentLevelIndex = levels.indexOf(status.currentLevel);
  const progress = Math.round((currentLevelIndex / (levels.length - 1)) * 100);
  
  const getBadgeVariant = () => {
    switch (status.currentLevel) {
      case VerificationLevel.NONE:
        return "outline";
      case VerificationLevel.BASIC:
        return "secondary";
      case VerificationLevel.VERIFIED:
        return "default";
      case VerificationLevel.PREMIUM:
        return "destructive";
      case VerificationLevel.ELITE:
        return "gold"; // Custom variant
      default:
        return "outline";
    }
  };
  
  const getVerificationIcon = () => {
    switch (status.currentLevel) {
      case VerificationLevel.NONE:
        return <Shield className="h-5 w-5" />;
      case VerificationLevel.BASIC:
        return <Shield className="h-5 w-5" />;
      case VerificationLevel.VERIFIED:
        return <ShieldCheck className="h-5 w-5" />;
      case VerificationLevel.PREMIUM:
        return <Award className="h-5 w-5" />;
      case VerificationLevel.ELITE:
        return <Award className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Verification Status</CardTitle>
          <Badge
            variant={getBadgeVariant()}
            className={`
              px-2 py-1
              ${status.currentLevel === VerificationLevel.ELITE ? 'bg-amber-500 text-black' : ''}
            `}
          >
            {getVerificationIcon()}
            <span className="ml-1">{levelInfo.name}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="relative pt-1">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Basic</span>
            <span>Verified</span>
            <span>Premium</span>
            <span>Elite</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm">
            {levelInfo.description}
          </div>
          
          {status.verifiedAt && (
            <div className="text-xs text-muted-foreground flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
              Verified since {format(new Date(status.verifiedAt), 'MMMM d, yyyy')}
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Benefits</h4>
          <ul className="space-y-1">
            {levelInfo.benefits.map((benefit, index) => (
              <li key={index} className="text-sm flex items-center">
                <CheckCircle2 className="h-3 w-3 mr-2 text-green-500" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        {isOwnProfile && status.pendingRequests.length > 0 && (
          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-center text-sm font-medium">
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              Verification in progress
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Your {status.pendingRequests[0].requestedLevel} verification request is under review.
              Submitted on {format(new Date(status.pendingRequests[0].submittedAt), 'MMM d, yyyy')}.
            </p>
          </div>
        )}
        
        {isOwnProfile && showUpgradeButton && status.canRequestVerification && status.nextLevel && (
          <div>
            <Button 
              onClick={handleRequestVerification}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upgrade to {nextLevelInfo?.name}
            </Button>
            
            {nextLevelInfo && (
              <div className="mt-2 text-xs text-muted-foreground">
                <h5 className="font-medium mb-1">Requirements:</h5>
                <ul className="space-y-1">
                  {nextLevelInfo.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mr-1.5"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortVerificationStatus;
