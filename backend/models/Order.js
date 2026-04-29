const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  qty: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  subtotal: { type: Number },
  discount: { type: Number },
  payment: { type: String },
  address: { type: String },
  status: { type: String, default: 'confirmed' },
  date: { type: String },
  timestamp: { type: Number }
});

module.exports = mongoose.model('Order', orderSchema);
