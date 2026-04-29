import React, { useEffect } from 'react';
import { useShop } from '../context/ShopContext';

const Toast = () => {
  // In a real app we'd want a proper toast context to show and hide toasts easily
  // This is a placeholder since we replaced the global JS showToast
  return (
    <div id="toast" className="toast"></div>
  );
};

export default Toast;
