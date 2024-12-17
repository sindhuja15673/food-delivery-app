
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

// Route for creating a new product
// router.post('/products', async (req, res) => {
//   const product = new Product({
//     name: req.body.name,
//     price: req.body.price,
//     description: req.body.description,
//     image: req.body.image,
//   });

//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


module.exports = router;


