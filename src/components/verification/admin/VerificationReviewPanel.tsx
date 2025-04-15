
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { VerificationStatusIndicator } from '@/components/verification';
import { VerificationRequest } from '@/types/escort';
import ReviewRequestModal from './ReviewRequestModal';
import { VerificationFilters } from './VerificationFilters';
import { useVerificationSearch } from '@/hooks/verification/useVerificationSearch';

interface VerificationReviewPanelProps {
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, reason?: string) => void;
}

const VerificationReviewPanel = ({
  onApprove,
  onReject
}: VerificationReviewPanelProps) => {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const {
    requests,
    isLoading,
    setSearchQuery,
    setStatusFilter,
    setLevelFilter,
    setDateRange
  } = useVerificationSearch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full space-y-6">
      <VerificationFilters
        onSearchChange={setSearchQuery}
        onStatusChange={setStatusFilter}
        onLevelChange={setLevelFilter}
        onDateRangeChange={setDateRange}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submitted</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests && requests.map((request) => (
            <TableRow key={request.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedRequest(request)}>
              <TableCell>
                {new Date(request.submittedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{request.userId}</TableCell>
              <TableCell>
                <VerificationStatusIndicator status={request.status} />
              </TableCell>
              <TableCell>{request.documents.length} submitted</TableCell>
              <TableCell className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onApprove(request.id)}
                  disabled={request.status !== 'pending'}
                >
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onReject(request.id)}
                  disabled={request.status !== 'pending'}
                >
                  <XCircle className="h-4 w-4 mr-1 text-red-500" />
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReviewRequestModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={() => {
          if (selectedRequest) {
            onApprove(selectedRequest.id);
            setSelectedRequest(null);
          }
        }}
        onReject={(reason) => {
          if (selectedRequest) {
            onReject(selectedRequest.id, reason);
            setSelectedRequest(null);
          }
        }}
      />
    </div>
  );
};

export default VerificationReviewPanel;
