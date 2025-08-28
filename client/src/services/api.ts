import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  }
};

export const productService = {
  getProducts: async (category?: string) => {
    const response = await api.get(`/products${category ? `?category=${category}` : ''}`);
    return response.data;
  },
  
  seedProducts: async () => {
    const response = await api.post('/products/seed');
    return response.data;
  }
};

export const cartService = {
  getCart: async (token: string) => {
    const response = await api.get('/cart', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  addToCart: async (productId: string, quantity: number, token: string) => {
    const response = await api.post('/cart/add', 
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
  
  removeFromCart: async (productId: string, token: string) => {
    const response = await api.delete(`/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};