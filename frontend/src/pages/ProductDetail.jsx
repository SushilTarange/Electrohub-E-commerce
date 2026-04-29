import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useShop } from '../context/ShopContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useShop();
  
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="page"><div className="page-container">Loading...</div></div>;
  if (!product) return <div className="page"><div className="page-container">Product not found.</div></div>;

  const isWished = wishlist.includes(product._id);
  const disc = product.original > product.price ? Math.round((product.original - product.price) / product.original * 100) : 0;
  
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '★'.repeat(full);
    if (half) s += '½';
    return s;
  };

  const handleQtyChange = (d) => {
    const newQty = qty + d;
    if (newQty >= 1 && newQty <= (product.stock || 99)) {
      setQty(newQty);
    }
  };

  return (
    <div id="page-detail" className="page active">
      <div className="page-container">
        <button className="back-btn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left"></i> Back</button>
        
        <div className="detail-grid">
          <div>
            <div className="detail-img-wrap">
              <img className="detail-img" src={product.image} alt={product.name} />
            </div>
          </div>
          
          <div className="detail-info">
            <div className="detail-brand">{product.brand}</div>
            <h1 className="detail-name">{product.name}</h1>
            <div className="detail-rating">
              <span className="stars">{renderStars(product.rating)}</span>
              <span>{product.rating} stars · {product.reviews?.toLocaleString()} reviews</span>
              {product.stock < 5 ? <span className="stock-low">Only {product.stock} left!</span> : <span className="stock-ok">✓ In Stock</span>}
            </div>
            
            <div className="detail-pricing">
              <span className="detail-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.original > product.price && (
                <>
                  <span className="detail-original">₹{product.original.toLocaleString('en-IN')}</span>
                  <span className="detail-discount">{disc}% OFF</span>
                </>
              )}
            </div>
            
            <p className="detail-desc">{product.desc}</p>
            
            <div className="detail-specs">
              <h4>Key Specifications</h4>
              <div className="spec-grid">
                {product.specs?.map((s, i) => <div key={i} className="spec-item">{s}</div>)}
              </div>
            </div>
            
            <div className="qty-wrap">
              <label>Quantity:</label>
              <div className="qty-ctrl">
                <button onClick={() => handleQtyChange(-1)}>−</button>
                <span>{qty}</span>
                <button onClick={() => handleQtyChange(1)}>+</button>
              </div>
            </div>
            
            <div className="detail-actions">
              <button className="btn-primary" onClick={() => { addToCart(product, qty); alert('Added to cart!'); }} disabled={product.stock === 0}>
                <i className="fa fa-cart-plus"></i> Add to Cart
              </button>
              <button className={`btn-ghost ${isWished ? 'active' : ''}`} onClick={() => toggleWishlist(product._id)}>
                <i className={`${isWished ? 'fa' : 'far'} fa-heart`}></i> {isWished ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>
            
            <div className="detail-badges">
              <span className="detail-badge">🚚 Free Delivery</span>
              <span className="detail-badge">🔒 Secure Payment</span>
              <span className="detail-badge">🛡️ 1-Year Warranty</span>
              <span className="detail-badge">↩️ 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
