
import React from 'react';
import { Users, Zap, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface UBXStat {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
}

export const UBXStatsBar = () => {
  const stats: UBXStat[] = [
    {
      label: 'Active Users',
      value: '14,328',
      icon: <Users className="h-5 w-5 text-primary" />,
      change: 12
    },
    {
      label: 'UBX Market Cap',
      value: formatCurrency(1245890),
      icon: <Zap className="h-5 w-5 text-primary" />,
      change: 8
    },
    {
      label: 'Verified Escorts',
      value: '3,827',
      icon: <Star className="h-5 w-5 text-primary" />,
      change: 15
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="bg-card/80 backdrop-blur-sm border rounded-lg py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              {stat.icon && (
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change !== undefined && (
                  <p className={`text-xs ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
