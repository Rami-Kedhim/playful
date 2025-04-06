
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Users, 
  CreditCard, 
  Flag, 
  Settings, 
  ShieldAlert, 
  BarChart4,
  Search,
  Brain
} from "lucide-react";
import SEOModule from "@/components/admin/dashboard/SEOModule";
import HermesOxumControl from "@/components/admin/dashboard/HermesOxumControl";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline">Export Data</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-9 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="seo">
              <Search className="h-4 w-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="hermes">
              <Brain className="h-4 w-4 mr-2" />
              HERMES
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,840</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Activity log will be implemented soon.</p>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>All systems operational</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>API</span>
                      <span className="text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database</span>
                      <span className="text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Storage</span>
                      <span className="text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Authentication</span>
                      <span className="text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>HERMES-OXUM Engine</span>
                      <span className="text-green-500">Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>User management interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="creators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Creator Management</CardTitle>
                <CardDescription>Manage creator accounts and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Creator management interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="escorts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Escort Management</CardTitle>
                <CardDescription>Manage escort profiles and verifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Escort management interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Manage payments, transactions and payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Payment management interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>View and manage user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            <SEOModule />
          </TabsContent>
          
          <TabsContent value="hermes" className="space-y-4">
            <HermesOxumControl />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Admin settings interface will be implemented soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
