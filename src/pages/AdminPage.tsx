
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';

const AdminPage = () => {
  return (
    <RoleBasedRoute allowedRoles={['admin']}>
      <MainLayout>
        <AdminDashboard />
      </MainLayout>
    </RoleBasedRoute>
  );
};

export default AdminPage;
