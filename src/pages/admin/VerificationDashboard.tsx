
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import VerificationReviewPanel from '@/components/verification/admin/VerificationReviewPanel';
import VerificationMetrics from '@/components/verification/admin/VerificationMetrics';
import RoleGuard from '@/components/auth/RoleGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useVerificationReviews } from '@/hooks/verification/useVerificationReviews';

const VerificationDashboard = () => {
  const { approveRequest, rejectRequest } = useVerificationReviews();

  const handleApprove = async (requestId: string) => {
    await approveRequest(requestId);
  };

  const handleReject = async (requestId: string, reason?: string) => {
    await rejectRequest(requestId, reason);
  };

  return (
    <RoleGuard allowedRoles={['admin', 'moderator']} showAccessDenied>
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <VerificationMetrics />
              
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>

                <TabsContent value="pending">
                  <VerificationReviewPanel
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>

                <TabsContent value="approved">
                  <VerificationReviewPanel
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>

                <TabsContent value="rejected">
                  <VerificationReviewPanel
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </RoleGuard>
  );
};

export default VerificationDashboard;
