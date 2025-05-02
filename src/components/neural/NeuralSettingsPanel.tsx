
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowUpToLine,
  Check,
  Code,
  Database,
  Lock,
  RefreshCw,
  Save,
  Settings,
  Shield,
  Terminal
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const NeuralSettingsPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // Mock settings state
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Neural Processing Engine v3.2',
      timezone: 'UTC',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h',
      autoRefresh: true,
      refreshInterval: 30,
      enableNotifications: true,
      enableSounds: false,
      enableTelemetry: true,
      darkModeSystem: true,
      language: 'en-US'
    },
    performance: {
      cacheSize: 512,
      maxConnections: 1000,
      maxConcurrentOperations: 100,
      idleTimeout: 15,
      queryTimeout: 30,
      maxMemoryUsage: 75,
      maxCpuUsage: 80,
      enableJit: true,
      optimizationLevel: 'balanced',
      logLevel: 'info'
    },
    security: {
      enableAudit: true,
      maxLoginAttempts: 5,
      sessionTimeout: 60,
      requireMfa: false,
      ipWhitelist: '',
      restrictedMode: false,
      encryptionLevel: 'high',
      allowRemoteAccess: true,
      autoBlockThreshold: 10,
      validateCertificates: true
    },
    neural: {
      modelPrecision: 'float32',
      batchSize: 32,
      temperatureRange: [0, 1.5],
      temperature: 0.7,
      topP: 0.9,
      presencePenalty: 0.2,
      frequencyPenalty: 0.4,
      systemPromptEnabled: true,
      contextWindowSize: 8192,
      maxTokens: 4096,
      enableTraceability: true
    },
    advanced: {
      debugMode: false,
      experimentalFeatures: false,
      devMode: false,
      clearCacheOnStartup: false,
      bypassSecurity: false,
      enableRawApiCalls: false,
      unsafeOperations: false,
      experimentalModels: false
    }
  });
  
  // Update a setting value
  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category as keyof typeof prevSettings],
        [key]: value
      }
    }));
  };
  
  // Save all settings
  const saveSettings = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    toast({
      title: "Settings saved",
      description: "Your neural system settings have been updated."
    });
  };
  
  // Import settings from file
  const importSettings = () => {
    toast({
      title: "Import settings",
      description: "Settings import feature is not implemented in this demo."
    });
  };
  
  // Export settings to file
  const exportSettings = () => {
    toast({
      title: "Export settings",
      description: "Settings export feature is not implemented in this demo."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Neural System Settings</CardTitle>
              <CardDescription>Configure and customize your neural system behavior</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={importSettings}>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={exportSettings}>
                <ArrowUpToLine className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" onClick={saveSettings} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 w-full mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="neural">Neural</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Basic Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">System Name</Label>
                      <Input 
                        id="system-name" 
                        value={settings.general.systemName}
                        onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select 
                        value={settings.general.timezone}
                        onValueChange={(value) => updateSetting('general', 'timezone', value)}
                      >
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select 
                        value={settings.general.dateFormat}
                        onValueChange={(value) => updateSetting('general', 'dateFormat', value)}
                      >
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time-format">Time Format</Label>
                      <Select 
                        value={settings.general.timeFormat}
                        onValueChange={(value) => updateSetting('general', 'timeFormat', value)}
                      >
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Select time format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select 
                        value={settings.general.language}
                        onValueChange={(value) => updateSetting('general', 'language', value)}
                      >
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                          <SelectItem value="de-DE">German</SelectItem>
                          <SelectItem value="ja-JP">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                      <div className="flex items-center gap-4">
                        <Input 
                          id="refresh-interval" 
                          type="number"
                          min={5}
                          max={300}
                          value={settings.general.refreshInterval}
                          onChange={(e) => updateSetting('general', 'refreshInterval', parseInt(e.target.value))}
                          disabled={!settings.general.autoRefresh}
                        />
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="auto-refresh" 
                            checked={settings.general.autoRefresh}
                            onCheckedChange={(checked) => updateSetting('general', 'autoRefresh', checked)}
                          />
                          <Label htmlFor="auto-refresh">Auto-refresh</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Show system notifications for important events
                        </p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={settings.general.enableNotifications}
                        onCheckedChange={(checked) => updateSetting('general', 'enableNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sounds">Enable Sounds</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for alerts and notifications
                        </p>
                      </div>
                      <Switch 
                        id="sounds" 
                        checked={settings.general.enableSounds}
                        onCheckedChange={(checked) => updateSetting('general', 'enableSounds', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="telemetry">Enable Telemetry</Label>
                        <p className="text-sm text-muted-foreground">
                          Send anonymous usage data to improve the system
                        </p>
                      </div>
                      <Switch 
                        id="telemetry" 
                        checked={settings.general.enableTelemetry}
                        onCheckedChange={(checked) => updateSetting('general', 'enableTelemetry', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Follow System Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically switch between light and dark modes
                        </p>
                      </div>
                      <Switch 
                        id="dark-mode" 
                        checked={settings.general.darkModeSystem}
                        onCheckedChange={(checked) => updateSetting('general', 'darkModeSystem', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Resource Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cache-size">Cache Size (MB)</Label>
                      <Input 
                        id="cache-size" 
                        type="number"
                        min={128}
                        max={4096}
                        step={128}
                        value={settings.performance.cacheSize}
                        onChange={(e) => updateSetting('performance', 'cacheSize', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-connections">Maximum Connections</Label>
                      <Input 
                        id="max-connections" 
                        type="number"
                        min={100}
                        max={10000}
                        step={100}
                        value={settings.performance.maxConnections}
                        onChange={(e) => updateSetting('performance', 'maxConnections', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-concurrent">Maximum Concurrent Operations</Label>
                      <Input 
                        id="max-concurrent" 
                        type="number"
                        min={10}
                        max={500}
                        step={10}
                        value={settings.performance.maxConcurrentOperations}
                        onChange={(e) => updateSetting('performance', 'maxConcurrentOperations', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idle-timeout">Idle Timeout (minutes)</Label>
                      <Input 
                        id="idle-timeout" 
                        type="number"
                        min={1}
                        max={60}
                        value={settings.performance.idleTimeout}
                        onChange={(e) => updateSetting('performance', 'idleTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="query-timeout">Query Timeout (seconds)</Label>
                      <Input 
                        id="query-timeout" 
                        type="number"
                        min={5}
                        max={300}
                        value={settings.performance.queryTimeout}
                        onChange={(e) => updateSetting('performance', 'queryTimeout', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select 
                        value={settings.performance.logLevel}
                        onValueChange={(value) => updateSetting('performance', 'logLevel', value)}
                      >
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trace">Trace</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="max-memory">Maximum Memory Usage (%)</Label>
                        <span className="text-sm font-medium">{settings.performance.maxMemoryUsage}%</span>
                      </div>
                      <Slider
                        id="max-memory"
                        min={30}
                        max={95}
                        step={5}
                        value={[settings.performance.maxMemoryUsage]}
                        onValueChange={(value) => updateSetting('performance', 'maxMemoryUsage', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        System will attempt to stay below this memory usage threshold
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="max-cpu">Maximum CPU Usage (%)</Label>
                        <span className="text-sm font-medium">{settings.performance.maxCpuUsage}%</span>
                      </div>
                      <Slider
                        id="max-cpu"
                        min={30}
                        max={95}
                        step={5}
                        value={[settings.performance.maxCpuUsage]}
                        onValueChange={(value) => updateSetting('performance', 'maxCpuUsage', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        System will throttle operations when CPU usage exceeds this threshold
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-jit">Enable JIT Optimization</Label>
                        <p className="text-sm text-muted-foreground">
                          Use just-in-time compilation for performance
                        </p>
                      </div>
                      <Switch 
                        id="enable-jit" 
                        checked={settings.performance.enableJit}
                        onCheckedChange={(checked) => updateSetting('performance', 'enableJit', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="optimization-level">Optimization Strategy</Label>
                      <Select 
                        value={settings.performance.optimizationLevel}
                        onValueChange={(value) => updateSetting('performance', 'optimizationLevel', value)}
                      >
                        <SelectTrigger id="optimization-level">
                          <SelectValue placeholder="Select optimization level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="speed">Speed (higher CPU usage)</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="memory">Memory (lower memory usage)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="max-login-attempts">Maximum Login Attempts</Label>
                      <Input 
                        id="max-login-attempts" 
                        type="number"
                        min={1}
                        max={10}
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of failed attempts before temporary lockout
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number"
                        min={5}
                        max={480}
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Inactive sessions will be logged out after this period
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="auto-block">Auto-block Threshold</Label>
                      <Input 
                        id="auto-block" 
                        type="number"
                        min={3}
                        max={20}
                        value={settings.security.autoBlockThreshold}
                        onChange={(e) => updateSetting('security', 'autoBlockThreshold', parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Number of suspicious activities before auto-blocking
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                      <Input 
                        id="ip-whitelist" 
                        placeholder="Comma-separated IP addresses"
                        value={settings.security.ipWhitelist}
                        onChange={(e) => updateSetting('security', 'ipWhitelist', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty to allow all IP addresses
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="encryption-level">Encryption Level</Label>
                      <Select 
                        value={settings.security.encryptionLevel}
                        onValueChange={(value) => updateSetting('security', 'encryptionLevel', value)}
                      >
                        <SelectTrigger id="encryption-level">
                          <SelectValue placeholder="Select encryption level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="very-high">Very High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="audit-logging">Enable Audit Logging</Label>
                        <p className="text-sm text-muted-foreground">
                          Log all security-related events and actions
                        </p>
                      </div>
                      <Switch 
                        id="audit-logging" 
                        checked={settings.security.enableAudit}
                        onCheckedChange={(checked) => updateSetting('security', 'enableAudit', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="require-mfa">Require Multi-Factor Auth</Label>
                        <p className="text-sm text-muted-foreground">
                          Require MFA for all administrative actions
                        </p>
                      </div>
                      <Switch 
                        id="require-mfa" 
                        checked={settings.security.requireMfa}
                        onCheckedChange={(checked) => updateSetting('security', 'requireMfa', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="remote-access">Allow Remote Access</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable access from external networks
                        </p>
                      </div>
                      <Switch 
                        id="remote-access" 
                        checked={settings.security.allowRemoteAccess}
                        onCheckedChange={(checked) => updateSetting('security', 'allowRemoteAccess', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="validate-certs">Validate SSL Certificates</Label>
                        <p className="text-sm text-muted-foreground">
                          Verify SSL certificates for all connections
                        </p>
                      </div>
                      <Switch 
                        id="validate-certs" 
                        checked={settings.security.validateCertificates}
                        onCheckedChange={(checked) => updateSetting('security', 'validateCertificates', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="restricted-mode">Restricted Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Limit operations to essential functions only
                        </p>
                      </div>
                      <Switch 
                        id="restricted-mode" 
                        checked={settings.security.restrictedMode}
                        onCheckedChange={(checked) => updateSetting('security', 'restrictedMode', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-amber-50 border-t border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30">
                  <div className="flex items-start gap-3 text-amber-800 dark:text-amber-300">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Security Notice</p>
                      <p>Changes to security settings require confirmation and may affect system accessibility.</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="neural" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    Neural Processing Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="model-precision">Model Precision</Label>
                      <Select 
                        value={settings.neural.modelPrecision}
                        onValueChange={(value) => updateSetting('neural', 'modelPrecision', value)}
                      >
                        <SelectTrigger id="model-precision">
                          <SelectValue placeholder="Select model precision" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="float16">float16 (Faster, less accurate)</SelectItem>
                          <SelectItem value="float32">float32 (Balanced)</SelectItem>
                          <SelectItem value="double64">double64 (Slower, more accurate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="batch-size">Batch Size</Label>
                      <Input 
                        id="batch-size" 
                        type="number"
                        min={1}
                        max={128}
                        value={settings.neural.batchSize}
                        onChange={(e) => updateSetting('neural', 'batchSize', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="context-window">Context Window Size</Label>
                      <Select 
                        value={settings.neural.contextWindowSize.toString()}
                        onValueChange={(value) => updateSetting('neural', 'contextWindowSize', parseInt(value))}
                      >
                        <SelectTrigger id="context-window">
                          <SelectValue placeholder="Select context window size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2048">2048 tokens</SelectItem>
                          <SelectItem value="4096">4096 tokens</SelectItem>
                          <SelectItem value="8192">8192 tokens</SelectItem>
                          <SelectItem value="16384">16384 tokens</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <Input 
                        id="max-tokens" 
                        type="number"
                        min={100}
                        max={16384}
                        value={settings.neural.maxTokens}
                        onChange={(e) => updateSetting('neural', 'maxTokens', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <span className="text-sm font-medium">{settings.neural.temperature}</span>
                      </div>
                      <Slider
                        id="temperature"
                        min={0}
                        max={2}
                        step={0.1}
                        value={[settings.neural.temperature]}
                        onValueChange={(value) => updateSetting('neural', 'temperature', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Controls randomness. Lower values are more deterministic, higher values more creative.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="top-p">Top P</Label>
                        <span className="text-sm font-medium">{settings.neural.topP}</span>
                      </div>
                      <Slider
                        id="top-p"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={[settings.neural.topP]}
                        onValueChange={(value) => updateSetting('neural', 'topP', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Controls diversity via nucleus sampling.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="presence-penalty">Presence Penalty</Label>
                        <span className="text-sm font-medium">{settings.neural.presencePenalty}</span>
                      </div>
                      <Slider
                        id="presence-penalty"
                        min={0}
                        max={2}
                        step={0.1}
                        value={[settings.neural.presencePenalty]}
                        onValueChange={(value) => updateSetting('neural', 'presencePenalty', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Positive values penalize new tokens based on if they appear in the text so far.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="frequency-penalty">Frequency Penalty</Label>
                        <span className="text-sm font-medium">{settings.neural.frequencyPenalty}</span>
                      </div>
                      <Slider
                        id="frequency-penalty"
                        min={0}
                        max={2}
                        step={0.1}
                        value={[settings.neural.frequencyPenalty]}
                        onValueChange={(value) => updateSetting('neural', 'frequencyPenalty', value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Positive values penalize tokens based on their frequency in the text so far.
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-prompt">Enable System Prompt</Label>
                      <p className="text-sm text-muted-foreground">
                        Use system prompt to guide neural processing
                      </p>
                    </div>
                    <Switch 
                      id="system-prompt" 
                      checked={settings.neural.systemPromptEnabled}
                      onCheckedChange={(checked) => updateSetting('neural', 'systemPromptEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="space-y-0.5">
                      <Label htmlFor="traceability">Enable Traceability</Label>
                      <p className="text-sm text-muted-foreground">
                        Log detailed traceability information for neural operations
                      </p>
                    </div>
                    <Switch 
                      id="traceability" 
                      checked={settings.neural.enableTraceability}
                      onCheckedChange={(checked) => updateSetting('neural', 'enableTraceability', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader className="bg-red-50 border-b border-red-100 dark:bg-red-900/20 dark:border-red-900/30">
                  <div className="flex items-start gap-3 text-red-800 dark:text-red-300">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <CardTitle className="text-red-800 dark:text-red-300">Warning: Advanced Settings</CardTitle>
                      <CardDescription className="text-red-700 dark:text-red-400">
                        These settings can significantly impact system stability. Only modify if you know what you're doing.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="debug-mode">Debug Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable extended logging and diagnostic tools
                        </p>
                      </div>
                      <Switch 
                        id="debug-mode" 
                        checked={settings.advanced.debugMode}
                        onCheckedChange={(checked) => updateSetting('advanced', 'debugMode', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="experimental-features">Experimental Features</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable experimental system capabilities
                        </p>
                      </div>
                      <Switch 
                        id="experimental-features" 
                        checked={settings.advanced.experimentalFeatures}
                        onCheckedChange={(checked) => updateSetting('advanced', 'experimentalFeatures', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dev-mode">Developer Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable developer tools and interfaces
                        </p>
                      </div>
                      <Switch 
                        id="dev-mode" 
                        checked={settings.advanced.devMode}
                        onCheckedChange={(checked) => updateSetting('advanced', 'devMode', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="clear-cache">Clear Cache on Startup</Label>
                        <p className="text-sm text-muted-foreground">
                          Purge all caches when system initializes
                        </p>
                      </div>
                      <Switch 
                        id="clear-cache" 
                        checked={settings.advanced.clearCacheOnStartup}
                        onCheckedChange={(checked) => updateSetting('advanced', 'clearCacheOnStartup', checked)}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="pb-2">
                      <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Danger Zone</h4>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="space-y-0.5">
                          <Label htmlFor="bypass-security" className="text-red-600 dark:text-red-400">Bypass Security Checks</Label>
                          <p className="text-sm text-muted-foreground">
                            Skip security validations (extremely dangerous)
                          </p>
                        </div>
                        <Switch 
                          id="bypass-security" 
                          checked={settings.advanced.bypassSecurity}
                          onCheckedChange={(checked) => updateSetting('advanced', 'bypassSecurity', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="space-y-0.5">
                          <Label htmlFor="raw-api" className="text-red-600 dark:text-red-400">Enable Raw API Calls</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow direct, unvalidated API access
                          </p>
                        </div>
                        <Switch 
                          id="raw-api" 
                          checked={settings.advanced.enableRawApiCalls}
                          onCheckedChange={(checked) => updateSetting('advanced', 'enableRawApiCalls', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="space-y-0.5">
                          <Label htmlFor="unsafe-ops" className="text-red-600 dark:text-red-400">Allow Unsafe Operations</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable operations that may damage system integrity
                          </p>
                        </div>
                        <Switch 
                          id="unsafe-ops" 
                          checked={settings.advanced.unsafeOperations}
                          onCheckedChange={(checked) => updateSetting('advanced', 'unsafeOperations', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 flex flex-wrap items-center justify-between gap-3 border-t">
                  <Button variant="outline" className="space-x-1">
                    <Code className="h-4 w-4" />
                    <span>Export Config</span>
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost">Reset All</Button>
                    <Button variant="default">Apply Changes</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => {
          toast({
            title: "Settings reset",
            description: "All settings have been reset to default values.",
          });
        }}>
          Reset to Defaults
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={saveSettings} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NeuralSettingsPanel;
