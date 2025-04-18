import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Import verification types from verification.ts
import { VerificationRequest, VerificationStatus } from '@/types/verification';

// Mock admin actions that return promises
const approveVerificationMock = async (requestId: string, notes?: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Approved verification ${requestId}`, notes);
  return Promise.resolve();
};

const rejectVerificationMock = async (requestId: string, notes?: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Rejected verification ${requestId}`, notes);
  return Promise.resolve();
};

interface AdminVerificationDashboardProps {
  pendingVerifications: VerificationRequest[];
  approveVerification?: (requestId: string, notes?: string) => Promise<void>;
  rejectVerification?: (requestId: string, notes?: string) => Promise<void>;
}

const AdminVerificationDashboard: React.FC<AdminVerificationDashboardProps> = ({ 
  pendingVerifications,
  approveVerification = approveVerificationMock,
  rejectVerification = rejectVerificationMock
}) => {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Handle approve action
  const handleApprove = async (id: string) => {
    setLoading(true);
    try {
      await approveVerification(id);
      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error approving verification:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle reject action
  const handleReject = async (id: string) => {
    setLoading(true);
    try {
      await rejectVerification(id);
      // Handle success
    } catch (error) {
      // Handle error
      console.error("Error rejecting verification:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle view details action
  const handleViewDetails = (request: VerificationRequest) => {
    setSelectedRequest(request);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Verification Requests</h2>
      
      {pendingVerifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">No pending verification requests.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pendingVerifications.map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Request #{request.id.substring(0, 8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      Status: {request.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(request)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleApprove(request.id)}
                      disabled={loading}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleReject(request.id)}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Selected request details would go here */}
      
    </div>
  );
};

export default AdminVerificationDashboard;
