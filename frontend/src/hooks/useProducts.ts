// src/hooks/useProducts.ts

import { useQuery } from '@tanstack/react-query';
import { productApi, CategoryOption, Product } from '../api/productApi';
import { useState } from 'react';

export const useCategories = () => {
  return useQuery<CategoryOption[], Error>({
    queryKey: ['categories'],
    queryFn: productApi.getCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', category],
    queryFn: () => productApi.getProductsByCategory(category),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useProducts = () => {
  // Use local state instead of Zustand
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const categoriesQuery = useCategories();
  const productsQuery = useProductsByCategory(selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const resetProductStore = () => {
    setSelectedCategory('ALL');
  };

  return {
    // Queries
    categoriesQuery,
    productsQuery,
    
    // State
    selectedCategory,
    
    // Actions
    handleCategorySelect,
    resetProductStore,
  };
};