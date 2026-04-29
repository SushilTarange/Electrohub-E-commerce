import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Checkout = () => {
  const { cart, user, setIsCartOpen, placeOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: user?.name || '', phone: user?.phone || '', addr1: user?.address || '', addr2: '', city: '', state: '', pin: '', payment: 'upi'
  });

  if (cart.length === 0) {
    return <div className="page active"><div className="page-container">Your cart is empty. <button onClick={() => navigate('/')}>Go Shop</button></div></div>;
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.addr1 || !formData.city || !formData.state || !formData.pin) {
        return alert('Please fill all required fields');
      }
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;

    const orderData = {
      user: user._id,
      userName: user.name,
      items: cart.map(item => ({ product: item._id, name: item.name, image: item.image, price: item.price, qty: item.qty })),
      subtotal,
      total,
      payment: formData.payment,
      address: `${formData.addr1}, ${formData.city}, ${formData.state} - ${formData.pin}`,
      date: new Date().toLocaleDateString('en-IN'),
      timestamp: Date.now()
    };

    try {
      await placeOrder(orderData);
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert('Failed to place order');
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <div id="page-checkout" className="page active">
      <div className="page-container">
        <button className="back-btn" onClick={() => { setIsCartOpen(true); navigate(-1); }}><i className="fa fa-arrow-left"></i> Back to Cart</button>
        <h2 className="page-title">Checkout</h2>
        <div className="checkout-grid">
          <div className="checkout-left">
            <div className="steps-bar">
              <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}><div className="step-num">{step > 1 ? '✓' : '1'}</div><span>Address</span></div>
              <div className="step-line"></div>
              <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}><div className="step-num">{step > 2 ? '✓' : '2'}</div><span>Payment</span></div>
              <div className="step-line"></div>
              <div className={`step-item ${step === 3 ? 'active' : ''}`}><div className="step-num">3</div><span>Review</span></div>
            </div>

            {step === 1 && (
              <div className="checkout-card">
                <h3>Delivery Address</h3>
                <div className="form-grid">
                  <div className="form-group"><label>Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange}/></div>
                  <div className="form-group"><label>Mobile *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange}/></div>
                  <div className="form-group full"><label>Address Line 1 *</label><input type="text" name="addr1" value={formData.addr1} onChange={handleChange}/></div>
                  <div className="form-group full"><label>Address Line 2</label><input type="text" name="addr2" value={formData.addr2} onChange={handleChange}/></div>
                  <div className="form-group"><label>City *</label><input type="text" name="city" value={formData.city} onChange={handleChange}/></div>
                  <div className="form-group"><label>State *</label><input type="text" name="state" value={formData.state} onChange={handleChange}/></div>
                  <div className="form-group"><label>Pincode *</label><input type="text" name="pin" value={formData.pin} onChange={handleChange}/></div>
                </div>
                <button className="btn-primary" onClick={handleNext}>Continue to Payment <i className="fa fa-arrow-right"></i></button>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-card">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  <label className="pay-opt"><input type="radio" name="payment" value="upi" checked={formData.payment==='upi'} onChange={handleChange}/><div className="pay-lbl"><span>📱</span><div><strong>UPI</strong><small>GPay, PhonePe, Paytm</small></div></div></label>
                  <label className="pay-opt"><input type="radio" name="payment" value="card" checked={formData.payment==='card'} onChange={handleChange}/><div className="pay-lbl"><span>💳</span><div><strong>Credit / Debit Card</strong><small>Visa, Mastercard, RuPay</small></div></div></label>
                  <label className="pay-opt"><input type="radio" name="payment" value="cod" checked={formData.payment==='cod'} onChange={handleChange}/><div className="pay-lbl"><span>💵</span><div><strong>Cash on Delivery</strong><small>Pay when delivered</small></div></div></label>
                </div>
                <div className="step-btns">
                  <button className="btn-ghost" onClick={() => setStep(1)}><i className="fa fa-arrow-left"></i> Back</button>
                  <button className="btn-primary" onClick={handleNext}>Review Order <i className="fa fa-arrow-right"></i></button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="checkout-card">
                <h3>Review &amp; Confirm</h3>
                <div>
                  {cart.map(item => (
                    <div className="review-item-row" key={item._id}>
                      <img src={item.image} alt={item.name} />
                      <div>{item.name}<br/><small>Qty: {item.qty}</small></div>
                      <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="review-info"><strong>📍 Delivery Address</strong><br/>{formData.name}, {formData.addr1}, {formData.city} - {formData.pin}</div>
                <div className="review-info"><strong>💳 Payment Method</strong><br/>{formData.payment.toUpperCase()}</div>
                <div className="step-btns">
                  <button className="btn-ghost" onClick={() => setStep(2)}><i className="fa fa-arrow-left"></i> Back</button>
                  <button className="btn-primary place-btn" onClick={handlePlaceOrder}>Place Order ✓</button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-right">
            <div className="checkout-card">
              <h3>Order Summary</h3>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="summary-row"><span>Shipping</span><span>Free</span></div>
              <div className="summary-row"><span>Tax (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
              <div className="summary-row total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
