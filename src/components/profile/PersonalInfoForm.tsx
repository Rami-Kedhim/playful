
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import AvatarUpload from "./AvatarUpload";
import { Loader2 } from "lucide-react";
import { Gender } from "@/utils/profileUtils";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

// Define the validation schema using zod
const profileFormSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),
  full_name: z.string().max(100, "Full name must be less than 100 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  gender: z.enum(["male", "female", "non-binary", "transgender", "other", "prefer-not-to-say"] as const).optional(),
  sexual_orientation: z.string().optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  avatar_url: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

interface PersonalInfoFormProps {
  profile: any;
  user: any;
  loading: boolean;
  avatarPreview: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
}

// Maximum file size: 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;
// Accepted image types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview} alt="Avatar" />
              <AvatarFallback>{profile?.username?.[0] || user?.email?.[0] || "U"}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <FormItem>
                <FormLabel htmlFor="avatar">Profile Photo</FormLabel>
                <FormControl>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*" 
                    onChange={onAvatarChange}
                    className="cursor-pointer"
                  />
                </FormControl>
                <p className="text-xs text-gray-400 mt-1">
                  Recommended: Square JPG or PNG, max 1MB
                </p>
                {form.formState.errors.avatar_url && (
                  <FormMessage>{form.formState.errors.avatar_url.message}</FormMessage>
                )}
              </FormItem>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Tell others about yourself..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="transgender">Transgender</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sexual_orientation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sexual Orientation</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="City, Country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
};

export default PersonalInfoForm;
