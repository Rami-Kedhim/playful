
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FilterBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  headerExtra?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export function FilterBlock({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  headerExtra,
  collapsible = false,
  defaultCollapsed = false,
  ...props
}: FilterBlockProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <Card className={cn("h-full", className)} {...props}>
      <CardHeader className={cn("pb-2", headerClassName)}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle 
              className={cn(
                "text-lg font-medium", 
                collapsible && "cursor-pointer flex items-center"
              )}
              onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
            >
              {title}
              {collapsible && (
                <span className="ml-2 text-sm transition-transform duration-200" style={{
                  transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)'
                }}>
                  ▼
                </span>
              )}
            </CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {headerExtra && (
            <div className="flex-shrink-0">
              {headerExtra}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent 
        className={cn(
          "pt-1 transition-all duration-300", 
          contentClassName,
          collapsed && collapsible && "hidden"
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
}

export function FilterSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <h4 className="text-sm font-medium">{title}</h4>
      {children}
    </div>
  );
}
