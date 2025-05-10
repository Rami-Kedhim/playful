
import { useEffect } from 'react';
import useBoostScore from '@/hooks/useBoostScore';
import BoostScoreCard from './BoostScoreCard';
import { useBoostManager } from '@/hooks/boost';

interface BoostScoreCardContainerProps {
  profileId: string;
  isOwnProfile: boolean;
}

const BoostScoreCardContainer = ({ profileId, isOwnProfile }: BoostScoreCardContainerProps) => {
  const { boostScore, loading, error, fetchBoostScore, updateBoostScore } = useBoostScore();
  const boostManager = useBoostManager(profileId);

  useEffect(() => {
    if (profileId) {
      fetchBoostScore(profileId);
    }
  }, [profileId, fetchBoostScore, boostManager.boostStatus]);

  const handleRefresh = async () => {
    await updateBoostScore(profileId);
  };

  // Extract score from boostScore if it's not a number but has a score property
  const numericScore = typeof boostScore === 'number' 
    ? boostScore 
    : boostScore && typeof boostScore === 'object' && 'score' in boostScore 
      ? boostScore.score 
      : null;

  return (
    <BoostScoreCard
      profileId={profileId}
      isOwnProfile={isOwnProfile}
      boostScore={numericScore}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    />
  );
};

export default BoostScoreCardContainer;
