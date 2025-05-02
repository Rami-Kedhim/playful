
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  Settings, 
  Shield, 
  Bell, 
  Users, 
  CheckCircle2, 
  RefreshCw, 
  Save, 
  TrashIcon, 
  Download, 
  Upload,
  LucideIcon
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SettingsGroup {
  id: string;
  title: string;
  description: string;
  settings: Setting[];
}

interface Setting {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'select' | 'input' | 'button';
  value?: any;
  options?: { label: string; value: string }[];
  action?: () => void;
}

const NeuralSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState<SettingsGroup>({
    id: 'general',
    title: 'General Settings',
    description: 'Configure basic system behavior',
    settings: [
      {
        id: 'system-name',
        name: 'System Name',
        description: 'Name of your neural system instance',
        type: 'input',
        value: 'Neural Analytics Engine'
      },
      {
        id: 'default-model',
        name: 'Default Neural Model',
        description: 'Model used for processing when no specific model is requested',
        type: 'select',
        value: 'neural-advanced-v2',
        options: [
          { label: 'Neural Standard v1', value: 'neural-standard-v1' },
          { label: 'Neural Advanced v2', value: 'neural-advanced-v2' },
          { label: 'Neural Precision v1', value: 'neural-precision-v1' },
          { label: 'Neural Experimental', value: 'neural-experimental' }
        ]
      },
      {
        id: 'enable-caching',
        name: 'Enable Response Caching',
        description: 'Cache responses to improve performance for repeated requests',
        type: 'toggle',
        value: true
      },
      {
        id: 'debug-mode',
        name: 'Debug Mode',
        description: 'Enable detailed logging and debug information',
        type: 'toggle',
        value: false
      }
    ]
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState<SettingsGroup>({
    id: 'security',
    title: 'Security Settings',
    description: 'Configure system security options',
    settings: [
      {
        id: 'api-auth',
        name: 'API Authentication',
        description: 'Require authentication for all API calls',
        type: 'toggle',
        value: true
      },
      {
        id: 'access-logs',
        name: 'Access Logging',
        description: 'Log all access attempts and operations for auditing',
        type: 'toggle',
        value: true
      },
      {
        id: 'rate-limiting',
        name: 'Rate Limiting',
        description: 'Limit the number of requests per client to prevent abuse',
        type: 'toggle',
        value: true
      },
      {
        id: 'security-level',
        name: 'Security Level',
        description: 'Configure overall security posture of the system',
        type: 'select',
        value: 'standard',
        options: [
          { label: 'Basic', value: 'basic' },
          { label: 'Standard', value: 'standard' },
          { label: 'Enhanced', value: 'enhanced' },
          { label: 'Maximum', value: 'maximum' }
        ]
      }
    ]
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<SettingsGroup>({
    id: 'notifications',
    title: 'Notification Settings',
    description: 'Configure system alerts and notifications',
    settings: [
      {
        id: 'error-notifications',
        name: 'System Error Notifications',
        description: 'Receive notifications for system errors',
        type: 'toggle',
        value: true
      },
      {
        id: 'performance-alerts',
        name: 'Performance Threshold Alerts',
        description: 'Get alerts when system performance drops below thresholds',
        type: 'toggle',
        value: true
      },
      {
        id: 'security-alerts',
        name: 'Security Incident Alerts',
        description: 'Receive notifications for security-related events',
        type: 'toggle',
        value: true
      },
      {
        id: 'notification-method',
        name: 'Notification Method',
        description: 'How you want to receive system notifications',
        type: 'select',
        value: 'email',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'In-app notifications', value: 'in-app' },
          { label: 'Both email and in-app', value: 'both' },
          { label: 'None', value: 'none' }
        ]
      }
    ]
  });
  
  // User access settings
  const [accessSettings, setAccessSettings] = useState<SettingsGroup>({
    id: 'access',
    title: 'User Access Settings',
    description: 'Configure system access permissions',
    settings: [
      {
        id: 'public-api',
        name: 'Public API Access',
        description: 'Allow access to the API without authentication',
        type: 'toggle',
        value: false
      },
      {
        id: 'guest-access',
        name: 'Guest Access',
        description: 'Allow limited access for guest users',
        type: 'toggle',
        value: false
      },
      {
        id: 'default-role',
        name: 'Default User Role',
        description: 'Default role assigned to new users',
        type: 'select',
        value: 'viewer',
        options: [
          { label: 'Viewer', value: 'viewer' },
          { label: 'Analyst', value: 'analyst' },
          { label: 'Administrator', value: 'administrator' }
        ]
      }
    ]
  });
  
  // System maintenance settings - buttons instead of toggles
  const maintenanceActions = [
    {
      id: 'export-config',
      name: 'Export System Configuration',
      description: 'Download current system configuration as a JSON file',
      icon: Download,
      action: () => {
        toast({
          title: "Configuration Exported",
          description: "Your system configuration has been downloaded.",
        });
      }
    },
    {
      id: 'import-config',
      name: 'Import System Configuration',
      description: 'Upload and apply a system configuration file',
      icon: Upload,
      action: () => {
        // This would typically open a file picker
        toast({
          title: "Import Configuration",
          description: "Please select a configuration file to upload.",
        });
      }
    },
    {
      id: 'reset-defaults',
      name: 'Reset to Default Settings',
      description: 'Reset all settings to system defaults',
      icon: RefreshCw,
      variant: 'outline',
      action: () => {
        toast({
          title: "Reset to Defaults",
          description: "All settings have been reset to system defaults.",
        });
      }
    },
    {
      id: 'purge-cache',
      name: 'Purge System Cache',
      description: 'Clear all cached data in the system',
      icon: TrashIcon,
      variant: 'destructive',
      action: () => {
        toast({
          title: "Cache Purged",
          description: "All system caches have been cleared.",
        });
      }
    }
  ];
  
  const updateSetting = (groupId: string, settingId: string, value: any) => {
    if (groupId === 'general') {
      setGeneralSettings(prev => ({
        ...prev,
        settings: prev.settings.map(s => 
          s.id === settingId ? { ...s, value } : s
        )
      }));
    } else if (groupId === 'security') {
      setSecuritySettings(prev => ({
        ...prev,
        settings: prev.settings.map(s => 
          s.id === settingId ? { ...s, value } : s
        )
      }));
    } else if (groupId === 'notifications') {
      setNotificationSettings(prev => ({
        ...prev,
        settings: prev.settings.map(s => 
          s.id === settingId ? { ...s, value } : s
        )
      }));
    } else if (groupId === 'access') {
      setAccessSettings(prev => ({
        ...prev,
        settings: prev.settings.map(s => 
          s.id === settingId ? { ...s, value } : s
        )
      }));
    }
  };
  
  const renderSetting = (groupId: string, setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div key={setting.id} className="flex items-center justify-between space-x-2 rounded-md border p-4">
            <div>
              <h4 className="text-sm font-medium">{setting.name}</h4>
              <p className="text-xs text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <Switch
              checked={setting.value}
              onCheckedChange={(checked) => updateSetting(groupId, setting.id, checked)}
            />
          </div>
        );
      case 'select':
        return (
          <div key={setting.id} className="space-y-2 rounded-md border p-4">
            <div className="mb-2">
              <h4 className="text-sm font-medium">{setting.name}</h4>
              <p className="text-xs text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <Select 
              value={setting.value} 
              onValueChange={(value) => updateSetting(groupId, setting.id, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {setting.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      case 'input':
        return (
          <div key={setting.id} className="space-y-2 rounded-md border p-4">
            <div className="mb-2">
              <h4 className="text-sm font-medium">{setting.name}</h4>
              <p className="text-xs text-muted-foreground">
                {setting.description}
              </p>
            </div>
            <Input 
              value={setting.value} 
              onChange={(e) => updateSetting(groupId, setting.id, e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };
  
  const saveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your neural system settings have been updated.",
      });
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Access</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Maintenance</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{generalSettings.title}</CardTitle>
                <CardDescription>{generalSettings.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {generalSettings.settings.map((setting) => renderSetting('general', setting))}
              </CardContent>
            </Card>
            
            <Button 
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{securitySettings.title}</CardTitle>
                <CardDescription>{securitySettings.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securitySettings.settings.map((setting) => renderSetting('security', setting))}
              </CardContent>
            </Card>
            
            <Button 
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{notificationSettings.title}</CardTitle>
                <CardDescription>{notificationSettings.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationSettings.settings.map((setting) => renderSetting('notifications', setting))}
              </CardContent>
            </Card>
            
            <Button 
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{accessSettings.title}</CardTitle>
                <CardDescription>{accessSettings.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessSettings.settings.map((setting) => renderSetting('access', setting))}
              </CardContent>
            </Card>
            
            <Button 
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Access Settings
                </>
              )}
            </Button>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Maintenance</CardTitle>
                <CardDescription>Maintenance operations for your neural system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {maintenanceActions.map(action => {
                    const Icon = action.icon;
                    return (
                      <div key={action.id} className="rounded-md border p-4">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium">{action.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                        <Button 
                          variant={action.variant as any || "default"} 
                          className="w-full flex items-center gap-2" 
                          onClick={action.action}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{action.name}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
              <CardHeader>
                <CardTitle className="text-base text-amber-800 dark:text-amber-400 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Backups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  We recommend creating a system backup before making significant changes to your neural system configuration.
                </p>
                <Button 
                  variant="outline"
                  className="mt-4 border-amber-400 text-amber-700 hover:bg-amber-100/60 dark:text-amber-400 dark:border-amber-700 dark:hover:bg-amber-900/40 w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Create System Backup
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default NeuralSettingsPanel;
