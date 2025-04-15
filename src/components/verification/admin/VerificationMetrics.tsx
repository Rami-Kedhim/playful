
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, XCircle, Percent } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const VerificationMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ['verification-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_verification_metrics');
      
      if (error) throw error;
      return data;
    }
  });

  const stats = [
    {
      title: "Pending Requests",
      value: metrics?.pending || 0,
      description: "Awaiting review",
      icon: Clock,
      color: "text-amber-500"
    },
    {
      title: "Approved",
      value: metrics?.approved || 0,
      description: "Successfully verified",
      icon: CheckCircle2,
      color: "text-green-500"
    },
    {
      title: "Rejected",
      value: metrics?.rejected || 0,
      description: "Failed verification",
      icon: XCircle,
      color: "text-red-500"
    },
    {
      title: "Approval Rate",
      value: `${metrics?.approval_rate || 0}%`,
      description: "Overall success rate",
      icon: Percent,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VerificationMetrics;
