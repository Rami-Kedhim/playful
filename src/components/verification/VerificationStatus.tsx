
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, XCircle, ShieldAlert, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { VerificationStatus as VerificationStatusEnum } from './VerificationProgress';

interface VerificationStatusProps {
  status: string;
  level?: string;
  rejectionReason?: string;
  requestId?: string;
  onRequestVerification: () => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  status,
  level,
  rejectionReason,
  requestId,
  onRequestVerification
}) => {
  // Render different status views based on the verification status
  const renderStatusView = () => {
    const statusString = status?.toString() || "NONE";
    
    switch (statusString) {
      case "APPROVED":
      case VerificationStatusEnum.APPROVED:
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-green-600 dark:text-green-400">Verified Account</h3>
              <p className="text-sm text-muted-foreground">
                Your account has been verified. Enjoy all platform benefits.
              </p>
              {level && (
                <Badge className="mt-2" variant="outline">
                  {level} Verification
                </Badge>
              )}
            </div>
          </div>
        );
        
      case "PENDING":
      case VerificationStatusEnum.PENDING:
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-blue-600 dark:text-blue-400">Verification Pending</h3>
              <p className="text-sm text-muted-foreground">
                Your verification request has been submitted and is pending review.
              </p>
              {requestId && (
                <p className="text-xs text-muted-foreground mt-1">
                  Request ID: {requestId}
                </p>
              )}
            </div>
          </div>
        );
        
      case "IN_REVIEW":
      case VerificationStatusEnum.IN_REVIEW:
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium text-amber-600 dark:text-amber-400">Under Review</h3>
              <p className="text-sm text-muted-foreground">
                Your documents are currently being reviewed. This typically takes 1-2 business days.
              </p>
            </div>
          </div>
        );
        
      case "REJECTED":
      case VerificationStatusEnum.REJECTED:
      case "rejected":
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-medium text-red-600 dark:text-red-400">Verification Rejected</h3>
              <p className="text-sm text-muted-foreground">
                {rejectionReason || "Your verification request was rejected. Please submit a new request with valid documents."}
              </p>
              <Button onClick={onRequestVerification} className="mt-3" size="sm">
                Submit New Request
              </Button>
            </div>
          </div>
        );
        
      case "EXPIRED":
      case VerificationStatusEnum.EXPIRED:
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
              <ShieldAlert className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium">Verification Expired</h3>
              <p className="text-sm text-muted-foreground">
                Your verification has expired. Please submit a new verification request.
              </p>
              <Button onClick={onRequestVerification} className="mt-3" size="sm">
                Renew Verification
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
              <Shield className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-medium">Not Verified</h3>
              <p className="text-sm text-muted-foreground">
                Verify your account to access premium features and increase trust with other users.
              </p>
              <Button onClick={onRequestVerification} className="mt-3" size="sm">
                Start Verification
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div>
      {renderStatusView()}
    </div>
  );
};

export default VerificationStatus;
