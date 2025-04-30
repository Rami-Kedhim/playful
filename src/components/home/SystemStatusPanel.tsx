
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemStatusDisplay } from '@/types/home';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface SystemStatusPanelProps {
  status: SystemStatusDisplay;
}

const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ status }) => {
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'offline':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'operational':
        return 'text-green-500';
      case 'degraded':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {status.operational ? (
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          )}
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {Object.entries(status.components).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="capitalize">{key}</span>
              </div>
              <div className={`flex items-center ${getStatusClass(value)}`}>
                {getStatusIcon(value)}
                <span className="ml-2 text-sm capitalize">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusPanel;
