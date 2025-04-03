
/**
 * Utility to check browser compatibility for virtual content features
 */

export interface BrowserInfo {
  name: string;
  version: string;
  mobile: boolean;
  os: string;
}

export const detectBrowser = (): BrowserInfo => {
  const userAgent = navigator.userAgent;
  let name = "Unknown";
  let version = "Unknown";
  let mobile = false;
  let os = "Unknown";
  
  // Detect mobile
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    mobile = true;
  }
  
  // Detect OS
  if (/Win/i.test(userAgent)) {
    os = "Windows";
  } else if (/Mac/i.test(userAgent)) {
    os = "MacOS";
  } else if (/Linux/i.test(userAgent)) {
    os = "Linux";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    os = "iOS";
  } else if (/Android/i.test(userAgent)) {
    os = "Android";
  }
  
  // Detect browser
  if (/Firefox/i.test(userAgent)) {
    name = "Firefox";
    version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/Chrome/i.test(userAgent) && !/Chromium|Edge|OPR|Edg/i.test(userAgent)) {
    name = "Chrome";
    version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/Safari/i.test(userAgent) && !/Chrome|Chromium|Edge|OPR|Edg/i.test(userAgent)) {
    name = "Safari";
    version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/Edge|Edg/i.test(userAgent)) {
    name = "Edge";
    version = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 
              userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
  } else if (/OPR/i.test(userAgent)) {
    name = "Opera";
    version = userAgent.match(/OPR\/([0-9.]+)/)?.[1] || "Unknown";
  }
  
  return { name, version, mobile, os };
};

export const checkLocalStorageSupport = (): boolean => {
  try {
    const testKey = 'test_storage_key';
    localStorage.setItem(testKey, 'test');
    const result = localStorage.getItem(testKey) === 'test';
    localStorage.removeItem(testKey);
    return result;
  } catch (e) {
    return false;
  }
};

export const logBrowserCompatibility = (): void => {
  const browser = detectBrowser();
  const localStorageSupport = checkLocalStorageSupport();
  
  console.log('[Browser Compatibility]', {
    browser: browser.name,
    version: browser.version,
    os: browser.os,
    mobile: browser.mobile,
    localStorage: localStorageSupport,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  });
};

export const runCompatibilityCheck = (): void => {
  logBrowserCompatibility();
  
  // Check for features required by virtual content
  const features = {
    localStorage: checkLocalStorageSupport(),
    fetch: typeof fetch !== 'undefined',
    json: typeof JSON !== 'undefined',
    promises: typeof Promise !== 'undefined'
  };
  
  console.log('[Feature Support]', features);
  
  // Warn about potential issues
  if (!features.localStorage) {
    console.warn('LocalStorage not supported - content unlocking will not persist!');
  }
};

