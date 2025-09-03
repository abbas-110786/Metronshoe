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
  
  addToCart: async (productId: string, quantity: number, size: string, token: string) => {
    const response = await api.post('/cart/add', 
      { productId, quantity, size },
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

export const adminService = {
  getUsers: async (token: string) => {
    const response = await api.get('/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  addProduct: async (product: any, token: string) => {
    const response = await api.post('/admin/products', product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  updateProduct: async (id: string, product: any, token: string) => {
    const response = await api.put(`/admin/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  deleteProduct: async (id: string, token: string) => {
    const response = await api.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  getAllOrders: async (token: string) => {
    const response = await api.get('/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  updateOrderStatus: async (id: string, status: string, token: string) => {
    const response = await api.put(`/admin/orders/${id}/status`, 
      { orderStatus: status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
  
  confirmProduct: async (id: string, isConfirmed: boolean, token: string) => {
    const response = await api.put(`/admin/products/${id}/confirm`,
      { isConfirmed },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};

export const orderService = {
  createOrder: async (orderData: any, token: string) => {
    const response = await api.post('/orders/create', orderData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  getMyOrders: async (token: string) => {
    const response = await api.get('/orders/my-orders', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  
  getOrder: async (id: string, token: string) => {
    const response = await api.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};