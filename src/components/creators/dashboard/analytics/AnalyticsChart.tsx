
import React from "react";

interface AnalyticsChartProps {
  data: any[];
  timeRange: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, timeRange }) => {
  return (
    <div className="analytics-chart" style={{ height: 200, background: "#f0f0f0" }}>
      {/* Placeholder for actual chart */}
      <p>Chart for {timeRange} (data length: {data.length})</p>
    </div>
  );
};

export default AnalyticsChart;
