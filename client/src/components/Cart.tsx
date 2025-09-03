import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const { cart, removeFromCart, cartTotal, getCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

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
        {t('yourCart')}
      </h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>{t('cartEmpty')}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/products')}
          >
            {t('continueShopping')}
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>
                  {getProductIcon(item.product?.category || 'shoes')}
                </div>
                <div>
                  <h4>{item.product?.name || t('productUnavailable')}</h4>
                  <p>{t('quantity')}: {item.quantity}</p>
                  <p>{t('size')}: {item.size || 'Not specified'}</p>
                  <p>{t('price')}: ₹{item.product?.price || 0} {t('each')}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ₹{(item.product?.price || 0) * item.quantity}
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={() => removeFromCart(`${item.product?._id || item._id}/${item.size}`)}
                >
                  {t('remove')}
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
            {t('total')}: ₹{cartTotal}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ marginRight: '1rem' }}
              onClick={() => navigate('/checkout')}
            >
              {t('proceedToCheckout')}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              {t('continueShopping')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;