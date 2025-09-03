const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['sandals', 'chappals', 'shoes'] },
  gender: { type: String, required: true, enum: ['men', 'women', 'boys', 'girls'] },
  subcategory: { type: String, enum: ['formal', 'sport', 'casual'] },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  sizes: [{ type: String }],
  inStock: { type: Boolean, default: true },
  isConfirmed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);