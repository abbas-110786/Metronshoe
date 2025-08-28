import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>METRONSHOE</h1>
        <p>Step into Style, Walk with Confidence</p>
        <Link to="/products" className="btn btn-primary">Shop Now</Link>
      </div>
      
      <div className="categories">
        <Link to="/products/sandal" className="category-card">
          <div className="product-image">👡</div>
          <h3>Sandals</h3>
          <p>Comfortable and stylish sandals for every occasion</p>
        </Link>
        
        <Link to="/products/chappal" className="category-card">
          <div className="product-image">🩴</div>
          <h3>Chappals</h3>
          <p>Traditional and modern chappals for daily wear</p>
        </Link>
        
        <Link to="/products/shoes" className="category-card">
          <div className="product-image">👟</div>
          <h3>Shoes</h3>
          <p>Premium shoes for sports, formal, and casual wear</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;