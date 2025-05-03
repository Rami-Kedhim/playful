
import React from "react";
import { UserProfile } from "@/types/user";

interface ServicesTabProps {
  profile: UserProfile;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Services</h3>
      <p>This user hasn't added any services yet.</p>
    </div>
  );
};

export default ServicesTab;
