// routes/cart.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');

// Add a product to the cart
router.post('/cart', async (req, res) => {
  try {
    const { productId } = req.body;

    const existingCartItem = await CartItem.findOne({ product: productId });

    if (existingCartItem) {
      // If the item already exists in the cart, increment the quantity
      existingCartItem.quantity++;
      await existingCartItem.save();
      return res.json({ message: 'Item quantity updated in the cart' });
    } else {
      // If the item doesn't exist in the cart, create a new cart item
      const cartItem = new CartItem({ product: productId });
      await cartItem.save();
      return res.json({ message: 'Item added to the cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to the cart' });
  }
});

// Get all items in the cart
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate('product');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
});

module.exports = router;
