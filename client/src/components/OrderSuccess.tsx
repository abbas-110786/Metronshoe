import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId && token) {
      orderService.getOrder(orderId, token)
        .then(setOrder)
        .catch(console.error);
    }
  }, [orderId, token]);

  if (!order) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: 'var(--primary-red)', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
        
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId}</p>
          <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>
          <p><strong>Expected Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4>Delivery Address:</h4>
          <p>{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
          <p>📞 {order.shippingAddress.phone}</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/my-orders" className="btn btn-primary">View My Orders</Link>
          <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;