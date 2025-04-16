
import React from 'react';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/escort';

interface VerificationTimelineProps {
  request: VerificationRequest;
}

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ request }) => {
  const status = request.status;
  const submittedAt = new Date(request.created_at);
  const reviewedAt = request.reviewed_at ? new Date(request.reviewed_at) : null;
  
  const getStatusIcon = (stepStatus: VerificationStatus) => {
    switch (stepStatus) {
      case 'pending':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'in_review':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'expired':
        return <XCircle className="h-6 w-6 text-gray-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {getStatusIcon('pending')}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">Verification Requested</h3>
          <p className="text-sm text-gray-500">
            {submittedAt.toLocaleDateString()} at {submittedAt.toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="h-10 border-l-2 border-gray-200 ml-3"></div>
      
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {status === 'in_review' || status === 'approved' || status === 'rejected' 
            ? getStatusIcon('in_review') 
            : <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">Under Review</h3>
          {status === 'in_review' && (
            <p className="text-sm text-gray-500">Your documents are being reviewed</p>
          )}
        </div>
      </div>
      
      <div className="h-10 border-l-2 border-gray-200 ml-3"></div>
      
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {status === 'approved' || status === 'rejected' 
            ? getStatusIcon(status) 
            : <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium">
            {status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Decision'}
          </h3>
          {reviewedAt && (status === 'approved' || status === 'rejected') && (
            <p className="text-sm text-gray-500">
              {reviewedAt.toLocaleDateString()} at {reviewedAt.toLocaleTimeString()}
            </p>
          )}
          {status === 'rejected' && request.reviewer_notes && (
            <p className="mt-1 text-sm text-red-600">{request.reviewer_notes}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationTimeline;
