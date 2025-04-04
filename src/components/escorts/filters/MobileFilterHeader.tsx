
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface MobileFilterHeaderProps {
  setShowFilters: (show: boolean) => void;
}

const MobileFilterHeader = ({ setShowFilters }: MobileFilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowFilters(false)}
        className="h-6 w-6"
      >
        <X size={16} />
      </Button>
    </CardHeader>
  );
};

export default MobileFilterHeader;
