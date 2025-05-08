
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, AlertCircle } from 'lucide-react';

export enum VerificationStatus {
  NONE = "NONE",
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED"
}

export interface VerificationProgressProps {
  verificationStatus?: VerificationStatus | string;
  onRequestVerification: () => void;
}

const VerificationProgress: React.FC<VerificationProgressProps> = ({ 
  verificationStatus = VerificationStatus.NONE,
  onRequestVerification 
}) => {
  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (verificationStatus === VerificationStatus.NONE) return 0;
    if (verificationStatus === "PENDING" || verificationStatus === VerificationStatus.PENDING) return 25;
    if (verificationStatus === "IN_REVIEW" || verificationStatus === VerificationStatus.IN_REVIEW) return 50;
    if (verificationStatus === "APPROVED" || verificationStatus === VerificationStatus.APPROVED) return 100;
    if (verificationStatus === "REJECTED" || verificationStatus === VerificationStatus.REJECTED) return 75;
    if (verificationStatus === "EXPIRED" || verificationStatus === VerificationStatus.EXPIRED) return 0;
    return 0;
  };

  // Get progress variant
  const getProgressVariant = () => {
    if (verificationStatus === "APPROVED" || verificationStatus === VerificationStatus.APPROVED) return "success";
    if (verificationStatus === "REJECTED" || verificationStatus === VerificationStatus.REJECTED) return "destructive";
    return "default";
  };

  return (
    <div className="space-y-4">
      <Progress value={getProgressPercentage()} className={`h-2 ${getProgressVariant() === 'destructive' ? 'bg-red-100' : ''}`} />
      
      <div className="flex justify-between text-xs">
        <div className="text-center">
          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center mb-1
            ${verificationStatus !== VerificationStatus.NONE ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <FileText className="h-3 w-3" />
          </div>
          <span>Submit</span>
        </div>
        
        <div className="text-center">
          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center mb-1
            ${["PENDING", VerificationStatus.PENDING].includes(verificationStatus as string) ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <Clock className="h-3 w-3" />
          </div>
          <span>Pending</span>
        </div>
        
        <div className="text-center">
          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center mb-1
            ${["IN_REVIEW", VerificationStatus.IN_REVIEW].includes(verificationStatus as string) ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <AlertCircle className="h-3 w-3" />
          </div>
          <span>Review</span>
        </div>
        
        <div className="text-center">
          <div className={`w-5 h-5 rounded-full mx-auto flex items-center justify-center mb-1
            ${["APPROVED", VerificationStatus.APPROVED].includes(verificationStatus as string) ? 'bg-green-500 text-white' : 'bg-muted'}`}>
            <Check className="h-3 w-3" />
          </div>
          <span>Approved</span>
        </div>
      </div>
      
      {verificationStatus === VerificationStatus.NONE && (
        <Button onClick={onRequestVerification} className="w-full mt-4">
          Request Verification
        </Button>
      )}
    </div>
  );
};

export default VerificationProgress;
