import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEscortContext } from "@/modules/escorts/providers/EscortProvider";
import { useCreatorContext } from "@/modules/creators/providers/CreatorProvider";
// Removed import of non-existing featuredEscorts and featuredCreators from '@/data/mockData'

const UserDashboardOverview: React.FC = () => {
  const { escorts, loading: escortsLoading, error: escortsError } = useEscortContext();
  const { creators, loading: creatorsLoading, error: creatorsError } = useCreatorContext();

  const totalEscorts = escorts ? escorts.length : 0;
  const totalCreators = creators ? creators.length : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Escorts</CardTitle>
          <CardDescription>Number of active escort profiles</CardDescription>
        </CardHeader>
        <CardContent>
          {escortsLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : escortsError ? (
            <p className="text-red-500">Error: {escortsError}</p>
          ) : (
            <div className="text-2xl font-bold">{totalEscorts}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Creators</CardTitle>
          <CardDescription>Number of content creator profiles</CardDescription>
        </CardHeader>
        <CardContent>
          {creatorsLoading ? (
            <Skeleton className="h-10 w-20" />
          ) : creatorsError ? (
            <p className="text-red-500">Error: {creatorsError}</p>
          ) : (
            <div className="text-2xl font-bold">{totalCreators}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Overall platform earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$540,888</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Number of users online now</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,223</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboardOverview;
