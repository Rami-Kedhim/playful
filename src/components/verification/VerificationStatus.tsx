
import React from 'react';
import VerificationProgress from './VerificationProgress';
import { useVerificationStatus } from './hooks/useVerificationStatus';
import VerificationStatusLoading from './status/VerificationStatusLoading';
import VerificationStartPrompt from './status/VerificationStartPrompt';

interface VerificationStatusProps {
  onStartVerification?: () => void;
}

const VerificationStatus = ({ onStartVerification }: VerificationStatusProps) => {
  const { loading, error, verificationRequest } = useVerificationStatus();
  
  if (loading) {
    return <VerificationStatusLoading />;
  }
  
  if (error) {
    return <VerificationProgress error={error} />;
  }
  
  if (!verificationRequest) {
    return <VerificationStartPrompt onStartVerification={onStartVerification} />;
  }
  
  return <VerificationProgress verificationRequest={verificationRequest} />;
};

export default VerificationStatus;
