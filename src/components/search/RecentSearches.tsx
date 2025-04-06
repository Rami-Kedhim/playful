
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';

interface RecentSearch {
  id: string;
  query: string;
  type: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (search: RecentSearch) => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

const RecentSearches = ({ searches, onSelect, onClear, onClearAll }: RecentSearchesProps) => {
  if (searches.length === 0) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Recent Searches
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {searches.map((search) => (
            <div key={search.id} className="flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={() => onSelect(search)}
              >
                <span className="mr-2">{search.query}</span>
                <Badge variant="secondary" className="text-xs">
                  {search.type === 'escorts' ? 'Escorts' : 'Creators'}
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-7 w-7 ml-1" 
                onClick={() => onClear(search.id)}
              >
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { Badge } from '@/components/ui/badge';
export default RecentSearches;
