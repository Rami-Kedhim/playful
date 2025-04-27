
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { uberCoreInstance } from '@/core/UberCore';
import { ubxEthicsService } from '@/services/neural/modules/UbxEthicsService';
import { ubxBridgeService } from '@/services/neural/modules/UbxBridgeService';
import { Shield, Activity, Layers, Cpu, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [systemStatus, setSystemStatus] = useState(uberCoreInstance.getSystemStatus());
  const [subsystemHealth, setSubsystemHealth] = useState(uberCoreInstance.checkSubsystemHealth());
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">UberCore Administration</h1>
          <p className="text-muted-foreground">
            System management and operational controls
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          Role: Administrator
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="neural" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Neural
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard 
              title="Core Status" 
              status={systemStatus.coreStatus} 
              metric={`${systemStatus.systemLoad}%`}
              metricLabel="System Load"
            />
            <StatusCard 
              title="Hermes Status" 
              status={systemStatus.hermesStatus} 
              metric={`${systemStatus.boostPower}`}
              metricLabel="Boost Power"
            />
            <StatusCard 
              title="Oxum Status" 
              status={systemStatus.oxumStatus} 
              metric={systemStatus.activePersonas}
              metricLabel="Active Personas"
            />
            <StatusCard 
              title="Wallet Status" 
              status={systemStatus.walletStatus} 
              metric={systemStatus.activeUsers}
              metricLabel="Active Users"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Subsystem Health</CardTitle>
              <CardDescription>Current operational status of UberCore subsystems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SubsystemHealth title="Hermes" data={subsystemHealth.hermes} />
                <SubsystemHealth title="Oxum" data={subsystemHealth.oxum} />
                <SubsystemHealth title="Orus" data={subsystemHealth.orus} />
                <SubsystemHealth title="Wallet" data={subsystemHealth.wallet} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Ethics & Compliance</CardTitle>
              <CardDescription>UBX Ethics Service metrics and compliance information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricsCard 
                    title="Ethics Service" 
                    value={ubxEthicsService.getMetrics().enabled ? "Enabled" : "Disabled"} 
                    label="Status" 
                  />
                  <MetricsCard 
                    title="Evaluations" 
                    value={ubxEthicsService.getMetrics().evaluations} 
                    label="Total" 
                  />
                  <MetricsCard 
                    title="Approval Rate" 
                    value={`${(ubxEthicsService.getMetrics().approvalRate * 100).toFixed(1)}%`} 
                    label="Content" 
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Ethical Guidelines</h3>
                  <div className="space-y-2">
                    {Object.entries(ubxEthicsService.getEthicalGuidelines()).map(([category, rules]: [string, any]) => (
                      <div key={category} className="p-3 bg-secondary/50 rounded-lg">
                        <h4 className="font-medium capitalize mb-1">{category}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Prohibited:</p>
                            <ul className="list-disc list-inside text-sm">
                              {rules.prohibited.map((rule: string) => (
                                <li key={rule} className="capitalize">{rule.replace('_', ' ')}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Restricted:</p>
                            <ul className="list-disc list-inside text-sm">
                              {rules.restricted.map((rule: string) => (
                                <li key={rule} className="capitalize">{rule.replace('_', ' ')}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="neural">
          <Card>
            <CardHeader>
              <CardTitle>Neural Network Bridge</CardTitle>
              <CardDescription>UBX Bridge Service event statistics and module status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricsCard 
                    title="Event Statistics" 
                    value={Object.keys(ubxBridgeService.getEventStats()).length} 
                    label="Event Types" 
                  />
                  <MetricsCard 
                    title="Priority Levels" 
                    value={ubxBridgeService.getConfig().priorityLevels.length} 
                    label="Levels" 
                  />
                  <MetricsCard 
                    title="Active Modules" 
                    value={ubxBridgeService.getActiveModules().length} 
                    label="Modules" 
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Active Neural Modules</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {ubxBridgeService.getActiveModules().map((module) => (
                      <div key={module} className="p-3 bg-secondary/50 rounded-lg flex items-center">
                        <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium capitalize">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Recent Event Statistics</h3>
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left">Event Type</th>
                          <th className="px-4 py-3 text-left">Count</th>
                          <th className="px-4 py-3 text-left">Last Fired</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(ubxBridgeService.getEventStats()).map(([eventType, stats]) => (
                          <tr key={eventType} className="border-t">
                            <td className="px-4 py-3">{eventType}</td>
                            <td className="px-4 py-3">{stats.count}</td>
                            <td className="px-4 py-3">{stats.lastFired.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Escorts Neural Service</CardTitle>
                <CardDescription>Profile enhancement and matching algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <ServiceCapabilities 
                    serviceId="escorts"
                    capabilities={[
                      'profile-enhancement',
                      'matching-algorithm',
                      'relevance-scoring',
                      'safety-verification',
                      'preference-learning'
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Oxum Learning Service</CardTitle>
                <CardDescription>Advanced pattern learning and adaptation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <ServiceCapabilities 
                    serviceId="oxum-learning"
                    capabilities={[
                      'linguistic',
                      'behavioral',
                      'contextual'
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>UberCore Settings</CardTitle>
              <CardDescription>Core system configuration parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(uberCoreInstance.getSettings()).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-muted-foreground">
                        {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Supporting components

const StatusCard = ({ title, status, metric, metricLabel }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'operational':
      case 'online':
      case 'synced':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{title}</CardTitle>
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${getStatusColor(status)} mr-2`}></div>
            <span className="text-xs font-medium capitalize">{status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        <p className="text-xs text-muted-foreground">{metricLabel}</p>
      </CardContent>
    </Card>
  );
};

const SubsystemHealth = ({ title, data }) => {
  return (
    <div className="p-3 bg-secondary/50 rounded-lg">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <span className="capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricsCard = ({ title, value, label }) => {
  return (
    <div className="p-3 bg-secondary/50 rounded-lg">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
};

const ServiceCapabilities = ({ serviceId, capabilities }) => {
  return (
    <div className="space-y-2">
      {capabilities.map((capability) => (
        <div key={capability} className="flex items-center p-2 bg-secondary/30 rounded-lg">
          <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
          <span className="text-sm capitalize">{capability.replace(/-/g, ' ')}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
