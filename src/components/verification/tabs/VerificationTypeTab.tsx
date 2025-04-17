
import React from 'react';
import VerificationLevelType from '../level/VerificationLevelType';
import VerificationLevelRequirements from '../level/VerificationLevelRequirements';
import { VerificationLevel } from '@/types/verification';

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
  // Convert verificationType to VerificationLevel enum
  const getVerificationLevel = (type: string | null): VerificationLevel => {
    switch (type) {
      case 'personal': return VerificationLevel.BASIC;
      case 'business': return VerificationLevel.ENHANCED;
      case 'premium': return VerificationLevel.PREMIUM;
      default: return VerificationLevel.NONE;
    }
  };

  return showRequirements ? (
    <VerificationLevelRequirements
      currentLevel={VerificationLevel.NONE}
      targetLevel={getVerificationLevel(verificationType)}
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
