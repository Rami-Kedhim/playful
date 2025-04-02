
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import AvatarUpload from "./AvatarUpload";

interface ProfileImageUploaderProps {
  name: string;
  label?: string;
  hint?: string;
  previewUrl: string;
  username?: string;
  email?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  disabled?: boolean;
  uploadProgress?: number;
}

const ProfileImageUploader = ({
  name,
  label = "Profile Image",
  hint,
  previewUrl,
  username,
  email,
  onChange,
  onRemove,
  disabled = false,
  uploadProgress
}: ProfileImageUploaderProps) => {
  const { control, formState } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabled) setIsDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabled) setIsDragging(true);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDragging(false);
                
                if (disabled) return;
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept = 'image/*';
                  
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(e.dataTransfer.files[0]);
                  fileInput.files = dataTransfer.files;
                  
                  onChange({ target: fileInput } as unknown as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              className={`${isDragging ? 'border-primary bg-primary/5' : ''}`}
            >
              <AvatarUpload
                avatarPreview={previewUrl}
                username={username}
                email={email}
                onAvatarChange={onChange}
                onAvatarRemove={onRemove}
                error={formState.errors[name]?.message?.toString()}
                disabled={disabled}
                uploadProgress={uploadProgress}
              />
            </div>
          </FormControl>
          {hint && <p className="text-sm text-muted-foreground mt-1">{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProfileImageUploader;
