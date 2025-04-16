
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { Heart, MessageSquare, Star, Users, Calendar, Award } from "lucide-react";
import { featuredEscorts, featuredCreators } from "@/data/mockData";

const UserDashboardOverview = () => {
  const { user, profile } = useAuth();
  
  const userActivity = {
    favorites: 7,
    messages: 3,
    reviews: 2,
    upcomingAppointments: 1,
    lucoinBalance: profile?.lucoin_balance || 0,
    memberSince: new Date(profile?.created_at || new Date()).toLocaleDateString(),
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userActivity.favorites}</div>
            <p className="text-xs text-muted-foreground">
              Profiles you've added to favorites
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userActivity.messages}</div>
            <p className="text-xs text-muted-foreground">
              Unread messages in your inbox
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userActivity.reviews}</div>
            <p className="text-xs text-muted-foreground">
              Reviews you've submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userActivity.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Upcoming appointments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Favorites</CardTitle>
            <CardDescription>
              Profiles you've recently added to favorites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredEscorts.slice(0, 2).map((escort) => (
                <div key={escort.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={escort.avatar}
                      alt={escort.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{escort.name}</h4>
                    <p className="text-sm text-muted-foreground">{escort.location}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" fill="currentColor" />
                  </Button>
                </div>
              ))}
              {featuredCreators.slice(0, 1).map((creator) => (
                <div key={creator.id} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{creator.name}</h4>
                    <p className="text-sm text-muted-foreground">{creator.location}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" fill="currentColor" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Favorites
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>
              Your account details and membership status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Member Since</div>
                  <div className="text-xl font-bold">{userActivity.memberSince}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center">
                  <Award className="h-6 w-6 text-lucoin" />
                </div>
                <div>
                  <div className="text-sm font-medium">Lucoin Balance</div>
                  <div className="text-xl font-bold">{userActivity.lucoinBalance} LC</div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-sm mb-1.5">Profile Completion</div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent" 
                    style={{ width: `${profile?.profile_completeness || 65}%` }}
                  />
                </div>
                <div className="flex justify-end mt-1 text-xs text-muted-foreground">
                  {profile?.profile_completeness || 65}% complete
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full">
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
