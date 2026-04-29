import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, products } = useShop();
  const navigate = useNavigate();

  const wishlistedProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <div id="page-wishlist" className="page active">
      <div className="page-container">
        <div className="page-top">
          <button className="back-btn" onClick={() => navigate('/')}><i className="fa fa-arrow-left"></i> Back</button>
          <h2>My Wishlist</h2>
        </div>
        
        {wishlistedProducts.length > 0 ? (
          <div className="product-grid">
            {wishlistedProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ display: 'block' }}>
            <div className="empty-icon">💔</div>
            <h3>Wishlist is empty</h3>
            <p>Save products you love!</p>
            <button className="btn-primary" onClick={() => navigate('/')}>Browse Products</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
