import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="brand-name">METRONSHOE</span>
              <span className="hero-subtitle">{t('heroSubtitle')}</span>
            </h1>
            <p className="hero-description">
              Discover premium footwear that combines style, comfort, and quality. 
              Step into a world where every shoe tells a story of craftsmanship.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="cta-button primary">
                <span>{t('shopNow')}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/products" className="cta-button secondary">
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-shoes">
              <div className="shoe-item shoe-1">👟</div>
              <div className="shoe-item shoe-2">👡</div>
              <div className="shoe-item shoe-3">🩴</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find the perfect footwear for every member of your family</p>
        </div>
        
        <div className="categories-grid">
          <Link to="/products/men" className="category-card modern">
            <div className="card-background"></div>
            <div className="card-content">
              <div className="category-icon">👨</div>
              <h3>{t('men')}</h3>
              <p>Premium collection for men</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
          
          <Link to="/products/women" className="category-card modern">
            <div className="card-background"></div>
            <div className="card-content">
              <div className="category-icon">👩</div>
              <h3>{t('women')}</h3>
              <p>Elegant styles for women</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
          
          <Link to="/products/boys" className="category-card modern">
            <div className="card-background"></div>
            <div className="card-content">
              <div className="category-icon">👦</div>
              <h3>{t('boys')}</h3>
              <p>Trendy shoes for boys</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
          
          <Link to="/products/girls" className="category-card modern">
            <div className="card-background"></div>
            <div className="card-content">
              <div className="category-icon">👧</div>
              <h3>{t('girls')}</h3>
              <p>Beautiful footwear for girls</p>
              <div className="card-arrow">→</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <h4>Free Delivery</h4>
            <p>Free shipping on orders above ₹999</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <h4>Easy Returns</h4>
            <p>30-day hassle-free return policy</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <h4>Premium Quality</h4>
            <p>Handpicked shoes from trusted brands</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💳</div>
            <h4>Secure Payment</h4>
            <p>Multiple payment options available</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;