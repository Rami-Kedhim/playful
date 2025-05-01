
import React from 'react';
import { hermes } from '@/core/Hermes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HermesPage = () => {
  const [insights, setInsights] = React.useState<any>(null);
  
  React.useEffect(() => {
    // Get sample user journey insights
    const userInsights = hermes.getUserJourneyInsights('sample-user-id');
    setInsights(userInsights);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hermes Flow System</h1>
        <p className="text-muted-foreground mt-1">
          Flow Dynamics and User Routing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Journey Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {insights?.patterns.map((pattern: any, index: number) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{pattern.name}</span>
                  <span className="text-sm">{(pattern.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{width: `${pattern.confidence * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {insights?.suggestions.map((suggestion: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-xs">
                    {index + 1}
                  </span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Analyze Flow
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
                Optimize Routing
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Documentation</h2>
        <p className="text-muted-foreground">
          Hermes is the central routing and flow dynamics system of the UberEscorts ecosystem.
          It processes user journeys, behavioral patterns, and optimizes routes through the application
          to enhance user experience and conversion rates.
        </p>
      </div>
    </div>
  );
};

export default HermesPage;
