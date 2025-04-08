
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterHeaderProps {
  setShowFilters: (show: boolean) => void;
}

const MobileFilterHeader = ({ setShowFilters }: MobileFilterHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="font-medium text-lg">Filter Escorts</h2>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setShowFilters(false)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MobileFilterHeader;
