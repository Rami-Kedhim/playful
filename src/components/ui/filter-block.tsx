
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
}

export function FilterBlock({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  headerExtra,
  ...props
}: FilterBlockProps) {
  return (
    <Card className={cn("h-full", className)} {...props}>
      <CardHeader className={cn("pb-2", headerClassName)}>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
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
      <CardContent className={cn("pt-1", contentClassName)}>
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
