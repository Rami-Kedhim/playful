
import { useState, useEffect, useMemo } from 'react';
import { serviceCategories } from '@/data/serviceCategories';
import { groupServicesByCategory } from '@/utils/serviceUtils';

const useServices = (services: string[] = []) => {
  // Handle empty services gracefully
  const safeServices = services || [];
  
  // Group services by category
  const servicesByCategory = useMemo(() => 
    groupServicesByCategory(safeServices), [safeServices]);
  
  // Get categories that have services
  const categoriesWithServices = useMemo(() => 
    serviceCategories.filter(category => 
      servicesByCategory[category.id]?.length > 0
    ), [servicesByCategory]);
  
  // Get category names
  const categoryNames = useMemo(() => 
    categoriesWithServices.map(category => category.name), 
    [categoriesWithServices]);
  
  // Check if escort has any services
  const hasServices = useMemo(() => 
    safeServices.length > 0 && categoriesWithServices.length > 0,
    [safeServices, categoriesWithServices]);
  
  return {
    servicesByCategory,
    categoriesWithServices,
    categoryNames,
    hasServices
  };
};

export default useServices;
