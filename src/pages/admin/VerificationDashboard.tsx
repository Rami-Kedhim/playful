import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { DataTable } from '@/components/ui/data-table';
import { VerificationRequest } from '@/types/verification';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import DocumentPreview from '@/components/verification/admin/DocumentPreview';
import DocumentReview from '@/components/verification/admin/DocumentReview';
import { UserRole } from '@/types/auth';

const VerificationDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  
  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to access the dashboard',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }
    
    // Fetch verifications from Supabase
    const fetchVerifications = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('verification_requests')
          .select('*');
        
        if (error) {
          throw new Error(error.message);
        }
        
        setVerifications(data as VerificationRequest[]);
      } catch (error: any) {
        toast({
          title: 'Error fetching verifications',
          description: error.message || 'Failed to load verification requests',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerifications();
  }, [user, navigate, toast]);
  
  // Update the role check to use the correct type
  const canAccessDashboard = user?.roles?.some(role => 
    ['admin', 'moderator'].includes(role as string)
  );
  
  if (!canAccessDashboard) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }
  
  const columns = [
    {
      accessorKey: 'id',
      header: 'Request ID',
    },
    {
      accessorKey: 'profile_id',
      header: 'User ID',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const verification = row.original;
        
        return (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedVerification(verification);
                setIsReviewOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              Review
            </Button>
          </div>
        );
      }
    }
  ];
  
  const handleVerificationUpdate = async (
    verificationId: string,
    newStatus: string,
    rejectionReason?: string
  ) => {
    try {
      // Update verification status in Supabase
      const { error } = await supabase
        .from('verification_requests')
        .update({ status: newStatus, rejectionReason })
        .eq('id', verificationId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update local state
      setVerifications(verifications.map(v =>
        v.id === verificationId ? { ...v, status: newStatus } : v
      ));
      
      // Close review modal
      setIsReviewOpen(false);
      setSelectedVerification(null);
      
      toast({
        title: 'Verification Updated',
        description: `Verification request ${verificationId} updated to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error updating verification',
        description: error.message || 'Failed to update verification status',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Verification Dashboard</h1>
      
      {loading ? (
        <div className="flex items-center justify-center">
          <p>Loading verifications...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={verifications} />
      )}
      
      {/* Review Modal */}
      {selectedVerification && (
        <DocumentReview
          isOpen={isReviewOpen}
          onClose={() => {
            setIsReviewOpen(false);
            setSelectedVerification(null);
          }}
          verification={selectedVerification}
          onApprove={() => handleVerificationUpdate(selectedVerification.id, 'approved')}
          onReject={(reason) => handleVerificationUpdate(selectedVerification.id, 'rejected', reason)}
        />
      )}
    </div>
  );
};

export default VerificationDashboard;
