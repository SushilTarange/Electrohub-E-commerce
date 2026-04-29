import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Profile = () => {
  const { user, orders, logout, wishlist, updateProfile } = useShop();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('personal'); // personal, security
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (activeTab === 'security' && formData.password !== formData.confirmPassword) {
      return alert("Passwords don't match!");
    }
    
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        ...(formData.password ? { password: formData.password } : {})
      });
      setIsEditing(false);
      setFormData({...formData, password: '', confirmPassword: ''});
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U';

  return (
    <div id="page-profile" className="page active" style={{ backgroundColor: 'var(--bg2)', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="page-container" style={{ maxWidth: '1000px', paddingTop: '40px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
          <button className="back-btn" onClick={() => navigate('/')} style={{ margin: 0 }}>
            <i className="fa fa-arrow-left"></i>
          </button>
          <h2 style={{ margin: 0, fontSize: '28px' }}>Account Settings</h2>
        </div>
        
        <div className="profile-grid" style={{ gridTemplateColumns: '280px 1fr', gap: '30px' }}>
          
          {/* Left Sidebar */}
          <div className="profile-left" style={{ background: 'var(--bg)', borderRadius: '16px', padding: '30px', boxShadow: 'var(--shadow)', height: 'fit-content' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '30px' }}>
              <div className="profile-av" style={{ width: '80px', height: '80px', fontSize: '32px', marginBottom: '16px', background: 'linear-gradient(135deg, var(--accent), #ff5e62)' }}>
                {initials}
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: '20px' }}>{user?.name}</h3>
              <p className="muted" style={{ margin: '0 0 12px', fontSize: '14px' }}>{user?.email}</p>
              <div style={{ padding: '4px 12px', background: 'var(--accent-bg)', color: 'var(--accent)', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {user?.role === 'admin' ? 'Administrator' : 'Verified Customer'}
              </div>
            </div>
            
            <div className="profile-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <div style={{ textAlign: 'center' }}>
                <strong style={{ display: 'block', fontSize: '24px', color: 'var(--text-h)' }}>{orders.length}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Orders</span>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border)' }}>
                <strong style={{ display: 'block', fontSize: '24px', color: 'var(--text-h)' }}>{wishlist.length}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wishlist</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => setActiveTab('personal')} 
                style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', background: activeTab === 'personal' ? 'var(--code-bg)' : 'transparent', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'personal' ? '600' : '400', color: activeTab === 'personal' ? 'var(--text-h)' : 'var(--text)' }}
              >
                <i className="fa fa-user" style={{ width: '24px' }}></i> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('security')} 
                style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', background: activeTab === 'security' ? 'var(--code-bg)' : 'transparent', border: 'none', cursor: 'pointer', fontWeight: activeTab === 'security' ? '600' : '400', color: activeTab === 'security' ? 'var(--text-h)' : 'var(--text)' }}
              >
                <i className="fa fa-shield-alt" style={{ width: '24px' }}></i> Security & Password
              </button>
              <button 
                onClick={() => navigate('/orders')} 
                style={{ textAlign: 'left', padding: '12px 16px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
              >
                <i className="fa fa-box" style={{ width: '24px' }}></i> Order History
              </button>
            </div>
            
            <button className="btn-ghost" onClick={() => { logout(); navigate('/login'); }} style={{ marginTop: '30px', width: '100%', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <i className="fa fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
          
          {/* Right Content */}
          <div className="profile-right" style={{ background: 'var(--bg)', borderRadius: '16px', padding: '40px', boxShadow: 'var(--shadow)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: '24px' }}>
                  {activeTab === 'personal' ? 'Personal Information' : 'Security & Password'}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>
                  {activeTab === 'personal' ? 'Manage your personal details and delivery address.' : 'Update your password to keep your account secure.'}
                </p>
              </div>
              {activeTab === 'personal' && !isEditing && (
                <button className="btn-ghost" onClick={() => setIsEditing(true)} style={{ padding: '8px 20px', borderRadius: '20px' }}>
                  <i className="fa fa-pen" style={{ fontSize: '12px', marginRight: '6px' }}></i> Edit Profile
                </button>
              )}
            </div>
            
            <form onSubmit={handleUpdate}>
              
              {activeTab === 'personal' && (
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div className="form-group full" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                    <input type="text" name="name" readOnly={!isEditing} value={formData.name} onChange={handleChange} style={{ background: !isEditing ? 'var(--bg2)' : 'var(--bg)', border: !isEditing ? '1px solid transparent' : '1px solid var(--border)' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                    <input type="email" name="email" readOnly={!isEditing} value={formData.email} onChange={handleChange} style={{ background: !isEditing ? 'var(--bg2)' : 'var(--bg)', border: !isEditing ? '1px solid transparent' : '1px solid var(--border)' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mobile Number</label>
                    <input type="tel" name="phone" readOnly={!isEditing} value={formData.phone} onChange={handleChange} style={{ background: !isEditing ? 'var(--bg2)' : 'var(--bg)', border: !isEditing ? '1px solid transparent' : '1px solid var(--border)' }} />
                  </div>
                  <div className="form-group full" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Address</label>
                    <input type="text" name="address" readOnly={!isEditing} value={formData.address} onChange={handleChange} placeholder="House No, Street, City, State - PIN" style={{ background: !isEditing ? 'var(--bg2)' : 'var(--bg)', border: !isEditing ? '1px solid transparent' : '1px solid var(--border)' }} />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div style={{ maxWidth: '400px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>New Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
                  </div>
                </div>
              )}
              
              {(isEditing || activeTab === 'security') && (
                <div style={{ display: 'flex', gap: '15px', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '12px 30px' }}>
                    <i className="fa fa-save" style={{ marginRight: '8px' }}></i> Save Changes
                  </button>
                  {activeTab === 'personal' && (
                    <button type="button" className="btn-ghost" onClick={() => { setIsEditing(false); setFormData({...formData, name: user.name, email: user.email, phone: user.phone, address: user.address}); }} style={{ padding: '12px 30px' }}>
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
