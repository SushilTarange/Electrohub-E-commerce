const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  original: { type: Number },
  image: { type: String, required: true },
  short: { type: String, required: true },
  desc: { type: String },
  specs: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  isNewProduct: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
