
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useRole } from '@/hooks/auth/useRole';

const ModerationDashboard = () => {
  const { isAdmin } = useRole();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Content Moderation</h1>
          <p className="text-muted-foreground">
            Review and manage platform content
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {isAdmin ? 'Admin Privileges' : 'Moderator Access'}
        </div>
      </div>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Pending Review
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Rejected
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            User Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Moderation</CardTitle>
              <CardDescription>Content awaiting moderator review</CardDescription>
            </CardHeader>
            <CardContent>
              <ModerationTable 
                items={[
                  { id: 'p1', type: 'profile', title: 'New Escort Profile', submittedBy: 'user123', date: '2023-04-26' },
                  { id: 'p2', type: 'image', title: 'Profile Photo Update', submittedBy: 'escort456', date: '2023-04-26' },
                  { id: 'p3', type: 'bio', title: 'Service Description', submittedBy: 'escort789', date: '2023-04-25' },
                  { id: 'p4', type: 'comment', title: 'Review Response', submittedBy: 'client555', date: '2023-04-25' },
                  { id: 'p5', type: 'profile', title: 'New Creator Profile', submittedBy: 'creator101', date: '2023-04-24' },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Recently Approved</CardTitle>
              <CardDescription>Content that has passed moderation</CardDescription>
            </CardHeader>
            <CardContent>
              <ModerationTable 
                items={[
                  { id: 'a1', type: 'profile', title: 'Escort Profile Update', submittedBy: 'escort123', date: '2023-04-26', moderator: 'mod1' },
                  { id: 'a2', type: 'image', title: 'Verified Photo', submittedBy: 'escort456', date: '2023-04-26', moderator: 'mod2' },
                  { id: 'a3', type: 'bio', title: 'Updated Services', submittedBy: 'escort789', date: '2023-04-25', moderator: 'mod1' },
                ]}
                showModerator
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Recently Rejected</CardTitle>
              <CardDescription>Content that failed to meet guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <ModerationTable 
                items={[
                  { id: 'r1', type: 'image', title: 'Prohibited Content', submittedBy: 'user444', date: '2023-04-26', moderator: 'mod3', reason: 'Explicit content violation' },
                  { id: 'r2', type: 'comment', title: 'Inappropriate Language', submittedBy: 'client222', date: '2023-04-25', moderator: 'mod1', reason: 'Harassment' },
                  { id: 'r3', type: 'profile', title: 'Misrepresentation', submittedBy: 'escort333', date: '2023-04-24', moderator: 'mod2', reason: 'False information' },
                ]}
                showModerator
                showReason
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
              <CardDescription>Content reported by users</CardDescription>
            </CardHeader>
            <CardContent>
              <ModerationTable 
                items={[
                  { id: 'u1', type: 'profile', title: 'Fake Profile', submittedBy: 'client111', date: '2023-04-26', reportCount: 3 },
                  { id: 'u2', type: 'message', title: 'Harassment', submittedBy: 'client222', date: '2023-04-26', reportCount: 2 },
                  { id: 'u3', type: 'comment', title: 'Inappropriate Content', submittedBy: 'user333', date: '2023-04-25', reportCount: 5 },
                  { id: 'u4', type: 'image', title: 'Stolen Image', submittedBy: 'escort444', date: '2023-04-25', reportCount: 1 },
                ]}
                showReports
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Supporting component for moderation tables
const ModerationTable = ({ 
  items, 
  showModerator = false, 
  showReason = false, 
  showReports = false 
}) => {
  return (
    <div className="relative overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Submitted By</th>
            <th className="px-4 py-3 text-left">Date</th>
            {showModerator && <th className="px-4 py-3 text-left">Moderator</th>}
            {showReason && <th className="px-4 py-3 text-left">Reason</th>}
            {showReports && <th className="px-4 py-3 text-left">Reports</th>}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-3">
                <ContentTypeTag type={item.type} />
              </td>
              <td className="px-4 py-3 font-medium">{item.title}</td>
              <td className="px-4 py-3">{item.submittedBy}</td>
              <td className="px-4 py-3">{item.date}</td>
              {showModerator && <td className="px-4 py-3">{item.moderator}</td>}
              {showReason && <td className="px-4 py-3">{item.reason}</td>}
              {showReports && (
                <td className="px-4 py-3">
                  <span className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-xs font-medium">
                    {item.reportCount} reports
                  </span>
                </td>
              )}
              <td className="px-4 py-3 text-right">
                <button className="text-primary hover:text-primary/80 inline-flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ContentTypeTag = ({ type }) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'profile':
        return 'bg-blue-500/10 text-blue-500';
      case 'image':
        return 'bg-purple-500/10 text-purple-500';
      case 'bio':
        return 'bg-green-500/10 text-green-500';
      case 'comment':
        return 'bg-orange-500/10 text-orange-500';
      case 'message':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeStyles()}`}>
      {type}
    </span>
  );
};

export default ModerationDashboard;
