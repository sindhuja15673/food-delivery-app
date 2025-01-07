const mongoose = require('mongoose');

const crustSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
});

const Crust = mongoose.model('Crust', crustSchema);

module.exports = Crust;
