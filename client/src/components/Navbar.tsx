import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>METRONSHOE</h1>
        </Link>
      </div>
      
      <div className="navbar-center">
        <Link to="/">{t('home')}</Link>
        <Link to="/products">{t('allProducts')}</Link>
        <Link to="/products/men">{t('men')}</Link>
        <Link to="/products/women">{t('women')}</Link>
        <Link to="/products/boys">{t('boys')}</Link>
        <Link to="/products/girls">{t('girls')}</Link>
      </div>
      
      <div className="navbar-right">
        <LanguageSelector />
        {user ? (
          <>
            {user.role !== 'admin' && <Link to="/cart">{t('cart')} ({cart.length})</Link>}
            {user.role !== 'admin' && <Link to="/my-orders">{t('myOrders')}</Link>}
            {user.role === 'admin' && <Link to="/admin">{t('admin')}</Link>}
            <span>{t('welcome')}, {user.name}</span>
            <button onClick={logout} className="navbar-btn navbar-btn-outline">{t('logout')}</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn navbar-btn-outline">{t('login')}</Link>
            <Link to="/register" className="navbar-btn navbar-btn-primary">{t('register')}</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;