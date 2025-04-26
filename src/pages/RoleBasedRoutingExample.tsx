
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import AdminDashboard from '@/pages/AdminDashboard';
import { Button } from '@/components/ui/button';

const HomePage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Role-Based Routing Demo</h1>
    <div className="space-y-4">
      <p className="text-muted-foreground">
        This demo shows how to protect routes based on user roles.
      </p>
      
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/public">Public Page</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/moderator-only">Moderator Only</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/staff-area">Staff Area (Admin + Mod)</Link>
        </Button>
      </div>
    </div>
  </div>
);

const PublicPage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Public Page</h1>
    <p>This page is accessible to everyone.</p>
    <Button className="mt-4" asChild>
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

const ModeratorOnlyPage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Moderator Only</h1>
    <p>This page is only accessible to moderators.</p>
    <Button className="mt-4" asChild>
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

const StaffAreaPage = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">Staff Area</h1>
    <p>This page is accessible to both admins and moderators.</p>
    <Button className="mt-4" asChild>
      <Link to="/">Back to Home</Link>
    </Button>
  </div>
);

const RoleBasedRoutingExample = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Protected routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          } 
        />
        
        <Route 
          path="/moderator-only" 
          element={
            <RoleBasedRoute allowedRoles={['moderator']}>
              <ModeratorOnlyPage />
            </RoleBasedRoute>
          } 
        />
        
        <Route 
          path="/staff-area" 
          element={
            <RoleBasedRoute allowedRoles={['admin', 'moderator']}>
              <StaffAreaPage />
            </RoleBasedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoleBasedRoutingExample;
