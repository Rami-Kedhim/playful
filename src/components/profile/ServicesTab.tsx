
import React from "react";
import { UserProfile } from "@/types/user";

interface ServicesTabProps {
  profile?: UserProfile;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Services</h3>
      <p className="text-muted-foreground">No services information available yet.</p>
      
      <div className="mt-4">
        <p>Add your services to help clients better understand what you offer.</p>
      </div>
    </div>
  );
};

export default ServicesTab;
