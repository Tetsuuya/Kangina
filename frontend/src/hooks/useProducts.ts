// src/hooks/useProducts.ts

import { useQuery } from '@tanstack/react-query';
import { useProductStore } from '../store/productStore';
import { productApi, CategoryOption, Product } from '../api/productApi';

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
  const { selectedCategory, setSelectedCategory } = useProductStore();
  
  const categoriesQuery = useCategories();
  const productsQuery = useProductsByCategory(selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return {
    // Queries
    categoriesQuery,
    productsQuery,
    
    // State
    selectedCategory,
    
    // Actions
    handleCategorySelect,
  };
};