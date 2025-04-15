
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FileCheck, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DocumentVerificationStatusProps {
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documentType: string;
  submittedAt: string;
  reviewerNotes?: string;
}

const DocumentVerificationStatus = ({
  status,
  documentType,
  submittedAt,
  reviewerNotes
}: DocumentVerificationStatusProps) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <FileCheck className="h-5 w-5 text-green-500" />,
          badge: <Badge className="bg-green-500">Approved</Badge>,
          message: "This document has been verified"
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          badge: <Badge variant="destructive">Rejected</Badge>,
          message: "This document was rejected"
        };
      case 'under_review':
        return {
          icon: <Clock className="h-5 w-5 text-blue-500 animate-spin" />,
          badge: <Badge variant="secondary">Under Review</Badge>,
          message: "Document is being reviewed"
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
          badge: <Badge variant="outline">Pending</Badge>,
          message: "Awaiting review"
        };
    }
  };

  const statusInfo = getStatusDisplay();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {statusInfo.icon}
          <h4 className="text-sm font-medium">{documentType}</h4>
        </div>
        {statusInfo.badge}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {statusInfo.message}
        </p>
        <div className="text-xs text-muted-foreground">
          Submitted: {new Date(submittedAt).toLocaleString()}
        </div>
        {reviewerNotes && status === 'rejected' && (
          <div className="mt-2 p-2 bg-destructive/10 rounded-sm text-xs text-destructive">
            {reviewerNotes}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentVerificationStatus;
