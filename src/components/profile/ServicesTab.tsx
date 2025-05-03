
import React from "react";
import { UserProfile } from "@/types/user";

interface ServicesTabProps {
  profile?: UserProfile;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">No services information available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Available Services</h3>
        {profile.services && profile.services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.services.map((service, index) => (
              <div key={index} className="bg-card border rounded-lg p-4">
                <p>{service}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No services listed.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Languages</h3>
        {profile.languages && profile.languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((language, index) => (
              <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {language}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No languages specified.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesTab;
