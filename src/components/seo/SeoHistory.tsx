
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, UserCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useHermesSeoHistory from '@/hooks/useHermesSeoHistory';
import { formatDistanceToNow } from 'date-fns';

const SeoHistory: React.FC = () => {
  const [contentType, setContentType] = useState('all');
  const { history } = useHermesSeoHistory();

  // Filter history based on selected content type
  const filteredHistory = contentType === 'all' 
    ? history 
    : history.filter(entry => entry.contentType === contentType);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" onValueChange={setContentType}>
          <TabsList>
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="profile">
              <UserCircle className="h-4 w-4 mr-2" /> Profiles
            </TabsTrigger>
            <TabsTrigger value="content">
              <FileText className="h-4 w-4 mr-2" /> Content
            </TabsTrigger>
            <TabsTrigger value="livecam">
              <Video className="h-4 w-4 mr-2" /> Live Streams
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="impact">Highest Impact</SelectItem>
            <SelectItem value="score">Best Score</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Optimization History</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Improvement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.timestamp}>
                    <TableCell className="font-medium">
                      {getContentTitle(item)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.contentType}</Badge>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </TableCell>
                    <TableCell>{item.result.seoScore}/100</TableCell>
                    <TableCell>
                      <span className="text-green-600">+{Math.floor(Math.random() * 20)}%</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No optimization history yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get content title 
function getContentTitle(item: any): string {
  // In a real app, this would extract the title from the item
  return item.result?.metaDescription?.substring(0, 40) + "..." || "Untitled Content";
}

export default SeoHistory;
