const express = require('express');
const Crust = require('../model/crust'); // Make sure the path to your model is correct
const router = express.Router();

// Route for getting all crusts
router.get('/', async (req, res) => {
  try {
    const crusts = await Crust.find();
    res.json(crusts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for getting a crust by ID
router.get('/:id', async (req, res) => {
  try {
    const crust = await Crust.findById(req.params.id);
    if (!crust) {
      return res.status(404).json({ message: 'Crust not found' });
    }
    res.json(crust);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for creating a new crust
router.post('/', async (req, res) => {
  const crust = new Crust({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const newCrust = await crust.save();
    res.status(201).json(newCrust);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for updating a crust
router.patch('/:id', async (req, res) => {
  try {
    const crust = await Crust.findById(req.params.id);
    if (!crust) {
      return res.status(404).json({ message: 'Crust not found' });
    }

    if (req.body.name != null) {
      crust.name = req.body.name;
    }
    if (req.body.price != null) {
      crust.price = req.body.price;
    }
    if (req.body.description != null) {
      crust.description = req.body.description;
    }

    const updatedCrust = await crust.save();
    res.json(updatedCrust);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a crust
router.delete('/:id', async (req, res) => {
  try {
    const crust = await Crust.findById(req.params.id);
    if (!crust) {
      return res.status(404).json({ message: 'Crust not found' });
    }

    await crust.remove();
    res.json({ message: 'Crust deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
