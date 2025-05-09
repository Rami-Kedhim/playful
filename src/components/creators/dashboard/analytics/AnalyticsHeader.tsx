
import React from 'react';
import { AnalyticsHeaderProps } from './index';

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  title,
  description,
  children
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
      {children}
    </div>
  );
};

export default AnalyticsHeader;
