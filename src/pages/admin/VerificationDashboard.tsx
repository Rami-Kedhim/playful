
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { VerificationRequest as EscortVerificationRequest, VerificationStatus as EscortVerificationStatus } from '@/types/verification';
import { getAllVerificationRequests, approveVerificationRequest, rejectVerificationRequest } from '@/services/verificationService';
import { toast } from '@/components/ui/use-toast';
import DocumentReviewModal from '@/components/admin/DocumentReviewModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle } from 'lucide-react';

interface NormalizedVerificationRequest extends EscortVerificationRequest {
  userId: string;
  requestedLevel?: string;
  requested_level?: string;
}

interface NormalizedVerificationDocument {
  id: string;
  document_type: string;
  status: string;
  url?: string;
  file_url?: string;
  fileUrl?: string;
  document_url?: string;
  uploaded_at?: string;
  created_at?: string;
  verification_request_id?: string;
}

const VerificationDashboard: React.FC = () => {
  const [requests, setRequests] = useState<NormalizedVerificationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<EscortVerificationStatus | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<NormalizedVerificationDocument | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<NormalizedVerificationRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    setLoading(true);
    try {
      const data = await getAllVerificationRequests();
      // Normalize the verification requests
      const normalizedRequests = data.map(request => ({
        ...request,
        userId: request.userId || request.user_id || '',
        requestedLevel: request.requestedLevel || request.requested_level || ''
      }));
      setRequests(normalizedRequests as NormalizedVerificationRequest[]);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch verification requests",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDocument = async (documentId: string, requestId: string) => {
    try {
      await approveVerificationRequest(requestId);
      toast({
        title: "Success",
        description: "Verification request approved",
        variant: "success"
      });
      fetchVerificationRequests(); // Refresh data
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error approving verification request:', error);
      toast({
        title: "Error",
        description: "Failed to approve verification request",
        variant: "destructive"
      });
    }
  };

  const handleRejectDocument = async (documentId: string, requestId: string, reason: string) => {
    try {
      await rejectVerificationRequest(requestId, reason);
      toast({
        title: "Success",
        description: "Verification request rejected",
        variant: "success"
      });
      fetchVerificationRequests(); // Refresh data
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error rejecting verification request:', error);
      toast({
        title: "Error",
        description: "Failed to reject verification request",
        variant: "destructive"
      });
    }
  };

  const filteredRequests = requests.filter(request => {
    const searchMatch = request.userId?.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = selectedStatus ? request.status === selectedStatus : true;
    return searchMatch && statusMatch;
  });

  const handleDocumentClick = (document: NormalizedVerificationDocument, request: NormalizedVerificationRequest) => {
    setSelectedDocument(document);
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleStatusChange = (status: EscortVerificationStatus | '') => {
    setSelectedStatus(status);
  };

  const renderDocumentReviewModal = () => {
    if (!selectedDocument || !selectedRequest) return null;

    return (
      <DocumentReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={selectedDocument as any}
        request={selectedRequest as any}
        onApprove={handleApproveDocument as any}
        onReject={handleRejectDocument as any}
      />
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Verification Requests</h1>

      <div className="flex items-center justify-between mb-4">
        <Input
          type="text"
          placeholder="Search by user ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />

        <Select value={selectedStatus} onValueChange={(value) => handleStatusChange(value as EscortVerificationStatus)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p>Loading verification requests...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Table>
            <TableCaption>
              A list of all verification requests.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested Level</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>
                    {request.status === 'approved' && (
                      <div className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        Approved
                      </div>
                    )}
                    {request.status === 'rejected' && (
                      <div className="flex items-center gap-1 text-red-500">
                        <XCircle className="h-4 w-4" />
                        Rejected
                      </div>
                    )}
                    {request.status !== 'approved' && request.status !== 'rejected' && (
                      <span>{request.status}</span>
                    )}
                  </TableCell>
                  <TableCell>{request.requestedLevel || request.requested_level}</TableCell>
                  <TableCell>{new Date(request.submittedAt || request.created_at || "").toLocaleDateString()}</TableCell>
                  <TableCell>
                    {request.documents && request.documents.length > 0 ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleDocumentClick(
                            {
                              id: request.documents[0].id,
                              document_type: request.documents[0].document_type || request.documents[0].type || '',
                              status: request.documents[0].status || 'pending',
                              url: request.documents[0].url || request.documents[0].file_url || '',
                            } as NormalizedVerificationDocument,
                            request
                          )
                        }
                      >
                        Review Document
                      </Button>
                    ) : (
                      <span>No Documents</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {renderDocumentReviewModal()}
    </div>
  );
};

export default VerificationDashboard;

