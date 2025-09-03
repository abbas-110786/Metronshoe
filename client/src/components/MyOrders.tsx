import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      orderService.getMyOrders(token)
        .then(setOrders)
        .catch(console.error);
    }
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return '#f59e0b';
      case 'confirmed': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'placed': return '📋';
      case 'confirmed': return '✅';
      case 'shipped': return '🚚';
      case 'delivered': return '📦';
      case 'cancelled': return '❌';
      default: return '⏳';
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--primary-red)', marginBottom: '2rem' }}>My Orders</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No orders found</p>
        </div>
      ) : (
        orders.map((order: any) => (
          <div key={order._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '10px', marginBottom: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h4>Order #{order._id.slice(-8)}</h4>
                <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  background: getStatusColor(order.orderStatus), 
                  color: 'white', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {getStatusIcon(order.orderStatus)} {order.orderStatus.toUpperCase()}
                </div>
                {order.orderStatus === 'cancelled' && (
                  <div style={{ 
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: '5px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    ⚠️ This order has been cancelled by admin
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div>
                <h5>Items:</h5>
                {order.items?.map((item: any, index: number) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                    <span>{item.product?.name || 'Product unavailable'} (Size: {item.size || 'Not specified'}) x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                )) || []}
              </div>
              
              <div>
                <p><strong>Total: ₹{order.totalAmount}</strong></p>
                <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
                <p><strong>Tracking ID:</strong> {order.trackingId}</p>
                {order.orderStatus === 'shipped' && (
                  <p><strong>Expected Delivery:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                )}
              </div>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '5px' }}>
              <h6>Delivery Address:</h6>
              <p>{order.shippingAddress.name}, {order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;