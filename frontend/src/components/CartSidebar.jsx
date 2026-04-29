import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, updateCartQty, removeFromCart, user } = useShop();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = couponApplied ? Math.round(subtotal * 0.10) : 0;
  const taxable = subtotal - discount;
  const tax = Math.round(taxable * 0.18);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = taxable + tax + shipping;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'ELECTRO10') {
      setCouponApplied(true);
      alert('Coupon applied!');
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} id="cartSidebar">
        <div className="cart-header">
          <h3>Your Cart <span>({totalItems} items)</span></h3>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}><i className="fa fa-times"></i></button>
        </div>
        
        {cart.length > 0 ? (
          <div id="cartBody">
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item._id}>
                  <img src={item.image} alt={item.name} onError={(e) => e.target.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&q=80'}/>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                    <div className="cart-item-controls">
                      <div className="qty-ctrl-sm">
                        <button onClick={() => updateCartQty(item._id, -1)}>−</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateCartQty(item._id, 1)}>+</button>
                      </div>
                      <button className="cart-item-del" onClick={() => removeFromCart(item._id)} title="Remove"><i className="fa fa-trash"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="coupon-row">
                <input type="text" placeholder="Promo code (ELECTRO10)" value={coupon} onChange={e => setCoupon(e.target.value)} />
                <button onClick={handleApplyCoupon}>Apply</button>
              </div>
              <div className="cart-summary">
                <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : '₹99'}</span></div>
                {couponApplied && <div className="summary-row"><span>Discount (10%)</span><span style={{color:'#22c55e'}}>-₹{discount.toLocaleString('en-IN')}</span></div>}
                <div className="summary-row"><span>Tax (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                <div className="summary-row total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout <i className="fa fa-arrow-right"></i></button>
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h4>Your cart is empty</h4>
            <p>Add some products to get started!</p>
            <button className="btn-primary" onClick={() => { setIsCartOpen(false); navigate('/'); }}>Browse Products</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
