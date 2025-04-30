
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Anomaly } from '@/types/analytics';

interface AnomalyDetailsProps {
  anomalies: Anomaly[];
  onAcknowledge: (id: string) => void;
}

const AnomalyDetails: React.FC<AnomalyDetailsProps> = ({ anomalies, onAcknowledge }) => {
  const getSeverityIcon = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case 'medium':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case 'low':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'Unknown time';
    
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      dateStyle: 'short',
      timeStyle: 'short'
    });
  };

  if (!anomalies || anomalies.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Anomaly Detection</CardTitle>
          <CardDescription>No anomalies detected in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center text-muted-foreground">
              <p>All systems operating within normal parameters</p>
              <p className="text-sm mt-2">The neural system is functioning optimally</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>
          {anomalies.length} anomalies detected in the neural system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <div 
              key={anomaly.id || index} 
              className="border rounded-lg p-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getSeverityIcon(anomaly.severity)}
                  <div>
                    <h4 className="font-medium text-base">
                      {anomaly.type || 'Unknown Anomaly'}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {anomaly.description || 'No description available'}
                    </p>
                  </div>
                </div>
                <Badge className={getSeverityColor(anomaly.severity)}>
                  {anomaly.severity?.toUpperCase() || 'UNKNOWN'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Detected: {formatTime(anomaly.timestamp)}</span>
              </div>
              
              {anomaly.relatedComponentId && (
                <div className="text-sm">
                  <span className="font-medium">Related Component: </span>
                  {anomaly.relatedComponentId}
                </div>
              )}
              
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onAcknowledge(anomaly.id || "")}
                >
                  Acknowledge
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetails;
