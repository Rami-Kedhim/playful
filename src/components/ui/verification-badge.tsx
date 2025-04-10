
import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, Shield, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface VerificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "verified" | "pending" | "unverified" | "ai";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function VerificationBadge({
  status,
  showLabel = false,
  size = "md",
  className,
  ...props
}: VerificationBadgeProps) {
  const sizeClasses = {
    sm: {
      badge: "h-4 w-4",
      icon: "h-2.5 w-2.5",
      text: "text-xs",
    },
    md: {
      badge: "h-5 w-5",
      icon: "h-3 w-3",
      text: "text-sm",
    },
    lg: {
      badge: "h-6 w-6",
      icon: "h-4 w-4",
      text: "text-base",
    },
  };

  const statusConfig = {
    verified: {
      icon: <CheckCircle className={cn(sizeClasses[size].icon)} />,
      label: "Verified",
      tooltip: "This profile has been verified by UberEscorts",
      color: "bg-green-500 text-white",
    },
    pending: {
      icon: <Shield className={cn(sizeClasses[size].icon)} />,
      label: "Pending",
      tooltip: "Verification in progress",
      color: "bg-yellow-500 text-white",
    },
    unverified: {
      icon: <AlertCircle className={cn(sizeClasses[size].icon)} />,
      label: "Unverified",
      tooltip: "This profile has not been verified",
      color: "bg-red-500 text-white",
    },
    ai: {
      icon: <Shield className={cn(sizeClasses[size].icon)} />,
      label: "AI Model",
      tooltip: "This is an AI-generated profile",
      color: "bg-blue-500 text-white",
    },
  };

  const config = statusConfig[status];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full",
              showLabel ? "px-2 py-0.5" : "p-1",
              config.color,
              className
            )}
            {...props}
          >
            <span className={cn(sizeClasses[size].badge, "flex items-center justify-center")}>
              {config.icon}
            </span>
            {showLabel && (
              <span className={cn(sizeClasses[size].text, "font-medium whitespace-nowrap")}>
                {config.label}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
