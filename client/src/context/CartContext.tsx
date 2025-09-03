import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/api';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
  };
  quantity: number;
  size: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number, size?: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  getCart: () => Promise<void>;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { token } = useAuth();

  const getCart = async () => {
    if (!token) return;
    try {
      const cartData = await cartService.getCart(token);
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1, size?: string) => {
    if (!token) return;
    if (!size) {
      console.error('Size is required');
      return;
    }
    try {
      await cartService.addToCart(productId, quantity, size, token);
      await getCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!token) return;
    try {
      await cartService.removeFromCart(productId, token);
      await getCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + ((item.product?.price || 0) * item.quantity), 0);

  useEffect(() => {
    if (token) getCart();
  }, [token]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};