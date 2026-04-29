import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Footer = () => {
  const { user, setCurrentCategory } = useShop();

  if (!user) return null;

  return (
    <footer className="footer" id="mainFooter">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo" style={{ marginBottom: '12px' }}>⚡ Electro<span>Hub</span></div>
          <p>Premium electronics store. Genuine products, fast delivery &amp; best prices across India.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <button onClick={() => setCurrentCategory('phones')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',textAlign:'left',padding:0}}>📱 Phones</button>
          <button onClick={() => setCurrentCategory('laptops')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',textAlign:'left',padding:0,marginTop:8}}>💻 Laptops</button>
          <button onClick={() => setCurrentCategory('tvs')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',textAlign:'left',padding:0,marginTop:8}}>📺 TVs</button>
          <button onClick={() => setCurrentCategory('audio')} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',textAlign:'left',padding:0,marginTop:8}}>🎧 Audio</button>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">Track Order</a>
          <a href="#">Returns</a>
          <a href="#">FAQ</a>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 ElectroHub. All rights reserved.</p>
        <p>Design By: Sushil Tarange & AI</p>
        <div className="pay-icons">
          <span>UPI</span><span>VISA</span><span>MC</span><span>RuPay</span><span>EMI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
