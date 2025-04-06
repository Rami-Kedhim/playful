
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProfileCompletenessProps {
  completeness: number; // 0-100
}

const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({ completeness }) => {
  const getStatusColor = (value: number) => {
    if (value < 40) return 'bg-red-500';
    if (value < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getBadgeLabel = (value: number) => {
    if (value < 40) return 'Low';
    if (value < 70) return 'Good';
    if (value < 90) return 'Great';
    return 'Excellent';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm text-muted-foreground">{completeness}%</div>
        <div className={`px-2 py-0.5 text-xs rounded ${getStatusColor(completeness)} text-white`}>
          {getBadgeLabel(completeness)}
        </div>
      </div>
      <Progress value={completeness} className="h-2" />
    </div>
  );
};

export default ProfileCompleteness;
