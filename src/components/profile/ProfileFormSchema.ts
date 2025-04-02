
import { z } from "zod";

// Define the validation schema using zod
export const profileFormSchema = z.object({
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

// Maximum file size: 1MB
export const MAX_FILE_SIZE = 1 * 1024 * 1024;

// Accepted image types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
