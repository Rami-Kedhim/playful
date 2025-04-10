
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { uberCore } from '@/services/neural/UberCore';
import { Activity, Brain, Heart, Shield, Zap } from 'lucide-react';

const UberCorePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isInitialized, setIsInitialized] = useState(false);
  const [status, setStatus] = useState<Record<string, any>>({});
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState('demo-user-001');
  const [processingResult, setProcessingResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize UberCore on component mount
    const initUberCore = async () => {
      const success = await uberCore.initialize();
      setIsInitialized(success);
      
      if (success) {
        updateStatus();
      }
    };
    
    initUberCore();
    
    // Set up interval to update status regularly
    const intervalId = setInterval(() => {
      if (isInitialized) {
        updateStatus();
      }
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isInitialized]);
  
  const updateStatus = () => {
    setStatus(uberCore.getStatus());
  };
  
  const handleProcessInput = async () => {
    if (!inputText.trim() || !isInitialized) return;
    
    setIsProcessing(true);
    
    try {
      const result = await uberCore.processUserInput(userId, inputText, {
        source: 'ubercore-panel',
        interfaceType: 'admin'
      });
      
      setProcessingResult(result);
    } catch (error) {
      console.error('Error processing input:', error);
      setProcessingResult({
        success: false,
        error: 'Processing failed'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center">
          <Brain className="mr-2 h-8 w-8 text-primary" />
          UberCore System
        </h2>
        
        <div>
          <Badge 
            variant={isInitialized ? "default" : "outline"} 
            className={isInitialized ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" : ""}
          >
            {isInitialized ? "Initialized" : "Not Initialized"}
          </Badge>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="logic" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" /> UBX_Logic
          </TabsTrigger>
          <TabsTrigger value="emotional" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" /> UBX_Emo
          </TabsTrigger>
          <TabsTrigger value="ethics" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" /> UBX_Ethics
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">UberCore Architecture Status</CardTitle>
              <CardDescription>
                Unified AI Architecture for UberEscorts - Integration of Logic, Emotional, and Ethical AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">System Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>System Status</span>
                      <Badge variant={isInitialized ? "default" : "outline"}>
                        {isInitialized ? "Running" : "Offline"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Uptime</span>
                      <span>{status.uptime ? `${Math.floor(status.uptime / 60)} minutes` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Performance Mode</span>
                      <Badge variant="outline">{status.performanceMode || 'N/A'}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Modules</span>
                      <span>{status.activeModules?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event Count</span>
                      <span>{status.eventCount || 0}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Module Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Brain className="h-4 w-4 mr-2" />
                        <span>UBX_Logic</span>
                      </div>
                      <Badge 
                        variant={status.moduleStatuses?.logic ? "default" : "outline"}
                        className={status.moduleStatuses?.logic ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" : ""}
                      >
                        {status.moduleStatuses?.logic ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        <span>UBX_Emo</span>
                      </div>
                      <Badge 
                        variant={status.moduleStatuses?.emotional ? "default" : "outline"}
                        className={status.moduleStatuses?.emotional ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" : ""}
                      >
                        {status.moduleStatuses?.emotional ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        <span>UBX_Ethics</span>
                      </div>
                      <Badge 
                        variant={status.moduleStatuses?.ethics ? "default" : "outline"}
                        className={status.moduleStatuses?.ethics ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" : ""}
                      >
                        {status.moduleStatuses?.ethics ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        <span>UBX_Bridge</span>
                      </div>
                      <Badge 
                        variant={status.moduleStatuses?.bridge ? "default" : "outline"}
                        className={status.moduleStatuses?.bridge ? "bg-green-500/20 text-green-600 hover:bg-green-500/20" : ""}
                      >
                        {status.moduleStatuses?.bridge ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Test UberCore Processing</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-id">User ID</Label>
                    <input
                      id="user-id"
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter user ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-text">Input Text</Label>
                    <textarea
                      id="input-text"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text to process through the UberCore system..."
                    />
                  </div>
                  <Button 
                    onClick={handleProcessInput}
                    disabled={!isInitialized || isProcessing || !inputText.trim()}
                  >
                    {isProcessing ? 'Processing...' : 'Process Input'}
                  </Button>
                </div>
                
                {processingResult && (
                  <div className="mt-4 p-4 border rounded-md">
                    <h4 className="text-md font-semibold mb-2">Processing Result</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Status:</span> 
                        <span className={processingResult.success ? "text-green-500" : "text-red-500"}>
                          {processingResult.success ? 'Success' : 'Failed'}
                        </span>
                      </div>
                      
                      {processingResult.blocked && (
                        <div>
                          <span className="font-semibold">Blocked:</span> {processingResult.reason}
                        </div>
                      )}
                      
                      {processingResult.output && (
                        <div>
                          <span className="font-semibold">Output:</span> {processingResult.output}
                        </div>
                      )}
                      
                      {processingResult.emotionalState && (
                        <div>
                          <span className="font-semibold">Emotional State:</span> {processingResult.emotionalState.dominantEmotion} 
                          (Intensity: {processingResult.emotionalState.emotionIntensity.toFixed(2)})
                        </div>
                      )}
                      
                      {processingResult.uiAdaptation && (
                        <div>
                          <span className="font-semibold">Recommended UI:</span> Tone: {processingResult.uiAdaptation.tone}, 
                          Visual: {processingResult.uiAdaptation.visualMode}
                        </div>
                      )}
                      
                      {processingResult.confidence !== undefined && (
                        <div>
                          <span className="font-semibold">Confidence:</span> {processingResult.confidence.toFixed(2)}
                        </div>
                      )}
                      
                      {processingResult.ethicsScore !== undefined && (
                        <div>
                          <span className="font-semibold">Ethics Score:</span> {processingResult.ethicsScore.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* UBX_Logic Tab */}
        <TabsContent value="logic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" /> UBX_Logic Module
              </CardTitle>
              <CardDescription>
                Core logic processing and pattern learning (based on Oxum Learning)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Patterns Learned</span>
                  <Badge variant="outline">{status.patternsLearned || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Learning Status</span>
                  <Badge variant={status.moduleStatuses?.logic ? "default" : "outline"}>
                    {status.moduleStatuses?.logic ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Module Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pattern recognition and learning</li>
                    <li>Data processing and infrastructure management</li>
                    <li>Performance optimization</li>
                    <li>Boosting and Wallet management</li>
                    <li>Content matching algorithms</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* UBX_Emo Tab */}
        <TabsContent value="emotional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2" /> UBX_Emo Module
              </CardTitle>
              <CardDescription>
                Emotional intelligence and UI adaptation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Emotional Profiles</span>
                  <Badge variant="outline">{status.emotionalProfilesCount || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Module Status</span>
                  <Badge variant={status.moduleStatuses?.emotional ? "default" : "outline"}>
                    {status.moduleStatuses?.emotional ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Module Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>User mood detection</li>
                    <li>Dynamic interface adaptation</li>
                    <li>Emotional recommendations</li>
                    <li>Conversation tone adjustment</li>
                    <li>User engagement optimization</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* UBX_Ethics Tab */}
        <TabsContent value="ethics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" /> UBX_Ethics Module
              </CardTitle>
              <CardDescription>
                Ethical guidelines enforcement and content moderation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Ethical Guidelines</span>
                  <Badge variant="outline">{status.ethicalGuidelinesCount || 0}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Module Status</span>
                  <Badge variant={status.moduleStatuses?.ethics ? "default" : "outline"}>
                    {status.moduleStatuses?.ethics ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Module Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Content moderation</li>
                    <li>Ethical compliance monitoring</li>
                    <li>Manipulation prevention</li>
                    <li>Well-being protection</li>
                    <li>Privacy and consent enforcement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UberCorePanel;
