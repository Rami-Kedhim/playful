
import React from "react";
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitialsAvatar } from "@/utils/profileUtils";

interface AvatarProps {
  src?: string | null;
  username?: string | null;
  email?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  border?: boolean;
}

const Avatar = ({
  src,
  username,
  email,
  size = "md",
  className,
  border = false,
}: AvatarProps) => {
  // Determine the display name for fallback
  const displayName = username || email?.split("@")[0] || "User";
  
  // Generate initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Determine size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-20 w-20",
    xl: "h-28 w-28",
  };
  
  // Generate fallback avatar URL if no src is provided
  const fallbackUrl = src || getInitialsAvatar(displayName);
  
  return (
    <UIAvatar
      className={cn(
        sizeClasses[size],
        border && "border-2 border-white/20",
        className
      )}
    >
      <AvatarImage src={fallbackUrl} alt={displayName} />
      <AvatarFallback className="bg-primary/20 text-primary-foreground">
        {getInitials(displayName)}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
