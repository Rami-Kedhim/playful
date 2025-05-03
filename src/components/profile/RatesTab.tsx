
import React from "react";
import { UserProfile } from "@/types/user";

interface RatesTabProps {
  profile?: UserProfile;
}

const RatesTab: React.FC<RatesTabProps> = ({ profile }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Rates</h3>
      <p className="text-muted-foreground">No rates information available yet.</p>
      
      <div className="mt-4">
        <p>Add your rates to help clients understand your pricing structure.</p>
      </div>
    </div>
  );
};

export default RatesTab;
