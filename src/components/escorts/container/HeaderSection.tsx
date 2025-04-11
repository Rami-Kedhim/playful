
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface HeaderSectionProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const HeaderSection = ({ showFilters, setShowFilters }: HeaderSectionProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Escorts Directory</h1>
      <Button 
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden"
      >
        <Filter size={18} className="mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default HeaderSection;
