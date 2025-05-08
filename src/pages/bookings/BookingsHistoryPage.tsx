
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

const BookingsHistoryPage = () => {
  // Sample booking history data
  const bookings = [
    {
      id: '1',
      escort: 'Sofia V.',
      date: '2025-04-15',
      time: '19:00',
      duration: '2 hours',
      status: 'completed',
      amount: 400
    },
    {
      id: '2',
      escort: 'Ava M.',
      date: '2025-04-02',
      time: '20:00',
      duration: '1 hour',
      status: 'completed',
      amount: 250
    },
    {
      id: '3',
      escort: 'Emma L.',
      date: '2025-03-22',
      time: '21:00',
      duration: '3 hours',
      status: 'cancelled',
      amount: 600
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-500 text-red-500">Cancelled</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <UnifiedLayout
      title="Booking History"
      description="View your past bookings and appointments"
      showBreadcrumbs
    >
      <Card>
        <CardHeader>
          <CardTitle>Past Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Escort</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount (UBX)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.escort}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.duration}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>{booking.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </UnifiedLayout>
  );
};

export default BookingsHistoryPage;
