
import React from 'react';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BoostEligibility, BoostPackage, BoostStatus } from '@/types/pulse-boost';

interface BoostEligibilityCheckProps {
  eligibility: {
    eligible: boolean;
    reason: string;
    reasons: string[];
    nextEligibleTime?: string;
  };
  onClose: () => void;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ eligibility, onClose }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
      <p className="text-sm text-yellow-800">
        {eligibility.reason}
      </p>
      {eligibility.nextEligibleTime && (
        <p className="text-xs text-yellow-600 mt-1">
          You can boost again at: {eligibility.nextEligibleTime}
        </p>
      )}
    </div>
  );
};

interface BoostDialogTabsProps {
  boostStatus: BoostStatus | null;
  packages: BoostPackage[];
  eligibility: BoostEligibility | null;
  onBoostSuccess: () => void;
  profileId?: string;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  boostStatus,
  packages,
  eligibility,
  onBoostSuccess,
  profileId
}) => {
  const [activeTab, setActiveTab] = React.useState('boost-packages');
  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);

  const renderEligibility = () => {
    if (!eligibility) return null;
    
    // Ensure we have a proper eligibility check with the correct properties
    const isEligible = eligibility.eligible || eligibility.isEligible;
    
    if (!isEligible) {
      return (
        <div className="mb-4">
          <BoostEligibilityCheck 
            eligibility={{ 
              eligible: Boolean(isEligible), 
              reason: eligibility.reason || "You're not eligible to boost at this time",
              reasons: eligibility.reasons || [],
              nextEligibleTime: eligibility.nextEligibleTime
            }}
            onClose={() => {}} // Add an empty function to satisfy the prop requirement
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      {renderEligibility()}
      <TabsList className="w-full">
        <TabsTrigger value="boost-packages" onClick={() => setActiveTab('boost-packages')}>Boost Packages</TabsTrigger>
        <TabsTrigger value="boost-status" onClick={() => setActiveTab('boost-status')}>Boost Status</TabsTrigger>
      </TabsList>

      <TabsContent value="boost-packages" className="mt-2">
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`border rounded-lg p-4 cursor-pointer hover:border-primary ${
                selectedPackage === pkg.id ? 'border-primary bg-primary/5' : 'border-border'
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold">${pkg.price}</span>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 text-sm gap-y-1">
                <div>Duration:</div>
                <div className="text-right">{pkg.duration}</div>
                
                {pkg.visibility && (
                  <>
                    <div>Visibility:</div>
                    <div className="text-right">{typeof pkg.visibility === 'number' ? `${pkg.visibility}%` : pkg.visibility}</div>
                  </>
                )}
              </div>
              
              {pkg.features && pkg.features.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Features:</p>
                  <ul className="text-xs text-muted-foreground">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-green-500 mr-1">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          
          <button
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            onClick={onBoostSuccess}
            disabled={!selectedPackage || (eligibility && !eligibility.eligible && !eligibility.isEligible)}
          >
            Boost Now
          </button>
        </div>
      </TabsContent>

      <TabsContent value="boost-status" className="mt-2">
        {boostStatus && boostStatus.isActive ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="font-medium text-green-800">Active Boost</h3>
              <p className="text-sm text-green-700">
                Package: {boostStatus.packageName || "Standard Package"}
              </p>
              <p className="text-xs text-green-600 mt-2">
                Time remaining: {boostStatus.timeRemaining || boostStatus.remainingTime || "Unknown"}
              </p>
              
              <div className="mt-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full" 
                  style={{ width: `${boostStatus.progress || 0}%` }}
                ></div>
              </div>
            </div>
            
            <button
              className="w-full border border-red-500 text-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition-colors"
            >
              Cancel Boost
            </button>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>You don't have any active boosts</p>
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default BoostDialogTabs;
