
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { VerificationStatusIndicator } from '@/components/verification';
import { VerificationRequest } from '@/types/escort';

interface VerificationReviewPanelProps {
  requests: VerificationRequest[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, reason?: string) => void;
}

const VerificationReviewPanel = ({
  requests,
  onApprove,
  onReject
}: VerificationReviewPanelProps) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Verification Requests</h2>
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
          {requests.map((request) => (
            <TableRow key={request.id}>
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
    </div>
  );
};

export default VerificationReviewPanel;
