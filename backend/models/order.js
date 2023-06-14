const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderIds:{
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Order Ids is required'],
  },
  order: {
    type: String,
    required: [true, 'Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  location: {
    type: String,
    required: [true, 'Image is required'],
  },
  deliver: {
    type: String,
    required: false
  }
});

module.exports  = mongoose.model('Orders', orderSchema);

