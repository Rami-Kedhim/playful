
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const NeuralSettingsPanel: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    systemEnabled: true,
    debugMode: false,
    telemetryEnabled: true,
    dataRetentionDays: 30,
    modelVersion: 'stable'
  });
  
  const [performanceSettings, setPerformanceSettings] = useState({
    maxResourceUtilization: 85,
    responseTimeThreshold: 150,
    batchSize: 32,
    cachingEnabled: true,
    parallelProcesses: 4
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    encryptionEnabled: true,
    auditLoggingEnabled: true,
    accessControlLevel: 'strict',
    anomalyDetectionEnabled: true,
    autoUpdateEnabled: false
  });
  
  // Handle general settings changes
  const updateGeneralSetting = (key: keyof typeof generalSettings, value: any) => {
    setGeneralSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle performance settings changes
  const updatePerformanceSetting = (key: keyof typeof performanceSettings, value: any) => {
    setPerformanceSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle security settings changes
  const updateSecuritySetting = (key: keyof typeof securitySettings, value: any) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const saveSettings = () => {
    console.log('Saving settings...');
    console.log('General settings:', generalSettings);
    console.log('Performance settings:', performanceSettings);
    console.log('Security settings:', securitySettings);
    // In a real app, this would make an API call to save the settings
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure general neural system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-enabled">System Enabled</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the entire neural system
                  </p>
                </div>
                <Switch 
                  id="system-enabled" 
                  checked={generalSettings.systemEnabled}
                  onCheckedChange={(checked) => updateGeneralSetting('systemEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging and diagnostics
                  </p>
                </div>
                <Switch 
                  id="debug-mode" 
                  checked={generalSettings.debugMode}
                  onCheckedChange={(checked) => updateGeneralSetting('debugMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="telemetry-enabled">Telemetry</Label>
                  <p className="text-sm text-muted-foreground">
                    Send anonymous usage data to improve the system
                  </p>
                </div>
                <Switch 
                  id="telemetry-enabled" 
                  checked={generalSettings.telemetryEnabled}
                  onCheckedChange={(checked) => updateGeneralSetting('telemetryEnabled', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-retention">Data Retention (days)</Label>
                <Input 
                  id="data-retention" 
                  type="number" 
                  min={1} 
                  max={365} 
                  value={generalSettings.dataRetentionDays}
                  onChange={(e) => updateGeneralSetting('dataRetentionDays', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model-version">Default Model Version</Label>
                <Select 
                  value={generalSettings.modelVersion}
                  onValueChange={(value) => updateGeneralSetting('modelVersion', value)}
                >
                  <SelectTrigger id="model-version">
                    <SelectValue placeholder="Select model version" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable (v2.1)</SelectItem>
                    <SelectItem value="beta">Beta (v3.0-beta)</SelectItem>
                    <SelectItem value="legacy">Legacy (v1.5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Optimize neural system performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="max-utilization">Max Resource Utilization (%)</Label>
                  <span className="text-sm">{performanceSettings.maxResourceUtilization}%</span>
                </div>
                <Slider
                  id="max-utilization"
                  min={50}
                  max={100}
                  step={5}
                  value={[performanceSettings.maxResourceUtilization]}
                  onValueChange={(value) => updatePerformanceSetting('maxResourceUtilization', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum CPU and memory utilization allowed before scaling
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="response-threshold">Response Time Threshold (ms)</Label>
                  <span className="text-sm">{performanceSettings.responseTimeThreshold}ms</span>
                </div>
                <Slider
                  id="response-threshold"
                  min={50}
                  max={500}
                  step={10}
                  value={[performanceSettings.responseTimeThreshold]}
                  onValueChange={(value) => updatePerformanceSetting('responseTimeThreshold', value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum acceptable response time before alerts are triggered
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="caching-enabled">Result Caching</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable caching of neural processing results
                  </p>
                </div>
                <Switch 
                  id="caching-enabled" 
                  checked={performanceSettings.cachingEnabled}
                  onCheckedChange={(checked) => updatePerformanceSetting('cachingEnabled', checked)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Batch Size</Label>
                  <Input 
                    id="batch-size" 
                    type="number" 
                    min={1} 
                    max={128} 
                    value={performanceSettings.batchSize}
                    onChange={(e) => updatePerformanceSetting('batchSize', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of operations processed together
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parallel-processes">Parallel Processes</Label>
                  <Input 
                    id="parallel-processes" 
                    type="number" 
                    min={1} 
                    max={16} 
                    value={performanceSettings.parallelProcesses}
                    onChange={(e) => updatePerformanceSetting('parallelProcesses', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum concurrent processing threads
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure neural system security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="encryption-enabled">Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable encryption for sensitive neural data
                  </p>
                </div>
                <Switch 
                  id="encryption-enabled" 
                  checked={securitySettings.encryptionEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting('encryptionEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-logging-enabled">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Maintain detailed logs of all system actions
                  </p>
                </div>
                <Switch 
                  id="audit-logging-enabled" 
                  checked={securitySettings.auditLoggingEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting('auditLoggingEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="anomaly-detection-enabled">Anomaly Detection</Label>
                  <p className="text-sm text-muted-foreground">
                    Detect and alert on unusual system behavior
                  </p>
                </div>
                <Switch 
                  id="anomaly-detection-enabled" 
                  checked={securitySettings.anomalyDetectionEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting('anomalyDetectionEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-update-enabled">Automatic Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically install security updates
                  </p>
                </div>
                <Switch 
                  id="auto-update-enabled" 
                  checked={securitySettings.autoUpdateEnabled}
                  onCheckedChange={(checked) => updateSecuritySetting('autoUpdateEnabled', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="access-control-level">Access Control Level</Label>
                <Select 
                  value={securitySettings.accessControlLevel}
                  onValueChange={(value) => updateSecuritySetting('accessControlLevel', value)}
                >
                  <SelectTrigger id="access-control-level">
                    <SelectValue placeholder="Select access control level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Determines how restrictive the system is with access permissions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={saveSettings}>Save All Settings</Button>
      </div>
    </div>
  );
};

export default NeuralSettingsPanel;
