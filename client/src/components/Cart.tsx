import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const { cart, removeFromCart, cartTotal, getCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    getCart();
  }, [user, navigate]);

  if (!user) return null;

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'sandal': return '👡';
      case 'chappal': return '🩴';
      case 'shoes': return '👟';
      default: return '👟';
    }
  };

  return (
    <div className="cart-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-red)' }}>
        Your Cart
      </h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Your cart is empty</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>
                  {getProductIcon(item.product.category)}
                </div>
                <div>
                  <h4>{item.product.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.product.price} each</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ₹{item.product.price * item.quantity}
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
            Total: ₹{cartTotal}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Proceed to Checkout
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;