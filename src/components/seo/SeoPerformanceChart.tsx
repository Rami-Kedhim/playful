
import React from 'react';

interface SeoPerformanceChartProps {
  timeRange: string;
}

const SeoPerformanceChart: React.FC<SeoPerformanceChartProps> = ({ timeRange }) => {
  // This would be replaced with a real chart from recharts or another library
  // For now, showing a placeholder
  return (
    <div className="flex items-center justify-center h-full bg-muted/20 rounded-md">
      <div className="text-center">
        <p className="font-medium">Chart for {getTimeRangeLabel(timeRange)}</p>
        <p className="text-sm text-muted-foreground mt-2">
          (In a real application, this would be a line chart showing SEO metrics over time)
        </p>
      </div>
    </div>
  );
};

// Helper to get readable time range label
function getTimeRangeLabel(timeRange: string): string {
  switch (timeRange) {
    case '7days':
      return 'Last 7 Days';
    case '30days':
      return 'Last 30 Days';
    case '90days':
      return 'Last 90 Days';
    case 'year':
      return 'Last Year';
    default:
      return timeRange;
  }
}

export default SeoPerformanceChart;
