
import React from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { RefreshCw } from "lucide-react";
import { PerformanceChartProps } from "@/types/analytics";

/**
 * Performance Chart Component
 * Renders a responsive line chart visualizing performance data over time
 */
const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  dataKey,
  title,
  height = 250,
  onRefresh,
  colors = {
    stroke: "#2563eb",
    fill: "rgba(37, 99, 235, 0.2)"
  }
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1 hover:bg-muted rounded-full"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
      
      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              width={30}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid #e2e8f0',
                borderRadius: '4px'
              }} 
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors.stroke}
              strokeWidth={2}
              dot={{ r: 0 }}
              activeDot={{ r: 6, fill: colors.stroke }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
