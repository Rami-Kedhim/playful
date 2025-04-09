
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MobileMenuHeaderProps {
  title: string;
  onClose: () => void;
}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h2 className="font-semibold text-lg">{title}</h2>
      <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileMenuHeader;
