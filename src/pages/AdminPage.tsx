
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPage: React.FC = () => {
  return (
    <MainLayout
      title="Admin Dashboard"
      description="System administration and monitoring"
      requireAuth={true}
    >
      <AdminDashboard />
    </MainLayout>
  );
};

export default AdminPage;
