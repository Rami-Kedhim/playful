import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AreaChart, BadgeDollarSign, Calendar, LayoutGrid, MessageSquare, Star, Users } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { featuredEscorts, featuredCreators } from '@/data/mockData';
import EscortCard from '../escorts/EscortCard';
import CreatorCard from '../creators/CreatorCard';

const UserDashboardOverview = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-2xl font-bold">$4,320</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-2xl font-bold">1,234</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-2xl font-bold">3</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Next: Today at 3:00 PM
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Featured Profiles</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/explore">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredEscorts.slice(0, 4).map((escort) => (
              <Link
                key={escort.id}
                to={`/escorts/${escort.id}`}
                className="group"
              >
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <img
                    src={escort.imageUrl}
                    alt={escort.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2">
                    <div className="text-white font-medium text-sm">
                      {escort.name}, {escort.age}
                    </div>
                    <div className="text-white/90 text-xs">{escort.location}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardOverview;
