
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FilterBlockProps extends React.HTMLAttributes<HTMLDivElement> {
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
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <Card className={cn("h-full shadow-sm border", className)} {...props}>
      <CardHeader className={cn("pb-2", headerClassName)}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div
              className={cn(
                "flex items-center", 
                collapsible && "cursor-pointer"
              )}
              onClick={collapsible ? () => setCollapsed(!collapsed) : undefined}
            >
              <CardTitle className="text-lg font-medium">
                {title}
              </CardTitle>
              {collapsible && (
                <div className="ml-2">
                  {collapsed ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronUp className="h-4 w-4" />
                  }
                </div>
              )}
            </div>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          {headerExtra && (
            <div className="flex-shrink-0">
              {headerExtra}
            </div>
          )}
        </div>
      </CardHeader>
      
      <AnimatePresence initial={false}>
        {(!collapsed || !collapsible) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent 
              className={cn(
                "pt-1", 
                contentClassName
              )}
            >
              {children}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
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
