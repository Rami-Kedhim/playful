
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface LineConfig {
  dataKey: string;
  name: string;
  color: string;
  strokeWidth?: number;
  type?: 'monotone' | 'linear' | 'step' | 'stepBefore' | 'stepAfter';
}

interface PerformanceChartProps {
  data: Array<Record<string, any>>;
  dataKey: string;
  lines: LineConfig[];
  height?: number | string;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  dataKey,
  lines,
  height = "100%"
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          dataKey={dataKey} 
          tick={{ fontSize: 12 }} 
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(24, 24, 27, 0.9)', 
            borderColor: 'rgba(113, 113, 122, 0.4)', 
            borderRadius: '6px',
            fontSize: '14px',
            color: 'white'
          }} 
        />
        <Legend iconType="circle" />
        
        {lines.map((line, index) => (
          <Line
            key={line.dataKey}
            type={line.type || "monotone"}
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.color}
            strokeWidth={line.strokeWidth || 2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={true}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
