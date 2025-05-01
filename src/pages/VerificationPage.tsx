
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { orus } from '@/core/Orus';

const VerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Sample system check
    const integrityResult = orus.checkIntegrity();
    setVerificationStatus({
      isSubmitted: false,
      isVerified: false,
      status: 'pending',
      systemCheck: integrityResult
    });
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Account Verification</h1>
        <p className="text-muted-foreground mt-1">
          Complete verification to access all platform features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Identity Verification</CardTitle>
            <CardDescription>
              Verify your identity to ensure platform safety and compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-dashed border-gray-300 rounded-md text-center">
              <p className="mb-2">Upload a photo ID</p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full">
                Upload Document
              </button>
            </div>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-md text-center">
              <p className="mb-2">Take a selfie</p>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md w-full">
                Open Camera
              </button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>
              Track the progress of your verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Document Submission</span>
              <span className={`px-2 py-1 rounded text-xs ${verificationStatus?.isSubmitted ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}`}>
                {verificationStatus?.isSubmitted ? 'Submitted' : 'Pending'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Identity Verification</span>
              <span className={`px-2 py-1 rounded text-xs ${verificationStatus?.isVerified ? 'bg-green-500/20 text-green-700' : 'bg-yellow-500/20 text-yellow-700'}`}>
                {verificationStatus?.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>System Check</span>
              <span className={`px-2 py-1 rounded text-xs ${verificationStatus?.systemCheck?.isValid ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}`}>
                {verificationStatus?.systemCheck?.isValid ? 'Passed' : 'Failed'}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Verification usually completes within 24 hours after document submission.
              </p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md w-full">
                Submit for Verification
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage;
