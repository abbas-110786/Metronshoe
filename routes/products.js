const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed products (for demo)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      { name: 'Classic Sandal', category: 'sandal', price: 2999, image: '/images/sandal1.jpg', description: 'Comfortable summer sandal', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Leather Chappal', category: 'chappal', price: 1999, image: '/images/chappal1.jpg', description: 'Traditional leather chappal', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Sports Shoes', category: 'shoes', price: 4999, image: '/images/shoes1.jpg', description: 'Premium sports shoes', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Beach Sandal', category: 'sandal', price: 1599, image: '/images/sandal2.jpg', description: 'Perfect for beach walks', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Casual Chappal', category: 'chappal', price: 1299, image: '/images/chappal2.jpg', description: 'Daily wear chappal', sizes: ['6', '7', '8', '9', '10'] },
      { name: 'Formal Shoes', category: 'shoes', price: 5999, image: '/images/shoes2.jpg', description: 'Elegant formal shoes', sizes: ['6', '7', '8', '9', '10'] }
    ];
    await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;