
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const UBXBalance = () => {
  const { profile, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">UBX Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-2" />
          <Skeleton className="h-4 w-40" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Coins className="h-5 w-5 text-blue-500 mr-2" />
          UBX Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{profile?.lucoin_balance || profile?.lucoinsBalance || 0} UBX</div>
        <p className="text-sm text-muted-foreground mt-1">
          Virtual credits for platform features
        </p>
      </CardContent>
    </Card>
  );
};

export default UBXBalance;
