import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService, productService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '', category: 'sandals', gender: 'men', subcategory: '', price: '', description: '', image: '', sizes: '6,7,8,9,10'
  });
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    if (!token) return;
    try {
      const [usersData, productsData, ordersData] = await Promise.all([
        adminService.getUsers(token),
        productService.getProducts(),
        adminService.getAllOrders(token)
      ]);
      setUsers(usersData);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await adminService.addProduct({
        ...newProduct,
        price: Number(newProduct.price),
        sizes: newProduct.sizes.split(',').map(s => s.trim())
      }, token);
      setNewProduct({ name: '', category: 'sandals', gender: 'men', subcategory: '', price: '', description: '', image: '', sizes: '6,7,8,9,10' });
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!token || !window.confirm('Delete this product?')) return;
    try {
      await adminService.deleteProduct(id, token);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  const handleConfirmProduct = async (id: string, isConfirmed: boolean) => {
    if (!token) return;
    try {
      await adminService.confirmProduct(id, isConfirmed, token);
      fetchData();
    } catch (error) {
      console.error('Error updating product confirmation:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    if (!token) return;
    try {
      await adminService.updateOrderStatus(orderId, status, token);
      fetchData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

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

  if (!user || user.role !== 'admin') return null;

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o: any) => o.orderStatus === 'placed').length,
    totalRevenue: orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0),
    totalProducts: products.length,
    totalUsers: users.length
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, var(--primary-red), var(--primary-blue))', padding: '2rem', borderRadius: '15px', marginBottom: '2rem', color: 'white' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🏪 METRONSHOE Admin</h1>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>Manage your footwear empire</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <h3 style={{ color: 'var(--primary-blue)', margin: '0 0 0.5rem 0' }}>{stats.totalOrders}</h3>
          <p style={{ color: '#666', margin: 0 }}>Total Orders</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
          <h3 style={{ color: 'var(--primary-red)', margin: '0 0 0.5rem 0' }}>{stats.pendingOrders}</h3>
          <p style={{ color: '#666', margin: 0 }}>Pending Orders</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
          <h3 style={{ color: '#10b981', margin: '0 0 0.5rem 0' }}>₹{stats.totalRevenue.toLocaleString()}</h3>
          <p style={{ color: '#666', margin: 0 }}>Total Revenue</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👟</div>
          <h3 style={{ color: 'var(--primary-blue)', margin: '0 0 0.5rem 0' }}>{stats.totalProducts}</h3>
          <p style={{ color: '#666', margin: 0 }}>Products</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
          <h3 style={{ color: 'var(--primary-red)', margin: '0 0 0.5rem 0' }}>{stats.totalUsers}</h3>
          <p style={{ color: '#666', margin: 0 }}>Customers</p>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ color: 'var(--primary-red)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            📋 Active Customer Orders ({orders.length})
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9rem' }}>
            🗑️ Cancelled orders are automatically hidden from this view
          </p>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <p>No orders yet</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem', maxHeight: '500px', overflow: 'auto' }}>
              {orders.map((order: any) => (
                <div key={order._id} style={{ 
                  background: '#f8fafc', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ background: 'var(--primary-blue)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          #{order._id.slice(-8)}
                        </span>
                      </div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-red)' }}>
                        👤 {order.user?.name || 'Unknown User'}
                      </h4>
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                        📧 {order.user?.email || 'N/A'}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>
                          💰 ₹{order.totalAmount}
                        </span>
                        <span style={{ color: '#666' }}>
                          💳 {order.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <select 
                        value={order.orderStatus} 
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          borderRadius: '25px', 
                          border: 'none',
                          backgroundColor: getStatusColor(order.orderStatus),
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="placed">Placed</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>🛍️ Items:</strong> {order.items?.map((item: any) => `${item.product?.name || 'Unknown Product'} (${item.quantity})`).join(', ') || 'No items'}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                      <strong>📍 Address:</strong> {order.shippingAddress?.address || 'N/A'}, {order.shippingAddress?.city || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ color: 'var(--primary-red)', margin: 0 }}>➕ Add New Product</h3>
          </div>
          <form onSubmit={handleAddProduct} style={{ padding: '1.5rem' }}>
            <div className="form-group">
              <label>Name:</label>
              <input value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                <option value="sandals">Sandals</option>
                <option value="chappals">Chappals</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select value={newProduct.gender} onChange={(e) => setNewProduct({...newProduct, gender: e.target.value})}>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
              </select>
            </div>
            {newProduct.category === 'shoes' && (
              <div className="form-group">
                <label>Subcategory:</label>
                <select value={newProduct.subcategory} onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}>
                  <option value="">None</option>
                  <option value="formal">Formal</option>
                  <option value="sport">Sport</option>
                  <option value="casual">Casual</option>
                </select>
              </div>
            )}
            <div className="form-group">
              <label>Price:</label>
              <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ color: 'var(--primary-red)', margin: 0 }}>👥 Customers ({users.length})</h3>
          </div>
          <div style={{ padding: '1.5rem', maxHeight: '400px', overflow: 'auto' }}>
            {users.map((user: any) => (
              <div key={user._id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <strong>{user.name}</strong> - {user.email} ({user.role})
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', background: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ color: 'var(--primary-red)', margin: 0 }}>🛍️ Manage Products ({products.length})</h3>
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {products.map((product: any) => {
              const categoryIcon = product.category === 'sandal' ? '👡' : product.category === 'chappal' ? '🩴' : '👟';
              return (
                <div key={product._id} style={{ 
                  background: '#f8fafc', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{categoryIcon}</div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-blue)' }}>{product.name}</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#666', textTransform: 'capitalize' }}>{product.category}</p>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>₹{product.price}</p>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: product.isConfirmed ? '#10b981' : '#f59e0b',
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem'
                    }}>
                      {product.isConfirmed ? '✓ Confirmed' : '⏳ Pending'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleConfirmProduct(product._id, !product.isConfirmed)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: product.isConfirmed ? '#f59e0b' : '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {product.isConfirmed ? '❌ Unconfirm' : '✓ Confirm'}
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product._id)} 
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      🗑️ Delete Product
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;