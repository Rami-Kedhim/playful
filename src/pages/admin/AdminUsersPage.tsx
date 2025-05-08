
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminUsersPage = () => {
  // Sample user data
  const users = [
    { 
      id: '1', 
      username: 'john_doe', 
      email: 'john@example.com', 
      role: 'client', 
      status: 'active',
      created: '2025-01-15'
    },
    { 
      id: '2', 
      username: 'sofia_v', 
      email: 'sofia@example.com', 
      role: 'escort', 
      status: 'active',
      created: '2025-02-20'
    },
    { 
      id: '3', 
      username: 'ava_m', 
      email: 'ava@example.com', 
      role: 'escort', 
      status: 'suspended',
      created: '2025-03-10'
    },
    { 
      id: '4', 
      username: 'emma_creator', 
      email: 'emma@example.com', 
      role: 'creator', 
      status: 'active',
      created: '2025-04-05'
    }
  ];

  return (
    <UnifiedLayout
      title="User Management"
      description="Manage users in the UberEscorts ecosystem"
      showBreadcrumbs
    >
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>
          
          <Button>Add User</Button>
        </div>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'default' : 
                          user.role === 'escort' ? 'outline' : 
                          'secondary'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.status === 'active' ? 'default' : 
                          'destructive'
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.created}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          {user.status === 'active' ? (
                            <Button variant="outline" size="sm" className="text-red-500">Suspend</Button>
                          ) : (
                            <Button variant="outline" size="sm" className="text-green-500">Activate</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients">
          <Card>
            <CardContent className="pt-6">
              <p>Client user accounts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="escorts">
          <Card>
            <CardContent className="pt-6">
              <p>Escort user accounts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="creators">
          <Card>
            <CardContent className="pt-6">
              <p>Creator user accounts will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </UnifiedLayout>
  );
};

export default AdminUsersPage;
