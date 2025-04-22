
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';

const UpdatedWallet = () => {
  const { user, profile } = useAuth();
  const [isBoosted, setIsBoosted] = useState(false);

  useEffect(() => {
    // Simulate fetching boosted status from an API or some other source
    // In a real application, you would replace this with an actual API call
    const fetchBoostedStatus = async () => {
      // Replace this with your actual logic to determine if the user is boosted
      const boosted = profile?.is_boosted || profile?.isBoosted || false;
      setIsBoosted(boosted);
    };

    fetchBoostedStatus();
  }, [profile]);

  return (
    <AppLayout>
      <div className="container mx-auto py-10">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              My Wallet
            </CardTitle>
            <Button variant="outline">
              Withdraw Funds
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>
                    {user?.username?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{user?.username}</h2>
                  <p className="text-sm text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-semibold">
                  UBX Balance: {profile?.ubx_balance || profile?.ubxBalance || 0} UBX
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use UBX to boost your profile, send messages, and more.
                </p>
                <Button>
                  Add UBX
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UpdatedWallet;
