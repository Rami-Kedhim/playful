
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NeuralMetricsDisplay from "./NeuralMetricsDisplay";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface NeuralAnalyticsPageProps {
  title?: string;
}

const NeuralAnalyticsPage: React.FC<NeuralAnalyticsPageProps> = ({ 
  title = "Neural Network Analytics" 
}) => {
  const downloadReports = () => {
    console.log("Downloading reports...");
    // Implement download functionality here
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button onClick={downloadReports} variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Export Reports</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Network Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="predictions">Prediction Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <NeuralMetricsDisplay 
                title="Neural Network Overview"
                refreshInterval={30000} 
              />
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Performance Metrics</h2>
                <p className="text-muted-foreground">
                  View detailed performance metrics of the neural network system.
                </p>
                {/* Additional performance metrics would go here */}
              </div>
            </TabsContent>
            
            <TabsContent value="predictions">
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Prediction Analysis</h2>
                <p className="text-muted-foreground">
                  Analyze the accuracy of predictions made by the neural network.
                </p>
                {/* Prediction analysis components would go here */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralAnalyticsPage;
