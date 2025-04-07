
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by name or location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default FilterSearch;
