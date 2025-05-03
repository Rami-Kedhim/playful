
import React from "react";
import { UserProfile } from "@/types/user";
import { Card, CardContent } from "@/components/ui/card";

interface RatesTabProps {
  profile: UserProfile;
}

const RatesTab: React.FC<RatesTabProps> = ({ profile }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Rates Information</h3>
      <p className="text-gray-600">No rate information available.</p>
    </Card>
  );
};

export default RatesTab;
