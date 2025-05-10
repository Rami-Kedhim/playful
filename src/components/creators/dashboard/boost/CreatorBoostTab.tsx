
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BoostPackage } from '@/types/pulse-boost';
import BoostPackageCard from '@/components/boost/BoostPackageCard';
import { convertBoostPackage } from './helpers';

// Example implementation
const CreatorBoostTab: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for example
    const mockPackages: BoostPackage[] = [
      {
        id: 'basic',
        name: 'Basic Boost',
        description: 'Get more visibility for 24 hours',
        price: 9.99,
        price_ubx: 100,
        duration: '24 hours',
        durationMinutes: 1440,
        features: ['Increased visibility', 'Higher search ranking'],
        visibility: '50%',
        visibility_increase: 50,
        isMostPopular: false
      },
      {
        id: 'premium',
        name: 'Premium Boost',
        description: 'Maximum visibility for 3 days',
        price: 24.99,
        price_ubx: 250,
        duration: '3 days',
        durationMinutes: 4320,
        features: ['Top visibility', 'Featured profile', 'Priority in search'],
        visibility: '100%',
        visibility_increase: 100,
        isMostPopular: true
      }
    ];

    setPackages(mockPackages);
    setLoading(false);
  }, []);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleApplyBoost = () => {
    if (!selectedPackage) return;
    // Implementation
  };

  if (loading) {
    return <div>Loading packages...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Boost Your Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {packages.map(pkg => (
              <BoostPackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={selectedPackage === pkg.id}
                onClick={() => handlePackageSelect(pkg.id)}
              />
            ))}
          </div>
          <Button 
            disabled={!selectedPackage} 
            onClick={handleApplyBoost} 
            className="w-full"
          >
            Apply Selected Boost
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorBoostTab;
