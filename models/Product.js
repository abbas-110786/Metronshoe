const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['sandal', 'chappal', 'shoes'] },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);