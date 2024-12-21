const express = require('express');
const Product = require('../model/product');
const router = express.Router();

// Route for getting all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id, 10); // Convert id to a number
  console.log(`Received request for product ID: ${productId}`);

  try {
    const product = await Product.findOne({ id: productId });  // Query by the 'id' field
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product found:', product);
    res.json(product);
  } catch (err) {
    console.log('Error fetching product:', err);
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;


