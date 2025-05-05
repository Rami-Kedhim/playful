
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterBlockProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export const FilterBlock: React.FC<FilterBlockProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div className={cn("rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm", className)}>
      {(title || description) && (
        <div className="border-b border-border/50 px-4 py-3">
          {title && <h3 className="font-medium text-lg">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  className,
  children,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h4 className="font-medium text-sm">{title}</h4>
      </div>
      <div>{children}</div>
    </div>
  );
};
