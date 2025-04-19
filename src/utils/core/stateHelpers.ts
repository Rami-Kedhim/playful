
// Helpers for common state transformations

export const toggleBoolean = (value: boolean): boolean => {
  return !value;
};

export const updateObject = <T>(obj: T, updates: Partial<T>): T => {
  return { ...obj, ...updates };
};
