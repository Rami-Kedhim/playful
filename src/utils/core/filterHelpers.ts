
// Filtering utilities for personas and other collections

export const filterByLocation = (items: any[], location: string) => {
  return items.filter(item => item.location?.toLowerCase().includes(location.toLowerCase()));
};

export const filterByTag = (items: any[], tag: string) => {
  return items.filter(item => item.tags?.includes(tag));
};
