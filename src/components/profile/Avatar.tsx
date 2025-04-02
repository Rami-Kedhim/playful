
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  username?: string;
  email?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackClassName?: string;
  status?: "online" | "offline" | "away" | "busy";
  border?: boolean;
}

const Avatar = ({ 
  src, 
  username, 
  email, 
  size = "md", 
  className,
  fallbackClassName,
  status,
  border = false
}: AvatarProps) => {
  // Get the first character for the fallback
  const fallbackText = username?.[0] || email?.[0] || "U";
  
  // Define size classes based on the size prop
  const sizeClasses = {
    xs: "h-8 w-8",
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32"
  };

  // Define status indicator colors
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    away: "bg-amber-500",
    busy: "bg-red-500"
  };
  
  return (
    <div className="relative inline-block">
      <UIAvatar className={cn(
        sizeClasses[size], 
        border && "ring-2 ring-background",
        className
      )}>
        <AvatarImage src={src} alt={username || "Avatar"} />
        <AvatarFallback className={cn(
          "bg-gray-800",
          fallbackClassName
        )}>
          {fallbackText.toUpperCase()}
        </AvatarFallback>
      </UIAvatar>
      
      {status && (
        <span className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-background",
          statusColors[status],
          size === "xs" ? "h-2 w-2" : "h-3 w-3",
          size === "lg" || size === "xl" ? "h-4 w-4" : ""
        )} />
      )}
    </div>
  );
};

export default Avatar;
