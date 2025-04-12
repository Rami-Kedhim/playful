
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { EliminixComplianceAdmin } from '@/components/eliminix';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, FileText, Settings } from 'lucide-react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';

const EliminixCompliancePage: React.FC = () => {
  const { state, loadEscorts } = useEscortContext();
  const [personas, setPersonas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        if (state.escorts.length === 0) {
          await loadEscorts(true);
        }
        
        // Map escorts to UberPersona format for consistent compliance checking
        const mappedPersonas = mapEscortsToUberPersonas(state.escorts);
        setPersonas(mappedPersonas);
      } catch (error) {
        console.error('Error loading profiles for Eliminix compliance check:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [loadEscorts, state.escorts.length]);

  return (
    <>
      <Helmet>
        <title>Eliminix Compliance Dashboard | UberEscorts Admin</title>
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Shield className="mr-2 h-7 w-7 text-primary" />
                Eliminix Compliance Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor and enforce the Eliminix Rule across the UberEscorts platform
              </p>
            </div>
          </div>
          
          <Alert className="mb-6 bg-primary/10 text-primary border-primary">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Eliminix Rule: Core Ethical Directive</AlertTitle>
            <AlertDescription>
              No artificial entities simulating emotional or sexual companionship are allowed within the platform.
              All profiles must represent genuine human beings without AI-generated emotional simulation.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profiles">Profiles</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Eliminix Rule Enforcement</CardTitle>
                  <CardDescription>
                    Current status and metrics for Eliminix compliance across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EliminixComplianceAdmin profiles={personas} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profiles">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Audit Log</CardTitle>
                  <CardDescription>
                    History of profile compliance checks and enforcement actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed profile audit functionality coming soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>
                    Download and generate compliance reports for regulatory purposes
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Reports Generated Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Reports functionality will allow you to generate compliance documentation
                      for regulatory purposes and internal audits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Eliminix Rule Settings</CardTitle>
                  <CardDescription>
                    Configure the behavior and enforcement level of the Eliminix Rule
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-12">
                  <div className="text-center">
                    <Settings className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Settings Configuration</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Settings functionality will allow administrators to configure 
                      enforcement levels and compliance parameters.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};

export default EliminixCompliancePage;
