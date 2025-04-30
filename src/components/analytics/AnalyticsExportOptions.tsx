
import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AnalyticsExportOptionsProps {
  data: any;
  filename?: string;
}

const AnalyticsExportOptions: React.FC<AnalyticsExportOptionsProps> = ({
  data,
  filename = 'analytics-export'
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToJSON = () => {
    setIsExporting(true);
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Analytics data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export analytics data');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      // Convert to CSV format
      let csvContent = '';
      
      // Handle different data structures
      if (Array.isArray(data)) {
        // For arrays of objects, create CSV headers and rows
        if (data.length > 0 && typeof data[0] === 'object') {
          const headers = Object.keys(data[0]);
          csvContent += headers.join(',') + '\n';
          
          data.forEach(item => {
            const row = headers.map(header => {
              let cell = item[header];
              if (cell === null || cell === undefined) return '';
              if (typeof cell === 'object') cell = JSON.stringify(cell);
              if (typeof cell === 'string') cell = cell.replace(/"/g, '""');
              if (cell.toString().includes(',') || cell.toString().includes('"') || cell.toString().includes('\n')) {
                cell = `"${cell}"`;
              }
              return cell;
            }).join(',');
            csvContent += row + '\n';
          });
        }
      } else if (typeof data === 'object') {
        // For a single object, create key-value pairs
        Object.entries(data).forEach(([key, value]) => {
          let cellValue = value;
          if (cellValue === null || cellValue === undefined) cellValue = '';
          if (typeof cellValue === 'object') cellValue = JSON.stringify(cellValue);
          csvContent += `${key},${cellValue}\n`;
        });
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Analytics data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export analytics data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToJSON} disabled={isExporting}>
          {isExporting ? <Check className="h-4 w-4 mr-2" /> : null}
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV} disabled={isExporting}>
          {isExporting ? <Check className="h-4 w-4 mr-2" /> : null}
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AnalyticsExportOptions;
