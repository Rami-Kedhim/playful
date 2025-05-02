
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Brain,
  Cpu,
  BarChart,
  AlertTriangle,
  InfoIcon,
  Download,
  Upload,
  FileJson
} from 'lucide-react';

const NeuralSettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // General settings
  const [settings, setSettings] = useState({
    systemName: 'Neural Monitoring System',
    description: 'Advanced neural processing monitoring and control system',
    refreshInterval: 30,
    autoRefreshEnabled: true,
    darkModeEnabled: true,
    notificationsEnabled: true,
    loggingLevel: 'info'
  });
  
  // Performance settings
  const [performanceSettings, setPerformanceSettings] = useState({
    processingPower: 75,
    memoryAllocation: 60,
    cacheSize: 128,
    parallelProcessing: true,
    optimizationLevel: 'balanced',
    cpuPriority: 'normal'
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    accessLevel: 'standard',
    encryptionEnabled: true,
    auditLogEnabled: true,
    failsafeEnabled: true,
    autoLockTimeout: 15
  });
  
  // Update general settings
  const updateGeneralSettings = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };
  
  // Update performance settings
  const updatePerformanceSettings = (key: string, value: any) => {
    setPerformanceSettings({ ...performanceSettings, [key]: value });
  };
  
  // Update security settings
  const updateSecuritySettings = (key: string, value: any) => {
    setSecuritySettings({ ...securitySettings, [key]: value });
  };
  
  // Toggle advanced mode
  const toggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
  };
  
  // Reset settings to defaults
  const resetToDefaults = () => {
    setSettings({
      systemName: 'Neural Monitoring System',
      description: 'Advanced neural processing monitoring and control system',
      refreshInterval: 30,
      autoRefreshEnabled: true,
      darkModeEnabled: true,
      notificationsEnabled: true,
      loggingLevel: 'info'
    });
    
    setPerformanceSettings({
      processingPower: 75,
      memoryAllocation: 60,
      cacheSize: 128,
      parallelProcessing: true,
      optimizationLevel: 'balanced',
      cpuPriority: 'normal'
    });
    
    setSecuritySettings({
      accessLevel: 'standard',
      encryptionEnabled: true,
      auditLogEnabled: true,
      failsafeEnabled: true,
      autoLockTimeout: 15
    });
  };
  
  // Save settings
  const saveSettings = () => {
    console.log('Saving settings:', {
      general: settings,
      performance: performanceSettings,
      security: securitySettings
    });
    // In a real application, this would save to a backend system
  };
  
  // Export settings to JSON
  const exportSettings = () => {
    const exportData = {
      general: settings,
      performance: performanceSettings,
      security: securitySettings,
      exportDate: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'neural-settings-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Settings className="mr-2 h-5 w-5 text-primary" />
            Neural System Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure and customize system behavior and appearance
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="advanced-mode"
              checked={advancedMode}
              onCheckedChange={toggleAdvancedMode}
            />
            <Label htmlFor="advanced-mode">Advanced Mode</Label>
          </div>
          
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Cpu className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system parameters and appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input 
                      id="system-name" 
                      value={settings.systemName}
                      onChange={(e) => updateGeneralSettings('systemName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-description">Description</Label>
                    <Textarea 
                      id="system-description" 
                      value={settings.description}
                      onChange={(e) => updateGeneralSettings('description', e.target.value)}
                      className="h-20"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id="refresh-interval"
                        min={5}
                        max={60}
                        step={5}
                        value={[settings.refreshInterval]}
                        onValueChange={(value) => updateGeneralSettings('refreshInterval', value[0])}
                      />
                      <span className="w-12 text-right font-medium">{settings.refreshInterval}s</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-refresh">Auto Refresh</Label>
                      <Switch
                        id="auto-refresh"
                        checked={settings.autoRefreshEnabled}
                        onCheckedChange={(checked) => updateGeneralSettings('autoRefreshEnabled', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <Switch
                        id="dark-mode"
                        checked={settings.darkModeEnabled}
                        onCheckedChange={(checked) => updateGeneralSettings('darkModeEnabled', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Enable Notifications</Label>
                      <Switch
                        id="notifications"
                        checked={settings.notificationsEnabled}
                        onCheckedChange={(checked) => updateGeneralSettings('notificationsEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="logging-level">Logging Level</Label>
                <Select
                  value={settings.loggingLevel}
                  onValueChange={(value) => updateGeneralSettings('loggingLevel', value)}
                >
                  <SelectTrigger id="logging-level" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Select logging level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Settings</CardTitle>
              <CardDescription>Optimize the neural system performance and resource usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="processing-power">Processing Power</Label>
                    <span className="text-sm">{performanceSettings.processingPower}%</span>
                  </div>
                  <Slider
                    id="processing-power"
                    min={10}
                    max={100}
                    step={5}
                    value={[performanceSettings.processingPower]}
                    onValueChange={(value) => updatePerformanceSettings('processingPower', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Higher values increase neural processing speed but use more resources</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="memory-allocation">Memory Allocation</Label>
                    <span className="text-sm">{performanceSettings.memoryAllocation}%</span>
                  </div>
                  <Slider
                    id="memory-allocation"
                    min={20}
                    max={90}
                    step={5}
                    value={[performanceSettings.memoryAllocation]}
                    onValueChange={(value) => updatePerformanceSettings('memoryAllocation', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Controls the amount of memory allocated to the neural system</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cache-size">Cache Size (MB)</Label>
                    <span className="text-sm">{performanceSettings.cacheSize}MB</span>
                  </div>
                  <Slider
                    id="cache-size"
                    min={64}
                    max={512}
                    step={32}
                    value={[performanceSettings.cacheSize]}
                    onValueChange={(value) => updatePerformanceSettings('cacheSize', value[0])}
                  />
                  <p className="text-xs text-muted-foreground">Larger cache sizes improve performance but use more memory</p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <Label htmlFor="parallel-processing">Parallel Processing</Label>
                    <p className="text-xs text-muted-foreground">Enable multi-threaded neural processing</p>
                  </div>
                  <Switch
                    id="parallel-processing"
                    checked={performanceSettings.parallelProcessing}
                    onCheckedChange={(checked) => updatePerformanceSettings('parallelProcessing', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="optimization-level">Optimization Level</Label>
                    <Select
                      value={performanceSettings.optimizationLevel}
                      onValueChange={(value) => updatePerformanceSettings('optimizationLevel', value)}
                    >
                      <SelectTrigger id="optimization-level">
                        <SelectValue placeholder="Select optimization level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speed">Speed Optimized</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="efficiency">Efficiency Optimized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cpu-priority">CPU Priority</Label>
                    <Select
                      value={performanceSettings.cpuPriority}
                      onValueChange={(value) => updatePerformanceSettings('cpuPriority', value)}
                    >
                      <SelectTrigger id="cpu-priority">
                        <SelectValue placeholder="Select CPU priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="access-level">Access Level</Label>
                    <Select
                      value={securitySettings.accessLevel}
                      onValueChange={(value) => updateSecuritySettings('accessLevel', value)}
                    >
                      <SelectTrigger id="access-level">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="administrator">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Determines what settings and features are accessible</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="auto-lock-timeout">Auto-Lock Timeout (minutes)</Label>
                      <span className="text-sm">{securitySettings.autoLockTimeout}m</span>
                    </div>
                    <Slider
                      id="auto-lock-timeout"
                      min={1}
                      max={60}
                      step={1}
                      value={[securitySettings.autoLockTimeout]}
                      onValueChange={(value) => updateSecuritySettings('autoLockTimeout', value[0])}
                    />
                    <p className="text-xs text-muted-foreground">Automatically lock system after period of inactivity</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption-enabled">Data Encryption</Label>
                      <p className="text-xs text-muted-foreground">Enable end-to-end encryption</p>
                    </div>
                    <Switch
                      id="encryption-enabled"
                      checked={securitySettings.encryptionEnabled}
                      onCheckedChange={(checked) => updateSecuritySettings('encryptionEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-log-enabled">Audit Logging</Label>
                      <p className="text-xs text-muted-foreground">Track all system interactions and changes</p>
                    </div>
                    <Switch
                      id="audit-log-enabled"
                      checked={securitySettings.auditLogEnabled}
                      onCheckedChange={(checked) => updateSecuritySettings('auditLogEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="failsafe-enabled">Failsafe Mode</Label>
                      <p className="text-xs text-muted-foreground">Automatically detect and prevent harmful operations</p>
                    </div>
                    <Switch
                      id="failsafe-enabled"
                      checked={securitySettings.failsafeEnabled}
                      onCheckedChange={(checked) => updateSecuritySettings('failsafeEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  Security settings changes require re-authentication to take effect.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Expert configuration options for neural system</CardDescription>
              </div>
              <Badge variant={advancedMode ? "default" : "outline"}>
                {advancedMode ? 'Advanced Mode' : 'Basic Mode'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {!advancedMode ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Advanced Mode Required</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    These settings are only available in advanced mode.
                  </p>
                  <Button onClick={toggleAdvancedMode}>
                    Enable Advanced Mode
                  </Button>
                </div>
              ) : (
                <>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Modifying these settings may impact system stability. Proceed with caution.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="model-config">Neural Model Configuration</Label>
                        <Textarea 
                          id="model-config" 
                          className="font-mono h-32"
                          placeholder="{
  'precision': 'fp16',
  'layers': 12,
  'attention_heads': 16
}"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="api-endpoint">API Endpoint</Label>
                        <Input 
                          id="api-endpoint" 
                          placeholder="https://api.neural.example.com/v1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Configuration Management</Label>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Import Configuration
                          </Button>
                          <Button variant="outline" className="justify-start" onClick={exportSettings}>
                            <Upload className="h-4 w-4 mr-2" />
                            Export Configuration
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <FileJson className="h-4 w-4 mr-2" />
                            View Raw Configuration
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>System Actions</Label>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="justify-start">
                            <BarChart className="h-4 w-4 mr-2" />
                            Generate Diagnostic Report
                          </Button>
                          <Button variant="outline" className="justify-start" onClick={resetToDefaults}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset to Defaults
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetToDefaults}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default NeuralSettingsPanel;
