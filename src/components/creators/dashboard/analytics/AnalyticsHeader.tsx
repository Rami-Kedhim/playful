
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsHeaderProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  timeRange, 
  setTimeRange 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <Tabs value={timeRange} onValueChange={setTimeRange}>
        <TabsList>
          <TabsTrigger value="7days">7 Days</TabsTrigger>
          <TabsTrigger value="30days">30 Days</TabsTrigger>
          <TabsTrigger value="90days">90 Days</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default AnalyticsHeader;
