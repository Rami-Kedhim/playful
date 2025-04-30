
import React from 'react';

interface PerformanceChartProps {
  data: number[];
  labels: string[];
  color: string;
  height?: number;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  labels,
  color,
  height = 80
}) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="mt-2" style={{ height: `${height}px` }}>
      <div className="flex items-end justify-between h-full w-full">
        {data.map((value, index) => {
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full max-w-[20px] rounded-sm"
                style={{
                  height: `${percentage}%`,
                  backgroundColor: color,
                  opacity: index === data.length - 1 ? 1 : 0.6
                }}
              ></div>
              <div className="text-[10px] text-muted-foreground mt-1">
                {labels[index]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceChart;
