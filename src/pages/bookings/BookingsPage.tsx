
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UnifiedRoutes } from '@/routes/unifiedRoutes';

const BookingsPage = () => {
  return (
    <UnifiedLayout
      title="Bookings"
      description="Manage your escort bookings and appointments"
      showBreadcrumbs
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Your Bookings</h1>
        </div>
        <Button asChild>
          <Link to={UnifiedRoutes.bookings.new}>
            <Plus className="mr-2 h-4 w-4" />
            New Booking
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No upcoming bookings</h3>
                <p className="text-muted-foreground mt-2">
                  You don't have any upcoming bookings scheduled.
                </p>
                <Button asChild className="mt-4">
                  <Link to={UnifiedRoutes.bookings.new}>Book an Escort</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No pending booking requests.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No completed bookings found.</p>
              <Link to={UnifiedRoutes.bookings.history} className="text-primary hover:underline text-sm mt-2 inline-block">
                View full booking history
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No cancelled bookings.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </UnifiedLayout>
  );
};

export default BookingsPage;
