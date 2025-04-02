
import Avatar from "./Avatar";
import FileUpload from "./FileUpload";

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
      <Avatar 
        src={avatarPreview} 
        username={username} 
        email={email} 
        size="lg" 
      />
      
      <div className="flex-1">
        <FileUpload
          id="avatar"
          label="Profile Photo"
          accept="image/*"
          onChange={onAvatarChange}
          hint="Recommended: Square JPG or PNG, max 1MB"
          error={error}
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
