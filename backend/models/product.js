const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  description: {
    type: String,
    required: false
  }
});

module.exports  = mongoose.model('Product', productSchema);

