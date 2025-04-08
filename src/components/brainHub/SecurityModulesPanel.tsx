import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface SecurityModule {
  id: string;
  name: string;
  status: 'active' | 'disabled' | 'warning' | 'breach';
  description: string;
  lastScan?: Date;
  threatLevel: number; // 0-100
  issuesDetected: number;
  issuesResolved: number;
}

const SecurityModulesPanel: React.FC = () => {
  const [modules, setModules] = useState<SecurityModule[]>([]);
  const [scanning, setScanning] = useState<string | null>(null);
  
  // Initialize security modules (this would come from a real service in production)
  useEffect(() => {
    const initialModules: SecurityModule[] = [
      {
        id: 'access-control',
        name: 'Access Control',
        status: 'active',
        description: 'Manages user permissions and access rights',
        lastScan: new Date(Date.now() - 3600000), // 1 hour ago
        threatLevel: 8,
        issuesDetected: 2,
        issuesResolved: 2
      },
      {
        id: 'data-encryption',
        name: 'Data Encryption',
        status: 'active',
        description: 'Ensures sensitive data is properly encrypted',
        lastScan: new Date(Date.now() - 7200000), // 2 hours ago
        threatLevel: 5,
        issuesDetected: 0,
        issuesResolved: 0
      },
      {
        id: 'threat-detection',
        name: 'Threat Detection',
        status: 'warning',
        description: 'Identifies potential security threats',
        lastScan: new Date(Date.now() - 86400000), // 1 day ago
        threatLevel: 35,
        issuesDetected: 3,
        issuesResolved: 1
      },
      {
        id: 'compliance',
        name: 'Compliance Monitor',
        status: 'active',
        description: 'Ensures compliance with regulations',
        lastScan: new Date(Date.now() - 14400000), // 4 hours ago
        threatLevel: 12,
        issuesDetected: 4,
        issuesResolved: 3
      },
      {
        id: 'user-verification',
        name: 'User Verification',
        status: 'active',
        description: 'Verifies user identities',
        lastScan: new Date(Date.now() - 21600000), // 6 hours ago
        threatLevel: 10,
        issuesDetected: 1,
        issuesResolved: 1
      },
    ];
    
    setModules(initialModules);
  }, []);
  
  // Handle security scan
  const handleScan = (moduleId: string) => {
    setScanning(moduleId);
    
    // Simulate scan - would be a real API call in production
    setTimeout(() => {
      setModules(prev => 
        prev.map(module => {
          if (module.id === moduleId) {
            // Update module with scan results
            const newThreatLevel = Math.floor(Math.random() * 20);
            const newIssues = Math.floor(Math.random() * 3);
            
            return {
              ...module,
              lastScan: new Date(),
              threatLevel: newThreatLevel,
              issuesDetected: module.issuesDetected + newIssues,
              // Mark as warning if new threats detected
              status: newIssues > 0 ? 'warning' : 'active'
            };
          }
          return module;
        })
      );
      
      setScanning(null);
      
      toast({
        title: "Security Scan Complete",
        description: "The security module has been scanned for threats.",
      });
    }, 2000);
  };
  
  // Resolve issues
  const handleResolveIssues = (moduleId: string) => {
    setScanning(moduleId);
    
    // Simulate resolution - would be a real API call in production
    setTimeout(() => {
      setModules(prev => 
        prev.map(module => {
          if (module.id === moduleId) {
            // Mark all issues as resolved
            return {
              ...module,
              issuesResolved: module.issuesDetected,
              status: 'active',
              threatLevel: Math.max(0, module.threatLevel - 15)
            };
          }
          return module;
        })
      );
      
      setScanning(null);
      
      toast({
        title: "Issues Resolved",
        description: "All security issues have been addressed.",
        variant: "success"
      });
    }, 1500);
  };
  
  // Get status icon for a module
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': 
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': 
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'breach': 
        return <XCircle className="h-4 w-4 text-red-500" />;
      default: 
        return <Shield className="h-4 w-4 text-slate-400" />;
    }
  };
  
  // Format date nicely
  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    
    // If within the last 24 hours, show as "X hours/minutes ago"
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    
    if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  };
  
  // Get threat level color
  const getThreatLevelColor = (level: number) => {
    if (level < 10) return 'bg-green-500';
    if (level < 30) return 'bg-yellow-500';
    if (level < 60) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Check if a module has unresolved issues
  const hasUnresolvedIssues = (module: SecurityModule) => {
    return module.issuesDetected > module.issuesResolved;
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Shield className="mr-2 h-5 w-5" /> 
          Security Modules
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0 pb-2">
        <ScrollArea className="h-[340px] px-4">
          <div className="space-y-4 py-2">
            {modules.map((module) => (
              <div 
                key={module.id}
                className="border border-border rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(module.status)}
                    <h3 className="font-medium">{module.name}</h3>
                  </div>
                  
                  <Badge variant={module.status === 'active' ? 'success' : (module.status === 'warning' ? 'secondary' : 'destructive')}>
                    {module.status === 'active' ? 'Secured' : 
                     module.status === 'warning' ? 'Warning' : 'Breach'}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                
                <div className="flex justify-between items-center text-xs mb-1">
                  <span>Threat Level: {module.threatLevel}%</span>
                  <span>Last scan: {formatDate(module.lastScan)}</span>
                </div>
                
                <Progress
                  value={module.threatLevel}
                  max={100}
                  className={`h-1.5 ${getThreatLevelColor(module.threatLevel)}`}
                />
                
                <div className="flex justify-between mt-3 items-center">
                  <div className="text-xs">
                    Issues: {module.issuesResolved}/{module.issuesDetected} resolved
                  </div>
                  
                  <div className="flex space-x-2">
                    {hasUnresolvedIssues(module) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleResolveIssues(module.id)}
                        disabled={scanning === module.id}
                      >
                        Resolve
                      </Button>
                    )}
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleScan(module.id)}
                      disabled={scanning === module.id}
                    >
                      {scanning === module.id ? 'Scanning...' : 'Scan'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default SecurityModulesPanel;
