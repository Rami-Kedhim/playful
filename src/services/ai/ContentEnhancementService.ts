
import { toast } from "@/hooks/use-toast";

/**
 * Enhancement types available
 */
export enum EnhancementType {
  PHOTO_RETOUCH = 'photo_retouch',
  BACKGROUND_IMPROVE = 'background_improve',
  LIGHTING_CORRECTION = 'lighting_correction',
  COLOR_ENHANCEMENT = 'color_enhancement',
  COMPOSITION_FIX = 'composition_fix',
  NOISE_REDUCTION = 'noise_reduction',
  RESOLUTION_UPSCALE = 'resolution_upscale',
  VIDEO_STABILIZATION = 'video_stabilization',
  VIDEO_COLOR_GRADE = 'video_color_grade'
}

/**
 * Enhancement result
 */
export interface EnhancementResult {
  success: boolean;
  originalUrl: string;
  enhancedUrl?: string;
  enhancementType: EnhancementType;
  enhancementLevel: number; // 1-10 scale
  processingTime: number; // in ms
  error?: string;
}

/**
 * Enhancement options
 */
export interface EnhancementOptions {
  level: number; // 1-10 scale
  preserveIdentity: boolean; // Important for verification purposes
  preserveOriginal: boolean; // Keep both versions
}

/**
 * Content Enhancement Service
 * Provides AI-powered enhancement of user-submitted content
 * WITHOUT generating fake/synthetic content
 */
export class ContentEnhancementService {
  private static instance: ContentEnhancementService;
  private allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
  private maxFileSizeMB = 25;

  private constructor() {}

  public static getInstance(): ContentEnhancementService {
    if (!ContentEnhancementService.instance) {
      ContentEnhancementService.instance = new ContentEnhancementService();
    }
    return ContentEnhancementService.instance;
  }

  /**
   * Get available enhancement options for a file
   * @param fileType The MIME type of the file
   */
  public getAvailableEnhancements(fileType: string): EnhancementType[] {
    if (!this.allowedFileTypes.includes(fileType)) {
      return [];
    }

    if (fileType.startsWith('image/')) {
      return [
        EnhancementType.PHOTO_RETOUCH,
        EnhancementType.BACKGROUND_IMPROVE,
        EnhancementType.LIGHTING_CORRECTION,
        EnhancementType.COLOR_ENHANCEMENT,
        EnhancementType.COMPOSITION_FIX,
        EnhancementType.NOISE_REDUCTION,
        EnhancementType.RESOLUTION_UPSCALE
      ];
    }

    if (fileType.startsWith('video/')) {
      return [
        EnhancementType.VIDEO_STABILIZATION,
        EnhancementType.VIDEO_COLOR_GRADE,
        EnhancementType.LIGHTING_CORRECTION,
        EnhancementType.NOISE_REDUCTION,
        EnhancementType.RESOLUTION_UPSCALE
      ];
    }

    return [];
  }

  /**
   * Enhance an image or video file
   * @param file The file to enhance
   * @param enhancementType The type of enhancement to apply
   * @param options Enhancement options
   */
  public async enhanceContent(
    file: File,
    enhancementType: EnhancementType,
    options: EnhancementOptions = { level: 5, preserveIdentity: true, preserveOriginal: true }
  ): Promise<EnhancementResult> {
    try {
      if (!this.allowedFileTypes.includes(file.type)) {
        throw new Error(`Unsupported file type: ${file.type}`);
      }

      if (file.size > this.maxFileSizeMB * 1024 * 1024) {
        throw new Error(`File too large. Maximum size is ${this.maxFileSizeMB}MB`);
      }

      // Prepare form data for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('enhancement_type', enhancementType);
      formData.append('options', JSON.stringify(options));

      // Show loading toast
      toast({
        title: "Enhancing content",
        description: "Please wait while we enhance your content...",
      });
      
      const startTime = Date.now();

      // This would call the backend API to enhance the content
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }
      
      const data = await response.json();
      
      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Show success toast
      toast({
        title: "Enhancement complete",
        description: `Your content has been enhanced successfully in ${processingTime / 1000} seconds`,
      });
      
      return {
        success: true,
        originalUrl: URL.createObjectURL(file),
        enhancedUrl: data.enhancedUrl,
        enhancementType,
        enhancementLevel: options.level,
        processingTime
      };
    } catch (error) {
      console.error('Error enhancing content:', error);
      
      toast({
        title: "Enhancement failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      
      return {
        success: false,
        originalUrl: URL.createObjectURL(file),
        enhancementType,
        enhancementLevel: options.level,
        processingTime: 0,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }

  /**
   * Check if a file can be enhanced
   */
  public canEnhance(file: File): boolean {
    return this.allowedFileTypes.includes(file.type) && file.size <= this.maxFileSizeMB * 1024 * 1024;
  }
}

export const contentEnhancementService = ContentEnhancementService.getInstance();
export default contentEnhancementService;
