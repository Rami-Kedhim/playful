import React from 'react';
import { useBoost } from '@/hooks/useBoost';
import { BoostAnalytics } from '@/components/boost/BoostAnalytics';
import { Button } from '@/components/ui/button';

interface BoostManagerProps {
  profileId: string;
}

const BoostManager: React.FC<BoostManagerProps> = ({ profileId }) => {
  const {
    boostStatus,
    hermesStatus,
    eligibility,
    packages,  // Renamed from boostPackages to match the hook's return value
    loading,
    boostProfile,
    cancelBoost,
    getBoostAnalytics
  } = useBoost();

  // Rest of the component implementation
  return (
    <div>
      <h2>Boost Manager</h2>
      {/* Component implementation */}
    </div>
  );
};

export default BoostManager;
