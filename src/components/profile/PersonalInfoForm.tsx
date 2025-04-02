
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import AvatarUpload from "./AvatarUpload";
import { Loader2 } from "lucide-react";

// Define the allowed gender types explicitly
export type Gender = "male" | "female" | "non-binary" | "transgender" | "other" | "prefer-not-to-say";

export interface ProfileFormData {
  username: string;
  full_name: string;
  bio: string;
  gender: Gender;
  sexual_orientation: string;
  location: string;
  avatar_url: string;
}

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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6">
        <AvatarUpload 
          avatarPreview={avatarPreview}
          username={profile?.username}
          email={user?.email}
          onAvatarChange={handleAvatarChange}
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username", { required: "Username is required" })}
              defaultValue={profile?.username || ""}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              {...register("full_name")}
              defaultValue={profile?.full_name || ""}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={4}
            {...register("bio")}
            placeholder="Tell others about yourself..."
            defaultValue={profile?.bio || ""}
          />
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              onValueChange={(value: Gender) => setValue("gender", value)}
              defaultValue={profile?.gender || ""}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="transgender">Transgender</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sexual_orientation">Sexual Orientation</Label>
            <Select 
              onValueChange={(value) => setValue("sexual_orientation", value)}
              defaultValue={profile?.sexual_orientation || ""}
            >
              <SelectTrigger id="sexual_orientation">
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="straight">Straight</SelectItem>
                <SelectItem value="gay">Gay</SelectItem>
                <SelectItem value="lesbian">Lesbian</SelectItem>
                <SelectItem value="bisexual">Bisexual</SelectItem>
                <SelectItem value="pansexual">Pansexual</SelectItem>
                <SelectItem value="asexual">Asexual</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="City, Country"
            defaultValue={profile?.location || ""}
          />
        </div>
      </div>
      
      <CardFooter className="flex justify-end gap-2 mt-6">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </CardFooter>
    </form>
  );
};

export default PersonalInfoForm;
