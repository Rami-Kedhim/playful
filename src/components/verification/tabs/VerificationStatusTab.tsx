
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useVerificationStatus } from "@/hooks/verification/useVerificationStatus";
import { Shield, Loader2, BadgeCheck } from "lucide-react";
import VerificationTimeline from "../status/VerificationTimeline";

export default function VerificationStatusTab() {
  const { status, loading, verificationRequest } = useVerificationStatus();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!verificationRequest) {
    return (
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>No Verification Request Found</AlertTitle>
        <AlertDescription>
          You haven't submitted any verification requests yet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Alert variant={status === 'approved' ? 'default' : 'warning'}>
        {status === 'approved' ? (
          <BadgeCheck className="h-4 w-4 text-primary" />
        ) : (
          <Shield className="h-4 w-4" />
        )}
        <AlertTitle>
          {status === 'approved'
            ? 'Verification Approved'
            : 'Verification In Progress'}
        </AlertTitle>
        <AlertDescription>
          {status === 'approved'
            ? 'Your account has been successfully verified.'
            : 'Your verification request is being processed.'}
        </AlertDescription>
      </Alert>

      <VerificationTimeline verificationRequest={verificationRequest} />
    </div>
  );
}
