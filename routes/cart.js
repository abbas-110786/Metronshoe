const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1, size } = req.body;
    
    const finalSize = size || 'M';
    
    const user = await User.findById(req.user._id);
    
    const existingItem = user.cart.find(item => 
      item.product.toString() === productId && item.size === finalSize
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity, size: finalSize });
    }
    
    await user.save();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    // Filter out items where product is null (deleted products)
    const validCartItems = user.cart.filter(item => item.product !== null);
    res.json(validCartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/:productId/:size?', auth, async (req, res) => {
  try {
    const { productId, size } = req.params;
    const user = await User.findById(req.user._id);
    
    if (size) {
      user.cart = user.cart.filter(item => 
        !(item.product.toString() === productId && item.size === size)
      );
    } else {
      user.cart = user.cart.filter(item => item.product.toString() !== productId);
    }
    
    await user.save();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;