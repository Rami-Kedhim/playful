
import React from 'react';
import { BoostScoreCardContainer } from '@/components/boost';

interface BoostScoreCardProps {
  escortId: string;
  isOwnProfile: boolean;
}

const BoostScoreCard = ({ escortId, isOwnProfile }: BoostScoreCardProps) => {
  return (
    <BoostScoreCardContainer 
      profileId={escortId} 
      isOwnProfile={isOwnProfile} 
    />
  );
};

export default BoostScoreCard;
