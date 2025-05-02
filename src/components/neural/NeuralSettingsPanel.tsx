
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
  Shield,
  Cpu,
  Database,
  Settings,
  Network,
  Bell,
  User,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NeuralSettingsPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Neural System Settings</CardTitle>
              <CardDescription>Configure system parameters and preferences</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Defaults
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <div className="border-b mb-4">
              <TabsList className="w-full justify-start bg-transparent border-b-0 mb-[-1px] gap-4">
                <TabsTrigger 
                  value="general" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Cpu className="h-4 w-4 mr-1" />
                  Performance
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Bell className="h-4 w-4 mr-1" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced" 
                  className="border-b-2 rounded-none border-transparent data-[state=active]:border-primary"
                >
                  <Network className="h-4 w-4 mr-1" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system_name">System Name</Label>
                    <Input 
                      id="system_name" 
                      defaultValue="Neural Processing Hub" 
                      placeholder="Enter system name" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time_zone">Time Zone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger id="time_zone">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                        <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                        <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                        <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interface_theme">Interface Theme</Label>
                    <Select defaultValue="system">
                      <SelectTrigger id="interface_theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System Default</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en-US">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date_format">Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger id="date_format">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto_refresh">Auto-refresh Dashboard</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically refresh dashboard metrics
                      </p>
                    </div>
                    <Switch id="auto_refresh" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">System Access</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable API Access</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow external systems to access neural API endpoints
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Guest Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow limited access to dashboards for guest users
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable extended logging and debugging tools
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Resource Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>CPU Allocation</Label>
                        <span className="text-sm">75%</span>
                      </div>
                      <Slider defaultValue={[75]} max={100} step={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Memory Allocation</Label>
                        <span className="text-sm">60%</span>
                      </div>
                      <Slider defaultValue={[60]} max={100} step={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Storage Allocation</Label>
                        <span className="text-sm">40%</span>
                      </div>
                      <Slider defaultValue={[40]} max={100} step={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Network Bandwidth</Label>
                        <span className="text-sm">50%</span>
                      </div>
                      <Slider defaultValue={[50]} max={100} step={5} />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Processing Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="processing_mode">Processing Mode</Label>
                      <Select defaultValue="balanced">
                        <SelectTrigger id="processing_mode">
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="efficiency">Efficiency</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="processing_priority">Process Priority</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger id="processing_priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="thread_count">Thread Count</Label>
                      <Input 
                        id="thread_count"
                        type="number"
                        defaultValue="8"
                        min="1"
                        max="32"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-scaling</Label>
                        <p className="text-xs text-muted-foreground">
                          Dynamically adjust resources based on load
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Optimization Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Memory Caching</Label>
                        <p className="text-xs text-muted-foreground">
                          Cache results in memory for faster retrieval
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Response Compression</Label>
                        <p className="text-xs text-muted-foreground">
                          Compress responses to reduce bandwidth
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parallel Processing</Label>
                        <p className="text-xs text-muted-foreground">
                          Process multiple requests simultaneously
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Query Batching</Label>
                        <p className="text-xs text-muted-foreground">
                          Batch similar queries for efficient processing
                        </p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Predictive Loading</Label>
                        <p className="text-xs text-muted-foreground">
                          Preload data based on usage patterns
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Resource Throttling</Label>
                        <p className="text-xs text-muted-foreground">
                          Limit resource usage during peak times
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Access Control</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="auth_method">Authentication Method</Label>
                      <Select defaultValue="oauth2">
                        <SelectTrigger id="auth_method">
                          <SelectValue placeholder="Select authentication method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic Authentication</SelectItem>
                          <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                          <SelectItem value="jwt">JWT</SelectItem>
                          <SelectItem value="api_key">API Key</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="session_timeout">Session Timeout (minutes)</Label>
                      <Input 
                        id="session_timeout"
                        type="number"
                        defaultValue="30"
                        min="5"
                        max="120"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">
                          Require 2FA for admin access
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP Restrictions</Label>
                        <p className="text-xs text-muted-foreground">
                          Limit access to specific IP addresses
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Data Protection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="encryption_level">Encryption Level</Label>
                      <Select defaultValue="aes256">
                        <SelectTrigger id="encryption_level">
                          <SelectValue placeholder="Select encryption level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (AES-128)</SelectItem>
                          <SelectItem value="aes256">High (AES-256)</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Data Encryption at Rest</Label>
                        <p className="text-xs text-muted-foreground">
                          Encrypt stored neural data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Secure API Connections</Label>
                        <p className="text-xs text-muted-foreground">
                          Enforce HTTPS for all API connections
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Anonymize Usage Data</Label>
                        <p className="text-xs text-muted-foreground">
                          Remove identifying information from logs
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Security Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="security_scan_frequency">Security Scan Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="security_scan_frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between h-full">
                      <div className="space-y-0.5">
                        <Label>Real-time Threat Detection</Label>
                        <p className="text-xs text-muted-foreground">
                          Monitor and alert on suspicious activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Login Attempt Monitoring</Label>
                        <p className="text-xs text-muted-foreground">
                          Track and limit failed login attempts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Audit Logging</Label>
                        <p className="text-xs text-muted-foreground">
                          Keep detailed logs of system activities
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automated Security Updates</Label>
                        <p className="text-xs text-muted-foreground">
                          Apply security patches automatically
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Channels</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Send alerts and reports via email
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>In-app Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Show notifications within dashboard
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Send critical alerts via SMS
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Webhook Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Send events to external systems
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <Label htmlFor="email_recipients">Email Recipients</Label>
                        <Input 
                          id="email_recipients"
                          placeholder="admin@example.com, alerts@example.com"
                          defaultValue="admin@example.com"
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate multiple email addresses with commas
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Notification Events</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Errors</Label>
                          <p className="text-xs text-muted-foreground">
                            Critical system errors and failures
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Security Alerts</Label>
                          <p className="text-xs text-muted-foreground">
                            Potential security threats and breaches
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Performance Issues</Label>
                          <p className="text-xs text-muted-foreground">
                            System performance degradation
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Task Completion</Label>
                          <p className="text-xs text-muted-foreground">
                            Automated task completion status
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Updates</Label>
                          <p className="text-xs text-muted-foreground">
                            Available system updates and patches
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Usage Reports</Label>
                          <p className="text-xs text-muted-foreground">
                            Regular system usage reports
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Schedule</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="notification_quiet_hours">Quiet Hours</Label>
                        <Select defaultValue="none">
                          <SelectTrigger id="notification_quiet_hours">
                            <SelectValue placeholder="Select quiet hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No quiet hours</SelectItem>
                            <SelectItem value="night">Night (10 PM - 7 AM)</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notification_urgency">Minimum Alert Urgency</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="notification_urgency">
                            <SelectValue placeholder="Select minimum urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Smart Notification Batching</Label>
                        <p className="text-xs text-muted-foreground">
                          Group similar notifications to reduce alert fatigue
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">System Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="api_endpoint">API Endpoint</Label>
                        <Input 
                          id="api_endpoint"
                          defaultValue="https://api.neural-system.example.com/v1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="api_version">API Version</Label>
                        <Select defaultValue="v1">
                          <SelectTrigger id="api_version">
                            <SelectValue placeholder="Select API version" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v1">v1 (Stable)</SelectItem>
                            <SelectItem value="v2">v2 (Beta)</SelectItem>
                            <SelectItem value="v3">v3 (Alpha)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable API Documentation</Label>
                          <p className="text-xs text-muted-foreground">
                            Generate and serve interactive API docs
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook_url">Webhook URL</Label>
                        <Input 
                          id="webhook_url"
                          placeholder="https://your-service.example.com/webhook"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="webhook_secret">Webhook Secret</Label>
                        <Input 
                          id="webhook_secret"
                          type="password"
                          placeholder="•••••••••••••••••"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Webhook Verification</Label>
                          <p className="text-xs text-muted-foreground">
                            Verify webhook source with signature
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">External Services Integration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Data Analytics Platform</Label>
                          <p className="text-xs text-muted-foreground">
                            Connect to external analytics tools
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Monitoring Service</Label>
                          <p className="text-xs text-muted-foreground">
                            Connect to external monitoring tools
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cloud Storage</Label>
                          <p className="text-xs text-muted-foreground">
                            Enable cloud storage integration
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Authentication Service</Label>
                          <p className="text-xs text-muted-foreground">
                            Use external authentication provider
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="data_retention">Data Retention Period (days)</Label>
                        <Input 
                          id="data_retention"
                          type="number"
                          defaultValue="90"
                          min="1"
                          max="365"
                        />
                        <p className="text-xs text-muted-foreground">
                          How long to keep historical data
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="backup_frequency">Backup Frequency</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger id="backup_frequency">
                            <SelectValue placeholder="Select backup frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto Cleanup</Label>
                          <p className="text-xs text-muted-foreground">
                            Automatically purge old data
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="log_level">Log Level</Label>
                        <Select defaultValue="info">
                          <SelectTrigger id="log_level">
                            <SelectValue placeholder="Select log level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="debug">Debug (Verbose)</SelectItem>
                            <SelectItem value="info">Info (Standard)</SelectItem>
                            <SelectItem value="warn">Warning</SelectItem>
                            <SelectItem value="error">Error Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="log_retention">Log Retention (days)</Label>
                        <Input 
                          id="log_retention"
                          type="number"
                          defaultValue="30"
                          min="1"
                          max="365"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>External Logging</Label>
                          <p className="text-xs text-muted-foreground">
                            Send logs to external logging service
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-900/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reset System</h4>
                      <p className="text-xs text-muted-foreground">
                        Reset all system settings to default values
                      </p>
                    </div>
                    <Button variant="outline" size="sm">Reset</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Purge All Data</h4>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete all system data (cannot be undone)
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">Purge</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NeuralSettingsPanel;
