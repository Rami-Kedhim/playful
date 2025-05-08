
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/types/user';
import { useTranslation } from 'react-i18next';

interface RatesTabProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

const RatesTab: React.FC<RatesTabProps> = ({ profile, isOwnProfile = false }) => {
  const { t } = useTranslation();
  
  // Safely handle rates
  const rates = profile.rates || {};
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Rates</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(rates).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(rates).map(([service, rate], index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="font-medium">{service}</div>
                  <div className="text-lg">{String(rate)}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No rates have been specified.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.availability && profile.availability.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.availability.map((day, index) => (
                <div key={index} className="p-3 border rounded-md">
                  {String(day)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No availability has been specified.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RatesTab;
