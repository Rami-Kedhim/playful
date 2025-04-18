
import React from 'react';
import { Container } from '@/components/ui/container';
import { VerificationContainer } from '@/components/verification';
import { useAuth } from '@/contexts/AuthContext';
import { VerificationLevel } from '@/types/verification';

const VerificationPage: React.FC = () => {
  const { user } = useAuth();
  
  // Since this is just a demo page, we'll use hardcoded values
  const demoProps = {
    userId: user?.id || '123456',
    currentLevel: VerificationLevel.NONE,
    verificationStatus: 'none' as 'none' | 'pending' | 'approved' | 'rejected'
  };
  
  return (
    <Container>
      <div className="py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Verification</h1>
        <VerificationContainer {...demoProps} />
      </div>
    </Container>
  );
};

export default VerificationPage;
