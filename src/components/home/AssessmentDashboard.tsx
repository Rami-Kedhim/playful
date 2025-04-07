
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, LineChart, MessagesSquare } from 'lucide-react';
import EnhancedEngagementPanel from './EnhancedEngagementPanel';
import AssessmentPanel from '../assessment/AssessmentPanel';
import ChaseHughesPanel from '../assessment/ChaseHughesPanel';

const AssessmentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6 dark:bg-background dark:text-foreground">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Behavioral Assessment Dashboard</h1>
        <p className="text-muted-foreground">
          Enhanced user insights using Hughes-Chernev-Keller framework
        </p>
      </div>
      
      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assessment" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Full Assessment
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Engagement Analysis
          </TabsTrigger>
          <TabsTrigger value="influence" className="flex items-center">
            <MessagesSquare className="h-4 w-4 mr-2" />
            Influence Strategy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="pt-6">
          <AssessmentPanel />
        </TabsContent>
        
        <TabsContent value="engagement" className="pt-6">
          <EnhancedEngagementPanel />
        </TabsContent>
        
        <TabsContent value="influence" className="pt-6">
          <ChaseHughesPanel />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Behavioral Assessment</CardTitle>
            <CardDescription>
              Understanding the framework behind your insights
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-2">
              This assessment system combines advanced behavioral psychology principles from Chase Hughes with 
              marketing frameworks from Alexander Chernev, Kevin Lane Keller, and Philip Kotler.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="font-medium">Hughes' Behavioral Analysis:</span> Identifies micro-expression signals, behavioral loops, and trust-building patterns.</li>
              <li><span className="font-medium">Keller's Brand Resonance:</span> Measures progression from awareness to deep brand connection.</li>
              <li><span className="font-medium">Kotler's Decision Journey:</span> Tracks consumer decision stages for optimal intervention.</li>
              <li><span className="font-medium">Chernev's Choice Architecture:</span> Optimizes monetization based on value orientation.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentDashboard;
