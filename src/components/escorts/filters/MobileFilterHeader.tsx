
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface MobileFilterHeaderProps {
  setShowFilters: (value: boolean) => void;
}

const MobileFilterHeader = ({ setShowFilters }: MobileFilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-xl">Filters</CardTitle>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setShowFilters(false)}
      >
        <X size={18} />
      </Button>
    </CardHeader>
  );
};

export default MobileFilterHeader;
