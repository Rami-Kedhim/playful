
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { VerificationRequest } from '@/types/escort';
import VerificationProgress from './VerificationProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useEscortVerification } from '@/hooks/escort/useEscortVerification';
import { Loader2 } from 'lucide-react';

interface VerificationStatusProps {
  onStartVerification?: () => void;
}

const VerificationStatus = ({ onStartVerification }: VerificationStatusProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  
  // Using the escort verification hook without the update function since we're only checking status
  const { checkVerificationStatus } = useEscortVerification((id, updates) => Promise.resolve(null));
  
  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        const status = await checkVerificationStatus(user.id);
        
        // This is a simplified version - in a real app, we would fetch the actual verification request
        // For now, we'll mock a request object based on the status
        if (status) {
          setVerificationRequest({
            id: 'mock-request-id',
            escortId: user.id,
            status: status,
            documents: [],
            submittedAt: new Date(),
            userId: user.id
          });
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching verification status:", err);
        setError("Failed to fetch verification status. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerificationStatus();
  }, [user, checkVerificationStatus]);
  
  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Checking verification status...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return <VerificationProgress error={error} />;
  }
  
  if (!verificationRequest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Required</CardTitle>
          <CardDescription>
            To ensure platform safety, we require identity verification for all users offering services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Verification helps build trust with your clients and improves your visibility on the platform.
            The verification process is simple and secure.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartVerification} className="w-full">
            Start Verification Process
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return <VerificationProgress verificationRequest={verificationRequest} />;
};

export default VerificationStatus;
