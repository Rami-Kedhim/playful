
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, X } from 'lucide-react';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  onSearch: () => void;
  onClear?: () => void;
}

const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onSearch,
  onClear
}: SearchHeaderProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    if (onClear) onClear();
  };
  
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className={`pl-10 ${searchQuery ? 'pr-10' : ''}`}
            placeholder={`Search ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
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
          variant={showAdvancedFilters ? "secondary" : "ghost"}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center justify-center"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
          {showAdvancedFilters && (
            <X className="ml-2 h-4 w-4" />
          )}
        </Button>
        <Button onClick={onSearch}>Search</Button>
      </div>
    </div>
  );
};

export default SearchHeader;
