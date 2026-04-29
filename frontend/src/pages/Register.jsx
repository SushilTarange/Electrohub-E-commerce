import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const { register } = useShop();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      return alert('Passwords do not match');
    }
    try {
      await register({ name: formData.name, email: formData.email, phone: formData.phone, password: formData.password });
      navigate('/');
    } catch (err) {
      alert('Error registering');
    }
  };

  return (
    <div className="page active" style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '40px 0',
      backgroundImage: 'url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop")',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 0 }}></div>
      <div className="auth-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="auth-card">
          <div className="auth-logo">⚡ ElectroHub</div>
          <h2>Create Account</h2>
          <p className="auth-sub">Join thousands of happy customers</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>Full Name</label><input type="text" name="name" required onChange={handleChange} /></div>
            <div className="form-group"><label>Email Address</label><input type="email" name="email" required onChange={handleChange} /></div>
            <div className="form-group"><label>Mobile Number</label><input type="tel" name="phone" required onChange={handleChange} /></div>
            <div className="form-group">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} name="password" required onChange={handleChange} />
                <button type="button" onClick={() => setShowPw(!showPw)}><i className="fa fa-eye"></i></button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} name="confirm" required onChange={handleChange} />
                <button type="button" onClick={() => setShowPw(!showPw)}><i className="fa fa-eye"></i></button>
              </div>
            </div>
            <button type="submit" className="btn-auth">Create Account <i className="fa fa-arrow-right"></i></button>
          </form>
          <p className="auth-switch">Already have an account? <span style={{cursor:'pointer', color:'var(--accent)'}} onClick={() => navigate('/login')}>Login</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
