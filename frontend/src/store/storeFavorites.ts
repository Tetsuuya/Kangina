import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { favoriteApi } from '../api/favorites';
import { Product } from '../api/productApi';
import { toast } from 'sonner';

interface FavoriteState {
  favorites: Product[];
  isLoading: boolean;
  error: string | null;
  
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  removeFavorite: (productId: number) => Promise<void>;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isLoading: false,
      error: null,

      /**
       * Fetch user's favorite products
       */
      fetchFavorites: async () => {
        set({ isLoading: true, error: null });
        try {
          const favorites = await favoriteApi.getFavoritesList();
          set({ favorites, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to fetch favorites';
          set({ error: errorMessage, isLoading: false });
          toast.error(errorMessage);
        }
      },

      /**
       * Toggle favorite status for a product
       * @param productId - ID of the product to toggle
       */
      toggleFavorite: async (productId: number) => {
        try {
          const response = await favoriteApi.toggleFavorite(productId);
          
          set(state => {
            const isFavoriteNow = state.favorites.some(p => p.id === productId);
            
            // If currently a favorite, remove it
            if (isFavoriteNow) {
              return { 
                favorites: state.favorites.filter(p => p.id !== productId),
                isLoading: false 
              };
            }
            
            // If not a favorite, trigger a full refresh to ensure consistency
            return { isLoading: true };
          });

          // Refetch favorites to ensure consistency
          await get().fetchFavorites();

          // Show appropriate toast message
          toast.success(
            response.status === 'added to favorites' 
              ? 'Added to favorites' 
              : 'Removed from favorites'
          );
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to toggle favorite';
          set({ error: errorMessage });
          toast.error(errorMessage);
        }
      },

      /**
       * Check if a product is in favorites
       * @param productId - ID of the product to check
       * @returns boolean indicating favorite status
       */
      isFavorite: (productId: number) => {
        return get().favorites.some(product => product.id === productId);
      },

      /**
       * Remove a product from favorites manually
       * @param productId - ID of the product to remove
       */
      removeFavorite: async (productId: number) => {
        try {
          await favoriteApi.toggleFavorite(productId);
          
          set(state => ({
            favorites: state.favorites.filter(p => p.id !== productId),
            isLoading: false
          }));

          toast.success('Removed from favorites');
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to remove from favorites';
          set({ error: errorMessage });
          toast.error(errorMessage);
        }
      }
    }),
    {
      name: 'favorite-storage',
      // Optional: Define which parts of the state to persist
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);