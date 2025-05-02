
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, FileText, MessageSquare, Shield, Layers, Database, Rocket, Server, Globe } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <MainLayout title="Admin Dashboard" description="Manage your UberPersona platform">
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard 
              title="User Management"
              description="Manage users, roles and permissions"
              icon={<Users className="h-5 w-5" />}
              links={[
                { label: "All Users", href: "/admin/users" },
                { label: "Verification Requests", href: "/admin/verification" },
                { label: "User Roles", href: "/admin/roles" }
              ]}
            />
            
            <DashboardCard 
              title="Content Moderation"
              description="Review and moderate platform content"
              icon={<FileText className="h-5 w-5" />}
              links={[
                { label: "Reported Content", href: "/admin/moderation" },
                { label: "Content Approval", href: "/admin/content/approval" },
                { label: "Content Settings", href: "/admin/content/settings" }
              ]}
            />
            
            <DashboardCard 
              title="API Configuration"
              description="Configure external API integrations"
              icon={<Layers className="h-5 w-5" />}
              links={[
                { label: "API Settings", href: "/admin/apis" },
                { label: "Neural Hub Configuration", href: "/admin/neural-hub" },
                { label: "Webhook Management", href: "/admin/webhooks" }
              ]}
              highlighted={true}
            />
            
            <DashboardCard 
              title="Communications"
              description="Manage messaging and notifications"
              icon={<MessageSquare className="h-5 w-5" />}
              links={[
                { label: "Message Templates", href: "/admin/messaging/templates" },
                { label: "Notification Settings", href: "/admin/notifications" },
                { label: "Email Configuration", href: "/admin/email" }
              ]}
            />
            
            <DashboardCard 
              title="Security"
              description="Platform security and monitoring"
              icon={<Shield className="h-5 w-5" />}
              links={[
                { label: "Security Logs", href: "/admin/security/logs" },
                { label: "Access Control", href: "/admin/security/access" },
                { label: "Security Settings", href: "/admin/security/settings" }
              ]}
            />
            
            <DashboardCard 
              title="System Settings"
              description="Configure and monitor core systems"
              icon={<Settings className="h-5 w-5" />}
              links={[
                { label: "General Settings", href: "/admin/settings" },
                { label: "UBX Economy", href: "/admin/ubx" },
                { label: "Brain Hub Monitor", href: "/admin/brain-hub" }
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard 
              title="User Accounts"
              description="Manage registered users"
              icon={<Users className="h-5 w-5" />}
              links={[
                { label: "All Users", href: "/admin/users" },
                { label: "Create User", href: "/admin/users/create" },
                { label: "Bulk Actions", href: "/admin/users/bulk" }
              ]}
            />
            
            <DashboardCard 
              title="Verification"
              description="Handle user verification requests"
              icon={<Shield className="h-5 w-5" />}
              links={[
                { label: "Pending Requests", href: "/admin/verification" },
                { label: "Verification Settings", href: "/admin/verification/settings" },
                { label: "Verification History", href: "/admin/verification/history" }
              ]}
            />
            
            <DashboardCard 
              title="Roles & Permissions"
              description="Manage user roles and access rights"
              icon={<Users className="h-5 w-5" />}
              links={[
                { label: "All Roles", href: "/admin/roles" },
                { label: "Create Role", href: "/admin/roles/create" },
                { label: "Role Assignments", href: "/admin/roles/assignments" }
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard 
              title="Content Moderation"
              description="Review reported and flagged content"
              icon={<FileText className="h-5 w-5" />}
              links={[
                { label: "Moderation Queue", href: "/admin/moderation" },
                { label: "Automation Rules", href: "/admin/moderation/rules" },
                { label: "Moderation History", href: "/admin/moderation/history" }
              ]}
            />
            
            <DashboardCard 
              title="Content Management"
              description="Manage platform content"
              icon={<Database className="h-5 w-5" />}
              links={[
                { label: "All Content", href: "/admin/content" },
                { label: "Categories", href: "/admin/content/categories" },
                { label: "Featured Content", href: "/admin/content/featured" }
              ]}
            />
            
            <DashboardCard 
              title="Monetization"
              description="Content monetization settings"
              icon={<Globe className="h-5 w-5" />}
              links={[
                { label: "Pricing Rules", href: "/admin/monetization/pricing" },
                { label: "Payment Settings", href: "/admin/monetization/payments" },
                { label: "Revenue Reports", href: "/admin/monetization/reports" }
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard 
              title="API Management"
              description="Configure and monitor external APIs"
              icon={<Server className="h-5 w-5" />}
              links={[
                { label: "API Configuration", href: "/admin/apis" },
                { label: "API Usage & Limits", href: "/admin/apis/usage" },
                { label: "API Documentation", href: "/admin/apis/docs" }
              ]}
              highlighted={true}
            />
            
            <DashboardCard 
              title="Neural Systems"
              description="Configure Brain Hub and AI services"
              icon={<Rocket className="h-5 w-5" />}
              links={[
                { label: "Brain Hub Dashboard", href: "/admin/brain-hub" },
                { label: "Model Training", href: "/admin/brain-hub/training" },
                { label: "Neural Metrics", href: "/admin/brain-hub/metrics" }
              ]}
            />
            
            <DashboardCard 
              title="System Health"
              description="Monitor system health and performance"
              icon={<Settings className="h-5 w-5" />}
              links={[
                { label: "System Status", href: "/admin/system/status" },
                { label: "Logs", href: "/admin/system/logs" },
                { label: "Performance", href: "/admin/system/performance" }
              ]}
            />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: Array<{ label: string; href: string }>;
  highlighted?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon, 
  links,
  highlighted = false
}) => {
  return (
    <Card className={`${
      highlighted ? 'border-primary/50 bg-primary/5' : ''
    }`}>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-md ${
            highlighted ? 'bg-primary/20' : 'bg-muted'
          }`}>
            {icon}
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.href} 
                className="text-sm hover:underline text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={links[0].href}>
            Go to {title}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPage;
