
import { toast } from "sonner";

// Content types that require moderation
export type ContentType = 'profile' | 'message' | 'content' | 'comment';

// Report status values
export type ReportStatus = 'pending' | 'reviewed' | 'actioned' | 'dismissed';

// Content report interface
export interface ContentReport {
  id: string;
  contentId: string;
  contentType: ContentType;
  reason: string;
  details?: string;
  reporterId: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
  reviewedBy?: string;
  actionTaken?: string;
}

// Word filter types
export type FilterSeverity = 'low' | 'medium' | 'high';

// Content filter settings
export interface ContentFilterSettings {
  enabled: boolean;
  autoRejectHigh: boolean;
  autoFlagMedium: boolean;
  notifyOnLow: boolean;
  customWordList: string[];
}

// Default filter settings
const defaultFilterSettings: ContentFilterSettings = {
  enabled: true,
  autoRejectHigh: true,
  autoFlagMedium: true,
  notifyOnLow: true,
  customWordList: []
};

/**
 * Content moderation service for filtering and processing user-generated content
 */
class ModerationService {
  private filterSettings: ContentFilterSettings;
  
  constructor(settings: Partial<ContentFilterSettings> = {}) {
    this.filterSettings = {
      ...defaultFilterSettings,
      ...settings
    };
  }
  
  /**
   * Filter content for prohibited words and phrases
   * Returns the filtered content and a flag if blocked words were found
   */
  public filterContent(content: string): { 
    filteredContent: string; 
    isBlocked: boolean;
    severity: FilterSeverity | null;
  } {
    if (!this.filterSettings.enabled || !content) {
      return { filteredContent: content, isBlocked: false, severity: null };
    }
    
    // In a real application, this would use a comprehensive word list
    // and more sophisticated detection algorithms
    const highSeverityWords = ["extremely-inappropriate-word"];
    const mediumSeverityWords = ["inappropriate-word"];
    const lowSeverityWords = ["questionable-word"];
    const customWords = this.filterSettings.customWordList;
    
    // Combine all word lists for filtering
    const allBlockedWords = [
      ...highSeverityWords, 
      ...mediumSeverityWords,
      ...lowSeverityWords,
      ...customWords
    ];
    
    // Simple word replacement with asterisks
    let filteredContent = content;
    let isBlocked = false;
    let highestSeverity: FilterSeverity | null = null;
    
    // Check for high severity words
    if (highSeverityWords.some(word => content.toLowerCase().includes(word))) {
      isBlocked = this.filterSettings.autoRejectHigh;
      highestSeverity = 'high';
    }
    // Check for medium severity words
    else if (mediumSeverityWords.some(word => content.toLowerCase().includes(word))) {
      isBlocked = this.filterSettings.autoFlagMedium;
      highestSeverity = 'medium';
    }
    // Check for low severity words
    else if (lowSeverityWords.some(word => content.toLowerCase().includes(word))) {
      highestSeverity = 'low';
    }
    
    // Replace blocked words with asterisks
    allBlockedWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredContent = filteredContent.replace(regex, '*'.repeat(word.length));
    });
    
    return { filteredContent, isBlocked, severity: highestSeverity };
  }
  
  /**
   * Submit a content report to the moderation system
   */
  public async submitReport(report: {
    contentId: string;
    contentType: ContentType;
    reason: string;
    details?: string;
    reporterId: string;
  }): Promise<void> {
    // In a real system, this would send the report to a backend API
    console.log('Content report submitted:', report);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // If required, show notification to user
    toast.success('Report submitted successfully', {
      description: 'Our moderation team will review this content.'
    });
  }
  
  /**
   * Update the content filter settings
   */
  public updateFilterSettings(settings: Partial<ContentFilterSettings>): void {
    this.filterSettings = {
      ...this.filterSettings,
      ...settings
    };
  }
  
  /**
   * Check if content should be pre-moderated before publishing
   */
  public shouldPreModerate(contentType: ContentType, userId: string, content: string): boolean {
    // In a real system, this would check user trust score, content type, and apply more rules
    const { severity } = this.filterContent(content);
    
    // Pre-moderate if content has medium or high severity issues
    return severity === 'medium' || severity === 'high';
  }
}

// Export singleton instance
export const moderationService = new ModerationService();
