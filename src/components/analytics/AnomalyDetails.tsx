
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnomalyDetailsProps {
  anomalies: {
    id: string;
    type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    message: string;
    timestamp: string;
    metric?: string;
    value?: number;
    threshold?: number;
    suggestedAction?: string;
  }
}

const AnomalyDetails: React.FC<AnomalyDetailsProps> = ({ anomalies }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300';
    }
  };
  
  return (
    <Card className="border-amber-200">
      <CardContent className="p-5">
        <div className="flex gap-3">
          <div className="mt-1">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{anomalies.type}</h4>
                <div className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(anomalies.severity)}`}>
                  {anomalies.severity.charAt(0).toUpperCase() + anomalies.severity.slice(1)}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(anomalies.timestamp).toLocaleString()}
              </span>
            </div>
            
            <p className="text-sm mb-2">{anomalies.message}</p>
            
            {(anomalies.metric && anomalies.value !== undefined && anomalies.threshold !== undefined) && (
              <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Metric</p>
                  <p className="font-medium">{anomalies.metric}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Value</p>
                  <p className="font-medium">{anomalies.value}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Threshold</p>
                  <p className="font-medium">{anomalies.threshold}</p>
                </div>
              </div>
            )}
            
            {anomalies.suggestedAction && (
              <div className="text-sm">
                <p className="text-xs text-muted-foreground">Suggested Action</p>
                <p className="font-medium">{anomalies.suggestedAction}</p>
              </div>
            )}
            
            <div className="flex gap-2 mt-3">
              <Button variant="secondary" size="sm">Investigate</Button>
              <Button variant="outline" size="sm">Dismiss</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetails;
