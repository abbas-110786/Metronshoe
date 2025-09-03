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
      { name: 'Men Classic Sandals', category: 'sandals', gender: 'men', price: 2999, image: '/images/sandal1.jpg', description: 'Comfortable summer sandals for men', sizes: ['7', '8', '9', '10', '11'] },
      { name: 'Women Leather Chappals', category: 'chappals', gender: 'women', price: 1999, image: '/images/chappal1.jpg', description: 'Traditional leather chappals for women', sizes: ['5', '6', '7', '8', '9'] },
      { name: 'Boys Sports Shoes', category: 'shoes', gender: 'boys', subcategory: 'sport', price: 2999, image: '/images/shoes1.jpg', description: 'Premium sports shoes for boys', sizes: ['3', '4', '5', '6', '7'] },
      { name: 'Girls Beach Sandals', category: 'sandals', gender: 'girls', price: 1599, image: '/images/sandal2.jpg', description: 'Perfect beach sandals for girls', sizes: ['3', '4', '5', '6', '7'] },
      { name: 'Women Casual Chappals', category: 'chappals', gender: 'women', price: 1299, image: '/images/chappal2.jpg', description: 'Daily wear chappals for women', sizes: ['5', '6', '7', '8', '9'] },
      { name: 'Men Formal Shoes', category: 'shoes', gender: 'men', subcategory: 'formal', price: 5999, image: '/images/shoes2.jpg', description: 'Elegant formal shoes for men', sizes: ['7', '8', '9', '10', '11'] },
      { name: 'Men Sport Shoes', category: 'shoes', gender: 'men', subcategory: 'sport', price: 4999, image: '/images/shoes3.jpg', description: 'High-performance sport shoes for men', sizes: ['7', '8', '9', '10', '11'] },
      { name: 'Women Sandals', category: 'sandals', gender: 'women', price: 2299, image: '/images/sandal3.jpg', description: 'Elegant sandals for women', sizes: ['5', '6', '7', '8', '9'] }
    ];
    await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;