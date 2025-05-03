
import React from "react";
import { UserProfile } from "@/types/user";

interface AboutTabProps {
  profile?: UserProfile;
}

const AboutTab: React.FC<AboutTabProps> = ({ profile }) => {
  if (!profile) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">No profile information available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Bio</h3>
        {profile.bio ? (
          <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
        ) : (
          <p className="text-muted-foreground">No bio information available.</p>
        )}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{profile.phone || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Website</p>
            <p>{profile.website || "Not provided"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
