
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  onSearch: () => void;
}

const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onSearch
}: SearchHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10"
            placeholder={`Search ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
        </div>
        <Select 
          value={searchType} 
          onValueChange={setSearchType}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Search type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="escorts">Escorts</SelectItem>
            <SelectItem value="creators">Creators</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="ghost" 
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center justify-center"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </Button>
        <Button onClick={onSearch}>Search</Button>
      </div>
    </div>
  );
};

export default SearchHeader;
