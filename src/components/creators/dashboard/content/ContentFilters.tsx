
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface ContentFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const ContentFilters: React.FC<ContentFiltersProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  const handleApplyFilters = () => {
    const filters: Record<string, any> = {};
    
    if (searchTerm) {
      filters.search = searchTerm;
    }
    
    if (contentType) {
      filters.content_type = contentType;
    }
    
    if (status) {
      filters.status = status;
    }
    
    onFilterChange(filters);
  };

  const handleReset = () => {
    setSearchTerm("");
    setContentType(undefined);
    setStatus(undefined);
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
          />
        </div>
        
        <Select value={contentType} onValueChange={setContentType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleApplyFilters}>
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default ContentFilters;
