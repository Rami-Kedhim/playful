
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VerificationRequest, VerificationStatus } from '@/types/escort';
import DocumentReviewModal from '@/components/verification/DocumentReviewModal'; 

interface DocumentReviewProps {
  document: any;
  isOpen: boolean;
  onClose: () => void;
  verification: VerificationRequest;
  onApprove: () => Promise<void>;
  onReject: (reason: any) => Promise<void>;
}

const VerificationDashboard: React.FC = () => {
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Fetch verification requests
  useEffect(() => {
    const fetchVerificationRequests = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockVerifications: VerificationRequest[] = [
          {
            id: "ver-1",
            userId: "user-1",
            status: VerificationStatus.PENDING,
            submittedAt: new Date().toISOString(),
            documents: [
              {
                id: "doc-1",
                requestId: "ver-1",
                type: "id",
                url: "https://example.com/id-1.jpg",
                status: "pending",
                uploadedAt: new Date().toISOString()
              },
              {
                id: "doc-2",
                requestId: "ver-1",
                type: "selfie",
                url: "https://example.com/selfie-1.jpg",
                status: "pending",
                uploadedAt: new Date().toISOString()
              }
            ]
          },
          {
            id: "ver-2",
            userId: "user-2",
            status: VerificationStatus.REJECTED,
            submittedAt: new Date(Date.now() - 86400000).toISOString(),
            rejectionReason: "Documents unclear",
            documents: [
              {
                id: "doc-3",
                requestId: "ver-2",
                type: "id",
                url: "https://example.com/id-2.jpg",
                status: "rejected",
                uploadedAt: new Date(Date.now() - 86400000).toISOString()
              }
            ],
            reviewedAt: new Date().toISOString()
          }
        ];
        
        setVerificationRequests(mockVerifications);
      } catch (error) {
        console.error("Error fetching verification requests:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVerificationRequests();
  }, []);

  // Handle opening the review modal
  const handleReviewRequest = (verification: VerificationRequest) => {
    setSelectedVerification(verification);
    setIsReviewModalOpen(true);
  };

  // Handle approval of a verification request
  const handleApproveVerification = async () => {
    if (!selectedVerification) return;
    
    try {
      console.log("Approving verification:", selectedVerification.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationRequests(prev => 
        prev.map(item => 
          item.id === selectedVerification.id
            ? { ...item, status: VerificationStatus.APPROVED }
            : item
        )
      );
      
      setIsReviewModalOpen(false);
      setSelectedVerification(null);
    } catch (error) {
      console.error("Error approving verification:", error);
    }
  };

  // Handle rejection of a verification request
  const handleRejectVerification = async (reason: string) => {
    if (!selectedVerification) return;
    
    try {
      console.log("Rejecting verification:", selectedVerification.id, "Reason:", reason);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationRequests(prev => 
        prev.map(item => 
          item.id === selectedVerification.id
            ? { 
                ...item, 
                status: VerificationStatus.REJECTED,
                rejectionReason: reason 
              }
            : item
        )
      );
      
      setIsReviewModalOpen(false);
      setSelectedVerification(null);
    } catch (error) {
      console.error("Error rejecting verification:", error);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: VerificationStatus }) => {
    switch (status) {
      case VerificationStatus.PENDING:
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case VerificationStatus.APPROVED:
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case VerificationStatus.REJECTED:
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      case VerificationStatus.EXPIRED:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Loading state
  if (loading) {
    return <div>Loading verification requests...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Verification Dashboard</h1>
      
      {/* Verification Requests */}
      <div className="grid gap-4">
        {verificationRequests.length > 0 ? (
          verificationRequests.map(verification => (
            <Card key={verification.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-lg">{`Request ID: ${verification.id.substring(0, 8)}`}</h3>
                    <StatusBadge status={verification.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">User ID:</span> {verification.userId}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    <span className="font-medium">Submitted:</span> {new Date(verification.submittedAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Documents:</span> {verification.documents.length}
                  </p>
                  
                  {verification.rejectionReason && (
                    <p className="text-sm text-red-600 mt-2">
                      <span className="font-medium">Rejection Reason:</span> {verification.rejectionReason}
                    </p>
                  )}
                </div>
                
                <div>
                  {verification.status === VerificationStatus.PENDING && (
                    <Button onClick={() => handleReviewRequest(verification)}>
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">No verification requests found.</p>
        )}
      </div>
      
      {/* Review Modal */}
      {selectedVerification && (
        <DocumentReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          verification={selectedVerification}
          onApprove={handleApproveVerification}
          onReject={handleRejectVerification}
          document={selectedVerification.documents[0]} // Pass the first document for review
        />
      )}
    </div>
  );
};

export default VerificationDashboard;
