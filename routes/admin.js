const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin');
const emailService = require('../utils/emailService');
const router = express.Router();

// Get all users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product
router.post('/products', auth, adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', auth, adminAuth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (excluding cancelled)
router.get('/orders', auth, adminAuth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find({ orderStatus: { $ne: 'cancelled' } })
      .populate('user', 'name email')
      .populate('items.product', 'name category')
      .sort({ createdAt: -1 });
    
    // Filter out items where product is null (deleted products)
    const ordersWithValidItems = orders.map(order => ({
      ...order.toObject(),
      items: order.items.filter(item => item.product !== null)
    }));
    
    res.json(ordersWithValidItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.put('/orders/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { orderStatus }, 
      { new: true }
    ).populate('user');
    
    // Send status update email
    if (order && order.user) {
      emailService.sendOrderStatusUpdate(order, order.user, orderStatus);
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle product confirmation
router.put('/products/:id/confirm', auth, adminAuth, async (req, res) => {
  try {
    const { isConfirmed } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isConfirmed },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;