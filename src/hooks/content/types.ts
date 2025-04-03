
import { ContentItem, ContentCreateInput, ContentUpdateInput } from "@/services/contentService";

export type ContentStatus = "published" | "draft" | "scheduled";
export type SortOption = "newest" | "oldest" | "title_asc" | "title_desc" | "most_viewed" | "least_viewed";

export interface ContentFilters {
  status: ContentStatus;
  searchQuery: string;
  contentType?: string;
  sort: SortOption;
}

export interface UseContentFiltersReturn {
  filters: ContentFilters;
  updateFilters: (newFilters: Partial<ContentFilters>) => void;
  filteredContent: (content: ContentItem[]) => ContentItem[];
}

export interface UseContentActionsReturn {
  addContent: (newContent: ContentCreateInput) => Promise<ContentItem | undefined>;
  editContent: (updatedContent: ContentUpdateInput) => Promise<ContentItem | undefined>;
  removeContent: (id: string) => Promise<void>;
  publishDraft: (id: string) => Promise<ContentItem | undefined>;
}

export interface UseCreatorContentReturn extends UseContentFiltersReturn, UseContentActionsReturn {
  content: ContentItem[];
  loading: boolean;
  error: Error | null;
}
