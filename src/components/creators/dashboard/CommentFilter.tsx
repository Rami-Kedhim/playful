
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CommentFilterType } from "./types/comment";

interface CommentFilterProps {
  filter: CommentFilterType;
  onFilterChange: (value: CommentFilterType) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const CommentFilter = ({ 
  filter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}: CommentFilterProps) => {
  return (
    <>
      <div className="flex gap-2">
        <Select value={filter} onValueChange={(value) => onFilterChange(value as CommentFilterType)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter comments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Comments</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="liked">Liked by You</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative mt-2">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search comments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
};

export default CommentFilter;
