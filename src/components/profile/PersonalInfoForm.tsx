
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import AvatarUpload from "./AvatarUpload";
import BasicInfoFields from "./BasicInfoFields";
import BioField from "./BioField";
import PersonalDetails from "./PersonalDetails";
import LocationField from "./LocationField";
import FormActions from "./FormActions";
import { profileFormSchema, ProfileFormData } from "./ProfileFormSchema";

interface PersonalInfoFormProps {
  profile: any;
  user: any;
  loading: boolean;
  avatarPreview: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

const PersonalInfoForm = ({ 
  profile, 
  user, 
  loading, 
  avatarPreview, 
  handleAvatarChange, 
  onSubmit 
}: PersonalInfoFormProps) => {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username || "",
      full_name: profile?.full_name || "",
      bio: profile?.bio || "",
      gender: profile?.gender || undefined,
      sexual_orientation: profile?.sexual_orientation || undefined,
      location: profile?.location || "",
      avatar_url: profile?.avatar_url || "",
    },
  });

  // Custom avatar validation function
  const validateAvatar = (file: File | null): boolean => {
    if (!file) return true;
    
    const { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } = require("./ProfileFormSchema");
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      form.setError("avatar_url", {
        type: "manual",
        message: "Image must be less than 1MB"
      });
      return false;
    }
    
    // Check file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      form.setError("avatar_url", {
        type: "manual",
        message: "Only JPG, PNG and WEBP formats are supported"
      });
      return false;
    }
    
    return true;
  };

  // Custom avatar change handler with validation
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Clear previous errors
      form.clearErrors("avatar_url");
      
      // Validate the file
      if (validateAvatar(file)) {
        handleAvatarChange(e);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <AvatarUpload
              avatarPreview={avatarPreview}
              username={profile?.username}
              email={user?.email}
              onAvatarChange={onAvatarChange}
              error={form.formState.errors.avatar_url?.message?.toString()}
            />
            
            <BasicInfoFields />
            <BioField />
            <PersonalDetails />
            <LocationField />
          </div>
          
          <FormActions loading={loading} />
        </form>
      </Form>
    </FormProvider>
  );
};

export default PersonalInfoForm;
