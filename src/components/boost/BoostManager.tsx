
import React from 'react';
import { useBoost } from '@/hooks/useBoost';
import BoostAnalytics from '@/components/boost/BoostAnalytics';
import { Button } from '@/components/ui/button';

interface BoostManagerProps {
  profileId: string;
}

const BoostManager: React.FC<BoostManagerProps> = ({ profileId }) => {
  const {
    isActive,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    error
  } = useBoost();

  // Mock function to get analytics since getBoostAnalytics is missing
  const getAnalyticsData = () => {
    return {
      additionalViews: 145,
      engagementIncrease: 32,
      rankingPosition: 8
    };
  };

  return (
    <div>
      <h2>Boost Manager</h2>
      
      <BoostAnalytics 
        analytics={getAnalyticsData()} 
        loading={loading}
      />
      
      {packages.map((pkg) => (
        <div key={pkg.id} className="mb-4 p-4 border rounded">
          <h3>{pkg.name}</h3>
          <p>{pkg.description}</p>
          <p>Duration: {pkg.duration}</p>
          <p>Price: {pkg.price}</p>
          <Button 
            onClick={() => boostProfile(profileId, pkg.id)}
            disabled={loading || isActive}
          >
            Activate Boost
          </Button>
        </div>
      ))}
      
      {isActive && (
        <Button 
          variant="destructive" 
          onClick={cancelBoost}
          disabled={loading}
        >
          Cancel Boost
        </Button>
      )}
      
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BoostManager;
