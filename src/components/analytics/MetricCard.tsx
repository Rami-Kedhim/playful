
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { MetricCardProps } from "@/types/analytics";

export interface ExtendedMetricCardProps extends MetricCardProps {
  onClick?: () => void;
}

const MetricCard = ({
  title,
  value,
  change,
  unit = "",
  onClick
}: ExtendedMetricCardProps) => {
  const formattedValue = typeof value === "number" ? value.toLocaleString() : value;
  
  return (
    <Card 
      className={onClick ? "cursor-pointer transition-all hover:border-primary/50" : ""}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-2xl font-bold">
          {formattedValue}{unit && <span className="text-lg font-normal">{unit}</span>}
        </div>
        {typeof change !== "undefined" && (
          <div className="flex items-center mt-1">
            {change > 0 ? (
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
            ) : change < 0 ? (
              <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
            ) : null}
            <span className={`text-sm ${change > 0 ? "text-green-500" : change < 0 ? "text-red-500" : "text-gray-500"}`}>
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
