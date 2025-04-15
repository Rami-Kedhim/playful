
import React from 'react';
import VerificationStatus from '../VerificationStatus';
import { VerificationStatusTimeline } from '../status/VerificationStatusTimeline';

interface VerificationStatusTabProps {
  onStartVerification: () => void;
}

const VerificationStatusTab: React.FC<VerificationStatusTabProps> = ({ onStartVerification }) => {
  return (
    <div className="space-y-4">
      <VerificationStatus onStartVerification={onStartVerification} />
      <VerificationStatusTimeline status="in_review" />
    </div>
  );
};

export default VerificationStatusTab;
