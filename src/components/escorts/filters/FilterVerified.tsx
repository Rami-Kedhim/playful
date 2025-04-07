
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterVerifiedProps {
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
}

const FilterVerified: React.FC<FilterVerifiedProps> = ({
  verifiedOnly,
  setVerifiedOnly,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="verified" 
        checked={verifiedOnly} 
        onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)} 
      />
      <Label htmlFor="verified">Verified Only</Label>
    </div>
  );
};

export default FilterVerified;
