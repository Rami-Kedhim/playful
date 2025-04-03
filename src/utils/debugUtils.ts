
/**
 * Utility functions for debugging virtual content flow
 */

export const logContentAction = (action: string, details: Record<string, any>) => {
  console.log(`[VirtualContent] ${action}:`, details);
};

export const logContentError = (action: string, error: unknown) => {
  console.error(`[VirtualContent Error] ${action}:`, error);
};

export const logContentFlow = (step: string, contentId: string, details?: Record<string, any>) => {
  console.log(`[ContentFlow] ${step} - ContentID: ${contentId}`, details || '');
};

