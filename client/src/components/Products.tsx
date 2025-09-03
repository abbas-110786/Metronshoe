import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface Product {
  _id: string;
  name: string;
  category: string;
  gender: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  isConfirmed: boolean;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});
  const { category } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    if (category) {
      setSelectedGender(category);
      fetchProducts({ gender: category });
    } else {
      fetchProducts();
    }
  }, [category]);

  const fetchProducts = async (filters?: { gender?: string; category?: string; subcategory?: string }) => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      if (data.length === 0) {
        await productService.seedProducts();
        const seededData = await productService.getProducts();
        setProducts(applyFilters(seededData, filters));
      } else {
        setProducts(applyFilters(data, filters));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (data: any[], filters?: { gender?: string; category?: string; subcategory?: string }) => {
    if (!filters) return data;
    return data.filter((p: any) => {
      if (filters.gender && p.gender !== filters.gender) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.subcategory && p.subcategory !== filters.subcategory) return false;
      return true;
    });
  };

  const handleAddToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      setMessage('Please login to add items to cart');
      return;
    }
    
    const selectedSize = selectedSizes[productId];
    if (!selectedSize) {
      setMessage('Please select a size');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    try {
      await addToCart(productId, quantity, selectedSize);
      setMessage(`${quantity} item(s) added to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding item to cart');
      setTimeout(() => setMessage(''), 3000);
    }
  };
  
  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'sandals': return '👡';
      case 'chappals': return '🩴';
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
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-red)' }}>Gender</h4>
          <button 
            className={`filter-btn ${selectedGender === '' ? 'active' : ''}`}
            onClick={() => { setSelectedGender(''); fetchProducts(); }}
          >
            {t('allProducts')}
          </button>
          <button 
            className={`filter-btn ${selectedGender === 'men' ? 'active' : ''}`}
            onClick={() => { setSelectedGender('men'); fetchProducts({ gender: 'men' }); }}
          >
            {t('men')}
          </button>
          <button 
            className={`filter-btn ${selectedGender === 'women' ? 'active' : ''}`}
            onClick={() => { setSelectedGender('women'); fetchProducts({ gender: 'women' }); }}
          >
            {t('women')}
          </button>
          <button 
            className={`filter-btn ${selectedGender === 'boys' ? 'active' : ''}`}
            onClick={() => { setSelectedGender('boys'); fetchProducts({ gender: 'boys' }); }}
          >
            {t('boys')}
          </button>
          <button 
            className={`filter-btn ${selectedGender === 'girls' ? 'active' : ''}`}
            onClick={() => { setSelectedGender('girls'); fetchProducts({ gender: 'girls' }); }}
          >
            {t('girls')}
          </button>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-blue)' }}>Category</h4>
          <button 
            className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => { setSelectedCategory(''); fetchProducts({ gender: selectedGender }); }}
          >
            All Categories
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'sandals' ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('sandals'); fetchProducts({ gender: selectedGender, category: 'sandals' }); }}
          >
            {t('sandals')}
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'chappals' ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('chappals'); fetchProducts({ gender: selectedGender, category: 'chappals' }); }}
          >
            {t('chappals')}
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'shoes' ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('shoes'); fetchProducts({ gender: selectedGender, category: 'shoes' }); }}
          >
            {t('shoes')}
          </button>
        </div>
        
        {selectedCategory === 'shoes' && selectedGender === 'men' && (
          <div>
            <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-red)' }}>Men Shoes Type</h4>
            <button 
              className={`filter-btn ${selectedSubcategory === '' ? 'active' : ''}`}
              onClick={() => { setSelectedSubcategory(''); fetchProducts({ gender: 'men', category: 'shoes' }); }}
            >
              All Shoes
            </button>
            <button 
              className={`filter-btn ${selectedSubcategory === 'formal' ? 'active' : ''}`}
              onClick={() => { setSelectedSubcategory('formal'); fetchProducts({ gender: 'men', category: 'shoes', subcategory: 'formal' }); }}
            >
              {t('formal')}
            </button>
            <button 
              className={`filter-btn ${selectedSubcategory === 'sport' ? 'active' : ''}`}
              onClick={() => { setSelectedSubcategory('sport'); fetchProducts({ gender: 'men', category: 'shoes', subcategory: 'sport' }); }}
            >
              {t('sport')}
            </button>
          </div>
        )}
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
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  {t('selectSize')}:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(product._id, size)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: selectedSizes[product._id] === size ? '2px solid var(--primary-red)' : '1px solid #ddd',
                        background: selectedSizes[product._id] === size ? 'var(--primary-red)' : 'white',
                        color: selectedSizes[product._id] === size ? 'white' : 'var(--text-primary)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
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
                {product.isConfirmed ? `✅ ${t('adminConfirmed')}` : `⏳ ${t('pendingConfirmation')}`}
              </div>
              {user?.role !== 'admin' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    defaultValue="1" 
                    id={`qty-${product._id}`}
                    style={{ 
                      width: '60px', 
                      padding: '0.5rem', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}
                  />
                  <button 
                    className="btn btn-primary" 
                    style={{ 
                      flex: 1,
                      opacity: product.isConfirmed ? 1 : 0.6,
                      cursor: product.isConfirmed ? 'pointer' : 'not-allowed'
                    }}
                    onClick={() => {
                      if (product.isConfirmed) {
                        const selectedSize = selectedSizes[product._id];
                        if (!selectedSize) {
                          setMessage('Please select a size first');
                          setTimeout(() => setMessage(''), 3000);
                          return;
                        }
                        const qty = parseInt((document.getElementById(`qty-${product._id}`) as HTMLInputElement)?.value || '1');
                        handleAddToCart(product._id, qty);
                      }
                    }}
                    disabled={!product.isConfirmed}
                  >
                    {product.isConfirmed ? t('addToCart') : t('awaitingConfirmation')}
                  </button>
                </div>
              )}
              {user?.role === 'admin' && (
                <div style={{ 
                  padding: '0.75rem', 
                  background: '#f3f4f6', 
                  borderRadius: '5px', 
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  Admin View Only
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;