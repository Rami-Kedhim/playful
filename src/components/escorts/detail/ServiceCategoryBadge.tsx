
import React from "react";
import InteractiveServiceBadge from "./InteractiveServiceBadge";

interface ServiceCategoryBadgeProps {
  serviceName: string;
  className?: string;
  showCategory?: boolean;
  interactive?: boolean;
}

const ServiceCategoryBadge = ({ 
  serviceName, 
  className = "",
  showCategory = false,
  interactive = true
}: ServiceCategoryBadgeProps) => {
  return (
    <InteractiveServiceBadge
      serviceName={serviceName}
      className={className}
      showCategory={showCategory}
      interactive={interactive}
    />
  );
};

export default ServiceCategoryBadge;
