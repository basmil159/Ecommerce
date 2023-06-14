// routes/order.js
const express = require('express');
const router = express.Router();
const OrderItem = require('../models/order');

// Add a product to the order
router.post('/order', async (req, res) => {
  try {
      const order = new OrderItem(req.body);
      await order.save();
      return res.json({ message: 'Item added to the order' });
    // }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to the order' });
  }
});

// Get all items in the order
router.get('/order', async (req, res) => {
  try {
    const orders = await OrderItem.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order items' });
  }
});

module.exports = router;
