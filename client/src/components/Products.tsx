import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const { category } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts(category);
    setSelectedCategory(category || '');
  }, [category]);

  const fetchProducts = async (cat?: string) => {
    setLoading(true);
    try {
      const data = await productService.getProducts(cat);
      if (data.length === 0) {
        await productService.seedProducts();
        const seededData = await productService.getProducts(cat);
        setProducts(seededData);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      setMessage('Please login to add items to cart');
      return;
    }
    
    try {
      await addToCart(productId);
      setMessage('Item added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding item to cart');
    }
  };

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'sandal': return '👡';
      case 'chappal': return '🩴';
      case 'shoes': return '👟';
      default: return '👟';
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;

  return (
    <div className="products-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-red)' }}>
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}s` : 'All Products'}
      </h2>
      
      {message && <div className={message.includes('Error') ? 'error' : 'success'}>{message}</div>}
      
      <div className="category-filters">
        <button 
          className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => fetchProducts()}
        >
          All
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'sandal' ? 'active' : ''}`}
          onClick={() => fetchProducts('sandal')}
        >
          Sandals
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'chappal' ? 'active' : ''}`}
          onClick={() => fetchProducts('chappal')}
        >
          Chappals
        </button>
        <button 
          className={`filter-btn ${selectedCategory === 'shoes' ? 'active' : ''}`}
          onClick={() => fetchProducts('shoes')}
        >
          Shoes
        </button>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {getProductIcon(product.category)}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price">₹{product.price}</div>
              <p>Sizes: {product.sizes.join(', ')}</p>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;