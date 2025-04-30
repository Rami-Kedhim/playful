
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { SystemStatusDisplay } from '@/types/home';

interface SystemStatusPanelProps {
  status: SystemStatusDisplay;
}

const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ status }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'online':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'offline':
      case 'unavailable':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${status.operational ? 'bg-green-500' : 'bg-red-500'}`} />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Lucie</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.components.lucie)}
                <span className="font-medium capitalize">{status.components.lucie}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Hermes</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.components.hermes)}
                <span className="font-medium capitalize">{status.components.hermes}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Oxum</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.components.oxum)}
                <span className="font-medium capitalize">{status.components.oxum}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Orus</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.components.orus)}
                <span className="font-medium capitalize">{status.components.orus}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">UberWallet</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(status.components.wallet)}
                <span className="font-medium capitalize">{status.components.wallet}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusPanel;
