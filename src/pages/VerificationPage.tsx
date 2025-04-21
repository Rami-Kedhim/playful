
import React from 'react';
import { Container } from '@/components/ui/container';
import { VerificationContainer } from '@/components/verification';
import { useAuth } from '@/contexts/AuthContext';

const VerificationPage: React.FC = () => {
  // Removed prop passing to VerificationContainer as it doesn't accept props
  return (
    <Container>
      <div className="py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Verification</h1>
        <VerificationContainer />
      </div>
    </Container>
  );
};

export default VerificationPage;

