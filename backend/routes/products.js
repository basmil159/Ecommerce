const express = require('express');
const router = express.Router();
const Products = require('../models/product');

// Create a new product
router.post('/products', async (req, res) => {
    
    try {
        console.log(req.body);
      const { name, price, image, description } = req.body;
    const newProduct = new Products({
      name,
      price,
      image,
      description
    });

     newProduct.save().then(() => {
        res.json({ message: 'Product created successfully', newProduct });
      });

    // res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});


// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, description } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        image,
        description
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
