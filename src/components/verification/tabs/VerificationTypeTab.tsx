
import React from 'react';
import VerificationLevelType from '../level/VerificationLevelType';
import VerificationLevelRequirements from '../level/VerificationLevelRequirements';

interface VerificationTypeTabProps {
  showRequirements: boolean;
  verificationType: 'personal' | 'business' | 'premium' | null;
  onSelectType: (type: 'personal' | 'business' | 'premium') => void;
  onCompleteRequirements: () => void;
}

const VerificationTypeTab: React.FC<VerificationTypeTabProps> = ({
  showRequirements,
  verificationType,
  onSelectType,
  onCompleteRequirements,
}) => {
  return showRequirements ? (
    <VerificationLevelRequirements
      currentLevel="none"
      targetLevel={verificationType || 'basic'}
      onComplete={onCompleteRequirements}
    />
  ) : (
    <VerificationLevelType
      selectedType={verificationType}
      onSelectType={onSelectType}
    />
  );
};

export default VerificationTypeTab;
