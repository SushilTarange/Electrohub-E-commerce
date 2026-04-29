import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useShop();
  const navigate = useNavigate();

  const isWished = wishlist.includes(product._id);
  const disc = product.original > product.price ? Math.round((product.original - product.price) / product.original * 100) : 0;
  
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '★'.repeat(full);
    if (half) s += '½';
    return s;
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="prod-img-wrap">
        {product.isNewProduct && <span className="prod-badge new">NEW</span>}
        {!product.isNewProduct && disc > 10 && <span className="prod-badge">{disc}% OFF</span>}
        <img className="product-card-img" src={product.image} alt={product.name} loading="lazy" />
        <button 
          className={`wish-btn ${isWished ? 'active' : ''}`} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }} 
          title="Wishlist"
        >
          <i className={`${isWished ? 'fa' : 'far'} fa-heart`}></i>
        </button>
      </div>
      <div className="prod-body">
        <div className="prod-brand">{product.brand}</div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-short">{product.short}</div>
        <div className="prod-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-count">{product.rating} ({product.reviews?.toLocaleString()})</span>
        </div>
        <div className="prod-pricing">
          <span className="prod-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.original > product.price && (
            <>
              <span className="prod-original">₹{product.original.toLocaleString('en-IN')}</span>
              <span className="prod-discount">{disc}% off</span>
            </>
          )}
        </div>
        {product.stock < 5 && <span className="stock-low">Only {product.stock} left!</span>}
        <div className="prod-actions">
          <button 
            className="add-cart-btn" 
            onClick={(e) => { e.stopPropagation(); addToCart(product); alert('Added to cart!'); }} 
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : <><i className="fa fa-cart-plus"></i> Add to Cart</>}
          </button>
          <button className="view-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(); }} title="View Details">
            <i className="fa fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
