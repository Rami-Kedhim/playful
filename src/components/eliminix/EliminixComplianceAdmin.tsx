
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, User, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { verifyEliminixCompliance, getEliminixStatus } from '@/services/eliminix/eliminixService';
import { UberPersona } from '@/types/uberPersona';

interface EliminixComplianceAdminProps {
  profiles?: UberPersona[];
}

const EliminixComplianceAdmin: React.FC<EliminixComplianceAdminProps> = ({ profiles = [] }) => {
  const [complianceStatus, setComplianceStatus] = useState<Record<string, boolean>>({});
  const [systemStatus, setSystemStatus] = useState(getEliminixStatus());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify compliance for all profiles
    if (profiles.length > 0) {
      const statusMap: Record<string, boolean> = {};
      
      profiles.forEach(profile => {
        statusMap[profile.id] = verifyEliminixCompliance(profile);
      });
      
      setComplianceStatus(statusMap);
      setLoading(false);
    }
  }, [profiles]);

  const refreshCompliance = () => {
    setLoading(true);
    setSystemStatus(getEliminixStatus());
    
    // Re-verify all profiles
    if (profiles.length > 0) {
      const statusMap: Record<string, boolean> = {};
      
      profiles.forEach(profile => {
        statusMap[profile.id] = verifyEliminixCompliance(profile);
      });
      
      setComplianceStatus(statusMap);
    }
    
    setLoading(false);
  };

  const nonCompliantCount = Object.values(complianceStatus).filter(status => !status).length;
  const complianceRate = profiles.length > 0 
    ? ((profiles.length - nonCompliantCount) / profiles.length) * 100 
    : 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Eliminix Compliance Dashboard
          </CardTitle>
          <CardDescription>
            Monitor and enforce the Eliminix Rule across all profiles in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{complianceRate.toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">Overall Compliance Rate</p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{nonCompliantCount}</div>
                <p className="text-sm text-muted-foreground">Non-Compliant Profiles</p>
              </CardContent>
            </Card>
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant={systemStatus.isCompliant ? "default" : "destructive"}>
                    {systemStatus.isCompliant ? "Active" : "Violated"}
                  </Badge>
                  <span className="text-sm">Rule v{systemStatus.ruleVersion}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last Verified: {new Date(systemStatus.lastVerified).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Profile Compliance Status</h3>
            <Button 
              onClick={refreshCompliance}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              Refresh Scan
            </Button>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No profiles to evaluate
                    </TableCell>
                  </TableRow>
                ) : (
                  profiles.map(profile => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {profile.displayName}
                        </div>
                      </TableCell>
                      <TableCell>
                        {profile.roleFlags.isAI ? (
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-500">AI</Badge>
                        ) : profile.roleFlags.isVerified ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">Verified</Badge>
                        ) : (
                          <Badge variant="outline">Standard</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {loading ? (
                          <span className="flex items-center">
                            <span className="animate-pulse">Checking...</span>
                          </span>
                        ) : complianceStatus[profile.id] ? (
                          <span className="flex items-center text-green-500 gap-1">
                            <CheckCircle className="h-4 w-4" />
                            Compliant
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500 gap-1">
                            <XCircle className="h-4 w-4" />
                            Non-Compliant
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {!complianceStatus[profile.id] && (
                          <Button size="sm" variant="destructive">Flag Account</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 border rounded-md bg-amber-50 dark:bg-amber-950/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">Eliminix Rule Enforcement</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  The Eliminix Rule prohibits any artificial entities simulating emotional or 
                  sexual companionship. Enforcement Level: {systemStatus.enforcementLevel}.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EliminixComplianceAdmin;
