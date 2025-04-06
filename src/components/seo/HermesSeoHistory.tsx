
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, TrendingUp, TrendingDown, EyeOff, Eye, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useHermesSeoHistory } from '@/hooks/useHermesSeoHistory';

const HermesSeoHistory: React.FC = () => {
  const { history } = useHermesSeoHistory();
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const handleSortChange = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredHistory = history
    .filter(item => selectedType === 'all' || item.contentType === selectedType)
    .sort((a, b) => {
      if (sortField === 'timestamp') {
        return sortDirection === 'asc' 
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else if (sortField === 'score') {
        return sortDirection === 'asc'
          ? a.result.visibilityScore - b.result.visibilityScore
          : b.result.visibilityScore - a.result.visibilityScore;
      }
      return 0;
    });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            HERMES SEO Optimization History
          </CardTitle>
          
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="profile">Profiles</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="livecam">Live Cams</SelectItem>
                <SelectItem value="event">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSortChange('timestamp')} className="cursor-pointer">
                    <div className="flex items-center">
                      <span>Date</span>
                      {sortField === 'timestamp' && (
                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead onClick={() => handleSortChange('score')} className="cursor-pointer text-right">
                    <div className="flex items-center justify-end">
                      <span>Score</span>
                      {sortField === 'score' && (
                        sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item, index) => {
                  // In a real implementation, we would track score changes
                  // This is a mock implementation
                  const previousScore = Math.max(20, item.result.visibilityScore - (5 + Math.floor(Math.random() * 20)));
                  const scoreChange = item.result.visibilityScore - previousScore;
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(item.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.contentType.charAt(0).toUpperCase() + item.contentType.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {`ID: ${item.contentId.substring(0, 6)}...`}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {item.result.visibilityScore}%
                      </TableCell>
                      <TableCell className="text-right">
                        {scoreChange > 0 ? (
                          <div className="flex items-center justify-end text-green-500">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>+{scoreChange}%</span>
                          </div>
                        ) : scoreChange < 0 ? (
                          <div className="flex items-center justify-end text-red-500">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            <span>{scoreChange}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end text-muted-foreground">
                            <EyeOff className="h-4 w-4 mr-1" />
                            <span>No change</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8">
            <LineChart className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <h3 className="mt-4 text-lg font-medium">No optimization history</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Run your first content optimization to see results here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HermesSeoHistory;
