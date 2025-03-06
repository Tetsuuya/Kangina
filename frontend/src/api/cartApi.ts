import { fetchWithAuth } from './auth'; // Import your auth utility

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

export const getCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/cart/`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addToCart = async (productId: number, quantity: number = 1): Promise<CartItem> => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/cart/add/`, {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity })
    });
    
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId: number): Promise<void> => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/cart/remove/${productId}/`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const updateCartItemQuantity = async (productId: number, quantity: number): Promise<CartItem> => {
  // First remove the item
  await removeFromCart(productId);
  // Then add it back with the new quantity
  return await addToCart(productId, quantity);
};