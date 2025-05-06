
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface SeoContentTableProps {
  contentType: string;
}

const SeoContentTable: React.FC<SeoContentTableProps> = ({ contentType }) => {
  // This would come from an API in a real app
  const mockData = [
    { id: 1, title: "Premium Escort Services in NYC", type: "article", score: 92, traffic: 1245, position: 2 },
    { id: 2, title: "Jessica Dream - VIP Escort", type: "profiles", score: 88, traffic: 980, position: 3 },
    { id: 3, title: "Amanda Love's Private Stream", type: "livecams", score: 85, traffic: 850, position: 4 },
    { id: 4, title: "Las Vegas Escort Directory", type: "article", score: 83, traffic: 720, position: 1 },
    { id: 5, title: "Crystal Moon - Premium Experience", type: "profiles", score: 81, traffic: 690, position: 5 },
  ].filter(item => contentType === 'all' || item.type === contentType);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Content</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">SEO Score</TableHead>
          <TableHead className="text-right">Traffic</TableHead>
          <TableHead className="text-right">Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>
              <Badge variant="outline">{item.type}</Badge>
            </TableCell>
            <TableCell className="text-right">{item.score}/100</TableCell>
            <TableCell className="text-right">{item.traffic}</TableCell>
            <TableCell className="text-right">{item.position}</TableCell>
          </TableRow>
        ))}
        {mockData.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SeoContentTable;
