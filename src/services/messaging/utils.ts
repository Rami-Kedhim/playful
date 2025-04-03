
// Helper function to determine user type
export const determineUserType = (profileData: any): "creator" | "escort" | "user" => {
  if (!profileData) return "user";
  if (profileData.is_content_creator) return "creator";
  if (profileData.is_escort) return "escort";
  return "user";
};

// Helper to safely get data from query results that might have errors
export const safeGetData = <T>(result: any): T[] => {
  if (result && !result.error && Array.isArray(result.data)) {
    return result.data as T[];
  }
  return [];
};

// Safe accessor for properties that might be undefined
export const safeGet = <T>(obj: any, path: string, defaultValue: T): T => {
  try {
    if (!obj) return defaultValue;
    
    const keys = path.split('.');
    let current: any = obj;
    
    for (const key of keys) {
      if (current === undefined || current === null) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current !== undefined && current !== null ? current : defaultValue;
  } catch (e) {
    console.error(`Error accessing ${path}:`, e);
    return defaultValue;
  }
};
