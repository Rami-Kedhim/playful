
import { useEffect } from 'react';
import useBoostScore from '@/hooks/useBoostScore';
import BoostScoreCard from './BoostScoreCard';

interface BoostScoreCardContainerProps {
  profileId: string;
  isOwnProfile: boolean;
}

const BoostScoreCardContainer = ({ profileId, isOwnProfile }: BoostScoreCardContainerProps) => {
  const { boostScore, loading, error, fetchBoostScore, updateBoostScore } = useBoostScore();

  useEffect(() => {
    if (profileId) {
      fetchBoostScore(profileId);
    }
  }, [profileId, fetchBoostScore]);

  const handleRefresh = async () => {
    await updateBoostScore(profileId);
  };

  return (
    <BoostScoreCard
      profileId={profileId}
      isOwnProfile={isOwnProfile}
      boostScore={boostScore}
      loading={loading}
      error={error}
      onRefresh={handleRefresh}
    />
  );
};

export default BoostScoreCardContainer;
