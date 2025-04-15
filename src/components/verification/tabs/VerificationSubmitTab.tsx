
import React from 'react';
import VerificationForm from '../form/VerificationForm';

interface VerificationSubmitTabProps {
  onSubmit: (data: any) => void;
  onComplete: () => void;
}

const VerificationSubmitTab: React.FC<VerificationSubmitTabProps> = ({
  onSubmit,
  onComplete,
}) => {
  return (
    <VerificationForm 
      onSubmit={onSubmit} 
      serviceType="escort"
      onSubmissionComplete={onComplete} 
    />
  );
};

export default VerificationSubmitTab;
