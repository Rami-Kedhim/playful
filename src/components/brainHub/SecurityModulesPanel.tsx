import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { 
  Shield, AlertTriangle, AlertCircle, CheckCircle, 
  Lock, Eye, FileText, Filter, Settings 
} from 'lucide-react';
import securityEngine, { SecurityRule, SecurityAlert, ContentFilter } from '@/services/neural/BrainHubSecurityEngine';

const SecurityModulesPanel: React.FC = () => {
  const [securityRules, setSecurityRules] = useState<SecurityRule[]>([]);
  const [contentFilters, setContentFilters] = useState<ContentFilter[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<SecurityAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [auditScore, setAuditScore] = useState<number | null>(null);
  const [auditFindings, setAuditFindings] = useState<any[]>([]);
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  
  useEffect(() => {
    setSecurityRules(securityEngine.getSecurityRules());
    setContentFilters(securityEngine.getContentFilters());
    setRecentAlerts(securityEngine.getRecentAlerts());
    setIsMonitoring(securityEngine.getMonitoringStatus());
    
    const interval = setInterval(() => {
      setSecurityRules(securityEngine.getSecurityRules());
      setRecentAlerts(securityEngine.getRecentAlerts());
      setIsMonitoring(securityEngine.getMonitoringStatus());
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleMonitoring = () => {
    if (isMonitoring) {
      securityEngine.stopMonitoring();
    } else {
      securityEngine.startMonitoring();
    }
    setIsMonitoring(securityEngine.getMonitoringStatus());
  };
  
  const toggleSecurityRule = (ruleId: string, isActive: boolean) => {
    securityEngine.updateSecurityRule(ruleId, { isActive });
    setSecurityRules(securityEngine.getSecurityRules());
    
    toast({
      title: isActive ? "Security Rule Enabled" : "Security Rule Disabled",
      description: `The security rule has been ${isActive ? 'enabled' : 'disabled'}`,
    });
  };
  
  const toggleContentFilter = (filterId: string, isActive: boolean) => {
    securityEngine.updateContentFilter(filterId, { isActive });
    setContentFilters(securityEngine.getContentFilters());
    
    toast({
      title: isActive ? "Content Filter Enabled" : "Content Filter Disabled",
      description: `The content filter has been ${isActive ? 'enabled' : 'disabled'}`,
    });
  };
  
  const resolveAlert = (alertId: string) => {
    securityEngine.resolveAlert(alertId, "admin");
    setRecentAlerts(securityEngine.getRecentAlerts());
    
    toast({
      title: "Alert Resolved",
      description: "The security alert has been marked as resolved",
    });
  };
  
  const runSecurityAudit = async () => {
    setIsRunningAudit(true);
    
    try {
      const result = await securityEngine.runSecurityAudit();
      setAuditScore(result.score);
      setAuditFindings(result.findings);
      
      toast({
        title: "Security Audit Completed",
        description: `Your security score: ${result.score}/100`,
      });
    } catch (error) {
      console.error("Error running security audit:", error);
      toast({
        title: "Audit Failed",
        description: "There was an error running the security audit",
        variant: "destructive"
      });
    } finally {
      setIsRunningAudit(false);
    }
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Critical</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100">Info</Badge>;
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'access':
        return <Lock className="h-4 w-4" />;
      case 'content':
        return <FileText className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      case 'compliance':
        return <Shield className="h-4 w-4" />;
      case 'financial':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Security & Governance</CardTitle>
              <CardDescription>Monitor and control Brain Hub security settings</CardDescription>
            </div>
            <Switch 
              checked={isMonitoring} 
              onCheckedChange={toggleMonitoring}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">
                <Shield className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="rules">
                <Lock className="h-4 w-4 mr-2" />
                Security Rules
              </TabsTrigger>
              <TabsTrigger value="filters">
                <Filter className="h-4 w-4 mr-2" />
                Content Filters
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Alerts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Security Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {isMonitoring ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-amber-600">Paused</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {isMonitoring ? 
                        "Monitoring and protecting your system" : 
                        "Security monitoring is currently disabled"
                      }
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {securityRules.filter(r => r.isActive).length}/{securityRules.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Security rules currently enabled
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Unresolved Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {recentAlerts.filter(a => !a.resolved).length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Alerts requiring attention
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Latest Security Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {auditScore !== null ? (
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="w-24 h-24 rounded-full bg-gray-100 relative">
                              <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle 
                                  cx="50" cy="50" r="40" 
                                  fill="none" 
                                  stroke="#e2e8f0" 
                                  strokeWidth="10"
                                />
                                <circle
                                  cx="50" cy="50" r="40"
                                  fill="none"
                                  stroke={
                                    auditScore >= 90 ? '#10b981' :
                                    auditScore >= 70 ? '#60a5fa' :
                                    auditScore >= 50 ? '#f59e0b' :
                                    '#ef4444'
                                  }
                                  strokeWidth="10"
                                  strokeDasharray={`${auditScore * 2.51} 251`}
                                  strokeDashoffset="0"
                                  transform="rotate(-90 50 50)"
                                />
                                <text
                                  x="50" y="55"
                                  textAnchor="middle"
                                  fontSize="22"
                                  fontWeight="bold"
                                  fill="currentColor"
                                >
                                  {auditScore}
                                </text>
                              </svg>
                            </div>
                            <div className="ml-6">
                              <h3 className="text-lg font-medium">Security Score</h3>
                              <p className="text-sm text-muted-foreground">
                                {auditScore >= 90 ? 'Excellent. Your system is well-protected.' :
                                 auditScore >= 70 ? 'Good. Some minor improvements suggested.' :
                                 auditScore >= 50 ? 'Fair. Several security issues need attention.' :
                                 'Poor. Critical security issues require immediate action.'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-medium">Key Findings</h3>
                            {auditFindings.length > 0 ? (
                              <div className="space-y-2">
                                {auditFindings.map((finding, index) => (
                                  <Alert key={index} className={
                                    finding.severity === 'critical' ? 'border-red-200 bg-red-50' :
                                    finding.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                                    finding.severity === 'medium' ? 'border-amber-200 bg-amber-50' :
                                    'border-blue-200 bg-blue-50'
                                  }>
                                    <div className="flex items-center">
                                      {finding.severity === 'critical' ? <AlertCircle className="h-4 w-4 text-red-600 mr-2" /> :
                                       finding.severity === 'high' ? <AlertTriangle className="h-4 w-4 text-orange-600 mr-2" /> :
                                       finding.severity === 'medium' ? <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" /> :
                                       <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />}
                                      <AlertTitle>{finding.message}</AlertTitle>
                                    </div>
                                  </Alert>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No issues found during the audit.</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground mb-4">No security audit has been run yet.</p>
                          <Button 
                            onClick={runSecurityAudit} 
                            disabled={isRunningAudit}
                            className="flex items-center"
                          >
                            {isRunningAudit ? (
                              <>
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                Running Audit...
                              </>
                            ) : (
                              <>
                                <Shield className="h-4 w-4 mr-2" />
                                Run Security Audit
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    {auditScore !== null && (
                      <CardFooter className="border-t pt-4">
                        <Button 
                          variant="outline" 
                          onClick={runSecurityAudit} 
                          disabled={isRunningAudit}
                          className="flex items-center"
                        >
                          {isRunningAudit ? (
                            <>
                              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                              Updating...
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4 mr-2" />
                              Run New Audit
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.slice(0, 3).map((alert, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          {alert.severity === 'critical' ? <AlertCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" /> :
                          alert.severity === 'high' ? <AlertTriangle className="h-4 w-4 text-orange-600 mt-1 flex-shrink-0" /> :
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-1 flex-shrink-0" />}
                          <div>
                            <div className="text-sm font-medium">
                              {alert.resolved ? (
                                <span className="line-through">{alert.message}</span>
                              ) : (
                                alert.message
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {recentAlerts.length === 0 && (
                        <div className="text-sm text-muted-foreground">
                          No alerts have been triggered recently.
                        </div>
                      )}
                    </div>
                    
                    {recentAlerts.length > 3 && (
                      <Button 
                        variant="link" 
                        onClick={() => setActiveTab('alerts')} 
                        className="mt-4 px-0"
                      >
                        View all alerts
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle>Security Rules</CardTitle>
                  <CardDescription>Configure rules that protect your system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rule</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityRules.map((rule) => (
                        <TableRow key={rule.id}>
                          <TableCell className="font-medium">
                            <div>{rule.name}</div>
                            <div className="text-xs text-muted-foreground">{rule.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getCategoryIcon(rule.category)}
                              <span className="ml-2 capitalize">{rule.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getSeverityBadge(rule.severity)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {rule.isActive ? (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Active
                                </div>
                              ) : (
                                <div className="text-gray-400">Disabled</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={rule.isActive}
                              onCheckedChange={(checked) => toggleSecurityRule(rule.id, checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="filters">
              <Card>
                <CardHeader>
                  <CardTitle>Content Filters</CardTitle>
                  <CardDescription>Configure filters that regulate content</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentFilters.map((filter) => (
                        <TableRow key={filter.id}>
                          <TableCell className="font-medium">
                            <div>{filter.description}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                              Pattern: {filter.pattern}
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">{filter.type}</TableCell>
                          <TableCell className="capitalize">{filter.category}</TableCell>
                          <TableCell className="capitalize">
                            <Badge
                              variant="outline"
                              className={
                                filter.action === 'block' ? 'bg-red-100 text-red-800' :
                                filter.action === 'flag' ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }
                            >
                              {filter.action}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={filter.isActive}
                              onCheckedChange={(checked) => toggleContentFilter(filter.id, checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>View and manage system security alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {recentAlerts.map((alert) => (
                        <div 
                          key={alert.id} 
                          className={`border rounded-lg p-4 ${
                            alert.resolved ? 'bg-gray-50 border-gray-200' : 
                            alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                            alert.severity === 'high' ? 'bg-orange-50 border-orange-200' :
                            alert.severity === 'medium' ? 'bg-amber-50 border-amber-200' :
                            'bg-blue-50 border-blue-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                {alert.severity === 'critical' ? <AlertCircle className="h-5 w-5 text-red-600 mr-2" /> :
                                 alert.severity === 'high' ? <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" /> :
                                 alert.severity === 'medium' ? <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" /> :
                                 <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />}
                                <div className="font-medium">
                                  {alert.resolved ? (
                                    <span className="line-through">{alert.message}</span>
                                  ) : (
                                    alert.message
                                  )}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {new Date(alert.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {getSeverityBadge(alert.severity)}
                              {!alert.resolved && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => resolveAlert(alert.id)}
                                  className="ml-2"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {alert.data && (
                            <div className="mt-2 bg-white p-2 rounded border text-xs font-mono">
                              {JSON.stringify(alert.data, null, 2)}
                            </div>
                          )}
                          
                          {alert.resolved && (
                            <div className="flex items-center text-sm text-green-600 mt-2">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolved {alert.resolvedAt ? `on ${new Date(alert.resolvedAt).toLocaleString()}` : ''}
                              {alert.resolvedBy && ` by ${alert.resolvedBy}`}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No security alerts have been recorded.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="w-full flex justify-between">
            <Button 
              variant="outline"
              onClick={runSecurityAudit}
              disabled={isRunningAudit}
              className="flex items-center"
            >
              {isRunningAudit ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Running...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Run Security Audit
                </>
              )}
            </Button>
            
            <Button
              onClick={toggleMonitoring}
              variant={isMonitoring ? "destructive" : "default"}
            >
              {isMonitoring ? 'Disable Monitoring' : 'Enable Monitoring'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecurityModulesPanel;
