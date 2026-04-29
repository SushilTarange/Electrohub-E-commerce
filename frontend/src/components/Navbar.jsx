import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar = () => {
  const { cart, wishlist, user, logout, setIsCartOpen, setCurrentCategory, setCurrentSearch } = useShop();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  if (!user) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCurrentSearch(searchInput.trim());
      navigate('/');
    } else {
      setCurrentSearch('');
    }
  };

  const handleCategory = (cat) => {
    setCurrentCategory(cat);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <div className="ann-bar">
        <div className="ann-track">
          <span>⚡ Free shipping above ₹999</span>
          <span>🎯 Use <b>ELECTRO10</b> for 10% off</span>
          <span>🔒 1-Year Warranty on all products</span>
          <span>📦 30-day easy returns</span>
        </div>
      </div>

      <nav className="navbar" id="navbar">
        <div className="nav-inner">
          <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span><span></span><span></span>
          </button>
          
          <Link className="logo" to="/">
            <span className="logo-bolt">⚡</span>Electro<span>Hub</span>
          </Link>
          
          <form className="nav-search-wrap" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search phones, laptops, TVs…" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-ico"><i className="fa fa-search"></i></button>
          </form>
          
          <div className="nav-actions">
            <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
              <i className="fa fa-heart"></i>
              <span className="badge">{wishlist.length}</span>
            </Link>
            <button className="nav-icon-btn" onClick={() => setIsCartOpen(true)} title="Cart">
              <i className="fa fa-shopping-cart"></i>
              <span className="badge">{cartCount}</span>
            </button>
            
            {!user ? (
              <div style={{display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '10px'}}>
                <Link to="/login" className="btn-ghost" style={{padding: '8px 16px', fontSize: '14px'}}>Login</Link>
                <Link to="/register" className="btn-primary" style={{padding: '8px 16px', fontSize: '14px'}}>Register</Link>
              </div>
            ) : (
              <div className="account-wrap">
                <button 
                  className="nav-icon-btn" 
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} 
                  title="Account"
                  style={{display: 'flex', alignItems: 'center', gap: '8px', width: 'auto', padding: '4px 12px', borderRadius: '30px', background: 'var(--code-bg)'}}
                >
                  <div className="profile-av" style={{width: '28px', height: '28px', fontSize: '12px', margin: 0}}>
                    {user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U'}
                  </div>
                  <span style={{fontSize: '14px', fontWeight: '500'}}>{user.name.split(' ')[0]}</span>
                  <i className="fa fa-chevron-down" style={{fontSize: '10px', color: 'var(--text-muted)'}}></i>
                </button>
                {isAccountMenuOpen && (
                  <div className="account-dropdown open" onMouseLeave={() => setIsAccountMenuOpen(false)}>
                    <div id="userMenu">
                      <div className="acc-user-info">
                        <strong>{user.name}</strong>{user.email}
                      </div>
                      <Link to="/orders" onClick={() => setIsAccountMenuOpen(false)}><i className="fa fa-box"></i> My Orders</Link>
                      <Link to="/wishlist" onClick={() => setIsAccountMenuOpen(false)}><i className="fa fa-heart"></i> Wishlist</Link>
                      <Link to="/profile" onClick={() => setIsAccountMenuOpen(false)}><i className="fa fa-cog"></i> Profile</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsAccountMenuOpen(false)} style={{color: 'var(--accent)'}}><i className="fa fa-shield-alt"></i> Admin Dashboard</Link>
                      )}
                      <hr/>
                      <button onClick={() => { logout(); setIsAccountMenuOpen(false); navigate('/'); }} className="logout-btn"><i className="fa fa-sign-out-alt"></i> Logout</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mobile-menu open">
            <form className="mob-search" onSubmit={handleSearch}>
              <input type="text" placeholder="Search products…" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <button type="submit" style={{background:'none', border:'none'}}><i className="fa fa-search"></i></button>
            </form>
            <button onClick={() => handleCategory('all')}>All Products</button>
            <button onClick={() => handleCategory('phones')}>📱 Phones</button>
            <button onClick={() => handleCategory('laptops')}>💻 Laptops</button>
            <button onClick={() => handleCategory('tvs')}>📺 TVs</button>
            <button onClick={() => handleCategory('audio')}>🎧 Audio</button>
            <button onClick={() => handleCategory('cameras')}>📷 Cameras</button>
            <hr/>
            {!user ? (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login / Register</Link>
            ) : (
              <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
