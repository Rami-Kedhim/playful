
/**
 * Utility to test the virtual content flow
 */
import { logContentAction, logContentFlow } from "./debugUtils";

export const testContentFlow = (contentId: string): void => {
  logContentFlow('Starting automated flow test', contentId);
  
  // Log the current state
  const contentElement = document.querySelector(`[data-content-id="${contentId}"]`);
  const unlockButton = document.querySelector(`[data-testid="unlock-button-${contentId}"]`);
  
  if (!contentElement) {
    logContentFlow('Test failed', contentId, { error: 'Content element not found' });
    return;
  }
  
  const isUnlocked = contentElement.getAttribute('data-unlocked') === 'true';
  
  logContentFlow('Content state check', contentId, { 
    isUnlocked,
    elementFound: !!contentElement,
    unlockButtonFound: !!unlockButton 
  });
  
  // If the unlock button exists, we can simulate clicking it
  if (unlockButton && !isUnlocked) {
    logContentFlow('Simulating unlock button click', contentId);
    // Note: This would actually trigger the unlock flow in a real test
    // (unlockButton as HTMLButtonElement).click();
  }
};

export const testContentGallery = (): void => {
  logContentAction('Testing content gallery', {});
  
  const contentTabs = document.querySelector('[data-testid="content-tabs"]');
  const photoTab = document.querySelector('[data-testid="photo-tab"]');
  const videoTab = document.querySelector('[data-testid="video-tab"]');
  const messageTab = document.querySelector('[data-testid="message-tab"]');
  
  logContentAction('Content tabs check', {
    tabsFound: !!contentTabs,
    photoTabFound: !!photoTab,
    videoTabFound: !!videoTab,
    messageTabFound: !!messageTab
  });
  
  // Check content grids
  const contentGrids = document.querySelectorAll('[data-testid="virtual-content-grid"]');
  logContentAction('Content grids check', { 
    gridsFound: contentGrids.length 
  });
};
