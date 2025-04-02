
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";

interface AvatarUploadProps {
  avatarPreview: string;
  username?: string;
  email?: string;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const AvatarUpload = ({ avatarPreview, username, email, onAvatarChange, error }: AvatarUploadProps) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarPreview} alt="Avatar" />
        <AvatarFallback>{username?.[0] || email?.[0] || "U"}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <Label htmlFor="avatar" className="block mb-2">Profile Photo</Label>
        <Input 
          id="avatar" 
          type="file" 
          accept="image/*" 
          onChange={onAvatarChange}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-400 mt-1">
          Recommended: Square JPG or PNG, max 1MB
        </p>
        {error && <FormMessage>{error}</FormMessage>}
      </div>
    </div>
  );
};

export default AvatarUpload;
