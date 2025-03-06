import axios from 'axios';
import { Product } from '../api/productApi';  // Adjust import path as needed

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface FavoriteToggleResponse {
  status: string;
}

export const favoriteApi = {
  /**
   * Toggle favorite status for a product
   * @param productId - ID of the product to toggle favorite
   * @returns Promise with toggle response
   */
  toggleFavorite: async (productId: number): Promise<FavoriteToggleResponse> => {
    try {
      const response = await axios.post(
        `${API_URL}/favorites/toggle/${productId}/`, 
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },

  /**
   * Fetch user's favorite products
   * @returns Promise with list of favorite products
   */
  getFavoritesList: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/favorites/favorites_list/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }
};