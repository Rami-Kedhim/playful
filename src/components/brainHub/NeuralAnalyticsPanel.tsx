
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, BarChart } from 'lucide-react';
import { uberCoreInstance } from '@/core/UberCore';

const NeuralAnalyticsPanel = () => {
  const [healthData, setHealthData] = React.useState<Record<string, any> | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const data = uberCoreInstance.checkSubsystemHealth();
        setHealthData(data);
      } catch (error) {
        console.error('Error fetching neural health data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Neural Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Neural Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {healthData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/20 p-4 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Hermes Status</div>
                <div className="flex items-center">
                  {healthData.hermes.status === 'operational' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  )}
                  <span className="font-medium">
                    {healthData.hermes.status === 'operational' ? 'Operational' : 'Degraded'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Flow Score</div>
                  <div className="font-bold">{healthData.hermes.flowScore.toFixed(2)}</div>
                </div>
              </div>

              <div className="bg-secondary/20 p-4 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Oxum Status</div>
                <div className="flex items-center">
                  {healthData.oxum.status === 'operational' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  )}
                  <span className="font-medium">
                    {healthData.oxum.status === 'operational' ? 'Operational' : 'Degraded'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground">Live Maps</div>
                  <div className="font-bold">{healthData.oxum.liveMaps}</div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 p-4 rounded-md">
              <div className="text-sm text-muted-foreground mb-2">Orus Module Status</div>
              <div className="space-y-1.5">
                {healthData.orus.modules.map((module: any) => (
                  <div key={module.name} className="flex items-center justify-between">
                    <span>{module.name}</span>
                    <div className="flex items-center">
                      <span className={`h-2 w-2 rounded-full mr-1.5 ${
                        module.status === 'online' 
                          ? 'bg-green-500' 
                          : module.status === 'degraded' 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`} />
                      <span className="text-xs text-muted-foreground">
                        {(module.reliability * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Neural analytics data unavailable
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralAnalyticsPanel;
