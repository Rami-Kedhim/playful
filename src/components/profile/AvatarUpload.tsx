
import { useState } from "react";
import Avatar from "./Avatar";
import FileUpload from "./FileUpload";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AvatarUploadProps {
  avatarPreview: string;
  username?: string;
  email?: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarRemove?: () => void;
  error?: string;
  disabled?: boolean;
}

const AvatarUpload = ({ 
  avatarPreview, 
  username, 
  email, 
  onAvatarChange, 
  onAvatarRemove,
  error,
  disabled = false
}: AvatarUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div 
        className="relative" 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar 
          src={avatarPreview} 
          username={username} 
          email={email} 
          size="lg" 
          className="transition-opacity duration-200 ease-in-out"
        />
        
        {avatarPreview && onAvatarRemove && isHovering && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={onAvatarRemove}
            disabled={disabled}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      <div className="flex-1">
        <FileUpload
          id="avatar"
          label="Profile Photo"
          accept="image/*"
          onChange={onAvatarChange}
          hint="Recommended: Square JPG or PNG, max 1MB"
          error={error}
          disabled={disabled}
        />
        
        {avatarPreview && (
          <p className="text-xs text-muted-foreground mt-2">
            Your profile photo helps others recognize you
          </p>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
