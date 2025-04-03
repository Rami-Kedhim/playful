
import { ContentItem } from "@/services/contentService";
import { z } from "zod";

export type ContentStatus = "published" | "draft" | "scheduled";
export type SortOption = "newest" | "oldest" | "title_asc" | "title_desc" | "most_viewed" | "least_viewed";

// Content error types for better error handling
export type ContentErrorType = 
  | "fetch_error" 
  | "create_error" 
  | "update_error" 
  | "delete_error" 
  | "permission_error"
  | "validation_error";

export interface ContentError extends Error {
  type: ContentErrorType;
  details?: unknown;
}

export interface ContentFilters {
  status: ContentStatus;
  searchQuery: string;
  contentType?: string | undefined;
  sort: SortOption;
}

// Make a partial version of ContentFilters for easier updates
export type PartialContentFilters = Partial<ContentFilters>;

// Zod schema for content filters validation
export const contentFiltersSchema = z.object({
  status: z.enum(["published", "draft", "scheduled"]),
  searchQuery: z.string(),
  contentType: z.string().optional(),
  sort: z.enum([
    "newest", "oldest", "title_asc", "title_desc", 
    "most_viewed", "least_viewed"
  ])
});

export interface UseContentFiltersReturn {
  filters: ContentFilters;
  updateFilters: (newFilters: PartialContentFilters) => void;
  filteredContent: (content: ContentItem[]) => ContentItem[];
}

// Import ContentService types directly
import type { ContentCreateInput, ContentUpdateInput } from "@/services/contentService";

export interface UseContentActionsReturn {
  addContent: (newContent: ContentCreateInput) => Promise<ContentItem | undefined>;
  editContent: (updatedContent: ContentUpdateInput) => Promise<ContentItem | undefined>;
  removeContent: (id: string) => Promise<void>;
  publishDraft: (id: string) => Promise<ContentItem | undefined>;
}

export interface UseCreatorContentReturn extends UseContentFiltersReturn, UseContentActionsReturn {
  content: ContentItem[];
  loading: boolean;
  error: ContentError | null;
  refresh: () => Promise<void>; // Method to refresh content
}
