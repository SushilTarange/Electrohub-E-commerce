import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const { login } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="page active" style={{ 
      display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh',
      backgroundImage: 'url("https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop")',
      backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 0 }}></div>
      <div className="auth-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="auth-card">
          <div className="auth-logo">⚡ ElectroHub</div>
          <h2>Welcome Back</h2>
          <p className="auth-sub">Login to your account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(!showPw)}><i className="fa fa-eye"></i></button>
              </div>
            </div>
            <button type="submit" className="btn-auth">Login <i className="fa fa-arrow-right"></i></button>
          </form>
          <p className="auth-switch">Don't have an account? <span style={{cursor:'pointer', color:'var(--accent)'}} onClick={() => navigate('/register')}>Register</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
