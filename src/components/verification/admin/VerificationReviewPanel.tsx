
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, Clock, File, User, X } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/verification';
import DocumentReview from './DocumentReview';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface VerificationReviewPanelProps {
  request: VerificationRequest;
  onApprove: (requestId: string, notes?: string) => Promise<void>;
  onReject: (requestId: string, notes?: string) => Promise<void>;
  loading: boolean;
}

const VerificationReviewPanel: React.FC<VerificationReviewPanelProps> = ({
  request,
  onApprove,
  onReject,
  loading,
}) => {
  const [notes, setNotes] = React.useState('');
  
  // Convert status to lowercase string for safe comparison
  const statusLower = String(request.status).toLowerCase();
  const isPending = statusLower === 'pending' || statusLower === 'in_review';

  const handleApprove = async () => {
    if (!isPending) return;
    await onApprove(request.id, notes);
  };

  const handleReject = async () => {
    if (!isPending) return;
    await onReject(request.id, notes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Request</CardTitle>
        <CardDescription>Review the submitted documents and take action.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>User ID: {request.profile_id || request.userId || ''}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>
            Submitted:{' '}
            {request.submittedAt
              ? format(new Date(request.submittedAt), 'MMM dd, yyyy h:mm a')
              : request.created_at
                ? format(new Date(request.created_at), 'MMM dd, yyyy h:mm a')
                : format(new Date(), 'MMM dd, yyyy h:mm a')}
          </span>
        </div>

        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            {(!request.documents || request.documents.length === 0) ? (
              <div className="text-center text-muted-foreground">
                <File className="h-6 w-6 mx-auto mb-2" />
                No documents submitted.
              </div>
            ) : (
              request.documents.map((doc) => (
                <DocumentReview key={doc.id} document={doc} />
              ))
            )}
          </TabsContent>

          <TabsContent value="notes">
            <Textarea
              placeholder="Add notes about this verification request"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {statusLower === 'approved' ? (
          <Badge variant="outline" className="bg-green-100 text-green-500 border-green-200">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approved on {request.reviewed_at ? format(new Date(request.reviewed_at), 'MMM dd, yyyy') : 'Unknown'}
          </Badge>
        ) : statusLower === 'rejected' ? (
          <Badge variant="outline" className="bg-red-100 text-red-500 border-red-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            Rejected on {request.reviewed_at ? format(new Date(request.reviewed_at), 'MMM dd, yyyy') : 'Unknown'}
          </Badge>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleReject}
              disabled={loading}
            >
              Reject
              <X className="h-4 w-4 ml-2" />
            </Button>
            <Button
              onClick={handleApprove}
              disabled={loading}
            >
              Approve
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default VerificationReviewPanel;
