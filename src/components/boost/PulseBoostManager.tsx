
import React, { useState, useEffect } from 'react';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/pulse-boost';
import { convertBoostStatus, convertBoostEligibility, convertBoostPackages } from '@/utils/typeConverters';
import { useBoost } from '@/hooks/useBoost';

interface PulseBoostManagerProps {
  profileId?: string;
  onBoostStatusChange?: (status: BoostStatus) => void;
  showAnalytics?: boolean;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({
  profileId,
  onBoostStatusChange,
  showAnalytics = false
}) => {
  const [loading, setLoading] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    timeRemaining: '0',
    isExpiring: false
  });
  const [boostEligibility, setBoostEligibility] = useState<BoostEligibility>({
    eligible: false,
    reasons: []
  });
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  
  const pulseBoost = useBoost();
  
  useEffect(() => {
    if (!profileId) return;
    
    const fetchBoostData = async () => {
      try {
        setLoading(true);
        
        // Convert the data to ensure type compatibility
        const statusData = pulseBoost?.boostStatus || { isActive: false, timeRemaining: '0', isExpiring: false };
        const eligibilityData = pulseBoost?.eligibility || { eligible: false, reasons: [] };
        const packagesData = pulseBoost?.packages || [];
        
        const convertedStatus = convertBoostStatus(statusData);
        const convertedEligibility = convertBoostEligibility(eligibilityData);
        const convertedPackages = convertBoostPackages(packagesData);
        
        setBoostStatus(convertedStatus);
        setBoostEligibility(convertedEligibility);
        setBoostPackages(convertedPackages);
        
        if (onBoostStatusChange) {
          onBoostStatusChange(convertedStatus);
        }
      } catch (error) {
        console.error('Error fetching boost data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoostData();
    
    // Set up interval to refresh data
    const intervalId = setInterval(fetchBoostData, 60000); // Every minute
    
    return () => {
      clearInterval(intervalId);
    };
  }, [profileId, pulseBoost, onBoostStatusChange]);
  
  return (
    <div>
      {/* PulseBoostManager UI implementation */}
      {loading ? (
        <div>Loading boost information...</div>
      ) : (
        <div>
          {boostStatus.isActive ? (
            <div>
              <h3>Active Boost: {boostStatus.packageName}</h3>
              <p>Time Remaining: {boostStatus.timeRemaining}</p>
            </div>
          ) : (
            <div>
              <h3>No Active Boost</h3>
              {!boostEligibility.eligible && (
                <p>Reason: {boostEligibility.reason}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PulseBoostManager;
