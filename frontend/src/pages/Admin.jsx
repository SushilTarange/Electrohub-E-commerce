import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const Admin = () => {
  const { products, addProduct, deleteProduct } = useShop();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', brand: '', category: 'phones', price: '', original: '', image: '', short: '', desc: '', stock: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        original: Number(formData.original),
        stock: Number(formData.stock),
      });
      alert('Product added successfully!');
      setShowAddForm(false);
      setFormData({name: '', brand: '', category: 'phones', price: '', original: '', image: '', short: '', desc: '', stock: ''});
    } catch (err) {
      alert('Error adding product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted');
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="page active">
      <div className="page-container">
        <h2>Admin Dashboard</h2>
        
        <div className="checkout-card" style={{ marginBottom: 30 }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Manage Products ({products.length})</h3>
            <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : '+ Add New Product'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: 20, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div className="form-grid">
                <div className="form-group"><label>Product Name</label><input required type="text" name="name" value={formData.name} onChange={handleChange}/></div>
                <div className="form-group"><label>Brand</label><input required type="text" name="brand" value={formData.brand} onChange={handleChange}/></div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} style={{width:'100%', padding:'12px', border:'1px solid var(--border)', borderRadius:'8px'}}>
                    <option value="phones">Phones</option>
                    <option value="laptops">Laptops</option>
                    <option value="tvs">TVs</option>
                    <option value="audio">Audio</option>
                    <option value="cameras">Cameras</option>
                    <option value="gaming">Gaming</option>
                    <option value="wearables">Wearables</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div className="form-group"><label>Selling Price (₹)</label><input required type="number" name="price" value={formData.price} onChange={handleChange}/></div>
                <div className="form-group"><label>Original Price (₹)</label><input required type="number" name="original" value={formData.original} onChange={handleChange}/></div>
                <div className="form-group"><label>Stock Quantity</label><input required type="number" name="stock" value={formData.stock} onChange={handleChange}/></div>
                <div className="form-group full"><label>Image URL</label><input required type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg"/></div>
                <div className="form-group full"><label>Short Description</label><input required type="text" name="short" value={formData.short} onChange={handleChange}/></div>
                <div className="form-group full"><label>Full Description</label><textarea required name="desc" value={formData.desc} onChange={handleChange} rows="3" style={{width:'100%', padding:'12px', border:'1px solid var(--border)', borderRadius:'8px'}}></textarea></div>
              </div>
              <button type="submit" className="btn-primary" style={{marginTop:20}}>Save Product</button>
            </form>
          )}
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {products.map(p => (
            <div key={p._id} className="checkout-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <img src={p.image} alt={p.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
                <div>
                  <strong style={{ display: 'block' }}>{p.name}</strong>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{p.brand} · ₹{p.price.toLocaleString('en-IN')} · Stock: {p.stock}</span>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => handleDelete(p._id)} style={{ color: 'var(--danger)' }}>Delete</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Admin;
