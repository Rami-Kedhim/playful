
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface MobileFilterHeaderProps {
  setShowFilters: (show: boolean) => void;
}

const MobileFilterHeader = ({ setShowFilters }: MobileFilterHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
        <CardDescription className="text-sm">Refine your search results</CardDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowFilters(false)}
        className="h-8 w-8"
      >
        <X size={18} />
      </Button>
    </CardHeader>
  );
};

export default MobileFilterHeader;
