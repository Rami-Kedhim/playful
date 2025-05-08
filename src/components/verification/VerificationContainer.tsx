
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Upload, 
  FileCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';
import { VerificationRequest, VerificationStatus as VerificationStatusEnum } from '@/types/verification';
import VerificationProgress from './VerificationProgress';
import VerificationStatus from './VerificationStatus';

interface VerificationContainerProps {
  status: string;
  verificationRequest: VerificationRequest;
  loading: boolean;
  error: string;
  level?: string; 
  rejectionReason?: string;
  requestId?: string;
  onRequestVerification: () => void;
  refresh: () => Promise<void>;
}

interface VerificationProgressComponentProps {
  onRequestVerification: () => void;
}

const VerificationContainer: React.FC<VerificationContainerProps> = ({ 
  status, 
  verificationRequest, 
  loading, 
  error,
  level,
  rejectionReason,
  requestId,
  onRequestVerification,
  refresh 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Verification Center</h2>
          <p className="text-muted-foreground">Verify your identity to unlock all platform features</p>
        </div>
        <Button variant="outline" onClick={refresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Status'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VerificationStatus 
              status={status} 
              level={level} 
              rejectionReason={rejectionReason} 
              requestId={requestId} 
              onRequestVerification={onRequestVerification} 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              Verification Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VerificationProgress 
              status={status} 
              onRequestVerification={onRequestVerification} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationContainer;
