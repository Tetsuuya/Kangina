import axios from 'axios';

// Interfaces for TypeScript type safety
export interface OrderItem {
  id?: number;
  product: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number;
  status: string;
  created_at: string;
  total_amount: number;
  items: OrderItem[];
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const orderApi = {
    createOrder: async () => {
        const token = localStorage.getItem('accessToken'); // Fix: Use 'accessToken' instead of 'access_token'
      console.log('Token being used:', token);  // Log the token
      
      const fullUrl = `${BASE_URL}/orders/create/`;
      try {
          const response = await axios.post<Order>(fullUrl, {}, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'  // Explicitly set content type
              }
          });
          return response.data;
      } catch (error) {
          if (axios.isAxiosError(error)) {
              console.error('Full error response:', error.response);
              console.error('Error status:', error.response?.status);
              console.error('Error data:', error.response?.data);
              throw new Error(error.response?.data?.detail || 'Failed to create order');
          } else {
              console.error('Unexpected error:', error);
              throw new Error('An unexpected error occurred');
          }
      }
    },
  // Fetch recent orders
  getRecentOrders: async () => {
    try {
      const response = await axios.get<Order[]>(`${BASE_URL}/orders/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching orders:', error.response?.data);
        throw new Error(error.response?.data?.detail || 'Failed to fetch orders');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  },

  // Fetch specific order details
  getOrderDetail: async (orderId: number) => {
    try {
      const response = await axios.get<Order>(`${BASE_URL}/orders/${orderId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching order details:', error.response?.data);
        throw new Error(error.response?.data?.detail || 'Failed to fetch order details');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  }
};