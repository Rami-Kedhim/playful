import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

import { RefreshCw, Code, CheckCircle, AlertTriangle, Box, Activity, GitMerge, PlayCircle } from "lucide-react";
import { brainHubAutoDevOpsManager, MissingComponentAnalysis, CodeGenerationResult, DeploymentResult } from "@/services/neural/BrainHubAutoDevOpsManager";

const AutoDevOpsPanel: React.FC = () => {
  const [missingComponents, setMissingComponents] = useState<MissingComponentAnalysis[]>([]);
  const [reviewQueue, setReviewQueue] = useState<CodeGenerationResult[]>([]);
  const [pendingDeployments, setPendingDeployments] = useState<CodeGenerationResult[]>([]);
  const [deploymentHistory, setDeploymentHistory] = useState<DeploymentResult[]>([]);
  const [autonomyLevel, setAutonomyLevel] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>({});
  const [selectedComponent, setSelectedComponent] = useState<MissingComponentAnalysis | null>(null);
  const [selectedCode, setSelectedCode] = useState<CodeGenerationResult | null>(null);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setMissingComponents(brainHubAutoDevOpsManager.getDetectedMissingComponents());
    setReviewQueue(brainHubAutoDevOpsManager.getCodeReviewQueue());
    setPendingDeployments(brainHubAutoDevOpsManager.getPendingDeployments());
    setDeploymentHistory(brainHubAutoDevOpsManager.getDeploymentHistory());
    const status = brainHubAutoDevOpsManager.getSystemStatus();
    setSystemStatus(status);
    setAutonomyLevel(status.autonomyLevel);
    setIsAnalyzing(status.isAnalyzing);
  };

  const handleAutonomyChange = (value: number[]) => {
    const level = value[0];
    setAutonomyLevel(level);
    brainHubAutoDevOpsManager.setAutonomyLevel(level);
  };

  const handleStartAnalysis = () => {
    brainHubAutoDevOpsManager.scheduleSystemAnalysis();
    setIsAnalyzing(true);
  };

  const handleGenerateCode = async (component: MissingComponentAnalysis) => {
    await brainHubAutoDevOpsManager.generateCode({
      componentType: component.componentType,
      description: component.description,
      requirements: [component.description],
      constraints: component.estimatedComplexity === 'complex' ? ['Ensure robust error handling'] : undefined,
      integrationPoints: component.dependsOn
    });
    refreshData();
  };

  const handleApproveCode = (fileName: string) => {
    brainHubAutoDevOpsManager.approveCode(fileName);
    refreshData();
  };

  const handleRejectCode = (fileName: string) => {
    brainHubAutoDevOpsManager.rejectCode(fileName, "Did not meet quality standards");
    refreshData();
  };

  const handleDeployCode = async (fileName: string) => {
    await brainHubAutoDevOpsManager.deployCode(fileName);
    refreshData();
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">AutoDevOps Manager</CardTitle>
            <CardDescription>
              Self-improving system development and deployment
            </CardDescription>
          </div>
          <Button 
            size="sm" 
            variant={isAnalyzing ? "outline" : "default"} 
            className="ml-auto" 
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            {isAnalyzing ? 'Analyzing...' : 'Analyze System'}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="autonomy-level">Autonomy Level: {autonomyLevel}%</Label>
            <Badge variant={autonomyLevel > 70 ? "default" : "outline"}>
              {autonomyLevel > 70 ? 'Autonomous' : 'Human Review'}
            </Badge>
          </div>
          <Slider
            id="autonomy-level"
            defaultValue={[autonomyLevel]}
            max={100}
            step={10}
            onValueChange={handleAutonomyChange}
            className="mb-2"
          />
          <p className="text-sm text-muted-foreground">
            {autonomyLevel < 30 ? 'Restrictive: All code requires human approval before deployment.' : 
            autonomyLevel < 70 ? 'Balanced: Most code requires approval, but simple changes may be automated.' :
            'Autonomous: System can deploy most code without human intervention.'}
          </p>
        </div>

        <Tabs defaultValue="missing" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="missing">
              Missing Components
              {missingComponents.length > 0 && (
                <Badge variant="secondary" className="ml-2">{missingComponents.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="review">
              Review Queue
              {reviewQueue.length > 0 && (
                <Badge variant="secondary" className="ml-2">{reviewQueue.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Deployment
              {pendingDeployments.length > 0 && (
                <Badge variant="secondary" className="ml-2">{pendingDeployments.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">
              Deployment History
              {deploymentHistory.length > 0 && (
                <Badge variant="secondary" className="ml-2">{deploymentHistory.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="missing">
            {missingComponents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Box className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Missing Components</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The system is fully operational with all necessary components.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {missingComponents.map((component, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <div className="flex items-stretch">
                      <div className={`w-2 ${
                        component.priority === 'critical' ? 'bg-red-500' :
                        component.priority === 'high' ? 'bg-amber-500' :
                        component.priority === 'medium' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {component.componentType}
                            </Badge>
                            <Badge variant="secondary">
                              {component.priority} priority
                            </Badge>
                          </div>
                          <Button onClick={() => handleGenerateCode(component)}>
                            <Code className="h-4 w-4 mr-2" />
                            Generate
                          </Button>
                        </div>
                        <h4 className="font-medium mt-2">{component.description}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Estimated complexity: {component.estimatedComplexity}
                        </p>
                        {component.dependsOn && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">Dependencies:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {component.dependsOn.map((dep, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {dep}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="review">
            {reviewQueue.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Code to Review</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  All generated code has been reviewed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviewQueue.map((codeItem, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-md">{codeItem.fileName}</CardTitle>
                          <CardDescription>
                            {codeItem.language} • Generated on {new Date().toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCode(codeItem)}
                          >
                            View Code
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRejectCode(codeItem.fileName)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApproveCode(codeItem.fileName)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {codeItem.warnings && codeItem.warnings.length > 0 && (
                        <Alert variant="warning" className="mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Warnings</AlertTitle>
                          <AlertDescription>
                            <ul className="list-disc pl-5 text-sm">
                              {codeItem.warnings.map((warning, i) => (
                                <li key={i}>{warning}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                      {codeItem.integrationInstructions && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {codeItem.integrationInstructions}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingDeployments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <GitMerge className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Pending Deployments</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  All approved code has been deployed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingDeployments.map((codeItem, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-md">{codeItem.fileName}</CardTitle>
                          <CardDescription>
                            Ready for deployment
                          </CardDescription>
                        </div>
                        <Button 
                          onClick={() => handleDeployCode(codeItem.fileName)}
                        >
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Deploy
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        {codeItem.language} module with {codeItem.code.split('\n').length} lines of code
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {deploymentHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Deployment History</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  No components have been deployed yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {deploymentHistory.map((deployment, idx) => (
                  <Card key={idx}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-md">{deployment.deployedComponent}</CardTitle>
                          <CardDescription>
                            Deployed on {new Date(deployment.timestamp).toLocaleString()}
                          </CardDescription>
                        </div>
                        <Badge variant={deployment.success ? "default" : "destructive"}>
                          {deployment.success ? 'Successful' : 'Failed'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm space-y-1">
                        {deployment.logs.map((log, i) => (
                          <p key={i} className="text-muted-foreground">
                            • {log}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {selectedCode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-auto">
            <CardHeader>
              <CardTitle>{selectedCode.fileName}</CardTitle>
              <CardDescription>Generated code preview</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[50vh]">
                <code>{selectedCode.code}</code>
              </pre>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCode(null)}
              >
                Close
              </Button>
              <div className="flex space-x-2">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleRejectCode(selectedCode.fileName);
                    setSelectedCode(null);
                  }}
                >
                  Reject Code
                </Button>
                <Button 
                  onClick={() => {
                    handleApproveCode(selectedCode.fileName);
                    setSelectedCode(null);
                  }}
                >
                  Approve Code
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default AutoDevOpsPanel;
