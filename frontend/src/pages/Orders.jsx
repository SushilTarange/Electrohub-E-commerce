import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Orders = () => {
  const { orders } = useShop();
  const navigate = useNavigate();

  return (
    <div id="page-orders" className="page active">
      <div className="page-container">
        <div className="page-top">
          <button className="back-btn" onClick={() => navigate('/')}><i className="fa fa-arrow-left"></i> Back</button>
          <h2>My Orders</h2>
        </div>
        
        {orders.length > 0 ? (
          <div>
            {orders.map(o => (
              <div className="order-card" key={o._id}>
                <div className="order-card-top">
                  <div className="order-id"><strong>{o._id}</strong>{o.items.length} items · {o.date}</div>
                  <span className={`order-status status-${o.status}`}>{o.status}</span>
                </div>
                <div className="order-items-preview">
                  {o.items.map((i, idx) => (
                    <img key={idx} className="order-thumb" src={i.image} alt={i.name} />
                  ))}
                </div>
                <div className="order-card-btm">
                  <div className="order-total">₹{o.total.toLocaleString('en-IN')}</div>
                  <div className="order-date">Payment: {o.payment?.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ display: 'block' }}>
            <div className="empty-icon">📦</div><h3>No orders yet</h3><p>Start shopping!</p>
            <button className="btn-primary" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
