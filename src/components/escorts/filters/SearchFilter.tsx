
import { Input } from "@/components/ui/input";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchFilter = ({ searchQuery, setSearchQuery }: SearchFilterProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Search</label>
      <Input
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-background/50"
      />
    </div>
  );
};

export default SearchFilter;
