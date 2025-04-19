
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface SEOScoreProps {
  label: string;
  score: number;
}

const SEOScore: React.FC<SEOScoreProps> = ({ label, score }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm">{score}/100</span>
    </div>
    <Progress value={score} />
  </div>
);

export default SEOScore;
