
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Star, Shield, User, MessageCircle, CreditCard, Settings, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNotifications } from '@/hooks/useNotifications';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  linkTo?: string;
}

const StatsCard = ({ title, value, description, icon, linkTo }: StatsCardProps) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    return linkTo ? (
      <Link to={linkTo} className="block hover:scale-105 transition-transform duration-200">
        {children}
      </Link>
    ) : <>{children}</>;
  };

  return (
    <CardWrapper>
      <Card className="bg-background/50 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="bg-primary/10 p-2 rounded-full">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

const UserDashboardOverview = () => {
  const { user, profile } = useAuth();
  const { unreadCount } = useNotifications();
  
  // Calculate profile completeness - this would be better coming from a dedicated hook
  const profileCompleteness = profile ? 
    (Object.keys(profile).filter(key => !!profile[key]).length / 8) * 100 : 0;
  
  return (
    <div className="space-y-6">
      {/* User Profile Summary */}
      <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src={profile?.avatar_url || ''} alt={user?.username || 'User'} />
              <AvatarFallback className="bg-primary/20 text-xl">
                {(user?.username || 'U')[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h2 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                  {user?.username || 'User'}
                  {profile?.is_verified && (
                    <Badge variant="outline" className="bg-primary/10 flex items-center gap-1 ml-2">
                      <Shield className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="outline" className="bg-background/50">
                  {profile?.lucoins_balance || 0} Lucoins
                </Badge>
                <Badge variant="outline" className="bg-background/50">
                  {profile?.subscription_tier || 'Free'} Account
                </Badge>
              </div>
              
              <div className="pt-2">
                <p className="text-sm mb-1">Profile Completeness</p>
                <div className="flex items-center gap-2">
                  <Progress value={profileCompleteness} className="h-2" />
                  <span className="text-xs">{Math.round(profileCompleteness)}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to="/profile">
                  Edit Profile
                </Link>
              </Button>
              
              <Button size="sm" asChild>
                <Link to="/wallet">
                  Buy Lucoins
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Favorites" 
          value="12" 
          icon={<Star className="h-4 w-4 text-yellow-500" />} 
          linkTo="/favorites"
          description="Saved profiles"
        />
        <StatsCard 
          title="Messages" 
          value={unreadCount > 0 ? `${unreadCount} new` : "All read"} 
          icon={<MessageCircle className="h-4 w-4 text-blue-500" />} 
          linkTo="/messages"
          description="Chat conversations"
        />
        <StatsCard 
          title="Bookings" 
          value="3" 
          icon={<Calendar className="h-4 w-4 text-green-500" />} 
          linkTo="/bookings"
          description="Upcoming appointments"
        />
        <StatsCard 
          title="Settings" 
          value="Account" 
          icon={<Settings className="h-4 w-4 text-gray-400" />} 
          linkTo="/settings"
          description="Manage your account"
        />
      </div>
    </div>
  );
};

export default UserDashboardOverview;
