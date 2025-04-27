
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Loader2, Code, CheckCircle2, XCircle } from 'lucide-react';
import { brainHubAutoDevOpsManager, MissingComponentAnalysis, CodeGenerationResult } from '@/services/neural/BrainHubAutoDevOpsManager';

const AutoDevOpsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [autonomyLevel, setAutonomyLevel] = useState(50);
  const [isScanning, setIsScanning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  
  // Using updated types from BrainHubAutoDevOpsManager
  const [missingComponents, setMissingComponents] = useState<MissingComponentAnalysis[]>([]);
  const [reviewQueue, setReviewQueue] = useState<CodeGenerationResult[]>([]);
  const [pendingDeployments, setPendingDeployments] = useState<string[]>([]);
  const [deploymentHistory, setDeploymentHistory] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>({});
  
  // Load initial data
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = () => {
    // Use only properties that actually exist in the manager
    setMissingComponents(brainHubAutoDevOpsManager.analyzeCodebase());
    setReviewQueue(brainHubAutoDevOpsManager.getCodeReviewQueue());
    setPendingDeployments(brainHubAutoDevOpsManager.getPendingDeployments());
    setDeploymentHistory(brainHubAutoDevOpsManager.getDeploymentHistory());
    setSystemStatus(brainHubAutoDevOpsManager.getSystemStatus());
  };
  
  const handleAutonomyChange = (value: number[]) => {
    const level = value[0];
    setAutonomyLevel(level);
    brainHubAutoDevOpsManager.setAutonomyLevel(level);
  };
  
  const handleStartScan = () => {
    setIsScanning(true);
    brainHubAutoDevOpsManager.scheduleSystemAnalysis();
    
    setTimeout(() => {
      setIsScanning(false);
      loadData();
    }, 2000);
  };
  
  const handleGenerateCode = (component: MissingComponentAnalysis) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const result = brainHubAutoDevOpsManager.generateCode({
        componentType: component.componentType,
        priority: component.priority,
        suggestedName: component.suggestedName,
        suggestedProps: component.suggestedProps,
        requiredFunctionality: component.requiredFunctionality,
        description: component.description || '',
        estimatedComplexity: component.estimatedComplexity || 1,
        dependsOn: component.dependsOn || []
      });
      
      setReviewQueue(prev => [...prev, result]);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleApproveCode = (componentName: string) => {
    brainHubAutoDevOpsManager.approveCode(componentName);
    setPendingDeployments(prev => [...prev, componentName]);
    setReviewQueue(prev => prev.filter(item => item.componentName !== componentName));
  };
  
  const handleRejectCode = (componentName: string) => {
    brainHubAutoDevOpsManager.rejectCode(componentName);
    setReviewQueue(prev => prev.filter(item => item.componentName !== componentName));
  };
  
  const handleDeployCode = (componentName: string) => {
    setIsDeploying(true);
    
    setTimeout(() => {
      const result = brainHubAutoDevOpsManager.deployCode(componentName);
      if (result.success) {
        setPendingDeployments(prev => prev.filter(name => name !== componentName));
        setDeploymentHistory(prev => [result, ...prev]);
      }
      setIsDeploying(false);
    }, 2000);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      case 'critical':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>BrainHub Auto DevOps</span>
          <Badge variant="outline" className="ml-2">
            {autonomyLevel < 30 ? 'Manual' : autonomyLevel < 70 ? 'Assisted' : 'Autonomous'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">Autonomy Level: {autonomyLevel}%</span>
            <Button
              variant="outline"
              size="sm"
              disabled={isScanning}
              onClick={handleStartScan}
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                'Scan Codebase'
              )}
            </Button>
          </div>
          <Slider
            value={[autonomyLevel]}
            min={0}
            max={100}
            step={10}
            onValueChange={handleAutonomyChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Manual</span>
            <span>Assisted</span>
            <span>Autonomous</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="components">Missing Components</TabsTrigger>
            <TabsTrigger value="review">Code Review</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="components" className="space-y-4">
            {missingComponents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No missing components detected
              </div>
            ) : (
              missingComponents.map((component, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="border-l-4 border-primary p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{component.suggestedName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {component.description || `${component.componentType} component`}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(component.priority)}>
                            {component.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            Complexity: {component.estimatedComplexity || 'Low'}
                          </Badge>
                          {component.dependsOn && component.dependsOn.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Depends on: {component.dependsOn.join(', ')}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={isGenerating}
                        onClick={() => handleGenerateCode(component)}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Code className="h-4 w-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="review" className="space-y-4">
            {reviewQueue.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No code to review
              </div>
            ) : (
              reviewQueue.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.fileName || item.componentName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Language: {item.language || 'typescript'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectCode(item.componentName)}
                        >
                          <XCircle className="h-4 w-4 mr-2 text-destructive" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveCode(item.componentName)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-muted p-4 rounded text-xs font-mono overflow-auto max-h-40">
                      {item.code.substring(0, 200)}...
                    </div>
                    
                    {item.warnings && item.warnings.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-1">Warnings:</h4>
                        <ul className="text-xs text-yellow-500 list-disc pl-5">
                          {item.warnings.map((warning, i) => (
                            <li key={i}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.integrationInstructions && (
                      <div className="mt-4 bg-primary/10 p-2 rounded text-xs">
                        <strong>Integration:</strong> {item.integrationInstructions}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="deployments" className="space-y-4">
            <div className="space-y-2 mb-8">
              <h3 className="text-sm font-medium">Pending Deployments</h3>
              {pendingDeployments.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No pending deployments
                </div>
              ) : (
                pendingDeployments.map((componentName, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center">
                      <span>{componentName}</span>
                      <Button
                        size="sm"
                        disabled={isDeploying}
                        onClick={() => handleDeployCode(componentName)}
                      >
                        {isDeploying ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          'Deploy'
                        )}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Deployment History</h3>
              {deploymentHistory.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No deployment history
                </div>
              ) : (
                deploymentHistory.map((deployment, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={deployment.success ? 'default' : 'destructive'}>
                            {deployment.success ? 'Success' : 'Failed'}
                          </Badge>
                          <span className="font-medium">{deployment.deployedComponent}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {deployment.timestamp || new Date().toISOString()}
                        </p>
                      </div>
                      {deployment.deploymentUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={deployment.deploymentUrl} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                      )}
                    </div>
                    
                    {deployment.logs && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {deployment.logs.slice(0, 2).join(' → ')}
                        {deployment.logs.length > 2 && '...'}
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AutoDevOpsPanel;
