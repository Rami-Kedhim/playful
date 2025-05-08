
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Flag, 
  MessageSquare, 
  Shield, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

const AdminReportsPage = () => {
  // Sample reports data
  const reports = [
    { 
      id: '1', 
      type: 'user', 
      reportedUser: 'john_doe', 
      reason: 'Inappropriate behavior', 
      status: 'pending',
      reportedAt: '2025-05-01',
      reportedBy: 'sofia_v'
    },
    { 
      id: '2', 
      type: 'content', 
      reportedUser: 'ava_m', 
      reason: 'Fake photos', 
      status: 'resolved',
      reportedAt: '2025-05-02',
      reportedBy: 'client123'
    },
    { 
      id: '3', 
      type: 'message', 
      reportedUser: 'user456', 
      reason: 'Harassment', 
      status: 'pending',
      reportedAt: '2025-05-03',
      reportedBy: 'emma_l'
    },
    { 
      id: '4', 
      type: 'payment', 
      reportedUser: 'client789', 
      reason: 'Payment dispute', 
      status: 'investigating',
      reportedAt: '2025-05-04',
      reportedBy: 'escort321'
    }
  ];

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Shield className="h-4 w-4" />;
      case 'content':
        return <AlertTriangle className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'payment':
        return <Flag className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      case 'investigating':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <UnifiedLayout
      title="Reports Management"
      description="Review and resolve user reports"
      showBreadcrumbs
    >
      <Card>
        <CardHeader>
          <CardTitle>Active Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reported User</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getReportIcon(report.type)}
                      {report.type}
                    </div>
                  </TableCell>
                  <TableCell>{report.reportedUser}</TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>{report.reportedAt}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </UnifiedLayout>
  );
};

export default AdminReportsPage;
