
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DollarSign, ArrowRight } from 'lucide-react';
import { featuredEscorts, featuredCreators } from '@/data/mockData';
import CreatorCard from '../creators/CreatorCard';
import { useAuth } from '@/hooks/auth/useAuthContext';

const UserDashboardOverview = () => {
  const { user } = useAuth();

  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2">
      {/* Account Summary Card */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4 flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <h4 className="font-semibold text-xl">{user?.lucoinsBalance || 0} Credits</h4>
              </div>
            </div>
            {/* Add other summary items as needed */}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No recent activity.</p>
        </CardContent>
      </Card>

      {/* Recommended Escorts */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Recommended Escorts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {featuredEscorts.length > 0 ? (
              featuredEscorts.slice(0, 2).map((escort) => (
                <div key={escort.id} className="flex items-center space-x-4">
                  <img
                    src={escort.imageUrl}
                    alt={escort.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{escort.name}</h4>
                    <p className="text-sm text-muted-foreground">{escort.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No recommendations available.</p>
            )}
            <Link to="/escorts">
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Creators */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Top Creators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {featuredCreators.length > 0 ? (
              featuredCreators.slice(0, 2).map((creator) => (
                <div key={creator.id} className="flex items-center space-x-4">
                  <img
                    src={creator.imageUrl}
                    alt={creator.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{creator.name}</h4>
                    <p className="text-sm text-muted-foreground">{creator.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No creators available.</p>
            )}
            <Link to="/creators">
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardOverview;
