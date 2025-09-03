const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');
const emailService = require('../utils/emailService');
const router = express.Router();

// Create order
router.post('/create', auth, async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      trackingId: 'TRK' + Date.now(),
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });
    
    await order.save();
    
    // Clear user cart
    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    
    // Send order confirmation email
    const user = await User.findById(req.user._id);
    emailService.sendOrderConfirmation(order, user);
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
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

// Get order by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Filter out items where product is null (deleted products)
    const orderWithValidItems = {
      ...order.toObject(),
      items: order.items.filter(item => item.product !== null)
    };
    
    res.json(orderWithValidItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;