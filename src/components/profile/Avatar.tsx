
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  username?: string;
  email?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackClassName?: string;
}

const Avatar = ({ 
  src, 
  username, 
  email, 
  size = "md", 
  className,
  fallbackClassName 
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
  
  return (
    <UIAvatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt={username || "Avatar"} />
      <AvatarFallback className={fallbackClassName}>
        {fallbackText.toUpperCase()}
      </AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
