
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import VerificationContainer from '@/components/verification/VerificationContainer';

const VerificationPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Account Verification</h1>
      
      {user ? (
        <VerificationContainer 
          userId={user.id} 
          currentLevel={user.verificationLevel || 'basic'} 
          verificationStatus={user.isVerified ? 'verified' : 'unverified'}
        />
      ) : (
        <div className="p-6 bg-muted rounded-lg text-center">
          <p>Please log in to access verification features.</p>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
