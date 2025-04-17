
import React from "react";
import { Check } from "lucide-react";

interface VerifiedMarkProps {
  className?: string;
}

export const VerifiedMark: React.FC<VerifiedMarkProps> = ({ className = "" }) => {
  return (
    <div className={`bg-blue-500 rounded-full p-0.5 ${className}`}>
      <Check className="h-3 w-3 text-white" />
    </div>
  );
};

export default VerifiedMark;
