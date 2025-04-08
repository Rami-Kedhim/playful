
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Zap, Brain } from 'lucide-react';
import { hermesOxumEngine } from '@/services/boost/HermesOxumEngine';
import SystemLoadCard from './dashboard/SystemLoadCard';
import BoostQueueCard from './dashboard/BoostQueueCard';
import TimeImpactCard from './dashboard/TimeImpactCard';
import PerformanceMetricsChart from './dashboard/PerformanceMetricsChart';
import BoostDistributionChart from './dashboard/BoostDistributionChart';
import BrainHubHealthMonitor from './dashboard/BrainHubHealthMonitor';

// Mock data
const performanceData = [
  { name: '12AM', hermes: 40, oxum: 24 },
  { name: '4AM', hermes: 30, oxum: 35 },
  { name: '8AM', hermes: 20, oxum: 32 },
  { name: '12PM', hermes: 27, oxum: 38 },
  { name: '4PM', hermes: 90, oxum: 75 },
  { name: '8PM', hermes: 120, oxum: 100 },
];

const boostDistributionData = [
  { name: 'VIP', ai: 40, real: 60 },
  { name: 'Premium', ai: 60, real: 40 },
  { name: 'Standard', ai: 80, real: 20 },
  { name: 'Basic', ai: 100, real: 10 },
];

const HermesOxumMonitor: React.FC = () => {
  const [systemLoad, setSystemLoad] = useState<number>(50);
  const [isFairRotationEnabled, setIsFairRotationEnabled] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  
  const handleSystemLoadChange = (value: number[]) => {
    const loadValue = value[0];
    setSystemLoad(loadValue);
    
    // Update the actual system load in the engine (scale to 0-1)
    hermesOxumEngine.updateSystemLoad(loadValue / 100);
  };
  
  const handleOptimizeSystem = () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsOptimizing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 h-6 w-6" />
            Hermes + Oxum AI System
          </h2>
          <p className="text-muted-foreground">
            Unified visibility and recommendation engine monitoring
          </p>
        </div>
        
        <Button onClick={handleOptimizeSystem} disabled={isOptimizing}>
          {isOptimizing ? (
            <>Optimizing...</>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Optimize System
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SystemLoadCard 
          systemLoad={systemLoad}
          handleSystemLoadChange={handleSystemLoadChange}
        />
        <BoostQueueCard
          isFairRotationEnabled={isFairRotationEnabled}
          setIsFairRotationEnabled={setIsFairRotationEnabled}
        />
        <TimeImpactCard />
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Boost effectiveness is currently 23% higher than last week due to optimized visibility distribution.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetricsChart performanceData={performanceData} />
        <BoostDistributionChart boostDistributionData={boostDistributionData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BrainHubHealthMonitor />
        {/* Future expansion spot for another monitoring component */}
      </div>
    </div>
  );
};

export default HermesOxumMonitor;
