
import React from "react";
import { UserProfile } from "@/types/user";

interface RatesTabProps {
  profile?: UserProfile;
}

const RatesTab: React.FC<RatesTabProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">No rates information available.</p>
      </div>
    );
  }

  // Extract rates from profile if available
  const rates = profile.rates || {};
  const hasRates = Object.keys(rates).length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Pricing</h3>
        {hasRates ? (
          <div className="space-y-4">
            {Object.entries(rates).map(([duration, price]) => (
              <div key={duration} className="flex justify-between items-center border-b pb-2">
                <span className="font-medium capitalize">{duration}</span>
                <span className="text-lg">{typeof price === 'number' ? `$${price}` : price}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No rates information available.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Availability</h3>
        {profile.availability ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(profile.availability).map(([day, hours]) => (
              <div key={day} className="flex justify-between">
                <span className="font-medium capitalize">{day}</span>
                <span>{hours}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No availability information provided.</p>
        )}
      </div>
    </div>
  );
};

export default RatesTab;
