import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
        <h1>METRONSHOE</h1>
      </Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
        <Link to="/products/sandal">Sandals</Link>
        <Link to="/products/chappal">Chappals</Link>
        <Link to="/products/shoes">Shoes</Link>
        
        {user ? (
          <>
            <Link to="/cart">Cart ({cart.length})</Link>
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;