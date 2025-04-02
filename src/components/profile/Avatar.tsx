
import { Avatar as UIAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  src: string;
  username?: string;
  email?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = ({ src, username, email, size = "md" }: AvatarProps) => {
  // Get the first character for the fallback
  const fallbackText = username?.[0] || email?.[0] || "U";
  
  // Define size classes based on the size prop
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };
  
  return (
    <UIAvatar className={sizeClasses[size]}>
      <AvatarImage src={src} alt="Avatar" />
      <AvatarFallback>{fallbackText.toUpperCase()}</AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
