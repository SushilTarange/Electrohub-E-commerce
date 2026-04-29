import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('eh_user')) || null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('eh_cart')) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('eh_wishlist')) || []);
  const [orders, setOrders] = useState([]);
  
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentMaxPrice, setCurrentMaxPrice] = useState(200000);
  const [currentSort, setCurrentSort] = useState('default');
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Set default auth header if user has token
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('eh_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('eh_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eh_user', JSON.stringify(user));
      fetchOrders();
    } else {
      localStorage.removeItem('eh_user');
      setOrders([]);
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    setUser(res.data);
  };

  const register = async (userData) => {
    const res = await axios.post('http://localhost:5000/api/users/register', userData);
    setUser(res.data);
  };

  const updateProfile = async (userData) => {
    const res = await axios.put('http://localhost:5000/api/users/profile', userData);
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === productId) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const placeOrder = async (orderData) => {
    const res = await axios.post('http://localhost:5000/api/orders', orderData);
    setCart([]);
    await fetchOrders();
    return res.data;
  };

  // Admin Methods
  const addProduct = async (productData) => {
    await axios.post('http://localhost:5000/api/products', productData);
    await fetchProducts();
  };
  const updateProduct = async (id, productData) => {
    await axios.put(`http://localhost:5000/api/products/${id}`, productData);
    await fetchProducts();
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    await fetchProducts();
  };

  return (
    <ShopContext.Provider value={{
      products, user, cart, wishlist, orders,
      currentCategory, setCurrentCategory,
      currentSearch, setCurrentSearch,
      currentMaxPrice, setCurrentMaxPrice,
      currentSort, setCurrentSort,
      isCartOpen, setIsCartOpen,
      login, register, logout, updateProfile,
      addToCart, updateCartQty, removeFromCart,
      toggleWishlist, placeOrder,
      addProduct, updateProduct, deleteProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};
