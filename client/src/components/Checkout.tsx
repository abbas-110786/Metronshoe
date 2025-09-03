import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Checkout: React.FC = () => {
  const { cart, cartTotal } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.product?._id,
          quantity: item.quantity,
          price: item.product?.price || 0,
          size: item.size
        })),
        totalAmount: cartTotal,
        shippingAddress,
        paymentMethod
      };
      
      const order = await orderService.createOrder(orderData, token);
      navigate(`/order-success/${order._id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem' }}>{t('checkout')}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3>{t('shippingAddress')}</h3>
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px' }}>
            <div className="form-group">
              <label>{t('fullName')}:</label>
              <input
                value={shippingAddress.name}
                onChange={(e) => setShippingAddress({...shippingAddress, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('phone')}:</label>
              <input
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('address')}:</label>
              <textarea
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                required
                style={{ minHeight: '80px', resize: 'vertical' }}
              />
            </div>
            <div className="form-group">
              <label>{t('city')}:</label>
              <input
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>{t('pincode')}:</label>
              <input
                value={shippingAddress.pincode}
                onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                required
              />
            </div>
            
            <h3>{t('paymentMethod')}</h3>
            <div style={{ marginBottom: '1rem' }}>
              {[
                { value: 'cod', label: `💵 ${t('cashOnDelivery')}` },
                { value: 'gpay', label: `🟢 ${t('googlePay')}` },
                { value: 'paytm', label: `🔵 ${t('paytm')}` },
                { value: 'phonepe', label: `🟣 ${t('phonePe')}` },
                { value: 'amazonpay', label: `🟠 ${t('amazonPay')}` },
                { value: 'upi', label: `📱 ${t('otherUpi')}` },
                { value: 'card', label: `💳 ${t('creditDebitCard')}` },
                { value: 'netbanking', label: `🏦 ${t('netBanking')}` },
                { value: 'wallet', label: `👛 ${t('digitalWallet')}` },
                { value: 'emi', label: `📊 ${t('emiOptions')}` }
              ].map(method => (
                <label key={method.value} style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem', border: paymentMethod === method.value ? '2px solid var(--primary-blue)' : '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {method.label}
                </label>
              ))}
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? t('placingOrder') : `${t('placeOrder')} - ₹${cartTotal}`}
            </button>
          </form>
        </div>
        
        <div>
          <h3>{t('orderSummary')}</h3>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '10px' }}>
            {cart.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <strong>{item.product?.name || 'Product unavailable'}</strong>
                  <p>Qty: {item.quantity} | Size: {item.size || 'Not specified'}</p>
                </div>
                <div>₹{(item.product?.price || 0) * item.quantity}</div>
              </div>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>{t('total')}:</span>
              <span>₹{cartTotal}</span>
            </div>
            <p style={{ marginTop: '1rem', color: '#666' }}>
              🚚 {t('freeDelivery')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;