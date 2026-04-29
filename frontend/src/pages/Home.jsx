import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, currentCategory, setCurrentCategory, currentSearch, currentSort, setCurrentSort, currentMaxPrice, setCurrentMaxPrice } = useShop();

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.short.toLowerCase().includes(q));
    }
    list = list.filter(p => p.price <= currentMaxPrice);

    if (currentSort === 'price-low') list.sort((a,b) => a.price - b.price);
    else if (currentSort === 'price-high') list.sort((a,b) => b.price - a.price);
    else if (currentSort === 'rating') list.sort((a,b) => b.rating - a.rating);
    else if (currentSort === 'discount') list.sort((a,b) => (b.original - b.price) - (a.original - a.price));

    return list;
  }, [products, currentCategory, currentSearch, currentSort, currentMaxPrice]);

  const handleScrollToProducts = () => {
    const el = document.getElementById('productsSection');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="page-home" className="page active">
      <div className="cat-nav" id="catNav">
        <div className="cat-nav-inner">
          <button className={`cat-btn ${currentCategory === 'all' ? 'active' : ''}`} onClick={() => setCurrentCategory('all')}>All</button>
          <button className={`cat-btn ${currentCategory === 'phones' ? 'active' : ''}`} onClick={() => setCurrentCategory('phones')}>📱 Phones</button>
          <button className={`cat-btn ${currentCategory === 'laptops' ? 'active' : ''}`} onClick={() => setCurrentCategory('laptops')}>💻 Laptops</button>
          <button className={`cat-btn ${currentCategory === 'tvs' ? 'active' : ''}`} onClick={() => setCurrentCategory('tvs')}>📺 TVs</button>
          <button className={`cat-btn ${currentCategory === 'audio' ? 'active' : ''}`} onClick={() => setCurrentCategory('audio')}>🎧 Audio</button>
          <button className={`cat-btn ${currentCategory === 'cameras' ? 'active' : ''}`} onClick={() => setCurrentCategory('cameras')}>📷 Cameras</button>
          <button className={`cat-btn ${currentCategory === 'accessories' ? 'active' : ''}`} onClick={() => setCurrentCategory('accessories')}>🔌 Accessories</button>
          <button className={`cat-btn ${currentCategory === 'gaming' ? 'active' : ''}`} onClick={() => setCurrentCategory('gaming')}>🎮 Gaming</button>
          <button className={`cat-btn ${currentCategory === 'wearables' ? 'active' : ''}`} onClick={() => setCurrentCategory('wearables')}>⌚ Wearables</button>
        </div>
      </div>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 New Arrivals 2025</div>
          <h1>Next-Gen Tech<br/><span className="hero-accent">At Your Fingertips</span></h1>
          <p>Phones, laptops, TVs &amp; more — genuine products with warranty, fast delivery &amp; easy returns.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={handleScrollToProducts}>Shop Now <i className="fa fa-arrow-right"></i></button>
            <button className="btn-ghost" onClick={() => { setCurrentCategory('phones'); handleScrollToProducts(); }}>Explore Phones</button>
          </div>
          <div className="hero-stats">
            <div><strong>50K+</strong><span>Happy Customers</span></div>
            <div><strong>2000+</strong><span>Products</span></div>
            <div><strong>4.8★</strong><span>Avg Rating</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow"></div>
          <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Electronics" className="hero-img"/>
        </div>
      </section>

      <section className="deals-strip">
        <div className="deal-card" onClick={() => { setCurrentCategory('phones'); handleScrollToProducts(); }}><span>📱</span><div><strong>Phones</strong><small>Up to 30% off</small></div></div>
        <div className="deal-card" onClick={() => { setCurrentCategory('laptops'); handleScrollToProducts(); }}><span>💻</span><div><strong>Laptops</strong><small>EMI from ₹999/mo</small></div></div>
        <div className="deal-card" onClick={() => { setCurrentCategory('tvs'); handleScrollToProducts(); }}><span>📺</span><div><strong>Smart TVs</strong><small>Best prices</small></div></div>
        <div className="deal-card" onClick={() => { setCurrentCategory('audio'); handleScrollToProducts(); }}><span>🎧</span><div><strong>Audio</strong><small>Premium sound</small></div></div>
        <div className="deal-card" onClick={() => { setCurrentCategory('gaming'); handleScrollToProducts(); }}><span>🎮</span><div><strong>Gaming</strong><small>Top gear</small></div></div>
      </section>

      <section className="products-section" id="productsSection">
        <div className="section-header">
          <div>
            <h2 className="section-title">{currentSearch ? `Results for "${currentSearch}"` : 'Our Products'}</h2>
            <p className="section-sub">Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="filter-sort-wrap">
            <div className="price-filter">
              <label>Max Price: <span>₹{currentMaxPrice.toLocaleString('en-IN')}</span></label>
              <input type="range" min="0" max="200000" value={currentMaxPrice} step="1000" onChange={(e) => setCurrentMaxPrice(Number(e.target.value))}/>
            </div>
            <select value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
              <option value="default">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Most Discount</option>
            </select>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="no-results" style={{display: 'block'}}>
            <i className="fa fa-search"></i><h3>No products found</h3><p>Try a different search or category</p>
          </div>
        )}
      </section>

      <section className="why-us">
        <h2 className="section-title center">Why ElectroHub?</h2>
        <div className="why-grid">
          <div className="why-card"><div className="why-icon">🚀</div><h3>Fast Delivery</h3><p>Same-day delivery in major cities. Express shipping nationwide.</p></div>
          <div className="why-card"><div className="why-icon">🔒</div><h3>Secure Payments</h3><p>UPI, Cards, Net Banking, EMI. 100% encrypted &amp; safe.</p></div>
          <div className="why-card"><div className="why-icon">🛡️</div><h3>1-Year Warranty</h3><p>All products covered. Hassle-free service at your doorstep.</p></div>
          <div className="why-card"><div className="why-icon">↩️</div><h3>30-Day Returns</h3><p>Not satisfied? Return it — no questions asked.</p></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
