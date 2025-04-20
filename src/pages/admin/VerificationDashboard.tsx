
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { VerificationRequest, VerificationStatus, VerificationLevel, VerificationDocument } from '@/types/verification';

interface NormalizedVerificationDocument {
  id: string;
  document_type: string;
  status: string;
  url: string;
  uploaded_at?: string;
}

const VerificationDashboard = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<NormalizedVerificationDocument | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      const data = await getAllVerificationRequests();
      const normalizedRequests = data.map(request => ({
        ...request,
        userId: request.userId || request.user_id || request.profile_id || '',
        // requested_level can be typed based on VerificationLevel enum
        requested_level: (request.requested_level as VerificationLevel) || VerificationLevel.BASIC,
        // ensure documents are normalized (optional)
        documents: request.documents || [],
      }));
      setRequests(normalizedRequests);
    }
    fetchRequests();
  }, []);

  const handleDocumentClick = (doc: NormalizedVerificationDocument, request: VerificationRequest) => {
    setSelectedDocument(doc);
    setSelectedRequest(request);
  };

  // Example usage in rendering - fix document properties usage:
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map(request => (
          <TableRow key={request.id}>
            <TableCell>{request.userId || request.profile_id}</TableCell>
            <TableCell>
              {request.status === VerificationStatus.APPROVED && (
                <span className="text-green-600">Approved</span>
              )}
              {request.status === VerificationStatus.REJECTED && (
                <span className="text-red-600">Rejected</span>
              )}
              {(request.status !== VerificationStatus.APPROVED && request.status !== VerificationStatus.REJECTED) && (
                <span>{request.status}</span>
              )}
            </TableCell>
            <TableCell>
              {request.documents && request.documents.length > 0 && (
                <Button
                  onClick={() =>
                    handleDocumentClick({
                      id: request.documents[0].id,
                      document_type: request.documents[0].document_type || request.documents[0].documentType || '',
                      status: request.documents[0].status || 'pending',
                      url: request.documents[0].url || request.documents[0].fileUrl || '',
                      uploaded_at: request.documents[0].uploadedAt || request.documents[0].uploaded_at || '',
                    }, request)
                  }
                >
                  View Document
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Note: getAllVerificationRequests() must be imported from the service or replaced by actual data source
import { getAllVerificationRequests } from '@/services/verificationService';

export default VerificationDashboard;

