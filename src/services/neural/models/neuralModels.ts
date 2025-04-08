
// Update the neural models to fix string vs string[] type issues
// We're just focusing on fixing the type errors here

export const fixNeuralModelsTypes = () => {
  // Convert string to string[] for categories fields
  const convertCategoriesToArray = (categories: string | string[]): string[] => {
    if (!categories) return [];
    return Array.isArray(categories) ? categories : [categories];
  };
  
  // This is a placeholder function that will update any models that have string categories
  // to use string[] categories instead.
  return {
    convertCategoriesToArray
  };
};

// Helper function to ensure categories are always arrays even if they come in as strings
export const ensureCategoriesArrays = (models: any[]): any[] => {
  return models.map(model => {
    if (model.categories && typeof model.categories === 'string') {
      return {
        ...model,
        categories: [model.categories]
      };
    }
    return model;
  });
};

// Make sure any auto-generated models also have proper array types
export const createModel = (data: any) => {
  return {
    ...data,
    categories: Array.isArray(data.categories) ? data.categories : 
      (data.categories ? [data.categories] : [])
  };
};
